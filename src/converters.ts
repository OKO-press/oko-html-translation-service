interface Data {
  [name: string]: string
}

interface entityMap {
  type: string
  mutability: "MUTABLE" | "IMMUTABLE"
  data: Data
}

type Converter = (node: HTMLElement) => entityMap;

export const widgetConverter: Converter = (node) => {
  const attrs = new Map();

  for (const attr of node.attributes) {
    attrs.set(attr.name, attr.value)
  }

  return {
    type: 'atomic',
    mutability: 'MUTABLE',
    data: Object.fromEntries(attrs.entries())
  };
}
