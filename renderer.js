// renderer.js

// Simple tab toggle (Body/Headers/Raw)
const tabs = document.querySelectorAll('.resp-tab');
const output = document.getElementById('output');
let lastResponse = { body: '', headers: '', raw: '' };

tabs.forEach(t => {
  t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const k = t.dataset.tab;
    output.textContent = lastResponse[k] || '—';
  });
});

// Fake "Send" for now (just prettifies GET response using window.fetch)
document.getElementById('sendBtn').addEventListener('click', async () => {
  const url = document.getElementById('url').value.trim();
  const method = document.getElementById('method').value;

  if (!url) return;

  const statusChip = document.getElementById('statusChip');
  const timeChip   = document.getElementById('timeChip');
  const sizeChip   = document.getElementById('sizeChip');

  const start = performance.now();
  try {
    const res = await fetch(url, { method });
    const time = Math.round(performance.now() - start);

    const text = await res.text();
    const size = new Blob([text]).size;

    // Format JSON if possible
    let pretty = text;
    try { pretty = JSON.stringify(JSON.parse(text), null, 2); } catch (_) {}

    const headersStr = [...res.headers.entries()]
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');

    lastResponse = {
      body: pretty,
      headers: headersStr,
      raw: text
    };

    // Update chips
    statusChip.textContent = `Status: ${res.status}`;
    statusChip.classList.toggle('ok', res.ok);
    statusChip.classList.toggle('bad', !res.ok);

    timeChip.textContent = `Time: ${time} ms`;
    sizeChip.textContent = `Size: ${size} B`;

    // Show current tab content
    const active = document.querySelector('.resp-tab.active')?.dataset.tab || 'body';
    output.textContent = lastResponse[active];

  } catch (err) {
    lastResponse = { body: '', headers: '', raw: '' };
    output.textContent = `Request failed:\n${err}`;
    statusChip.textContent = 'Status: —';
    statusChip.classList.remove('ok', 'bad');
    timeChip.textContent = 'Time: —';
    sizeChip.textContent = 'Size: —';
  }
});
