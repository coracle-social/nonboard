import type {Writable} from 'svelte/store'
import {writable} from 'svelte/store'
import type {ApplicationOptions} from './options'
import {Screen} from './screen'

export type ApplicationState = {
  screen: Writable<Screen>
}

export const createApplicationState = (options: ApplicationOptions): ApplicationState => {
  const screen = writable<Screen>(Screen.Landing)

  return {
    screen,
  }
}
