export function getShadow(depth: number) {
  return {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Math.floor(depth / 2),
    },
    shadowOpacity: depth * 0.02416,
    shadowRadius: (depth * 2) / 3,
    elevation: depth,
  };
}
