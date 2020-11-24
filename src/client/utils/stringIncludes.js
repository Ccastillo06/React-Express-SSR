export default (original, content) =>
  original.trim().toLowerCase().includes(content.trim().toLowerCase());
