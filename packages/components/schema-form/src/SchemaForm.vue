<template>
  <div class="schema-form">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      :label-width="schema.form?.labelWidth || '120px'"
      :label-position="schema.form?.labelPosition || 'right'"
      :size="schema.form?.size || 'default'"
      :disabled="schema.form?.disabled || false"
      :readonly="schema.form?.readonly || false"
      @submit.prevent="handleSubmit"
    >
      <!-- 表单标题 -->
      <div v-if="schema.title" class="form-title">
        <h3>{{ schema.title }}</h3>
      </div>

      <!-- 栅格布局 -->
      <el-row
        v-if="schema.layout === 'grid'"
        :gutter="schema.grid?.gutter || 16"
        :justify="schema.grid?.justify || 'start'"
        :align="schema.grid?.align || 'top'"
      >
        <el-col
          v-for="field in visibleFields"
          :key="field.name"
          :span="field.span || 24"
          :offset="field.offset || 0"
        >
          <el-form-item
            :label="field.label"
            :prop="field.name"
            :rules="getFieldRules(field)"
            :required="field.required"
          >
            <component
              :is="getFieldComponent(field)"
              v-bind="getFieldProps(field)"
              :model-value="formData[field.name]"
              @update:model-value="(value) => updateField(field.name, value)"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- Flex布局 -->
      <div v-else-if="schema.layout === 'flex'" class="flex-layout">
        <el-form-item
          v-for="field in visibleFields"
          :key="field.name"
          :label="field.label"
          :prop="field.name"
          :rules="getFieldRules(field)"
          :required="field.required"
          class="flex-item"
        >
          <component
            :is="getFieldComponent(field)"
            v-bind="getFieldProps(field)"
            :model-value="formData[field.name]"
            @update:model-value="(value) => updateField(field.name, value)"
          />
        </el-form-item>
      </div>

      <!-- 默认布局 -->
      <template v-else>
        <el-form-item
          v-for="field in visibleFields"
          :key="field.name"
          :label="field.label"
          :prop="field.name"
          :rules="getFieldRules(field)"
          :required="field.required"
        >
          <component
            :is="getFieldComponent(field)"
            v-bind="getFieldProps(field)"
            :model-value="formData[field.name]"
            @update:model-value="(value) => updateField(field.name, value)"
          />
        </el-form-item>
      </template>

      <!-- 操作按钮 -->
      <div v-if="showActions" class="form-actions">
        <el-button @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick } from "vue";
import { ElForm, ElFormItem, ElRow, ElCol, ElButton } from "element-plus";
import type { FormInstance } from "element-plus";
import type {
  FormSchema,
  FormData,
  FieldConfig,
  SchemaFormEvents,
} from "./types";
import { renderers } from "./renderers";
import {
  checkLinkageCondition,
  executeLinkageRules,
  filterVisibleFields,
  sortFields,
  extractLinkageRules,
} from "./linkage";
import { mergeRules, validateForm } from "./validator";

// Props
interface Props {
  /** 表单Schema配置 */
  schema: FormSchema;
  /** 表单数据 */
  modelValue: FormData;
  /** 是否显示操作按钮 */
  showActions?: boolean;
  /** 是否实时校验 */
  validateOnChange?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showActions: true,
  validateOnChange: false,
});

// Emits
const emit = defineEmits<SchemaFormEvents>();

// 表单引用
const formRef = ref<FormInstance>();

// 表单数据
const formData = reactive<FormData>({ ...props.modelValue });

// 字段配置
const fieldConfigs = ref<FieldConfig[]>([...props.schema.fields]);

// 联动规则
const linkageRules = computed(() => extractLinkageRules(fieldConfigs.value));

// 可见字段
const visibleFields = computed(() => {
  const sortedFields = sortFields(fieldConfigs.value);
  return filterVisibleFields(sortedFields, formData);
});

// 表单校验规则
const formRules = computed(() => {
  const rules: Record<string, any[]> = {};
  visibleFields.value.forEach((field) => {
    if (field.name) {
      rules[field.name] = mergeRules(field, formData);
    }
  });
  return rules;
});

// 初始化表单数据
const initFormData = () => {
  props.schema.fields.forEach((field) => {
    if (
      formData[field.name] === undefined &&
      field.defaultValue !== undefined
    ) {
      formData[field.name] = field.defaultValue;
    }
  });
};

// 获取字段组件
const getFieldComponent = (field: FieldConfig) => {
  // 如果有自定义渲染器
  if (field.render) {
    return field.render(field, formData);
  }

  // 使用内置渲染器
  const renderer = renderers[field.type];
  if (renderer) {
    return renderer(field, formData, (value) => updateField(field.name, value));
  }

  // 默认输入框
  return renderers.input(field, formData, (value) =>
    updateField(field.name, value)
  );
};

// 获取字段属性
const getFieldProps = (field: FieldConfig) => {
  return {
    placeholder: field.placeholder,
    disabled: field.disabled,
    readonly: field.readonly,
    ...field.props,
  };
};

// 获取字段校验规则
const getFieldRules = (field: FieldConfig) => {
  return mergeRules(field, formData);
};

// 更新字段值
const updateField = (fieldName: string, value: any) => {
  formData[fieldName] = value;

  // 触发联动规则
  executeLinkageRules(
    linkageRules.value,
    formData,
    (data) => Object.assign(formData, data),
    (name, config) => updateFieldConfig(name, config)
  );

  // 实时校验
  if (props.validateOnChange) {
    nextTick(() => {
      validateForm(fieldConfigs.value, formData).then((result) => {
        emit("validate", result.valid, result.errors);
      });
    });
  }

  // 触发事件
  emit("update:modelValue", { ...formData });
  emit("field-change", fieldName, value, { ...formData });
};

// 更新字段配置
const updateFieldConfig = (fieldName: string, config: Partial<FieldConfig>) => {
  const index = fieldConfigs.value.findIndex(
    (field) => field.name === fieldName
  );
  if (index !== -1) {
    fieldConfigs.value[index] = { ...fieldConfigs.value[index], ...config };
  }
};

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();
    emit("submit", { ...formData });
  } catch (error) {
    console.error("Form validation failed:", error);
  }
};

// 重置表单
const handleReset = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }

  // 重置为初始值
  Object.keys(formData).forEach((key) => {
    delete formData[key];
  });

  // 重新初始化
  initFormData();

  emit("reset");
  emit("update:modelValue", { ...formData });
};

// 校验表单
const validate = async () => {
  if (!formRef.value) return { valid: false, errors: {} };

  try {
    await formRef.value.validate();
    return { valid: true, errors: {} };
  } catch (error) {
    return { valid: false, errors: error as Record<string, string> };
  }
};

// 暴露方法
defineExpose({
  validate,
  resetFields: handleReset,
  submit: handleSubmit,
});

// 监听modelValue变化
watch(
  () => props.modelValue,
  (newValue) => {
    Object.assign(formData, newValue);
  },
  { deep: true }
);

// 初始化
initFormData();
</script>

<style scoped>
.schema-form {
  width: 100%;
}

.form-title {
  margin-bottom: 20px;
}

.form-title h3 {
  margin: 0;
  color: #303133;
  font-size: 18px;
  font-weight: 500;
}

.flex-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.flex-item {
  flex: 1;
  min-width: 200px;
}

.form-actions {
  margin-top: 24px;
  text-align: center;
}

.form-actions .el-button {
  margin: 0 8px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .flex-layout {
    flex-direction: column;
  }

  .flex-item {
    min-width: auto;
  }
}
</style>
