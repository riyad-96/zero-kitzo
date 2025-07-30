# zero-kit

[![npm](https://img.shields.io/npm/v/zero-kit)](https://www.npmjs.com/package/zero-kit)

### A lightweight tool

Current features
- Button:
  - Copy on click
  - Tooltip on mouseover
  - Ripple effect on mousedown


#### NPM install

```bash
npm install zero-kit
```
***
#### Button:
##### Quick usage overview

| [NPM](#button-npm-usage) | [CDN](#use-button-via-cdn) |
| -------- | -------- |
| `zeroCopy()` | `kit.zeroCopy()` |
| `zeroTooltip()` | `kit.zeroTooltip()` |
| `zeroRipple()` | `kit.zeroRipple()` |
##### Button NPM usage

```javascript
import { zeroCopy, zeroTooltip, zeroRipple } from 'zero-kit/button';
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
-
```
> Attach this script tag in the html head tag and you are good to go.

##### CDN usage
```javascript
kit.zeroCopy();
kit.zeroTooltip();
kit.zeroRipple();
```

##### zeroCopy API:

```javascript
kit.zeroCopy(selectors | element, 'texts');
```

##### zeroTooltip API:

```javascript
kit.zeroTooltip(selectors | element | NodeList, {
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
kit.zeroRipple(selectors | element | NodeList, {
  opacity: number,
  duration: number,
  color: string,
  size: number | null,
});
```
