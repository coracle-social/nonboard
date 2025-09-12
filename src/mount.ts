import m from 'mithril'

export interface MountOptions {
  selector?: string | Element
  replace?: boolean
}

export function mountComponent<T extends Record<string, any>>(
  component: m.Component<T>, 
  attrs?: T, 
  options: MountOptions = {}
): void {
  const { selector = document.body, replace = false } = options
  const element = typeof selector === 'string' ? document.querySelector(selector) : selector
  
  if (!element) {
    throw new Error(`Element not found: ${selector}`)
  }
  
  const vnode = m(component, attrs || {} as T)
  
  if (replace) {
    m.render(element, vnode)
  } else {
    m.mount(element, {
      view: () => vnode
    })
  }
}

export function unmountComponent(selector: string | Element = document.body): void {
  const element = typeof selector === 'string' ? document.querySelector(selector) : selector
  if (element) {
    m.mount(element, null)
  }
}