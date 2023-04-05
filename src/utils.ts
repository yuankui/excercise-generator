export const get = <T>(fn: () => T) => {
  return fn();
}
