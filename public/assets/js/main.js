import { RegexParser } from './core/parser.js';
import { generateStrings } from './core/generator.js';
import { verifyEquivalence } from './core/verification.js';
import { curatedExamples } from './data/examples.js';
import { showAlert, clearAlert, renderStrings, updateStatus, renderExampleList } from './components/ui.js';

const regex1Input = document.getElementById('regex1');
const regex2Input = document.getElementById('regex2');
const analyzeBtn = document.getElementById('analyze');
const alertBox = document.getElementById('alert');
const strings1El = document.getElementById('strings1');
const strings2El = document.getElementById('strings2');
const count1El = document.getElementById('count1');
const count2El = document.getElementById('count2');
const statusCard = document.getElementById('statusCard');
const statusText = document.getElementById('statusText');
const statusDetail = document.getElementById('statusDetail');
const counterEl = document.getElementById('counterExample');
const generateExampleBtn = document.getElementById('generateExample');
const exampleListEl = document.getElementById('exampleList');
const exampleNote = document.getElementById('exampleNote');
const paletteButtons = document.querySelectorAll('.palette-btn');
const progressTicker = document.getElementById('progressTicker');
const progressLabel = document.getElementById('progressLabel');
const progressMeta = document.getElementById('progressMeta');
const progressStack = document.getElementById('progressStack');

const STACK_LEVEL_COUNT = 9;
let stackSegments = [];

let activeInput = regex1Input;

[regex1Input, regex2Input].forEach((input) => {
  input.addEventListener('focus', () => {
    activeInput = input;
  });
});

paletteButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const token = btn.dataset.token || '';
    const target = activeInput || regex1Input;
    const start = target.selectionStart ?? target.value.length;
    const end = target.selectionEnd ?? target.value.length;
    const newValue = `${target.value.slice(0, start)}${token}${target.value.slice(end)}`;
    target.value = newValue;
    const caret = start + token.length;
    requestAnimationFrame(() => {
      target.focus();
      target.setSelectionRange(caret, caret);
    });
  });
});

function disableAnalyze(disabled) {
  analyzeBtn.disabled = disabled;
  if (disabled) {
    analyzeBtn.classList.add('opacity-60', 'cursor-not-allowed');
  } else {
    analyzeBtn.classList.remove('opacity-60', 'cursor-not-allowed');
  }
}

function buildStackSegments(count) {
  if (!progressStack) return;
  progressStack.innerHTML = '';
  stackSegments = [];
  for (let i = 0; i < count; i += 1) {
    const segment = document.createElement('div');
    segment.className = 'stack-segment';
    segment.dataset.index = i;
    progressStack.appendChild(segment);
    stackSegments.push(segment);
  }
}

function resetStackSegments() {
  stackSegments.forEach((segment) => {
    segment.classList.remove('stack-active', 'stack-success', 'stack-fail');
  });
}

function markStackProgress(length) {
  if (!stackSegments.length || typeof length !== 'number') return;
  stackSegments.forEach((segment, idx) => {
    if (segment.classList.contains('stack-fail')) return;
    segment.classList.remove('stack-active');
    if (idx < length) {
      segment.classList.add('stack-success');
    } else if (idx > length) {
      segment.classList.remove('stack-success');
    }
  });
  if (stackSegments[length]) {
    stackSegments[length].classList.add('stack-active');
  }
}

function markStackResult(equivalent) {
  if (!stackSegments.length) return;
  stackSegments.forEach((segment) => {
    segment.classList.remove('stack-active', 'stack-success', 'stack-fail');
    segment.classList.add(equivalent ? 'stack-success' : 'stack-fail');
  });
}

function setTickerIdle() {
  if (!progressTicker) return;
  progressTicker.classList.add('hidden');
  progressLabel.textContent = 'Idle';
  progressMeta.textContent = 'Waiting for input';
}

function updateTicker(candidate, index, total, length = null) {
  if (!progressTicker) return;
  const symbol = candidate === '' ? 'ε' : candidate;
  progressTicker.classList.remove('hidden');
  const lengthLabel = typeof length === 'number' ? `Length ${length} • ` : '';
  progressLabel.textContent = `Testing ${symbol}`;
  progressMeta.textContent = `${lengthLabel}${index + 1} of ${total} strings`;
  if (typeof length === 'number') {
    markStackProgress(length);
  }
}

async function safeAnalyze() {
  clearAlert(alertBox);
  const expr1 = regex1Input.value.trim();
  const expr2 = regex2Input.value.trim();
  if (!expr1 || !expr2) {
    showAlert(alertBox, 'Please provide both regular expressions before analyzing.');
    return;
  }

  disableAnalyze(true);
  setTickerIdle();
  resetStackSegments();

  let ast1;
  let ast2;
  try {
    ast1 = new RegexParser(expr1).parse();
    ast2 = new RegexParser(expr2).parse();
  } catch (error) {
    disableAnalyze(false);
    setTickerIdle();
    resetStackSegments();
    showAlert(alertBox, error.message);
    return;
  }

  try {
    const strings1 = generateStrings(ast1);
    const strings2 = generateStrings(ast2);
    renderStrings(strings1El, count1El, strings1);
    renderStrings(strings2El, count2El, strings2);
  } catch (error) {
    disableAnalyze(false);
    setTickerIdle();
    resetStackSegments();
    showAlert(alertBox, `Generation error: ${error.message}`);
    return;
  }

  try {
    const verification = await verifyEquivalence(expr1, expr2, updateTicker);
    setTickerIdle();
    markStackResult(verification.equivalent);
    updateStatus(statusCard, statusText, statusDetail, counterEl, verification);
  } catch (error) {
    setTickerIdle();
    resetStackSegments();
    showAlert(alertBox, `Verification error: ${error.message}`);
  }

  disableAnalyze(false);
}

function loadRandomExample() {
  const index = Math.floor(Math.random() * curatedExamples.length);
  const example = curatedExamples[index];
  regex1Input.value = example.regex1;
  regex2Input.value = example.regex2;
  if (exampleNote) {
    exampleNote.textContent = `Loaded Example ${index + 1}: ${example.title} (${example.equivalent ? 'Equivalent' : 'Not Equivalent'}).`;
  }
  safeAnalyze();
}

buildStackSegments(STACK_LEVEL_COUNT);
resetStackSegments();
renderExampleList(exampleListEl, curatedExamples);
setTickerIdle();
analyzeBtn.addEventListener('click', () => {
  safeAnalyze();
});
if (generateExampleBtn) {
  generateExampleBtn.addEventListener('click', loadRandomExample);
}
