import error from "./error"

const set = (key, state, expirationDate) => {
  try {
    localStorage.setItem(key, `${ expirationDate }-${ JSON.stringify(state) }`)
  } catch (e) {
    error(e)
  }
}

export default set