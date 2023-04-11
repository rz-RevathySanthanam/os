export function prepareSku(sku) {
  if (!sku) { return null; }
  if (Array.isArray(sku)) {
    return sku[0];
  }
  return sku;
}
