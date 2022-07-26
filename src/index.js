import cb from './cb'
import get from './get'
import now from './now'
import isPlainObject from './isPlainObject'

const storage = (options = {}) => {
  const { 
    key = 'default', 
    expires, 
    date 
  } = options
  const filtered = date || expires
  const expirationDate = typeof filtered === 'number'
    ? now() + filtered * 1000
    : filtered
        ? filtered.getTime()
        : null

  return store => {
    // init
    const state = get(key)

    if (isPlainObject(state)) {
      store.replaceState(state)
    }

    // execute cb when the state changed by mutation
    store.subscribe((mutation, state) => {
      cb(mutation, state, key, expirationDate)
    })
  }
}

export default storage