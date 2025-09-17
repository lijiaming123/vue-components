import { h as i, computed as k, defineComponent as W, ref as B, reactive as H, watch as J, createElementBlock as v, openBlock as m, createVNode as E, unref as g, withModifiers as K, withCtx as y, createCommentVNode as j, createBlock as V, createElementVNode as Q, toDisplayString as X, Fragment as _, renderList as L, resolveDynamicComponent as A, mergeProps as C, createTextVNode as P, nextTick as Y } from "vue";
import { ElTreeSelect as Z, ElCascader as ee, ElUpload as re, ElRate as ae, ElSlider as te, ElSwitch as oe, ElInputNumber as se, ElDatePicker as N, ElCheckboxGroup as ne, ElCheckbox as le, ElRadioGroup as ue, ElRadio as de, ElSelect as ie, ElOption as ce, ElInput as T, ElForm as me, ElRow as pe, ElCol as be, ElFormItem as S, ElButton as I } from "element-plus";
const he = (e, r, a) => i(T, {
  modelValue: r[e.name],
  placeholder: e.placeholder,
  disabled: e.disabled,
  readonly: e.readonly,
  clearable: !0,
  ...e.props,
  "onUpdate:modelValue": a
}), ge = (e, r, a) => i(T, {
  type: "textarea",
  modelValue: r[e.name],
  placeholder: e.placeholder,
  disabled: e.disabled,
  readonly: e.readonly,
  clearable: !0,
  rows: 4,
  ...e.props,
  "onUpdate:modelValue": a
}), ye = (e, r, a) => i(se, {
  modelValue: r[e.name],
  placeholder: e.placeholder,
  disabled: e.disabled,
  readonly: e.readonly,
  clearable: !0,
  style: { width: "100%" },
  ...e.props,
  "onUpdate:modelValue": a
}), fe = (e, r, a) => {
  const t = k(() => e.options || []);
  return i(
    ie,
    {
      modelValue: r[e.name],
      placeholder: e.placeholder,
      disabled: e.disabled,
      clearable: !0,
      filterable: !0,
      style: { width: "100%" },
      ...e.props,
      "onUpdate:modelValue": a
    },
    {
      default: () => t.value.map(
        (s) => i(ce, {
          key: s.value,
          label: s.label,
          value: s.value,
          disabled: s.disabled
        })
      )
    }
  );
}, ve = (e, r, a) => {
  const t = k(() => e.options || []);
  return i(
    ue,
    {
      modelValue: r[e.name],
      disabled: e.disabled,
      ...e.props,
      "onUpdate:modelValue": a
    },
    {
      default: () => t.value.map(
        (s) => i(
          de,
          {
            key: s.value,
            label: s.value,
            disabled: s.disabled
          },
          {
            default: () => s.label
          }
        )
      )
    }
  );
}, Ve = (e, r, a) => {
  const t = k(() => e.options || []);
  return i(
    ne,
    {
      modelValue: r[e.name] || [],
      disabled: e.disabled,
      ...e.props,
      "onUpdate:modelValue": a
    },
    {
      default: () => t.value.map(
        (s) => i(
          le,
          {
            key: s.value,
            label: s.value,
            disabled: s.disabled
          },
          {
            default: () => s.label
          }
        )
      )
    }
  );
}, we = (e, r, a) => i(N, {
  modelValue: r[e.name],
  type: "date",
  placeholder: e.placeholder,
  disabled: e.disabled,
  readonly: e.readonly,
  clearable: !0,
  style: { width: "100%" },
  ...e.props,
  "onUpdate:modelValue": a
}), ke = (e, r, a) => i(N, {
  modelValue: r[e.name],
  type: "datetime",
  placeholder: e.placeholder,
  disabled: e.disabled,
  readonly: e.readonly,
  clearable: !0,
  style: { width: "100%" },
  ...e.props,
  "onUpdate:modelValue": a
}), Re = (e, r, a) => i(N, {
  modelValue: r[e.name],
  type: "time",
  placeholder: e.placeholder,
  disabled: e.disabled,
  readonly: e.readonly,
  clearable: !0,
  style: { width: "100%" },
  ...e.props,
  "onUpdate:modelValue": a
}), Ee = (e, r, a) => i(oe, {
  modelValue: r[e.name],
  disabled: e.disabled,
  ...e.props,
  "onUpdate:modelValue": a
}), Ue = (e, r, a) => i(te, {
  modelValue: r[e.name],
  disabled: e.disabled,
  ...e.props,
  "onUpdate:modelValue": a
}), qe = (e, r, a) => i(ae, {
  modelValue: r[e.name],
  disabled: e.disabled,
  ...e.props,
  "onUpdate:modelValue": a
}), Fe = (e, r, a) => i(re, {
  modelValue: r[e.name],
  disabled: e.disabled,
  ...e.props,
  "onUpdate:modelValue": a
}), xe = (e, r, a) => i(ee, {
  modelValue: r[e.name],
  placeholder: e.placeholder,
  disabled: e.disabled,
  clearable: !0,
  style: { width: "100%" },
  ...e.props,
  "onUpdate:modelValue": a
}), _e = (e, r, a) => i(Z, {
  modelValue: r[e.name],
  placeholder: e.placeholder,
  disabled: e.disabled,
  clearable: !0,
  style: { width: "100%" },
  ...e.props,
  "onUpdate:modelValue": a
}), Le = (e, r, a) => i("div", { class: "country-select-placeholder" }, "国家选择器"), z = {
  input: he,
  textarea: ge,
  select: fe,
  radio: ve,
  checkbox: Ve,
  date: we,
  datetime: ke,
  time: Re,
  number: ye,
  switch: Ee,
  slider: Ue,
  rate: qe,
  upload: Fe,
  cascader: xe,
  "tree-select": _e,
  "country-select": Le
}, G = {
  eq: (e, r) => e === r,
  ne: (e, r) => e !== r,
  gt: (e, r) => e > r,
  gte: (e, r) => e >= r,
  lt: (e, r) => e < r,
  lte: (e, r) => e <= r,
  in: (e, r) => Array.isArray(r) && r.includes(e),
  nin: (e, r) => Array.isArray(r) && !r.includes(e)
};
function Ae(e, r) {
  return !e || !Array.isArray(e) ? !0 : e.every((a) => {
    const t = r[a.field], s = a.operator || "eq", u = G[s];
    return u ? u(t, a.value) : (console.warn(`Unknown operator: ${s}`), !1);
  });
}
function Ce(e, r, a, t) {
  const s = r[e.trigger], { operator: u, value: l } = e.condition, d = G[u];
  if (!d || !d(s, l))
    return;
  const { type: b, value: f } = e.action, h = e.target;
  switch (b) {
    case "show":
      t(h, { show: !0 });
      break;
    case "hide":
      t(h, { show: !1 });
      break;
    case "enable":
      t(h, { disabled: !1 });
      break;
    case "disable":
      t(h, { disabled: !0 });
      break;
    case "setValue":
      a({ ...r, [h]: f });
      break;
    case "setOptions":
      t(h, { options: f });
      break;
    default:
      console.warn(`Unknown action type: ${b}`);
  }
}
function Se(e, r, a, t) {
  e.forEach((s) => {
    Ce(s, r, a, t);
  });
}
function De(e) {
  const r = [];
  return e.forEach((a) => {
    a.dependencies && a.dependencies.forEach((t) => {
      r.push({
        trigger: t.field,
        target: a.name,
        condition: {
          operator: t.operator || "eq",
          value: t.value
        },
        action: {
          type: "show"
          // 默认显示/隐藏
        }
      });
    });
  }), r;
}
function Ne(e, r) {
  return e.show === !1 ? !1 : Ae(e.dependencies, r);
}
function $e(e, r) {
  return e.disabled === !0;
}
function Oe(e, r) {
  return {
    ...e,
    show: Ne(e, r),
    disabled: $e(e)
  };
}
function Be(e, r) {
  return e.map((a) => Oe(a, r)).filter((a) => a.show !== !1);
}
function je(e) {
  return [...e].sort((r, a) => {
    const t = r.order || 0, s = a.order || 0;
    return t - s;
  });
}
const w = {
  required: (e = "此字段为必填项") => ({
    required: !0,
    message: e,
    trigger: "blur"
  }),
  email: (e = "请输入正确的邮箱地址") => ({
    type: "email",
    message: e,
    trigger: "blur"
  }),
  phone: (e = "请输入正确的手机号码") => ({
    pattern: /^1[3-9]\d{9}$/,
    message: e,
    trigger: "blur"
  }),
  url: (e = "请输入正确的URL地址") => ({
    type: "url",
    message: e,
    trigger: "blur"
  }),
  number: (e = "请输入数字") => ({
    type: "number",
    message: e,
    trigger: "blur"
  }),
  integer: (e = "请输入整数") => ({
    pattern: /^-?\d+$/,
    message: e,
    trigger: "blur"
  }),
  positive: (e = "请输入正数") => ({
    validator: (r, a, t) => {
      if (a === "" || a === null || a === void 0) {
        t();
        return;
      }
      Number(a) <= 0 ? t(new Error(e)) : t();
    },
    trigger: "blur"
  }),
  min: (e, r) => ({
    min: e,
    message: r || `最小值为 ${e}`,
    trigger: "blur"
  }),
  max: (e, r) => ({
    max: e,
    message: r || `最大值为 ${e}`,
    trigger: "blur"
  }),
  minLength: (e, r) => ({
    min: e,
    message: r || `最小长度为 ${e}`,
    trigger: "blur"
  }),
  maxLength: (e, r) => ({
    max: e,
    message: r || `最大长度为 ${e}`,
    trigger: "blur"
  }),
  pattern: (e, r = "格式不正确") => ({
    pattern: e,
    message: r,
    trigger: "blur"
  }),
  custom: (e, r) => ({
    validator: (a, t, s) => {
      if (t === "" || t === null || t === void 0) {
        s();
        return;
      }
      const u = e(t, a.formData || {});
      u === !0 ? s() : s(
        new Error(typeof u == "string" ? u : r || "校验失败")
      );
    },
    trigger: "blur"
  })
};
function Pe(e) {
  const r = [];
  switch (e.required && r.push(w.required()), e.type) {
    case "input":
      e.props?.maxLength && r.push(w.maxLength(e.props.maxLength)), e.props?.minLength && r.push(w.minLength(e.props.minLength));
      break;
    case "number":
      r.push(w.number()), e.props?.min !== void 0 && r.push(w.min(e.props.min)), e.props?.max !== void 0 && r.push(w.max(e.props.max));
      break;
    case "select":
    case "radio":
      e.required && r.push({
        required: !0,
        message: "请选择一项",
        trigger: "change"
      });
      break;
    case "checkbox":
      e.required && r.push({
        required: !0,
        message: "请至少选择一项",
        trigger: "change",
        validator: (a, t, s) => {
          !t || Array.isArray(t) && t.length === 0 ? s(new Error("请至少选择一项")) : s();
        }
      });
      break;
    case "date":
    case "datetime":
    case "time":
      e.required && r.push({
        required: !0,
        message: "请选择日期",
        trigger: "change"
      });
      break;
    case "upload":
      e.required && r.push({
        required: !0,
        message: "请上传文件",
        trigger: "change",
        validator: (a, t, s) => {
          !t || Array.isArray(t) && t.length === 0 ? s(new Error("请上传文件")) : s();
        }
      });
      break;
  }
  return r;
}
function D(e, r) {
  const a = Pe(e), t = e.rules || [];
  return [...a, ...t];
}
function Ie(e, r, a) {
  return new Promise((t) => {
    const s = D(e);
    if (s.length === 0) {
      t({ valid: !0 });
      return;
    }
    let u = !0, l = "";
    for (const d of s) {
      if (d.required && (r === "" || r === null || r === void 0)) {
        u = !1, l = d.message;
        break;
      }
      if (d.type === "email" && r && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)) {
        u = !1, l = d.message;
        break;
      }
      if (d.type === "url" && r)
        try {
          new URL(r);
        } catch {
          u = !1, l = d.message;
          break;
        }
      if (d.type === "number" && r && isNaN(Number(r))) {
        u = !1, l = d.message;
        break;
      }
      if (d.pattern && r && !d.pattern.test(r)) {
        u = !1, l = d.message;
        break;
      }
      if (d.min !== void 0 && r !== "" && r !== null && r !== void 0 && Number(r) < d.min) {
        u = !1, l = d.message;
        break;
      }
      if (d.max !== void 0 && r !== "" && r !== null && r !== void 0 && Number(r) > d.max) {
        u = !1, l = d.message;
        break;
      }
      if (d.validator && (d.validator(d, r, (b) => {
        b && (u = !1, l = b.message);
      }), !u))
        break;
    }
    t({ valid: u, message: u ? void 0 : l });
  });
}
function ze(e, r) {
  return new Promise(async (a) => {
    const t = {};
    let s = !0;
    for (const u of e) {
      if (u.show === !1) continue;
      const l = await Ie(u, r[u.name]);
      l.valid || (s = !1, t[u.name] = l.message || "校验失败");
    }
    a({ valid: s, errors: t });
  });
}
const Te = { class: "schema-form" }, Ge = {
  key: 0,
  class: "form-title"
}, Me = {
  key: 2,
  class: "flex-layout"
}, We = {
  key: 4,
  class: "form-actions"
}, He = /* @__PURE__ */ W({
  __name: "SchemaForm",
  props: {
    schema: {},
    modelValue: {},
    showActions: { type: Boolean, default: !0 },
    validateOnChange: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "field-change", "submit", "reset", "validate"],
  setup(e, { expose: r, emit: a }) {
    const t = e, s = a, u = B(), l = H({ ...t.modelValue }), d = B([...t.schema.fields]), b = k(() => De(d.value)), f = k(() => {
      const o = je(d.value);
      return Be(o, l);
    }), h = k(() => {
      const o = {};
      return f.value.forEach((c) => {
        c.name && (o[c.name] = D(c));
      }), o;
    }), $ = () => {
      t.schema.fields.forEach((o) => {
        l[o.name] === void 0 && o.defaultValue !== void 0 && (l[o.name] = o.defaultValue);
      });
    }, U = (o) => {
      if (o.render)
        return o.render(o, l);
      const c = z[o.type];
      return c ? c(o, l, (n) => R(o.name, n)) : z.input(
        o,
        l,
        (n) => R(o.name, n)
      );
    }, q = (o) => ({
      placeholder: o.placeholder,
      disabled: o.disabled,
      readonly: o.readonly,
      ...o.props
    }), F = (o) => D(o), R = (o, c) => {
      l[o] = c, Se(
        b.value,
        l,
        (n) => Object.assign(l, n),
        (n, p) => M(n, p)
      ), t.validateOnChange && Y(() => {
        ze(d.value, l).then((n) => {
          s("validate", n.valid, n.errors);
        });
      }), s("update:modelValue", { ...l }), s("field-change", o, c, { ...l });
    }, M = (o, c) => {
      const n = d.value.findIndex(
        (p) => p.name === o
      );
      n !== -1 && (d.value[n] = { ...d.value[n], ...c });
    }, x = async () => {
      if (u.value)
        try {
          await u.value.validate(), s("submit", { ...l });
        } catch (o) {
          console.error("Form validation failed:", o);
        }
    }, O = () => {
      u.value && u.value.resetFields(), Object.keys(l).forEach((o) => {
        delete l[o];
      }), $(), s("reset"), s("update:modelValue", { ...l });
    };
    return r({
      validate: async () => {
        if (!u.value) return { valid: !1, errors: {} };
        try {
          return await u.value.validate(), { valid: !0, errors: {} };
        } catch (o) {
          return { valid: !1, errors: o };
        }
      },
      resetFields: O,
      submit: x
    }), J(
      () => t.modelValue,
      (o) => {
        Object.assign(l, o);
      },
      { deep: !0 }
    ), $(), (o, c) => (m(), v("div", Te, [
      E(g(me), {
        ref_key: "formRef",
        ref: u,
        model: l,
        rules: h.value,
        "label-width": o.schema.form?.labelWidth || "120px",
        "label-position": o.schema.form?.labelPosition || "right",
        size: o.schema.form?.size || "default",
        disabled: o.schema.form?.disabled || !1,
        readonly: o.schema.form?.readonly || !1,
        onSubmit: K(x, ["prevent"])
      }, {
        default: y(() => [
          o.schema.title ? (m(), v("div", Ge, [
            Q("h3", null, X(o.schema.title), 1)
          ])) : j("", !0),
          o.schema.layout === "grid" ? (m(), V(g(pe), {
            key: 1,
            gutter: o.schema.grid?.gutter || 16,
            justify: o.schema.grid?.justify || "start",
            align: o.schema.grid?.align || "top"
          }, {
            default: y(() => [
              (m(!0), v(_, null, L(f.value, (n) => (m(), V(g(be), {
                key: n.name,
                span: n.span || 24,
                offset: n.offset || 0
              }, {
                default: y(() => [
                  E(g(S), {
                    label: n.label,
                    prop: n.name,
                    rules: F(n),
                    required: n.required
                  }, {
                    default: y(() => [
                      (m(), V(A(U(n)), C({ ref_for: !0 }, q(n), {
                        "model-value": l[n.name],
                        "onUpdate:modelValue": (p) => R(n.name, p)
                      }), null, 16, ["model-value", "onUpdate:modelValue"]))
                    ]),
                    _: 2
                  }, 1032, ["label", "prop", "rules", "required"])
                ]),
                _: 2
              }, 1032, ["span", "offset"]))), 128))
            ]),
            _: 1
          }, 8, ["gutter", "justify", "align"])) : o.schema.layout === "flex" ? (m(), v("div", Me, [
            (m(!0), v(_, null, L(f.value, (n) => (m(), V(g(S), {
              key: n.name,
              label: n.label,
              prop: n.name,
              rules: F(n),
              required: n.required,
              class: "flex-item"
            }, {
              default: y(() => [
                (m(), V(A(U(n)), C({ ref_for: !0 }, q(n), {
                  "model-value": l[n.name],
                  "onUpdate:modelValue": (p) => R(n.name, p)
                }), null, 16, ["model-value", "onUpdate:modelValue"]))
              ]),
              _: 2
            }, 1032, ["label", "prop", "rules", "required"]))), 128))
          ])) : (m(!0), v(_, { key: 3 }, L(f.value, (n) => (m(), V(g(S), {
            key: n.name,
            label: n.label,
            prop: n.name,
            rules: F(n),
            required: n.required
          }, {
            default: y(() => [
              (m(), V(A(U(n)), C({ ref_for: !0 }, q(n), {
                "model-value": l[n.name],
                "onUpdate:modelValue": (p) => R(n.name, p)
              }), null, 16, ["model-value", "onUpdate:modelValue"]))
            ]),
            _: 2
          }, 1032, ["label", "prop", "rules", "required"]))), 128)),
          o.showActions ? (m(), v("div", We, [
            E(g(I), { onClick: O }, {
              default: y(() => c[0] || (c[0] = [
                P("重置", -1)
              ])),
              _: 1,
              __: [0]
            }),
            E(g(I), {
              type: "primary",
              onClick: x
            }, {
              default: y(() => c[1] || (c[1] = [
                P("提交", -1)
              ])),
              _: 1,
              __: [1]
            })
          ])) : j("", !0)
        ]),
        _: 1
      }, 8, ["model", "rules", "label-width", "label-position", "size", "disabled", "readonly"])
    ]));
  }
}), Je = (e, r) => {
  const a = e.__vccOpts || e;
  for (const [t, s] of r)
    a[t] = s;
  return a;
}, Ke = /* @__PURE__ */ Je(He, [["__scopeId", "data-v-e87f4846"]]);
function Qe(e) {
  e.component("SchemaForm", Ke);
}
typeof window < "u" && window.Vue && Qe(window.Vue);
export {
  w as builtinRules,
  Ae as checkLinkageCondition,
  Ke as default,
  Se as executeLinkageRules,
  De as extractLinkageRules,
  Be as filterVisibleFields,
  Pe as generateDefaultRules,
  Qe as install,
  D as mergeRules,
  z as renderers,
  $e as shouldDisableField,
  Ne as shouldShowField,
  je as sortFields,
  Ie as validateField,
  ze as validateForm
};
