# Dynamic CSS plugin
Generating CSS utility classes from UI components on the fly in a separate CSS file.

## Getting started
```
npm install --save-dev @igor-j86/dynamic-css
```

## Vite config
```js
import { defineConfig } from "vite"
import DynamicCSSUtilities from "@igor-j86/dynamic-css-utilities"

  // The argument is optional. This shows the defaults.
export default defineConfig({
  plugins: [
    DynamicCSSUtilities({
      rootFolder: 'app',
      assetsPath: 'app/css/',
      fileName: 'dynamic.css'
    })
  ]
})
```

## Usage
```jsx
// Place the unit either after or inside the square brackets. Both work fine.
const MyComponent = () => {
  return (
    <div className="maxw[24]rem ma[2rem]">
      ...
    </div>
  )
}
```

## Current possible utilities
| Prop          | Value                       |
| ------------- | --------------------------- |
| w             | "width"                     |
| h             | "height"                    |
| maxw          | "max-width"                 |
| minw          | "min-width"                 |
| maxh          | "max-height"                |
| minh          | "min-height"                |
| text          | "font-size"                 |
| ma            | "margin"                    |
| pa            | "padding"                   |
| mt            | "margin-top"                |
| mb            | "margin-bottom"             |
| ml            | "margin-left"               |
| mr            | "margin-right"              |
| pt            | "padding-top"               |
| pb            | "padding-bottom"            |
| pl            | "padding-left"              |
| pr            | "padding-right"             |
| gap           | "gap"                       |
| bg            | "background-color"          |
| color         | "color"                     |
| fd            | "flex-direction"            |
| fb            | "flex-basis"                |
| fg            | "flex-grow"                 |
| fs            | "flex-shrink"               |
| fw            | "flex-wrap"                 |
| ac            | "align-content"             |
| ai            | "align-items"               |
| jc            | "justify-content"           |
| ji            | "justify-items"             |
| p             | "position"                  |
| t             | "top"                       |
| b             | "bottom"                    |
| l             | "left"                      |
| r             | "right"                     |
| z             | "z-index"                   |
| d             | "display"                   |
| br            | "border-radius"             |
| brtl          | "border-top-left-radius"    |
| brtr          | "border-top-right-radius"   |
| brbl          | "border-bottom-left-radius" |
| brbr          | "border-bottom-right-radius"|
| bc            | "border-color"              |
| bw            | "border-width"              |
| bs            | "border-style"              |
| ws            | "white-space"               |
| lh            | "line-height"               |

## Tech stack
- TypeScript
- Vite
- Node

## License
Distributed under the ISC License.

