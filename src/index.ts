export { Counter } from './components/Counter'
export { mountComponent, unmountComponent } from './mount'
export type { CounterAttrs, CounterState } from './components/Counter'
export type { MountOptions } from './mount'

import { Counter } from './components/Counter'
import type { CounterAttrs } from './components/Counter'
import { mountComponent } from './mount'
import type { MountOptions } from './mount'

export function createCounter(selector: string | Element, attrs?: CounterAttrs, options?: MountOptions) {
  return mountComponent(Counter, attrs, { selector, ...options })
}

export const components = {
  Counter
}

export const creators = {
  createCounter
}