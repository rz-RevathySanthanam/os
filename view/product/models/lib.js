export function fetchAttributeOptions(attributeData, attributeCode) {
  if (attributeData
    && attributeData.data
    && attributeData.data.customAttributeMetadata
    && attributeData.data.customAttributeMetadata.items
    && attributeData.data.customAttributeMetadata.items.length) {
    const { items } = attributeData.data.customAttributeMetadata;
    const filteredAttribute = items.find((item) => item.attribute_code === attributeCode);
    const attributeInfo = [];
    const filteredAttributeOptions = filteredAttribute && filteredAttribute.attribute_options;
    if (filteredAttributeOptions && filteredAttributeOptions.length > 0) {
      filteredAttributeOptions.forEach((option) => {
        const obj = {
          key: option.value,
          label: option.label,
        };
        attributeInfo.push(obj);
      });
    }
    return attributeInfo;
  }
  return null;
}

export function fetchConfigurableOptions(confgData, confgCode) {
  if (confgData
    && confgData.length) {
    const filteredAttribute = confgData.find((item) => item.attribute_code === confgCode);
    const attributeInfo = [];
    const filteredAttributeOptions = filteredAttribute && filteredAttribute.values;
    if (filteredAttributeOptions && filteredAttributeOptions.length > 0) {
      filteredAttributeOptions.forEach((option) => {
        const obj = {
          key: option.uid,
          label: option.label,
        };
        attributeInfo.push(obj);
      });
    }
    return attributeInfo;
  }
  return null;
}

export function prepareCustomAttributesData(data, properties) {
  if (!properties || !data) {
    return [];
  }
  const parts = properties.toString().split(',');
  const result = data.filter((a) => {
    return parts.includes(a.key);
  });
  return result;
}
