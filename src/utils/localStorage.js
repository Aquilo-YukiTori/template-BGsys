export const setItem = (name, value) => {
  if (!name) return
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const getItem = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

export const removeItem = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}
