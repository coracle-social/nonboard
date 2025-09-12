import type {Writable} from 'svelte/store'
import {writable} from 'svelte/store'
import {Screen} from './screen'

export type ApplicationState = Writable<{
  screen: Screen
}>

export const defaultState = {
  screen: Screen.Landing
}

export const createState = (): ApplicationState => writable(defaultState)
