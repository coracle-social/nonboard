import m from 'mithril'
import cx from 'classnames'
import {getNip07, Nip55Signer} from "@welshman/signer"
import type {Application} from './application'
import type {Nip55SignerApp} from './options'
import {Nip07LoginError, Nip55LoginError} from './error'
import {View} from './view'
import IconWidget from './IconWidget.svg'
import IconLoading from './IconLoading.svg'
import IconCPU from './IconCPU.svg'
import IconCompass from './IconCompass.svg'
import {Card} from './Card'
import {Icon} from './Icon'
import {Button} from './Button'

export const createLogin = (app: Application): () => m.Component => {
  return () => {
    let loading = ""

    const setLoading = (value: string) => {
      loading = value
      m.redraw()
    }

    const signup = () => app.actions.goto(View.Signup)

    const loginWithNip07 = async () => {
      setLoading("nip07")

      try {
        const pubkey = await getNip07()?.getPublicKey()

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
          m('p.nb-title', "Log in with Nostr"),
          m('p.nb-subtitle', [
            "This app is built using the",
            m('a.nb-link', {onclick: () => void 0}, "Nostr protocol"),
            ", which allows you to own your social identity.",
          ]),
          getNip07() && m(Button, {
            class: 'nb-button-accent',
            disabled: Boolean(loading),
            onclick: loginWithNip07,
          }, [
            loading === 'nip07'
              ? m(Icon, {url: IconLoading, spin: true})
              : m(Icon, {url: IconWidget}),
            "Log in with extension",
          ]),
          ...app.options.nip55SignerApps.map(signer =>
            m(Button, {
              class: 'nb-button-accent',
              disabled: Boolean(loading),
              onclick: () => loginWithNip55(signer),
            }, [
              loading === 'nip55'
                ? m(Icon, {url: IconLoading, spin: true})
                : m(Icon, {url: IconWidget}),
              `Log in with ${signer.name}`,
            ])
          ),
          m(Button, {
            class: cx({'nb-button-accent': getNip07() || app.options.nip55SignerApps.length > 0}),
            disabled: Boolean(loading),
            onclick: loginWithBunker,
          }, [
             m(Icon, {url: IconCPU}),
            `Log in with remote signer`,
          ]),
          m('a.nb-button', {
            href: "https://nostrapps.com#signers",
            target: "_blank",
            disabled: Boolean(loading),
          }, [
             m(Icon, {url: IconCompass}),
            `Browse signer apps`,
          ]),
          m('div', [
            'Need an account?',
            m(Button, {
              class: "nb-button-link",
              onclick: signup,
            }, [
              `Register instead`,
            ]),
          ]),
        ])
      }
    }
  }
}
