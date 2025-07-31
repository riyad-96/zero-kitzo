(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.kitzo = {}));
})(this, (function (exports) { 'use strict';

  //! Helper functions
  function getButtons(element) {
    if (typeof element === 'string') {
      return document.querySelectorAll(element);
    }
    if (element instanceof Element) {
      return [element];
    }
    if (element instanceof NodeList || element instanceof HTMLCollection) {
      return element;
    }
  }

  // Add style tags
  let tooltipStyleAdded = false;
  let rippleStyleAdded = false;

  function addStyleTag(styles) {
    const style = document.createElement('style');
    style.innerHTML = styles;
    document.head.appendChild(style);
  }

  function addStyleTagToHtmlHead(type, styles) {
    if (type === 'tooltip' && !tooltipStyleAdded) {
      addStyleTag(styles);
      tooltipStyleAdded = true;
    }
    if (type === 'ripple' && !rippleStyleAdded) {
      addStyleTag(styles);
      rippleStyleAdded = true;
    }
  }

  function tooltipStyles() {
    return `:root {
  --tooltip-bg-clr: hsl(0, 0%, 10%);
  --tooltip-text-clr: hsl(0, 0%, 90%);
  }

@media (prefers-color-scheme: dark) {
  :root {
    --tooltip-bg-clr: hsl(0, 0%, 95%);
    --tooltip-text-clr: hsl(0, 0%, 10%);
  }
}

.zero-tooltip {
  --tooltip-arrow-clr: var(--tooltip-bg-clr);

  box-sizing: border-box;
  font-family: inherit;
  text-align: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;

  background-color: var(--tooltip-bg-clr);
  color: var(--tooltip-text-clr);
  padding-block: 0.325rem;
  padding-inline: 0.625rem;
  border-radius: 4px;
  box-shadow: 0 2px 6px hsla(235, 0%, 0%, 0.25);

  opacity: 0 !important;

  transition: opacity 200ms;
  transition-delay: 100ms;
  pointer-events: none;
}

.zero-tooltip.show {
  opacity: 1 !important;
}

.zero-tooltip-top::before,
.zero-tooltip-right::before,
.zero-tooltip-bottom::before,
.zero-tooltip-left::before {

  content: '';
  position: absolute;
  border: 6px solid;
}

.zero-tooltip-top::before {
  top: calc(100% - 1px);
  left: 50%;
  translate: -50% 0;
  border-color: var(--tooltip-arrow-clr) transparent transparent transparent;
}

.zero-tooltip-right::before {
  top: 50%;
  right: calc(100% - 1px);
  translate: 0 -50%;
  border-color: transparent var(--tooltip-arrow-clr) transparent transparent;
}

.zero-tooltip-bottom::before {
  bottom: calc(100% - 1px);
  left: 50%;
  translate: -50% 0;
  border-color: transparent transparent var(--tooltip-arrow-clr) transparent;
}

.zero-tooltip-left::before {
  left: calc(100% - 1px);
  top: 50%;
  translate: 0 -50%;
  border-color: transparent transparent transparent var(--tooltip-arrow-clr);
}`;
  }

  //! Tooltip
  let tooltipDiv;
  let tooltipListenerAdded = false;
  const tooltipConfigMap = new WeakMap();

  function zeroTooltip(element, config = {}) {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    if (!element) {
      console.error('A button element/selector is expected');
      return;
    }

    addStyleTagToHtmlHead('tooltip', tooltipStyles());

    config = Object.assign(
      {
        tooltip: 'Tool tip',
        direction: 'bottom',
        arrow: 'off',
        offset: 10,
        customClass: '',
        style: {},
      },
      config
    );

    const allButtons = getButtons(element);
    if (!allButtons) {
      console.error('No elements found for zeroTooltip');
      return;
    }

    const disAllowedStyles = ['top', 'left', 'right', 'bottom', 'position', 'zIndex', 'opacity', 'transform', 'translate', 'scale', 'rotate', 'perspective'];
    for (const key of disAllowedStyles) {
      if (key in config.style) {
        console.warn(`[zeroTooltip] "${key}" style is managed internally and will be ignored.`);
        delete config.style[key];
      }
    }

    allButtons.forEach((btn) => {
      btn.setAttribute('data-zero-tooltip', true);
      tooltipConfigMap.set(btn, config);
    });

    if (!tooltipDiv) {
      tooltipDiv = document.createElement('div');
      document.body.appendChild(tooltipDiv);
    }

    function getPosition(btn, dir, offset) {
      const { width, height, top, left } = btn.getBoundingClientRect();
      let posX;
      let posY;

      if (dir === 'top') {
        posX = left + width / 2 - tooltipDiv.offsetWidth / 2;
        posY = top - tooltipDiv.offsetHeight - offset;
        return { posX, posY };
      }

      if (dir === 'right') {
        posX = left + width + offset;
        posY = top + height / 2 - tooltipDiv.offsetHeight / 2;
        return { posX, posY };
      }

      if (dir === 'bottom') {
        posX = left + width / 2 - tooltipDiv.offsetWidth / 2;
        posY = top + height + offset;
        return { posX, posY };
      }

      if (dir === 'left') {
        posX = left - tooltipDiv.offsetWidth - offset;
        posY = top + height / 2 - tooltipDiv.offsetHeight / 2;
        return { posX, posY };
      }
    }

    if (!tooltipListenerAdded) {
      document.addEventListener('mouseover', (e) => {
        const btn = e.target.closest('[data-zero-tooltip]');
        if (btn) {
          const { tooltip, direction, offset, customClass, style, arrow } = tooltipConfigMap.get(btn);

          tooltipDiv.removeAttribute('style');
          Object.assign(tooltipDiv.style, {
            position: 'fixed',
            top: '0px',
            left: '0px',
            zIndex: '999999',
            ...style,
          });

          const isArrowOn = arrow === 'on';
          tooltipDiv.className = `zero-tooltip ${isArrowOn ? `zero-tooltip-${direction}` : ''} ${customClass.trim() ? customClass : ''}`;
          tooltipDiv.textContent = tooltip;

          if (isArrowOn) {
            const color = getComputedStyle(tooltipDiv).backgroundColor;
            tooltipDiv.style.setProperty('--tooltip-arrow-clr', color);
          }

          const { posX, posY } = getPosition(btn, direction, offset);
          tooltipDiv.style.transform = `translate(${posX}px, ${posY}px)`;
          tooltipDiv.classList.add('show');
        }
      });

      document.addEventListener('mouseout', (e) => {
        const btn = e.target.closest('[data-zero-tooltip]');
        if (btn) {
          tooltipDiv.classList.remove('show');
        }
      });

      tooltipListenerAdded = true;
    }
  }

  function rippleStyles() {
    return `.zero-ripple {
  position: relative;
  overflow: hidden;
}

.zero-ripples {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  background-color: var(--ripples-color);
  z-index: 5;
  border-radius: 50%;
  opacity: 1;
  pointer-events: none;
}

.zero-ripples.expand {
  animation: expand-ripple var(--ripples-duration) linear forwards;
}

@keyframes expand-ripple {
  0% {
    width: 0;
    height: 0;
    opacity: var(--ripples-opacity);
  }
  100% {
    width: var(--ripples-size);
    height: var(--ripples-size);
    opacity: 0;
  }
}`;
  }

  //! Ripple effect
  let rippleListenerAdded = false;

  function zeroRipple(element, config = {}) {
    if (!element) {
      console.error('A button element/selector is expected');
      return;
    }

    addStyleTagToHtmlHead('ripple', rippleStyles());

    config = Object.assign(
      {
        opacity: 0.5,
        duration: 1,
        color: 'white',
        size: null,
      },
      config
    );

    const { opacity, color, duration, size } = config;

    const allButtons = getButtons(element);
    if (!allButtons) {
      console.error('No elements found for zeroRipple');
      return;
    }
    allButtons.forEach((btn) => {
      btn.classList.add('zero-ripple');
      btn.setAttribute('data-zero-ripple', 'true');
    });

    if (!rippleListenerAdded) {
      document.addEventListener('mousedown', (e) => {
        const btn = e.target.closest('[data-zero-ripple]');
        if (btn) {
          const span = document.createElement('span');
          span.className = 'zero-ripples';
          btn.appendChild(span);

          const { left, top, width } = btn.getBoundingClientRect();
          span.style.left = e.clientX - left + 'px';
          span.style.top = e.clientY - top + 'px';

          btn.style.setProperty('--ripples-opacity', opacity);
          btn.style.setProperty('--ripples-duration', duration + 's');
          btn.style.setProperty('--ripples-size', `${size || width * 2}px`);
          btn.style.setProperty('--ripples-color', color);

          span.classList.add('expand');

          span.addEventListener('animationend', () => span.remove());
        }
      });

      rippleListenerAdded = true;
    }
  }

  function legecyCopy(docs) {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = docs;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch (error) {
      alert('Couldn’t copy automatically. Please copy manually.');
      console.error(error);
    }
  }

  async function copyText(docs) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(docs);
      } catch (error) {
        legecyCopy(docs);
        console.error(error);
      }
    } else {
      legecyCopy(docs);
    }
  }

  const copyConfigMap = new WeakMap();
  const allowedEvents = ['click', 'dblclick', 'contextmenu', 'mouseup', 'touchend'];
  const attachedEvents = new Set();

  function zeroCopy(element, config = {}) {
    config = Object.assign(
      {
        doc: '',
        event: 'click',
      },
      config
    );

    const { doc, event } = config;

    if (!element) {
      console.error('A button element/selector is expected');
      return;
    }

    if (!doc) {
      console.error('doc cannot be empty');
      return;
    }

    if (typeof doc !== 'string') {
      console.error('Doc should be in string format');
      return;
    }

    if (typeof event !== 'string') {
      console.error('Only strings are allowed as events');
      return;
    }

    if (!event.trim()) {
      console.error('event cannot be empty');
      return;
    }

    const allButtons = getButtons(element);
    if (!allButtons) {
      console.error('No elements found for zeroCopy');
      return;
    }

    if (!allowedEvents.includes(event)) {
      console.warn(`[zeroCopy] "${event}" is not allowed. Defaulting to "click".`);
    }

    const safeEvent = allowedEvents.includes(event) ? event : 'click';

    allButtons.forEach((btn) => {
      btn.setAttribute('data-zero-copy', 'true');

      copyConfigMap.set(btn, {
        doc,
        event: safeEvent,
      });
    });

    if (!attachedEvents.has(safeEvent)) {
      document.addEventListener(safeEvent, (e) => {
        const btn = e.target.closest('[data-zero-copy]');
        if (!btn) return;

        const { doc, event } = copyConfigMap.get(btn);
        if (event && event === safeEvent) {
          copyText(doc);
        }
      });
      attachedEvents.add(safeEvent);
    }
  }

  exports.zeroCopy = zeroCopy;
  exports.zeroRipple = zeroRipple;
  exports.zeroTooltip = zeroTooltip;

}));
