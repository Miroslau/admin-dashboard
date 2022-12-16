export function sortHandlingMiddleware(sort: any) {
  const sortParsed = JSON.parse(sort);
  const sortFormatted = {
    [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
  };

  return sortFormatted;
}
