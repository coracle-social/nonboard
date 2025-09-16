import m from 'mithril'
import cx from 'classnames'
import {debounce} from "throttle-debounce"
import type {Nip46ResponseWithResult} from "@welshman/signer"
import {Nip46Broker, makeSecret} from "@welshman/signer"
import type {Application} from './application'
import {preventDefault, copyToClipboard} from './util'
import {Nip46LoginError} from './error'
import {Icon} from './Icon'
import {Row} from './Row'
import {Column} from './Column'
import {Input} from './Input'
import {Field} from './Field'
import {Label} from './Label'
import {InputWrapper} from './InputWrapper'
import {QRCode} from './QRCode'
import {Button} from './Button'
import {CardFooter} from './CardFooter'
import {CardHeader} from './CardHeader'
import {Card} from './Card'
import {Small} from './Small'
import {Title} from './Title'
import {Subtitle} from './Subtitle'
import {Scanner} from './Scanner'

export const createLoginBunker = (app: Application) => (): m.Component => {
  const clientSecret = makeSecret()
  const abortController = new AbortController()
  const broker = new Nip46Broker({clientSecret: clientSecret, relays: app.options.signerRelays})

  let connectUrl = ""
  let bunkerUrl = ""
  let loading = false
  let scanner = false
  let connect = false

  const setLoading = (newLoading: boolean) => {
    loading = newLoading
    m.redraw()
  }

  const toggleScanner = () => {
    scanner = !scanner
    m.redraw()
  }

  const toggleConnect = () => {
    connect = !connect
    m.redraw()
  }

  const setConnectUrl = (url: string) => {
    connectUrl = url
    m.redraw()
  }

  const setBunkerUrl = (url: string) => {
    bunkerUrl = url
    m.redraw()
  }

  const onBunkerUrl = async () => {
    if (loading) return

    setLoading(true)

    try {
      const {signerPubkey, connectSecret, relays} = Nip46Broker.parseBunkerUrl(bunkerUrl)

      if (!signerPubkey || relays.length === 0) {
        return app.options.onError(
          new Nip46LoginError("Sorry, it looks like that's an invalid bunker link.")
        )
      }

      setLoading(true)

      const broker = new Nip46Broker({relays, clientSecret, signerPubkey})
      const result = await broker.connect(connectSecret, app.options.signerPermissions)
      const pubkey = await broker.getPublicKey()

      // TODO: remove ack result
      if (pubkey && ["ack", connectSecret].includes(result)) {
        broker.cleanup()

        app.options.onLogin({
          nip46: {
            pubkey,
            relays,
            signerPubkey,
            clientSecret,
          },
        })
      } else {
        app.options.onError(
          new Nip46LoginError("Something went wrong, please try again!")
        )
      }
    } catch (e) {
      console.error(e)
      app.options.onError(
        new Nip46LoginError("Something went wrong, please try again!")
      )
    } finally {
      setLoading(false)
    }
  }

  const onConnect = async (response: Nip46ResponseWithResult) => {
    setLoading(true)

    try {
      const pubkey = await broker.getPublicKey()

      if (pubkey) {
        app.options.onLogin({
          nip46: {
            pubkey,
            clientSecret,
            signerPubkey: response.event.pubkey,
            relays: app.options.signerRelays,
          },
        })
      } else {
        app.options.onError(
          new Nip46LoginError("Something went wrong! Please try again.")
        )
      }
    } finally {
      setLoading(false)
    }
  }

  const onscan = debounce(1000, async (data: string) => {
    toggleScanner()
    setBunkerUrl(data)
  })

  const copyConnectUrl = () => {
    copyToClipboard(connectUrl)
    app.options.onInfo("Copied to clipboard!")
  }

  const renderConnect = () => {
    const elements = []

    if (connectUrl) {
      if (loading) {
        elements.push(
          m(Row, {
            class: 'nb-justify-center nb-align-center nb-gap-2',
          }, [
            m(Icon, {loading: true}),
            "Establishing connection..."
          ])
        )
      } else {
        elements.push(
          m(Column, [
            m(QRCode, {data: connectUrl, onclick: copyConnectUrl}),
            m(Small, {class: 'nb-text-center nb-faded'}, [
              `Scan with your signer to log in, or click to copy.`,
            ])
          ])
        )
      }
    }

    return m('div', elements)
  }

  const renderManual = () => {
    return m(Column, {class: 'nb-gap-4'}, [
      m(Field, [
        m(Label, "Bunker Link*"),
        m(InputWrapper, {
          before: m(Icon, {url: app.options.translations['bunker.cpu.icon']}),
          after: m(Icon, {
            url: app.options.translations['bunker.qr.icon'],
            onclick: toggleScanner,
          }),
        }, [
          m(Input, {
            value: bunkerUrl,
            oninput: (e: Event & {target: HTMLInputElement}) => setBunkerUrl(e.target.value),
          }),
        ]),
        m(Small, {class: 'nb-faded'}, "A login link provided by a nostr signing app."),
      ]),
      scanner
        ? m(Scanner, {onscan})
        : m(Button, {
            class: cx({'nb-button-secondary': !bunkerUrl}),
            onclick: toggleConnect,
          }, [
            `Log in with a QR code instead`,
          ])
    ])
  }

  return {
    oncreate() {
      broker.makeNostrconnectUrl({
        perms: app.options.signerPermissions,
        url: app.options.appUrl,
        name: app.options.appName,
        image: app.options.appImage,
      }).then(async connectUrl => {
        setConnectUrl(connectUrl)

        let response
        try {
          response = await broker.waitForNostrconnect(connectUrl, abortController.signal)
        } catch (errorResponse: any) {
          if (errorResponse?.error) {
            app.options.onError(
              new Nip46LoginError(`Received error from signer: ${errorResponse.error}`)
            )
          } else if (errorResponse) {
            app.options.onError(
              new Nip46LoginError(errorResponse)
            )
          }
        }

        if (response) {
          onConnect(response)
        }
      })
    },
    onremove() {
      broker.cleanup()
      abortController.abort()
    },
    view(vnode) {
      return m('form', {onsubmit: preventDefault(onBunkerUrl)}, [
        m(Card, [
          m(CardHeader, [
            m(Title, "Log in with a Signer"),
            m(Subtitle, "Using a remote signer app helps you keep your keys safe."),
          ]),
          connect
            ? renderConnect()
            : renderManual(),
          m(CardFooter, [
            m(Button, {
              class: "nb-button-link",
              disabled: Boolean(loading),
              onclick: () => {
                if (connect) {
                  toggleConnect()
                } else {
                  app.actions.back()
                }
              },
            }, [
              m(Icon, {url: app.options.translations['bunker.back.icon']}),
              `Go back`,
            ]),
            m(Button, {
              type: "submit",
              class: "nb-button-primary",
              disabled: Boolean(loading || !bunkerUrl),
            }, [
              m(Icon, {loading}),
              `Next`,
              m(Icon, {url: app.options.translations['bunker.next.icon']}),
            ]),
          ]),
        ]),
      ])
    },
  }
}
