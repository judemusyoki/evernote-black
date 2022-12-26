export const convertDataToSet = (
  data: any,
): { [key: string]: { set: string } } => {
  return Object.keys(data).reduce((acc, key) => {
    // @ts-ignore
    acc[key] = { set: data[key] }
    return acc
  }, {})
}
