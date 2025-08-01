function u(n, e = 800) {
  let t = 0;
  return function(...o) {
    const i = Date.now();
    i - t > e && (t = i, n.apply(this, o));
  };
}
function l(n, e = 300) {
  let t = null;
  return function(...o) {
    t && clearTimeout(t), t = setTimeout(() => {
      n.apply(this, o);
    }, e);
  };
}
export {
  l as debounce,
  u as throttle
};
