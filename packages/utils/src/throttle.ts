/**
 * 节流函数
 * @param fn 需要节流的回调
 * @param wait 间隔时间（ms）
 * @returns 包装后的函数
 */
export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  wait = 800
): T {
  let last = 0;
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - last > wait) {
      last = now;
      fn.apply(this, args);
    }
  } as T;
}
