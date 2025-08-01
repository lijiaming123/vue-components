import { defineComponent as f, useSlots as p, ref as b, watch as $, computed as h, createBlock as d, openBlock as s, unref as u, mergeProps as m, withCtx as c, renderSlot as v, toHandlers as k, createElementBlock as B, createCommentVNode as T, Fragment as y, renderList as S, reactive as E, provide as F, inject as V } from "vue";
import { ElButton as w, ElSelect as O, ElOption as P } from "element-plus";
function C(l, r = 800) {
  let e = 0;
  return function(...a) {
    const n = Date.now();
    n - e > r && (e = n, l.apply(this, a));
  };
}
const j = {
  name: "DaodaButton"
}, A = /* @__PURE__ */ f({
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
    const n = b();
    function o(i) {
      a("click", i);
    }
    function t() {
      console.log(e), e.throttle ? n.value = C(o, e.throttleTime ?? 800) : n.value = o;
    }
    $(() => [e.throttle, e.throttleTime], t, {
      immediate: !0
    });
    const D = h(() => [
      e.prefixCls ? `${e.prefixCls}-button` : ""
    ]);
    return (i, L) => (s(), d(u(w), m(e, {
      class: D.value,
      onClick: n.value
    }), {
      default: c(() => [
        v(i.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "onClick"]));
  }
}), N = {
  name: "DaodaSelect"
}, G = /* @__PURE__ */ f({
  ...N,
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
    return (n, o) => (s(), d(u(O), m(e, k(n.$attrs), {
      "onUpdate:modelValue": o[0] || (o[0] = (t) => n.$emit("update:modelValue", t)),
      onChange: o[1] || (o[1] = (t) => n.$emit("change", t)),
      onBlur: o[2] || (o[2] = (t) => n.$emit("blur", t)),
      onFocus: o[3] || (o[3] = (t) => n.$emit("focus", t)),
      onVisibleChange: o[4] || (o[4] = (t) => n.$emit("visible-change", t)),
      onRemoveTag: o[5] || (o[5] = (t) => n.$emit("remove-tag", t)),
      onClear: o[6] || (o[6] = (t) => n.$emit("clear"))
    }), {
      default: c(() => [
        e.options && !u(a).default ? (s(!0), B(y, { key: 0 }, S(e.options, (t) => (s(), d(u(P), m({
          key: t.value
        }, { ref_for: !0 }, t, {
          label: t.label,
          value: t.value
        }), null, 16, ["label", "value"]))), 128)) : T("", !0),
        v(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), g = Symbol("DaodaThemeConfig"), H = f({
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
    const e = E(l.theme);
    return F(g, e), () => r.default?.();
  }
});
function I() {
  return V(g, {});
}
function K(l, r = 300) {
  let e = null;
  return function(...a) {
    e && clearTimeout(e), e = setTimeout(() => {
      l.apply(this, a);
    }, r);
  };
}
const Y = {
  DdButton: A,
  DdSelect: G,
  DaodaConfigProvider: H,
  useDaodaConfig: I,
  throttle: C,
  debounce: K
};
export {
  H as DaodaConfigProvider,
  A as DdButton,
  G as DdSelect,
  K as debounce,
  Y as default,
  C as throttle,
  I as useDaodaConfig
};
