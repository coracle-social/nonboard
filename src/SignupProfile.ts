import m from 'mithril'
import {assoc} from '@welshman/lib'
import type {Application} from './application'
import {View} from './view'
import {preventDefault} from './util'
import {Card} from './Card'
import {CardHeader} from './CardHeader'
import {CardFooter} from './CardFooter'
import {Title} from './Title'
import {Subtitle} from './Subtitle'
import {Icon} from './Icon'
import {Button} from './Button'
import {Field} from './Field'
import {Label} from './Label'
import {InputWrapper} from './InputWrapper'
import {Input} from './Input'
import {Textarea} from './Textarea'
import {Small} from './Small'
import {Column} from './Column'
import {AvatarInput} from './AvatarInput'

export const createSignupProfile = (app: Application): m.Component => ({
  view(vnode) {
    const {name, about, picture} = app.state.get().signup

    const setName = (name: string) => app.state.update(assoc('signup', {name, about, picture}))

    const setAbout = (about: string) => app.state.update(assoc('signup', {name, about, picture}))

    const setPicture = (picture: File | undefined) => app.state.update(assoc('signup', {name, about, picture}))

    const submit = () => app.actions.goto(View.SignupKey)

    return m('form', {onsubmit: preventDefault(submit)}, [
      m(Card, [
        m(CardHeader, [
          m(Title, app.tr('signup.profile.title')),
          m(Subtitle, app.tr('signup.profile.subtitle')),
        ]),
        m(Column, {class: 'nb-items-center'}, [
          m(AvatarInput, {
            onChange: setPicture,
          }),
          m(Small, {class: 'nb-faded'}, app.tr('signup.profile.avatar.label')),
        ]),
        m(Field, [
          m(Label, app.tr('signup.profile.name.label')),
          m(InputWrapper, {
            before: m(Icon, {url: app.tr('signup.profile.name.icon')}),
          }, [
            m(Input, {
              type: "text",
              value: name,
              oninput: (e: Event & {target: HTMLInputElement}) => setName(e.target.value),
            }),
          ]),
          m(Small, {class: 'nb-faded'}, app.tr('signup.profile.name.help')),
        ]),
        m(Field, [
          m(Label, app.tr('signup.profile.about.label')),
          m(Textarea, {
            rows: 5,
            value: about,
            oninput: (e: Event & {target: HTMLTextAreaElement}) => setAbout(e.target.value),
          }),
          m(Small, {class: 'nb-faded'}, app.tr('signup.profile.about.help')),
        ]),
        m(CardFooter, [
          m(Button, {
            class: 'nb-button-link',
            onclick: app.actions.back,
          }, [
            m(Icon, {url: app.tr('signup.profile.back.icon')}),
            app.tr('signup.profile.back.button'),
          ]),
          m(Button, {
            type: "submit",
            class: 'nb-button-primary',
          }, [
            app.tr('signup.profile.submit.button'),
            m(Icon, {url: app.tr('signup.profile.submit.icon')}),
          ]),
        ]),
      ]),
    ])
  },
})
