import set from './set'

const cb = (_, state, key, expirationDate) => {
  set(key, state, expirationDate)
}

export default cb