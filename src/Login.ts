import m from 'mithril'
import cx from 'classnames'
import {getNip07, Nip07Signer, Nip55Signer} from "@welshman/signer"
import type {Application} from './application'
import type {Nip55SignerApp} from './options'
import {Nip07LoginError, Nip55LoginError} from './error'
import {View} from './view'
import {Card} from './Card'
import {CardHeader} from './CardHeader'
import {Title} from './Title'
import {Subtitle} from './Subtitle'
import {Icon} from './Icon'
import {Button} from './Button'
import {ButtonLink} from './ButtonLink'

export const createLogin = (app: Application) => (): m.Component => {
  let loading = ""

  const nip07 = getNip07()

  const setLoading = (value: string) => {
    loading = value
    m.redraw()
  }

  const loginWithBunker = () => {
    app.actions.goto(View.LoginBunker)
  }

  const loginWithNip07 = async () => {
    setLoading("nip07")

    try {
      const signer = new Nip07Signer()
      const pubkey = await signer.getPubkey()

      if (pubkey) {
        app.options.onLogin({
          pubkey,
          method: "nip07",
          events: await app.actions.fetchUserData(signer),
        })
      } else {
        app.options.onError(
          new Nip07LoginError(app.tr('error.generic'))
        )
      }
    } finally {
      setLoading("")
    }
  }

  const loginWithNip55 = async (signerApp: Nip55SignerApp) => {
    setLoading("nip55")

    try {
      const signer = new Nip55Signer(signerApp.packageName)
      const pubkey = await signer.getPubkey()

      if (pubkey) {
        app.options.onLogin({
          pubkey,
          method: "nip55",
          events: await app.actions.fetchUserData(signer),
          nip55: {signerApp},
        })
      } else {
        app.options.onError(
          new Nip55LoginError(app.tr('error.generic'))
        )
      }
    } finally {
      setLoading("")
    }
  }

  return {
    view(vnode) {
      return m(Card, [
        m(CardHeader, [
          m(Title, app.tr('login.title')),
          m(Subtitle, app.tr('login.subtitle')),
        ]),
        nip07 && m(Button, {
          class: 'nb-button-primary',
          disabled: Boolean(loading),
          onclick: () => loginWithNip07(),
        }, [
          m(Icon, {url: app.tr('login.extension.icon'), loading: loading === 'nip07'}),
          app.tr('login.extension.button'),
        ]),
        ...app.options.nip55SignerApps.map(signerApp =>
          m(Button, {
            class: cx({'nb-button-primary': !nip07}),
            disabled: Boolean(loading),
            onclick: () => loginWithNip55(signerApp),
          }, [
            m(Icon, {url: app.tr('login.extension.icon'), loading: loading === 'nip55'}),
            `${app.tr('login.signer.prefix')} ${signerApp.name}`,
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
           m(Icon, {url: app.tr('login.signer.icon')}),
          app.tr('login.signer.button'),
        ]),
        m(ButtonLink, {
          href: "https://nostrapps.com#signers",
          target: "_blank",
          disabled: Boolean(loading),
        }, [
          m(Icon, {url: app.tr('login.browse.icon')}),
          app.tr('login.browse.button'),
        ]),
        m(Button, {
          class: 'nb-button-link',
          onclick: () => app.actions.back(),
          disabled: Boolean(loading),
        }, [
          m(Icon, {url: app.tr('login.back.icon')}),
          app.tr('login.back.button'),
        ]),
      ])
    },
  }
}
