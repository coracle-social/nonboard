import m from 'mithril'
import QRScanner from "qr-scanner"
import {Icon} from './Icon'

export type ScannerAttrs = m.Attributes & {
  onscan: (data: string) => void
}

export const Scanner = (): m.Component<m.Attributes> => {
  let error = ""
  let scanner: QRScanner

  return {
    oncreate(vnode) {
      const {width} = vnode.dom.getBoundingClientRect()
      const video = vnode.dom.querySelector('.nb-scanner__video')! as HTMLVideoElement

      scanner = new QRScanner(video, r => vnode.attrs.onscan(r.data), {
        returnDetailedScanResult: true,
      })

      scanner.start()
        .catch(err => {
          error = err
          m.redraw()
        }).finally(() => {
          vnode.dom.classList.remove('nb-scanner--loading')
          video.style = `width: ${width}px`
        })
    },
    onremove() {
      scanner?.destroy()
    },
    view(vnode) {
      return m('div.nb-scanner.nb-scanner--loading', [
        m('p.nb-scanner__loading', [
          m(Icon, {loading: true}),
          "Loading your camera...",
        ]),
        error
          ? m('p.nb-scanner__error', error)
          : m('video.nb-scanner__video'),
      ])
    }
  }
}
