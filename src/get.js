import now from "./now"
import error from './error'

const get = (key) => {
  try {
    const value = localStorage.getItem(key)

    if (value === null) {
      return null
    }

    const [expirationDate, state] = value.split('-')

    return now() > +expirationDate
      ? null
      : JSON.parse(state)
  } catch (e) {
    error(e)
  }
}

export default get