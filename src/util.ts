export const preventDefault = (f: () => unknown) => (event: Event) => {
  event.preventDefault()
  f()
}

export const stopPropagation = (f: () => unknown) => (event: Event) => {
  event.stopPropagation()
  f()
}

export const copyToClipboard = (text: string) => {
  const {activeElement} = document
  const input = document.createElement("textarea")

  input.innerHTML = text
  document.body.appendChild(input)
  input.select()

  const result = document.execCommand("copy")

  document.body.removeChild(input)
  ;(activeElement as HTMLElement).focus()

  return result
}

export const stripExifData = async (file, {maxWidth = null, maxHeight = null} = {}) => {
  if (window.DataTransferItem && file instanceof DataTransferItem) {
    file = file.getAsFile()
  }

  if (!file) {
    return file
  }

  const {default: Compressor} = await import("compressorjs")

  /* eslint no-new: 0 */

  return new Promise((resolve, _reject) => {
    new Compressor(file, {
      maxWidth: maxWidth || 2048,
      maxHeight: maxHeight || 2048,
      convertSize: 10 * 1024 * 1024,
      success: resolve,
      error: e => {
        // Non-images break compressor
        if (e.toString().includes("File or Blob")) {
          return resolve(file)
        }

        _reject(e)
      },
    })
  })
}
