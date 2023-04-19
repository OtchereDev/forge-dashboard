export const QueryBuilder = (query) => {
  if (query == null || Object.keys(query)?.length <= 0) return "";
  let queryString = "?";
  Object.keys(query).forEach((queryItem) => {
    if (query[queryItem]) {
      queryString += `${queryItem}=${query[queryItem]}&`;
    }
  });

  return queryString;
};
