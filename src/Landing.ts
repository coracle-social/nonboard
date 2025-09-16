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
        icon: app.options.translations['landing.login.icon'],
        title: app.options.translations['landing.login.title'],
        subtitle: app.options.translations['landing.login.subtitle'],
        onclick: () => app.actions.goto(View.Login),
      }),
      m(ButtonCard, {
        class: "nb-button-primary",
        icon: app.options.translations['landing.login.icon'],
        title: app.options.translations['landing.signup.title'],
        subtitle: app.options.translations['landing.signup.subtitle'],
        onclick: () => app.actions.goto(View.Signup),
      }),
    ])
  }
})
