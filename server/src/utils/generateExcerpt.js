function generateExcerpt(content, maxLength = 150) {
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength - 3) + "...";
}

module.exports = generateExcerpt;