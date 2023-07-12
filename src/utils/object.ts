export const parseParamsToQueryString = (params: any) => {
  const q = new URLSearchParams();
  Object.keys(params).forEach(key => {
    if (params[key] instanceof Array) {
      params[key].forEach((value: any) => q.append(key, value));
    } else if (params[key]) {
      q.append(key, params[key]);
    }
  });
  return q;
};
