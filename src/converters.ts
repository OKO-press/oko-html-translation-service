interface Data {
  [name: string]: string
}

type Mutability = "MUTABLE" | "IMMUTABLE";

interface entityMap {
  type: string
  mutability: Mutability
  data: Data
}

type Converter = (node: HTMLElement) => entityMap;

export const widgetConverter: Converter = (node) => {
  const attrs = new Map();

  for (const attr of node.attributes) {
    attrs.set(attr.name, attr.value)
  }

  const { type, data } = node.dataset;
  const mutability = node.dataset.mutability as Mutability;

  return {
    type,
    mutability,
    data: {
      data: JSON.parse(data)
    }
  };
}
