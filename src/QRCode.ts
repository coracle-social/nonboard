import m from 'mithril'
import QR from "qrcode"

export type QRCodeAttrs = m.Attributes & {
  data: string
}

export const QRCode: m.Component<QRCodeAttrs> = {
  oncreate(vnode) {
    const wrapper = vnode.dom as HTMLElement
    const canvas = wrapper.querySelector('.nb-qrcode__canvas')! as HTMLCanvasElement

    QR.toCanvas(canvas, vnode.attrs.data)

    const wrapperRect = wrapper.getBoundingClientRect()
    const canvasRect = canvas.getBoundingClientRect()
    const scale = wrapperRect.width / canvasRect.width
    const height = canvasRect.width * scale

    wrapper.style = `height: ${height}px`
    canvas.style = ""
  },
  view(vnode) {
    const {data, ...attrs} = vnode.attrs

    return m('button.nb-qrcode', {
      type: "button",
      ...attrs
    }, [
      m('canvas.nb-qrcode__canvas')
    ])
  }
}
