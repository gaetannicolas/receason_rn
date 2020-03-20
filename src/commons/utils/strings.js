export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email)

export const capitalize = (string) => {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}
