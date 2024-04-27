import { browser } from '$app/environment'
import type { CuttleformProto } from '$lib/worker/config'
import { derived, type Readable, type Writable, writable } from 'svelte/store'
import type { User } from '../routes/beta/lib/login'

export const protoConfig = writable<CuttleformProto>(undefined)
export const transformMode = writable<'translate' | 'rotate' | 'select'>('select')
export const flip = writable(false)
export const user = writable<User>({ success: false, sponsor: undefined })
export const codeError = writable<Error | null>(null)

export const hoveredKey = writable<number | null>(null)
export const clickedKey = writable<number | null>(null)

// Preferences
export const theme = storable('theme', 'purple')
export const showHand = storable('showHand', true)
export const bomMultiplier = storable('bomMultiplier', '2')
export const stiltsMsg = storable('stiltsMsg', true)
export const modelName = storable('modelName', 'cosmotyl')
export const developer = storable('developer', browser && location.origin.includes('localhost'))
export const showTiming = andcondition(developer, storable('developer.timing', false))
export const noWall = andcondition(developer, storable('developer.hideWall', false))
export const noBase = andcondition(developer, storable('developer.hideBase', false))
export const showKeyInts = andcondition(developer, storable('developer.showKeyInts', false))
export const debugViewport = andcondition(developer, storable('developer.debugViewport', false))

/** A Svelte store that writes and reads from localStorage. */
function storable<T>(name: string, data: T): Writable<T> {
  const store = writable(data)
  const storageName = 'cosmos.prefs.' + name

  if (browser && localStorage[storageName]) {
    store.set(JSON.parse(localStorage[storageName]))
  }

  return {
    subscribe: store.subscribe,
    set: n => {
      if (browser) localStorage[storageName] = JSON.stringify(n)
      store.set(n)
    },
    update: (callback) => {
      store.update(value => {
        const newValue = callback(value)
        if (browser) localStorage[storageName] = JSON.stringify(newValue)
        return newValue
      })
    },
  }
}

/**
 * A Svelte store that returns the second store only when the condition store = true.
 * Otherwise takes on the ifNot value.
 * Writes are only possible when condition store = true.
 */
function conditional<T>(conditionStore: Readable<boolean>, dataStore: Writable<T>, ifNot: T): Writable<T> {
  let _cond: boolean = false

  const store = derived([conditionStore, dataStore], ([a, b]) => a ? b : ifNot)
  conditionStore.subscribe(c => _cond = c)

  return {
    subscribe: store.subscribe,
    set: n => _cond && dataStore.set(n),
    update: (callback) => _cond && dataStore.update(callback),
  }
}

/** Special case of conditional for booleans. Ands the two values. */
function andcondition(read: Readable<boolean>, write: Writable<boolean>) {
  return conditional(read, write, false)
}
