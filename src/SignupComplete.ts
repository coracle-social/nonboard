import m from 'mithril'
import {sha256, tryCatch} from "@welshman/lib"
import {Nip01Signer, stamp} from "@welshman/signer"
import {makeProfile, makeEvent, uploadBlob, makeBlossomAuthEvent, createProfile, RELAYS} from "@welshman/util"
import {publish} from "@welshman/net"
import {preventDefault} from './util'
import type {Application} from './application'
import {Card} from './Card'
import {Icon} from './Icon'
import {Title} from './Title'
import {Subtitle} from './Subtitle'
import {CardHeader} from './CardHeader'
import {Button} from './Button'

export type SignupCompleteAttrs = {
  secret: string
}

export const createSignupComplete = (app: Application) => (): m.Component<SignupCompleteAttrs> => {
  let loading = false

  const {name, about, picture} = app.state.get().profile

  const setLoading = (newLoading: boolean) => {
    loading = true
    m.redraw()
  }

  const next = async (secret: string) => {
    setLoading(true)

    try {
      const profile = makeProfile({name, about})
      const signer = Nip01Signer.fromSecret(secret)
      const pubkey = await signer.getPubkey()

      if (picture) {
        const hashes = [await sha256(await picture.arrayBuffer())]

        for (const server of app.options.blossomServers) {
          const res = await uploadBlob(server, picture, {
            authEvent: await signer.sign(makeBlossomAuthEvent({action: "upload", server, hashes}))
          })

          if (res?.ok) {
            const json = await tryCatch(() => res.json())

            if (json?.url) {
              profile.picture = json.url
              break
            }
          }
        }
      }

      const templates = [
        createProfile(profile),
        makeEvent(RELAYS, {
          tags: app.options.defaultUserRelays.map(url => ["r", url]),
        }),
      ]

      const events = await Promise.all(templates.map(e => signer.sign(stamp(e))))

      await Promise.all(
        events.map(event =>
          publish({
            event,
            timeout: 3000,
            relays: [
              ...app.options.indexerRelays,
              ...app.options.defaultUserRelays,
            ],
          })
        )
      )

      await app.options.onSignup({
        pubkey,
        events,
        method: "nip01",
        nip01: {
          secret,
        },
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    view(vnode) {
      return m('form', {onsubmit: preventDefault(() => next(vnode.attrs.secret))}, [
        m(Card, [
          m(CardHeader, [
            m(Title, app.tr('signup.complete.title')),
            m(Subtitle, app.tr('signup.complete.subtitle')),
          ]),
          m(Button, {
            type: "submit",
            class: "nb-button-primary",
            disabled: loading,
          }, [
            m(Icon, {loading}),
            app.tr('signup.complete.next.text'),
          ]),
        ]),
      ])
    }
  }
}
