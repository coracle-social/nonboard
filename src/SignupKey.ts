import m from 'mithril'
import cx from 'classnames'
import {nsecEncode} from "nostr-tools/nip19"
import {encrypt} from "nostr-tools/nip49"
import {hexToBytes} from "@welshman/lib"
import {makeSecret} from "@welshman/signer"
import {preventDefault, downloadText} from './util'
import {SignupKeyError} from './error'
import {View} from './view'
import type {Application} from './application'
import {Card} from './Card'
import {Text} from './Text'
import {Field} from './Field'
import {Title} from './Title'
import {Subtitle} from './Subtitle'
import {CardHeader} from './CardHeader'
import {Icon} from './Icon'
import {Button} from './Button'
import {Column} from './Column'
import {Small} from './Small'
import {Input} from './Input'
import {InputWrapper} from './InputWrapper'
import {Label} from './Label'
import {CardFooter} from './CardFooter'

const sharedCopy = `
Most online services keep track of users by giving them a username and password. This gives the
service total control over their users, allowing them to ban them at any time, or sell their activity.

On Nostr, you control your own identity and social data, through the magic of cryptography. The basic
idea is that you have a public key, which acts as your user ID, and a private key which allows you to
prove your identity.

It's very important to keep your private key safe because it grants permanent and complete access to your
account.
`

const cleanupCopy = (copy: string) =>
  copy
    .replace(/\n\s*\n\s*/g, "NEWLINE")
    .replace(/\s+/g, " ")
    .replace(/NEWLINE/g, "\n\n")
    .trim()

export const createSignupKey = (app: Application): m.Component => {
  let password = ""
  let usePassword = false
  let didDownload = false

  const secret = makeSecret()

  const setPassword = (newPassword: string) => {
    password = newPassword
    m.redraw()
  }

  const setUsePassword = (newUsePassword: boolean) => {
    usePassword = newUsePassword
    m.redraw()
  }

  const setDidDownload = (newDidDownload: boolean) => {
    didDownload = newDidDownload
    m.redraw()
  }

  const downloadKey = () => {
    if (usePassword) {
      if (password.length < 12) {
        return app.options.onError(
          new SignupKeyError("Your password must be at least 12 characters long.")
        )
      }

      const ncryptsec = encrypt(hexToBytes(secret), password)
      const instructions = `
      This file contains a backup of your Nostr secret key, downloaded from ${app.options.appName} and encrypted using
      a password you chose when you signed up.

      ${sharedCopy}

      Your encrypted private key is:

      ${ncryptsec}

      To use it to log in to other Nostr apps, find a Nostr Signer app (https://nostrapps.com/#signers is a good
      place to look), and import your key.
      `

      downloadText("Nostr Secret Key.txt", cleanupCopy(instructions))
    } else {
      const nsec = nsecEncode(hexToBytes(secret))
      const instructions = `
      This file contains a backup of your Nostr secret key, downloaded from ${app.options.appName}.

      ${sharedCopy}

      Your private key is:

      ${nsec}

      To use it to log in to other Nostr apps, find a Nostr Signer app (https://nostrapps.com/#signers is a good
      place to look), and import your key.
      `

      downloadText("Nostr Secret Key.txt", cleanupCopy(instructions))
    }

    setDidDownload(true)
  }

  const next = () => app.actions.goto(View.SignupComplete)

  const onPasswordChange = (e: Event & {target: HTMLInputElement}) => {
    setPassword(e.target.value)
    setDidDownload(false)
  }

  const toggleUsePassword = () => {
    setUsePassword(!usePassword)
    setDidDownload(false)
  }

  return {
    view(vnode) {
      return m('form', {onsubmi: preventDefault(next)}, [
        m(Card, [
          m(CardHeader, [
            m(Title, app.tr('signup.key.title')),
            m(Subtitle, app.tr('signup.key.title')),
          ]),
          m(Text, app.tr('signup.key.info.1')),
          m(Text, app.tr('signup.key.info.2')),
          usePassword && m(Field, [
            m(Label, app.tr('signup.key.password.label')),
            m(InputWrapper, {
              before: m(Icon, {url: app.tr('signup.key.password.icon')}),
            }, [
              m(Input, {
                type: "password",
                value: password,
                oninput: onPasswordChange,
              }),
            ]),
            m(Small, {class: 'nb-faded'}, app.tr('signup.key.password.help')),
          ]),
          m(Column, [
            m(Button, {
              class: cx({'nb-button-primary': !didDownload}),
              onclick: downloadKey,
            }, [
              app.tr('signup.key.download.text'),
              m(Icon, {url: app.tr('signup.key.download.icon')}),
            ]),
            m(Button, {
              class: 'nb-button-link',
              onclick: toggleUsePassword,
            }, [
              usePassword
                ? app.tr('signup.key.togglePassword.on')
                : app.tr('signup.key.togglePassword.off'),
            ]),
          ]),
          m(CardFooter, [
            m(Button, {
              class: "nb-button-link",
              onclick: app.actions.back,
            }, [
              m(Icon, {url: app.tr('signup.key.back.icon')}),
              app.tr('signup.key.back.text'),
            ]),
            m(Button, {
              type: "submit",
              class: "nb-button-primary",
              disabled: !didDownload,
            }, [
              app.tr('signup.key.next.text'),
              m(Icon, {url: app.tr('signup.key.next.icon')}),
            ]),
          ]),
        ]),
      ])
    }
  }
}

