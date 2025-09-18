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
import nb from './src/index'

const app = nb({
  appUrl: window.origin,
  appName: "Nonboard test",
  appImage: "https://hbr.coracle.social/daa09e37ff8c2db52f0b905e24b647e00db770f2a590bd197d27a5808666a656.jpg",
  onSignup: payload => console.log("signed up:", payload),
  onLogin: payload => console.log("logged in:", payload),
  onError: error => console.log("recevied error:", error),
  onInfo: message => console.log("recevied info:", message),
})

app.mount(document.getElementById('#app'))

// Call app.destroy() when you're done
```

## Development

```bash
# Install dependencies
pnpm install

# Build the library
pnpm run build

# Development mode
pnpm run dev
```

## License

MIT
