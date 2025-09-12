# Nonboard

A Nostr onboarding widget built with MithrilJS that helps users get started with Nostr.

## Installation

```bash
npm install nonboard
# or
pnpm add nonboard
```

## Usage

### Quick Start

```javascript
import nb from 'nonboard'

// Create and render the onboarding widget
const widget = nb({
  onLogin: (payload) => {
    // Handle successful login
    if ('nip07' in payload) {
      console.log('Logged in with NIP-07:', payload.nip07.pubkey)
    } else if ('nip46' in payload) {
      console.log('Logged in with NIP-46:', payload.nip46.pubkey)
    } else if ('nip55' in payload) {
      console.log('Logged in with NIP-55:', payload.nip55.pubkey, payload.nip55.signer)
    }
  },
  onError: (error) => {
    // Handle errors during login/signup process
    console.error('Onboarding error:', error)
  }
})

// Mount to a DOM element
const targetElement = document.getElementById('target')
const cleanup = widget.render(targetElement)

// Call cleanup() when you need to unmount
```

## API Reference

### `nb(options)`

Creates a new onboarding widget instance.

**Parameters:**
- `options: PartialApplicationOptions` - Configuration options for the widget

**Returns:** An object with a `render` method.

### `widget.render(element)`

Renders the widget to the specified DOM element.

**Parameters:**
- `element: Element` - DOM element to render the widget into

**Returns:** A cleanup function that can be called to unmount the widget and clean up subscriptions.

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
