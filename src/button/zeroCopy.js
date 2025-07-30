import { getButtons } from "./helper";

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

export default function zeroCopy(element, docs) {
  if (!element) {
    console.error('A button element/selector is expected');
    return;
  }

  if (!docs) {
    console.error('Copy parameter cannot be empty');
    return;
  }

  if (typeof docs !== 'string') {
    console.error('Doc should be in string format');
    return;
  }

  const allButtons = getButtons(element);
  if (!allButtons) {
    console.error('No elements found for zeroCopy');
    return;
  }

  const randomId = crypto.randomUUID();
  const id = randomId.replaceAll('-', '');

  allButtons.forEach((btn) => {
    btn.classList.add('zero-copy');
    btn.setAttribute('data-zero-copy', id);

    clipboardList.push({
      id,
      docs,
    });
  });

  if (!copyListenerAdded) {
    document.addEventListener('click', (e) => {
      const copyBtn = e.target.closest('[data-zero-copy]');
      if (copyBtn) {
        const btnId = copyBtn.dataset.zeroCopy;
        const copyEl = clipboardList.find((el) => btnId === el.id);
        if (copyEl) {
          copyText(copyEl.docs);
        }
      }
    });

    copyListenerAdded = true;
  }
}