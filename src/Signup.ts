import m from 'mithril'
import type {Application} from './application'
import {Card} from './Card'

export const createSignup = (app: Application): m.Component => {

  return {
    view(vnode) {
      return m(Card, [
      ])
    }
  }
}
