export const preventDefault = <T extends Event>(f: (e: T) => unknown) => (event: T) => {
  event.preventDefault()
  f(event)
}

export const stopPropagation = <T extends Event>(f: (e: T) => unknown) => (event: T) => {
  event.stopPropagation()
  f(event)
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

export const stripExifData = async (file: File) => {
  if (window.DataTransferItem && file instanceof DataTransferItem) {
    file = file.getAsFile() as File
  }

  if (!file) {
    return file
  }

  const {default: Compressor} = await import("compressorjs")

  /* eslint no-new: 0 */

  return new Promise<File>((resolve, _reject) => {
    new Compressor(file, {
      maxWidth: 480,
      maxHeight: 480,
      convertSize: 10 * 1024 * 1024,
      success: file => resolve(file as File),
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

export const downloadText = (filename: string, text: string) => {
  const blob = new Blob([text], {type: "text/plain"})
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")

  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
