// Guestbook client — talks to /api/guestbook (Cloudflare Pages Function)
(() => {
  const API = '/api/guestbook';
  const form = document.getElementById('gb-form');
  const nameInput = document.getElementById('gb-name');
  const messageInput = document.getElementById('gb-message');
  const submitBtn = document.getElementById('gb-submit');
  const statusEl = document.getElementById('gb-status');
  const counterEl = document.getElementById('gb-counter-value');
  const listEl = document.getElementById('gb-list');
  const countEl = document.getElementById('gb-count');
  if (!form || !listEl) return;

  // Character counter
  messageInput.addEventListener('input', () => {
    counterEl.textContent = messageInput.value.length;
  });

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      const pad = (n) => String(n).padStart(2, '0');
      return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    } catch {
      return '';
    }
  }

  function timeAgo(iso) {
    try {
      const then = new Date(iso).getTime();
      const now = Date.now();
      const secs = Math.max(1, Math.floor((now - then) / 1000));
      if (secs < 60) return `${secs}초 전`;
      const mins = Math.floor(secs / 60);
      if (mins < 60) return `${mins}분 전`;
      const hrs = Math.floor(mins / 60);
      if (hrs < 24) return `${hrs}시간 전`;
      const days = Math.floor(hrs / 24);
      if (days < 30) return `${days}일 전`;
      return formatDate(iso);
    } catch {
      return '';
    }
  }

  function renderEntries(entries, notice) {
    if (notice) {
      listEl.innerHTML = `<div class="gb-empty"><span class="gb-empty-icon">🔧</span><strong>방명록 준비 중</strong><p>관리자가 KV 네임스페이스를 연결하면 즉시 작동합니다. 아래 ⚙️ 안내를 참고하세요.</p></div>`;
      countEl.textContent = '';
      return;
    }
    if (!entries.length) {
      listEl.innerHTML = `<div class="gb-empty"><span class="gb-empty-icon">✍️</span><strong>아직 방명록이 비어 있습니다</strong><p>첫 번째 메시지를 남겨주세요.</p></div>`;
      countEl.textContent = '0개';
      return;
    }
    countEl.textContent = `${entries.length}개`;
    listEl.innerHTML = entries
      .map((e) => {
        const name = escapeHtml(e.name || '익명');
        const message = escapeHtml(e.message || '').replace(/\n/g, '<br>');
        const initial = name.trim().slice(0, 1) || '?';
        return `<article class="gb-entry">
          <div class="gb-entry-avatar">${escapeHtml(initial)}</div>
          <div class="gb-entry-body">
            <div class="gb-entry-head">
              <strong>${name}</strong>
              <time datetime="${escapeHtml(e.ts || '')}" title="${escapeHtml(formatDate(e.ts || ''))}">${escapeHtml(timeAgo(e.ts || ''))}</time>
            </div>
            <p class="gb-entry-message">${message}</p>
          </div>
        </article>`;
      })
      .join('');
  }

  async function load() {
    try {
      const res = await fetch(API, { headers: { Accept: 'application/json' } });
      const data = await res.json();
      renderEntries(data.entries || [], data.notice);
    } catch (e) {
      listEl.innerHTML = `<div class="gb-empty"><span class="gb-empty-icon">⚠️</span><strong>방명록을 불러올 수 없습니다</strong><p>잠시 후 다시 시도해주세요.</p></div>`;
      countEl.textContent = '';
    }
  }

  function setStatus(msg, kind) {
    statusEl.textContent = msg || '';
    statusEl.dataset.kind = kind || '';
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const name = (nameInput.value || '').trim();
    const message = (messageInput.value || '').trim();
    if (!name || !message) {
      setStatus('이름과 메시지를 모두 입력해주세요.', 'err');
      return;
    }
    submitBtn.disabled = true;
    setStatus('등록 중…', '');
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data && data.error === 'rate_limited') {
          setStatus('잠시 후 다시 시도해주세요. (요청 빈도 제한)', 'err');
        } else if (data && data.error === 'kv_not_bound') {
          setStatus('관리자 설정이 아직 완료되지 않았습니다.', 'err');
        } else if (data && data.error === 'missing_fields') {
          setStatus('이름과 메시지를 모두 입력해주세요.', 'err');
        } else {
          setStatus('등록에 실패했습니다. 다시 시도해주세요.', 'err');
        }
        return;
      }
      messageInput.value = '';
      counterEl.textContent = '0';
      setStatus('메시지를 남겼습니다. 감사합니다!', 'ok');
      await load();
      setTimeout(() => setStatus('', ''), 3000);
    } catch (e) {
      setStatus('네트워크 오류가 발생했습니다.', 'err');
    } finally {
      submitBtn.disabled = false;
    }
  });

  // Initial load
  load();
})();
