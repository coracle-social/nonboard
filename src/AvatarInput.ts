import m from 'mithril'
import cx from 'classnames'
import {randomId} from '@welshman/lib'
import {preventDefault, stopPropagation, stripExifData} from './util'
import IconClose from './IconClose.svg'
import IconAdd from './IconAdd.svg'
import IconGallery from './IconGallery.svg'
import {Icon} from './Icon'

export type AvatarInputAttrs = {
  onChange: (file: File) => void
}

export const AvatarInput = (): m.Component<AvatarInputAttrs> => {
  let active = false
  let file: File | undefined
  let url: string | undefined

  const id = randomId()

  const setActive = (newActive: boolean) => {
    active = newActive
    m.redraw()
  }

  const setUrl = (newUrl: string | undefined) => {
    url = newUrl
    m.redraw()
  }

  return {
    view(vnode) {
      const setFile = (newFile: File | undefined) => {
        file = newFile
        m.redraw()

        vnode.attrs.onChange(file)

        if (file) {
          const reader = new FileReader()

          reader.addEventListener("load", () => setUrl(reader.result as string), false)
          reader.readAsDataURL(file)
        }
      }

      const onDragEnter = () => setActive(true)

      const onDragOver = () => setActive(true)

      const onDragLeave = () => setActive(false)

      const onDrop = async (e: any) => {
        setActive(false)
        setFile(await stripExifData(e.dataTransfer.files[0]))
      }

      const onChange = async (e: any) => setFile(await stripExifData(e.target.files[0]))

      const onClear = () => {
        setFile(undefined)
        setUrl(undefined)
      }

      return m('div.nb-avatar-input', [
        m('input.nb-hidden', {
          id,
          type: "file",
          accept: 'image/*',
          onchange: onChange,
        }),
        m('label.nb-avatar-input__label', {
          for: id,
          'aria-label': "Drag and drop files here.",
          style: `background-image: url(${url});`,
          class: cx({
            'nb-avatar-input__label--empty': !file,
            'nb-avatar-input__label--active': active,
          }),
          ondragenter: stopPropagation(preventDefault(onDragEnter)),
          ondragover: stopPropagation(preventDefault(onDragOver)),
          ondragleave: stopPropagation(preventDefault(onDragLeave)),
          ondrop: stopPropagation(preventDefault(onDrop)),
        }, [
          m('div.nb-avatar-input__button', {
            class: file ? 'nb-avatar-input__button--danger' : 'nb-avatar-input__button--primary'
          }, [
            file
              ? m('span', {
                  role: 'button',
                  tabindex: '-1',
                  onmousedown: stopPropagation(onClear),
                  ontouchstart: stopPropagation(onClear)
                }, [
                  m(Icon, {
                    url: IconClose,
                    // style: 'transform: scale(1.5, 1.5);'
                  })
                ])
              : m(Icon, {
                  url: IconAdd,
                  // style: 'transform: scale(1.5, 1.5);'
                })
          ]),
          !file && m(Icon, {url: IconGallery})
        ])
      ])
    }
  }
}
