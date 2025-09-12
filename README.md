# Nonboard

A library of MithrilJS components with convenient mounting functions.

## Installation

```bash
npm install nonboard
# or
pnpm add nonboard
```

## Usage

### Quick Start

```javascript
import { createCounter } from 'nonboard'

// Mount a counter to an element with ID "app"
createCounter('#app', { initialValue: 0 })
```

### Manual Component Usage

```javascript
import { Counter, mountComponent } from 'nonboard'

// Mount the Counter component manually
mountComponent(Counter, { initialValue: 5 }, {
  selector: '#my-element',
  replace: false
})
```

### Available Components

#### Counter

A simple counter component that displays a button with click count.

**Props:**
- `initialValue?: number` - Starting value for the counter (default: 0)

### API Reference

#### `createCounter(selector, attrs?, options?)`

Convenient function to mount a Counter component.

- `selector: string | Element` - CSS selector or DOM element to mount to
- `attrs?: CounterAttrs` - Component attributes
- `options?: MountOptions` - Mounting options

#### `mountComponent(component, attrs?, options?)`

Generic function to mount any component.

- `component: m.Component<T>` - MithrilJS component to mount
- `attrs?: T` - Component attributes
- `options?: MountOptions` - Mounting options
  - `selector?: string | Element` - Where to mount (default: document.body)
  - `replace?: boolean` - Whether to replace content or append (default: false)

#### `unmountComponent(selector?)`

Unmount a component from the specified element.

- `selector?: string | Element` - Element to unmount from (default: document.body)

## Development

```bash
# Install dependencies
pnpm install

# Build the library
pnpm run build:lib

# Development mode
pnpm run dev
```

## License

MIT