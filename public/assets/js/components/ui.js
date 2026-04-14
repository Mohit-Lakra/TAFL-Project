export function showAlert(alertBox, message) {
  alertBox.textContent = message;
  alertBox.classList.remove('hidden');
}

export function clearAlert(alertBox) {
  alertBox.textContent = '';
  alertBox.classList.add('hidden');
}

export function renderStrings(container, countEl, strings) {
  container.innerHTML = '';
  countEl.textContent = `${strings.length} string${strings.length === 1 ? '' : 's'}`;
  if (!strings.length) {
    container.innerHTML = '<p class="text-slate-500 text-sm">No strings generated within the length bound.</p>';
    return;
  }
  strings.forEach((str) => {
    const row = document.createElement('div');
    row.className = 'px-3 py-2 bg-slate-900/60 border border-slate-800 rounded-lg flex justify-between items-center';
    row.innerHTML = `<span class="font-mono text-slate-100">${str === '' ? 'ε' : str}</span><span class="text-xs text-slate-500">len = ${str.length}</span>`;
    container.appendChild(row);
  });
}

export function updateStatus(card, textEl, detailEl, counterEl, result) {
  card.classList.remove('border-emerald-500/60', 'border-rose-500/60', 'bg-emerald-500/10', 'bg-rose-500/10');
  if (result.equivalent) {
    card.classList.add('border-emerald-500/60', 'bg-emerald-500/10');
    textEl.textContent = 'EQUIVALENT';
    textEl.className = 'text-3xl font-bold text-emerald-300';
    detailEl.textContent = 'Both regexes agree on every string up to length 8.';
    counterEl.textContent = '—';
    counterEl.className = 'text-lg font-mono text-center text-emerald-300 tracking-wide';
  } else {
    card.classList.add('border-rose-500/60', 'bg-rose-500/10');
    textEl.textContent = 'NOT EQUIVALENT';
    textEl.className = 'text-3xl font-bold text-rose-300';
    detailEl.textContent = 'Mismatch discovered in the bounded suite.';
    counterEl.textContent = result.counterExample === '' ? 'ε' : result.counterExample;
    counterEl.className = 'text-lg font-mono text-center text-amber-300 tracking-wide';
  }
}

export function renderExampleList(container, examples) {
  container.innerHTML = '';
  examples.forEach((example, idx) => {
    const item = document.createElement('div');
    const statusClasses = example.equivalent ? 'text-emerald-300' : 'text-rose-300';
    item.className = 'p-3 rounded-xl border border-slate-900/70 bg-slate-900/50 space-y-1';
    item.innerHTML = `
      <div class="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
        <span>Example ${idx + 1}</span>
        <span class="${statusClasses}">${example.equivalent ? 'Equivalent' : 'Not Equivalent'}</span>
      </div>
      <p class="text-xs text-slate-400">${example.title}</p>
      <div class="text-[0.8rem] font-mono text-slate-100 space-y-1">
        <p>R1: ${example.regex1}</p>
        <p>R2: ${example.regex2}</p>
      </div>
    `;
    container.appendChild(item);
  });
}
