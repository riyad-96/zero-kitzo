import { getButtons } from './helper';

//! Copy function
const clipboardList = [];
let copyListenerAdded = false;

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

export default function zeroCopy(element, config = {}) {
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
