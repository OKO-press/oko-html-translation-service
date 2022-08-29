interface entityMap {
  type: string
  mutability: "MUTABLE" | "IMMUTABLE"
  data: Object
}

export const widgetConverter = (node: HTMLElement): entityMap => {
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
