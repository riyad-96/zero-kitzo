import { addStyleTagToHtmlHead, getButtons } from './helper';

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

export default function zeroTooltip(element, config = {}) {
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
