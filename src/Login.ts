import m from 'mithril'
import cx from 'classnames'
import {getNip07, Nip55Signer} from "@welshman/signer"
import type {Application} from './application'
import type {Nip55SignerApp} from './options'
import {Nip07LoginError, Nip55LoginError} from './error'
import {View} from './view'
import IconWidget from './IconWidget.svg'
import IconCPU from './IconCPU.svg'
import IconCompass from './IconCompass.svg'
import {Card} from './Card'
import {Small} from './Small'
import {CardHeader} from './CardHeader'
import {Title} from './Title'
import {Subtitle} from './Subtitle'
import {Icon} from './Icon'
import {Button} from './Button'
import {ButtonLink} from './ButtonLink'

export const createLogin = (app: Application): () => m.Component => {
  return () => {
    let loading = ""

    const nip07 = getNip07()

    const setLoading = (value: string) => {
      loading = value
      m.redraw()
    }

    const signup = () => app.actions.goto(View.Signup)

    const loginWithNip07 = async () => {
      setLoading("nip07")

      try {
        const pubkey = await nip07?.getPublicKey()

        if (pubkey) {
          app.options.onLogin({
            nip07: {pubkey},
          })
        } else {
          app.options.onError(
            new Nip07LoginError("Something went wrong! Please try again.")
          )
        }
      } finally {
        setLoading("")
      }
    }

    const loginWithNip55 = async (signer: Nip55SignerApp) => {
      setLoading("nip55")

      try {
        const pubkey = await new Nip55Signer(signer.packageName).getPubkey()

        if (pubkey) {
          app.options.onLogin({
            nip55: {pubkey, signer},
          })
        } else {
          app.options.onError(
            new Nip55LoginError("Something went wrong! Please try again.")
          )
        }
      } finally {
        setLoading("")
      }
    }

    const loginWithBunker = () => app.actions.goto(View.LoginBunker)

    return {
      view(vnode) {
        return m(Card, [
          m(CardHeader, [
            m(Title, "Log in with Nostr"),
            m(Subtitle, [
              "This app is built using the ",
              m('a.nb-link', {href: "https://nostr.com/"}, "Nostr protocol"),
              ", which allows you to own your social identity.",
            ]),
          ]),
          nip07 && m(Button, {
            class: 'nb-button-primary',
            disabled: Boolean(loading),
            onclick: loginWithNip07,
          }, [
            m(Icon, {url: IconWidget, showLoading: loading === 'nip07'}),
            "Log in with Extension",
          ]),
          ...app.options.nip55SignerApps.map(signer =>
            m(Button, {
              class: cx({'nb-button-primary': !nip07}),
              disabled: Boolean(loading),
              onclick: () => loginWithNip55(signer),
            }, [
              m(Icon, {url: IconWidget, showLoading: loading === 'nip55'}),
              `Log in with ${signer.name}`,
            ])
          ),
          m(Button, {
            class: cx({
              'nb-button-primary': !nip07 && app.options.nip55SignerApps.length === 0,
              'nb-button-secondary': nip07 || app.options.nip55SignerApps.length > 0,
            }),
            disabled: Boolean(loading),
            onclick: loginWithBunker,
          }, [
             m(Icon, {url: IconCPU}),
            `Log in with Remote Signer`,
          ]),
          m(ButtonLink, {
            href: "https://nostrapps.com#signers",
            target: "_blank",
            disabled: Boolean(loading),
          }, [
             m(Icon, {url: IconCompass}),
            `Browse Signer Apps`,
          ]),
          m(Small, [
            'Need an account? ',
            m(Button, {
              class: "nb-button-link",
              onclick: signup,
              disabled: Boolean(loading),
            }, [
              `Register instead`,
            ]),
          ]),
        ])
      }
    }
  }
}
