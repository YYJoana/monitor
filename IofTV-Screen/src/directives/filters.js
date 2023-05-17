/*
 * @FilePath: \web-pc\src\directives\filters.js
 */
export function montionFilter(val) {
  // console.log(val);
  return val ? Number(val).toFixed(2) : "--";
}
