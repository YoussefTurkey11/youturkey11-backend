export function countWords(node) {
  let text = "";

  if (!node) return text;

  if (typeof node === "string") {
    return node;
  }

  if (node.text) {
    text += node.text + " ";
  }

  if (Array.isArray(node)) {
    node.forEach((item) => {
      text += countWords(item);
    });
  }

  if (node.content) {
    text += countWords(node.content);
  }

  return text;
}
