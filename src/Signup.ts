import m from 'mithril'
import type {Application} from './application'
import {View} from './view'
import {Card} from './Card'
import {CardHeader} from './CardHeader'
import {Title} from './Title'
import {Subtitle} from './Subtitle'
import {Icon} from './Icon'
import {Button} from './Button'

export const createSignup = (app: Application): m.Component => ({
  view(vnode) {
    return m(Card, [
      m(CardHeader, [
        m(Title, app.tr('signup.title')),
        m(Subtitle, app.tr('signup.subtitle')),
      ]),
      m(Button, {
        class: 'nb-button-primary',
        onclick: () => app.actions.goto(View.SignupProfile),
      }, [
        m(Icon, {url: app.tr('signup.key.icon')}),
        app.tr('signup.key.button'),
      ]),
      m(Button, {
        class: 'nb-button-link',
        onclick: app.actions.back,
      }, [
        m(Icon, {url: app.tr('signup.back.icon')}),
        app.tr('signup.back.button'),
      ]),
    ])
  },
})
