const regularExpressions = {
    allInfo: /\[(.*?\]\(http[s]?:[A-Za-z0-9/,-_#.]*)/g,
    onlyText: /\[(.*?)\]/g,
    onlyLink: /http[s]?:[A-Za-z0-9/,-_#.]*/g,
}

export default regularExpressions;