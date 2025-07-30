import { addStyleTagToHtmlHead, getButtons } from './helper';

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

export default function zeroRipple(element, config = {}) {
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
