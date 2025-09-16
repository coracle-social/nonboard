import {withGetter} from '@welshman/store'
import type {WritableWithGetter} from '@welshman/store'
import {writable} from 'svelte/store'
import {View} from './view'

export type ApplicationStateValues = {
  view: View
}

export type ApplicationState = WritableWithGetter<ApplicationStateValues>

export const initialState = {
  view: View.Landing
}

export const createState = (): ApplicationState => withGetter(writable(initialState))
