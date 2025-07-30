//! Helper functions
export function getButtons(element) {
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

export function addStyleTagToHtmlHead(type, styles) {
  if (type === 'tooltip' && !tooltipStyleAdded) {
    addStyleTag(styles);
    tooltipStyleAdded = true;
  }
  if (type === 'ripple' && !rippleStyleAdded) {
    addStyleTag(styles);
    rippleStyleAdded = true;
  }
}