function genIndent(depth: number, size: number, char = ' '): string {
  return Array(depth * size + 1).join(char);
}

export default genIndent;
