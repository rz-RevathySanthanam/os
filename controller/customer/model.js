export function parseCustomerList(details) {
  const listId = details.list_id;
  const listType = details.list_type;
  const { privacy } = details;

  const productItems = {};
  details.items?.forEach((item) => {
    productItems[item.sku] = {
      ...item,
      config: item.config ? JSON.parse(item.config) : {},
    };
  });

  return {
    listId,
    listType,
    privacy,
    productItems,
  };
}
