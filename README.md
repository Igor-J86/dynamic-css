# Dynamic CSS
Generating CSS utility classes on the fly 

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
| Prop          | Value             |
| ------------- | ----------------- |
| w             | "width"           |
| h             | "height"          |
| maxw          | "max-width"       |
| minh          | "min-height"      |
| text          | "font-size"       |
| ma            | "margin"          |
| pa            | "padding"         |
| mt            | "margin-top"      |
| mb            | "margin-bottom"   |
| ml            | "margin-left"     |
| mr            | "margin-right"    |
| pt            | "padding-top"     |
| pb            | "padding-bottom"  |
| pl            | "padding-left"    |
| pr            | "padding-right"   |
| gap           | "gap"             |
| bg            | "background-color"|
| color         | "color"           |
| flex          | "flex"            |


## Developed with
- JavaScript
- Vite

## License
Distributed under the ISC License.

