import m from 'mithril'
import type {Application} from './application'
import {Card} from './Card'

export const createSignupKey = (app: Application): m.Component => ({
  view(vnode) {
    return m(Card, [
    ])
  },
})
