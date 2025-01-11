export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const capitalizeHyphenatedString = (str: string) =>
  str.split('-').map(capitalize).join(' ')
