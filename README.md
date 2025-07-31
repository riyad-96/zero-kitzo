# zero-kitzo

[![npm](https://img.shields.io/npm/v/zero-kitzo)](https://www.npmjs.com/package/zero-kitzo)

### A lightweight tool

Current features

- Button:
  - Copy on click
  - Tooltip on mouseover
  - Ripple effect on mousedown

#### NPM install

```bash
npm install zero-kitzo
```

---

#### Button:

##### Quick usage overview

| [NPM](#button-npm-usage) | [CDN](#use-button-via-cdn) |
| ------------------------ | -------------------------- |
| `zeroCopy()`             | `kitzo.zeroCopy()`         |
| `zeroTooltip()`          | `kitzo.zeroTooltip()`      |
| `zeroRipple()`           | `kitzo.zeroRipple()`       |

##### Button NPM usage

```javascript
import { zeroCopy, zeroTooltip, zeroRipple } from 'zero-kitzo';
```

> Use a modern build tool. **vite** - recommended

##### zeroCopy API:

```javascript
zeroCopy(selector | element, {
  doc: string,
  event: 'click' | 'dblclick' | 'contextmenu' | 'mouseup' | 'touchend',
});
```

> Instantly adds click-to-copy functionality to buttons, reliably and with fallback.

##### zeroTooltip API:

```javascript
zeroTooltip(selectors | element | NodeList, {
  tooltip: string,
  direction: 'top' | 'right' | 'bottom' | 'left',
  arrow: 'on' | 'off',
  offset: number,
  customClass: string,
  style: {},
});
```

> Attach minimal tooltips to buttons for clean, helpful hover hints.

##### zeroRipple API:

```javascript
zeroRipple(selectors | element | NodeList, {
  opacity: number,
  duration: number,
  color: string,
  size: number | null,
});
```

> Adds a lightweight, clean ripple effect to your buttons on click.

---

##### Use Button via cdn

```html
<script src="https://cdn.jsdelivr.net/npm/zero-kitzo@1.0.13/dist/zero-kitzo.umd.min.js"></script>
```

> Attach this script tag in the html head tag and you are good to go.

##### CDN usage

```javascript
kitzo.zeroCopy();
kitzo.zeroTooltip();
kitzo.zeroRipple();
```

##### zeroCopy API:

```javascript
kitzo.zeroCopy(selectors | element, {
  doc: string,
  event: 'click' | 'dblclick' | 'contextmenu' | 'mouseup' | 'touchend',
});
```

##### zeroTooltip API:

```javascript
kitzo.zeroTooltip(selectors | element | NodeList, {
  tooltip: string,
  direction: 'top' | 'right' | 'bottom' | 'left',
  arrow: 'on' | 'off',
  offset: number,
  customClass: string,
  style: {},
});
```

##### zeroRipple API:

```javascript
kitzo.zeroRipple(selectors | element | NodeList, {
  opacity: number,
  duration: number,
  color: string,
  size: number | null,
});
```
