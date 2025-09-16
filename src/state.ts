import {withGetter} from '@welshman/store'
import type {WritableWithGetter} from '@welshman/store'
import {writable} from 'svelte/store'
import {View} from './view'

export type SignupValues = {
  name: string
  about: string
  picture?: File
}

export type ApplicationStateValues = {
  view: View
  signup: SignupValues
}

export type ApplicationState = WritableWithGetter<ApplicationStateValues>

export const initialState = {
  view: View.Landing,
  signup: {
    name: "",
    about: "",
  },
}

export const createState = (): ApplicationState => withGetter(writable(initialState))
