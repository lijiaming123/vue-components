import { defineComponent as f, useSlots as p, ref as $, watch as b, computed as h, createBlock as d, openBlock as s, unref as i, mergeProps as m, withCtx as c, renderSlot as C, toHandlers as D, createElementBlock as k, createCommentVNode as B, Fragment as T, renderList as y, reactive as S, provide as E, inject as F } from "vue";
import { ElButton as P, ElSelect as V, ElOption as w } from "element-plus";
function O(l, r = 800) {
  let e = 0;
  return function(...a) {
    const n = Date.now();
    n - e > r && (e = n, l.apply(this, a));
  };
}
const j = {
  name: "DaodaButton"
}, I = /* @__PURE__ */ f({
  ...j,
  props: {
    throttle: { type: Boolean },
    throttleTime: {},
    prefixCls: {}
  },
  emits: ["click"],
  setup(l, { emit: r }) {
    const e = l, a = r;
    p();
    const n = $();
    function o(u) {
      a("click", u);
    }
    function t() {
      console.log(e), e.throttle ? n.value = O(o, e.throttleTime ?? 800) : n.value = o;
    }
    b(() => [e.throttle, e.throttleTime], t, {
      immediate: !0
    });
    const v = h(() => [
      e.prefixCls ? `${e.prefixCls}-button` : ""
    ]);
    return (u, N) => (s(), d(i(P), m(e, {
      class: v.value,
      onClick: n.value
    }), {
      default: c(() => [
        C(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "onClick"]));
  }
}), A = {
  name: "DaodaSelect"
}, K = /* @__PURE__ */ f({
  ...A,
  props: {
    options: {}
  },
  emits: [
    "update:modelValue",
    "change",
    "blur",
    "focus",
    "visible-change",
    "remove-tag",
    "clear"
  ],
  setup(l, { emit: r }) {
    const e = l, a = p();
    return (n, o) => (s(), d(i(V), m(e, D(n.$attrs), {
      "onUpdate:modelValue": o[0] || (o[0] = (t) => n.$emit("update:modelValue", t)),
      onChange: o[1] || (o[1] = (t) => n.$emit("change", t)),
      onBlur: o[2] || (o[2] = (t) => n.$emit("blur", t)),
      onFocus: o[3] || (o[3] = (t) => n.$emit("focus", t)),
      onVisibleChange: o[4] || (o[4] = (t) => n.$emit("visible-change", t)),
      onRemoveTag: o[5] || (o[5] = (t) => n.$emit("remove-tag", t)),
      onClear: o[6] || (o[6] = (t) => n.$emit("clear"))
    }), {
      default: c(() => [
        e.options && !i(a).default ? (s(!0), k(T, { key: 0 }, y(e.options, (t) => (s(), d(i(w), m({
          key: t.value
        }, { ref_for: !0 }, t, {
          label: t.label,
          value: t.value
        }), null, 16, ["label", "value"]))), 128)) : B("", !0),
        C(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), g = Symbol("DaodaThemeConfig"), L = f({
  name: "DaodaConfigProvider",
  props: {
    /**
     * 主题配置对象
     */
    theme: {
      type: Object,
      default: () => ({})
    }
  },
  setup(l, { slots: r }) {
    const e = S(l.theme);
    return E(g, e), () => r.default?.();
  }
});
function R() {
  return F(g, {});
}
function U(l, r = 300) {
  let e = null;
  return function(...a) {
    e && clearTimeout(e), e = setTimeout(() => {
      l.apply(this, a);
    }, r);
  };
}
const Y = {
  Button,
  Select,
  DaodaConfigProvider,
  useDaodaConfig,
  throttle,
  debounce
};
export {
  I as Button,
  L as DaodaConfigProvider,
  K as Select,
  U as debounce,
  Y as default,
  O as throttle,
  R as useDaodaConfig
};
