import m from 'mithril'
import type {Application} from './application'
import {ButtonCard} from './ButtonCard'
import {Card} from './Card'
import {View} from './view'

export const createLanding = (app: Application): m.Component => ({
  view(vnode) {
    return m(Card, [
      m(ButtonCard, {
        class: "nb-button-primary",
        icon: app.tr('landing.login.icon'),
        title: app.tr('landing.login.title'),
        subtitle: app.tr('landing.login.subtitle'),
        onclick: () => app.actions.goto(View.Login),
      }),
      m(ButtonCard, {
        icon: app.tr('landing.signup.icon'),
        title: app.tr('landing.signup.title'),
        subtitle: app.tr('landing.signup.subtitle'),
        onclick: () => app.actions.goto(View.Signup),
      }),
    ])
  }
})
