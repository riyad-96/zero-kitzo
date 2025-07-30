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
***
#### Button:
##### Quick usage overview

| [NPM](#button-npm-usage) | [CDN](#use-button-via-cdn) |
| -------- | -------- |
| `zeroCopy()` | `kitzoBtn.zeroCopy()` |
| `zeroTooltip()` | `kitzoBtn.zeroTooltip()` |
| `zeroRipple()` | `kitzoBtn.zeroRipple()` |
##### Button NPM usage

```javascript
import { zeroCopy, zeroTooltip, zeroRipple } from 'zero-kitzo/button';
```

> Use a modern build tool. **vite** - recommended

##### zeroCopy API:

```javascript
zeroCopy(selector | element, 'text');
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
  style: {}
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
<script src="https://cdn.jsdelivr.net/npm/zero-kitzo@1.0.2/dist/button/button.umd.js"></script>

```
> Attach this script tag in the html head tag and you are good to go.

##### CDN usage
```javascript
kitzoBtn.zeroCopy();
kitzoBtn.zeroTooltip();
kitzoBtn.zeroRipple();
```

##### zeroCopy API:

```javascript
kitzoBtn.zeroCopy(selectors | element, 'texts');
```

##### zeroTooltip API:

```javascript
kitzoBtn.zeroTooltip(selectors | element | NodeList, {
  tooltip: string,
  direction: 'top' | 'right' | 'bottom' | 'left',
  arrow: 'on' | 'off',
  offset: number,
  customClass: string,
  style: {}
});
```

##### zeroRipple API:

```javascript
kitzoBtn.zeroRipple(selectors | element | NodeList, {
  opacity: number,
  duration: number,
  color: string,
  size: number | null,
});
```
