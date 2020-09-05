const regularExpression = {
  regExAll: /\[(.*?\]\(http[s]?:[A-Za-z0-9/,-_#.]*)/g,
  regExText: /\[(.*?)\]/g,
  regExLink: /http[s]?:[A-Za-z0-9/,-_#.]*/g,
};

module.exports = regularExpression;
