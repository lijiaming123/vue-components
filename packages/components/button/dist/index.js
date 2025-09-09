import { defineComponent as a, useSlots as u, ref as f, watch as p, computed as m, createBlock as h, openBlock as d, unref as C, mergeProps as _, withCtx as k, renderSlot as x } from "vue";
import { ElButton as B } from "element-plus";
function v(o, l = 800) {
  let t = 0;
  return function(...n) {
    const e = Date.now();
    e - t > l && (t = e, o.apply(this, n));
  };
}
const w = {
  name: "DaodaButton"
}, y = /* @__PURE__ */ a({
  ...w,
  props: {
    throttle: { type: Boolean },
    throttleTime: {},
    prefixCls: {}
  },
  emits: ["click"],
  setup(o, { emit: l }) {
    const t = o, n = l;
    u();
    const e = f();
    function s(r) {
      n("click", r);
    }
    function c() {
      console.log(t), t.throttle ? e.value = v(s, t.throttleTime ?? 800) : e.value = s;
    }
    p(() => [t.throttle, t.throttleTime], c, {
      immediate: !0
    });
    const i = m(() => [
      t.prefixCls ? `${t.prefixCls}-button` : ""
    ]);
    return (r, T) => (d(), h(C(B), _(t, {
      class: i.value,
      onClick: e.value
    }), {
      default: k(() => [
        x(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "onClick"]));
  }
});
export {
  y as default
};
