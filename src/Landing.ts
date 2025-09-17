import m from 'mithril'
import type {Application} from './application'
import {ButtonCard} from './ButtonCard'
import {CardHeader} from './CardHeader'
import {Title} from './Title'
import {Subtitle} from './Subtitle'
import {Card} from './Card'
import {View} from './view'

export const createLanding = (app: Application) => (): m.Component => ({
  view(vnode) {
    return m(Card, [
      m(CardHeader, [
        m(Title, app.tr('landing.title')),
        m(Subtitle, [
          app.tr('landing.subtitle.prefix'),
          m('a.nb-link', {href: "https://nostr.com/"}, app.tr('landing.subtitle.link')),
          app.tr('landing.subtitle.suffix'),
        ]),
      ]),
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
        onclick: () => app.actions.goto(View.SignupProfile),
      }),
    ])
  }
})
