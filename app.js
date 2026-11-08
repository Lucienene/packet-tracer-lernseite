(() => {
  'use strict';
  const content = window.LEARNING_CONTENT;
  const main = document.querySelector('main');
  if (!content) { main.innerHTML = '<div class="empty-state"><h1>Die Inhalte konnten nicht geladen werden.</h1><p>Bitte lade die Seite erneut.</p></div>'; return; }
  const basics = content.basics || { intro: content.intro, addresses: content.addresses, order: content.workflow };
  const services = content.services || content.topics || [];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
  const text = value => esc(value).replace(/\n/g, '<br>');
  const array = value => Array.isArray(value) ? value : value ? [value] : [];
  const basicNotice = '<div class="notice"><strong>Das sind Übungswerte.</strong> In deiner Klassenarbeit nimmst du die IP-Adressen, Namen und Zugangsdaten aus dem Aufgabentext. Die Klickwege bleiben gleich.</div>';
  let codeCounter = 0;
  const codes = new Map();
  function codeBlock(value, label = 'Zum Eingeben') {
    const raw = typeof value === 'object' ? value.code || value.text || '' : value;
    const id = `code-${++codeCounter}`;
    codes.set(id, raw);
    return `<div class="code-block"><div class="code-head"><span>${esc(label)}</span><button class="copy-button" data-copy="${id}" type="button" aria-label="${esc(label)} kopieren">Kopieren</button></div><pre><code>${esc(raw)}</code></pre></div>`;
  }
  function fields(items) {
    if (!items?.length) return '';
    return `<div class="fields">${items.map(field => `<div class="field"><span class="field-name">${esc(field.label || field.field || field.name)}</span><span class="field-value">${text(field.value)}</span></div>`).join('')}</div>`;
  }
  function checks(items) { return `<ul class="checklist">${array(items).map(item => `<li><span>${text(typeof item === 'object' ? item.text || item.label : item)}</span></li>`).join('')}</ul>`; }
  function heading(eyebrow, title, intro) { return `<header class="page-heading"><span class="eyebrow">${esc(eyebrow)}</span><h1>${esc(title)}</h1>${intro ? `<p class="lede">${text(intro)}</p>` : ''}</header>`; }
  function addresses(expanded = false) {
    const items = basics.addresses || content.addresses || [];
    if (!items.length) return '';
    return `<section class="section addresses-section"><details class="address-panel"${expanded ? ' open' : ''}><summary>Die Adressen unserer Übung</summary><div class="table-scroll"><table><thead><tr><th>Gerät</th><th>IP-Adresse</th><th>Maske</th><th>Gateway</th><th>DNS</th></tr></thead><tbody>${items.map(item => `<tr><td>${esc(item.device || item.name)}</td><td>${esc(item.ip)}</td><td>${esc(item.mask)}</td><td>${esc(item.gateway || '—')}</td><td>${esc(item.dns || '—')}</td></tr>`).join('')}</tbody></table></div><p class="address-foot">Auf dem Handy kannst du die Tabelle seitlich verschieben.</p></details></section>`;
  }
  function overview() {
    const primaryServices = services.filter(service => service.id !== 'relay');
    const terms = basics.terms || [];
    return `${heading('Dein Einstieg', 'Du gehst Schritt für Schritt vor.', basics.intro || 'Hier findest du die Klickwege und Befehle für deine praktische Packet-Tracer-Aufgabe. Du brauchst kein Vorwissen.')}
      ${basicNotice}
      <section class="section preflight">
        <div class="section-heading"><h2>Zuerst: Serveradressen prüfen</h2></div>
        <p class="section-intro">Speichere eine Arbeitskopie mit <strong>File → Save As</strong>. Öffne dann nacheinander <strong>Firmenserver</strong> und <strong>DNS ISP</strong>: <strong>Desktop → IP Configuration → Static</strong>. Trage die Werte aus den ersten beiden Tabellenzeilen ein. Prüfe besonders das Gateway auf DNS ISP.</p>
        ${addresses(true)}
        <p class="step-note">Die Server behalten feste Adressen. Im DHCP-Bereich trägst du später die Einstellungen für das <strong>Netz der PCs</strong> ein – nicht die eigene Adresse des Firmenservers.</p>
        ${basics.note ? `<p class="step-note">${text(basics.note)}</p>` : ''}
      </section>
      <div class="welcome-links"><a class="button-link" href="#dhcp">Danach DHCP einrichten <span aria-hidden="true">→</span></a><a class="button-link secondary" href="#auftrag">Beispielauftrag ansehen</a></div>
      <section class="section"><div class="section-heading"><h2>Dein Ablauf</h2><span class="section-meta">In dieser Reihenfolge</span></div><p class="section-intro">Wenn beide Serveradressen stimmen, richtest du die Dienste nacheinander ein.</p><div class="flow-list">${primaryServices.map((service, index) => `<a class="flow-item" href="#${esc(service.id)}"><span class="flow-number">0${index + 1}</span><span class="flow-copy"><span class="flow-title">${esc(service.title)} <span aria-hidden="true">→</span></span><span class="flow-text">${text(service.subtitle || service.description || service.summary)}</span></span></a>`).join('')}<a class="flow-item" href="#fehlerhilfe"><span class="flow-number">✓</span><span class="flow-copy"><span class="flow-title">Prüfen & speichern <span aria-hidden="true">→</span></span><span class="flow-text">Ergebnisse kontrollieren und typische Fehler beheben.</span></span></a></div></section>
      ${terms.length ? `<section class="section"><div class="section-heading"><h2>Die wichtigsten Begriffe</h2></div><div class="term-grid">${terms.map(term => `<article class="term"><h3>${esc(term.term || term.title)}</h3><p>${text(term.description || term.text)}</p></article>`).join('')}</div></section>` : ''}
      ${array(basics.order).length ? `<section class="section"><div class="section-heading"><h2>Deine Reihenfolge auf einen Blick</h2></div><div class="success-panel">${checks(basics.order)}</div></section>` : ''}
      ${services.find(service => service.id === 'relay') ? `<section class="section"><p class="section-intro">Falls DHCP über einen Router laufen soll: <a href="#relay" style="text-decoration:underline;text-underline-offset:3px">DHCP-Relay nachschauen →</a></p></section>` : ''}
      ${content.sources?.length || content.footer ? `<details class="reference-note"><summary>Hinweise & technische Quellen</summary>${content.footer ? `<p>${text(content.footer)}</p>` : ''}${content.sources?.length ? `<ul>${content.sources.map(source => `<li><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title)}</a></li>`).join('')}</ul>` : ''}</details>` : ''}`;
  }
  function exampleFor(service) {
    const sentence = (typeof service.example === 'object' ? service.example.sentence : service.example)?.replace(/^„|“$/g, '');
    const assignment = service.assignment || service.example?.mapping || [];
    if (!sentence && !assignment.length) return '';
    return `<section class="example-card"><span class="label-small">So könnte es im Auftrag stehen</span>${sentence ? `<blockquote class="example-quote">„${text(sentence)}“</blockquote>` : ''}${assignment.length ? `<div class="assignment">${assignment.map(item => `<div class="assignment-row"><span class="assignment-label">${esc(item.label || item.field)}</span><div class="assignment-value">${text(item.value)}${item.meaning || item.field ? `<div class="assignment-meaning">${text(item.meaning || item.field)}</div>` : ''}</div></div>`).join('')}</div>` : ''}</section>`;
  }
  function errors(items) {
    return `<div class="trouble-list">${array(items).map(item => `<details class="trouble-item"><summary>${esc(item.problem || item.symptom || item.title)}</summary><div class="trouble-content">${item.fix ? `<p>${text(item.fix)}</p>` : ''}${item.checks ? `<ol>${array(item.checks).map(check => `<li>${text(check)}</li>`).join('')}</ol>` : ''}${item.code ? codeBlock(item.code, 'Zum Prüfen') : ''}</div></details>`).join('')}</div>`;
  }
  function servicePage(service) {
    const index = services.indexOf(service);
    const success = service.success || service.checks;
    const stepItems = array(service.steps);
    return `${heading(service.id === 'relay' ? 'Zusatz · DHCP-Relay' : `Anleitung ${String(index + 1).padStart(2,'0')}`, service.title, service.description || service.summary || service.purpose)}${basicNotice}${exampleFor(service)}<section class="section"><div class="section-heading"><h2>So richtest du es ein</h2><span class="section-meta">${stepItems.length} Schritte</span></div><div class="steps">${stepItems.map((step, stepIndex) => `<article class="step"><div class="step-header"><span class="step-index">${stepIndex + 1}</span><h3>${esc(step.title || `Schritt ${stepIndex + 1}`)}</h3></div>${step.text ? `<p class="step-text">${text(step.text)}</p>` : ''}${fields(step.fields)}${step.code ? codeBlock(step.code, step.codeLabel || (service.id === 'http' ? 'HTML für index.html' : 'Zum Eingeben')) : ''}${step.note ? `<p class="step-note">${text(step.note)}</p>` : ''}</article>`).join('')}</div></section>${success?.length ? `<section class="section success-panel"><h2>Daran erkennst du, dass es klappt</h2>${checks(success)}</section>` : ''}${service.errors?.length ? `<section class="section"><div class="section-heading"><h2>Wenn es noch nicht klappt</h2></div>${errors(service.errors)}</section>` : ''}${service.ports ? `<span class="port-label">${text(typeof service.ports === 'object' ? JSON.stringify(service.ports) : service.ports)}</span>` : ''}<nav class="page-bottom" aria-label="Nächste Anleitung">${index > 0 ? `<a class="next-link" href="#${esc(services[index - 1].id)}"><small>← Vorheriger Schritt</small>${esc(services[index - 1].title)}</a>` : `<a class="next-link" href="#start"><small>← Zurück</small>Übersicht</a>`}${index < services.length - 1 ? `<a class="next-link right" href="#${esc(services[index + 1].id)}"><small>${services[index + 1].id === 'relay' ? 'Optional →' : 'Danach →'}</small>${esc(services[index + 1].title)}</a>` : `<a class="next-link right" href="#auftrag"><small>Weiter →</small>Beispielauftrag</a>`}</nav>`;
  }
  function troubleshootingPage() {
    const issues = content.troubleshooting || [];
    return `${heading('Nachschauen & beheben', 'Wenn etwas nicht geht.', 'Eine Fehlermeldung bedeutet nicht, dass alles falsch ist. Gehe die passenden Punkte der Reihe nach durch. Ändere immer nur eine Sache und teste erneut.')}<div class="notice"><strong>Die schnellste Prüfung:</strong> Erst die PC-Adresse prüfen, dann den Zugriff per IP, danach den Zugriff per Namen. So grenzt du den Fehler ein.</div><section class="section">${errors(issues)}</section><section class="section success-panel"><h2>Am Ende immer speichern</h2><p class="step-text" style="margin-top:12px">File → Save speichert deine gesamte Packet-Tracer-Datei. Der Routerbefehl copy running-config startup-config speichert zusätzlich die Einstellungen im Router.</p></section>`;
  }
  function practicePage() {
    const practice = content.practice || {};
    return `${heading('Praktisch üben', practice.title || 'Ein Auftrag wie in der Klassenarbeit.', practice.intro || 'Hier stehen die Vorgaben zusammen. Du richtest sie mit den Anleitungen ein. Es gibt keine Theoriefragen.')}${basicNotice}${addresses()}<section class="section">${array(practice.tasks).map((task, index) => `<article class="practice-task"><span class="label-small">Aufgabe ${String(index + 1).padStart(2,'0')}</span><h3>${esc(task.title || `Aufgabe ${index + 1}`)}</h3>${task.text ? `<p>${text(task.text)}</p>` : ''}${task.fields ? fields(task.fields) : ''}${task.code ? codeBlock(task.code) : ''}${task.points ? `<ul>${array(task.points).map(point => `<li>${text(point)}</li>`).join('')}</ul>` : ''}</article>`).join('')}</section>${practice.checklist ? `<section class="section success-panel"><h2>Vor dem Abgeben prüfen</h2>${checks(practice.checklist)}</section>` : ''}<div class="welcome-links"><a class="button-link" href="#dhcp">Anleitungen öffnen <span aria-hidden="true">→</span></a></div>`;
  }
  function initNavigation() {
    const markup = services.map((service,index) => `<a href="#${esc(service.id)}" data-route="${esc(service.id)}"><span class="nav-number">${service.id === 'relay' ? '+' : String(index+1).padStart(2,'0')}</span><span class="nav-topic-name">${esc(service.title)}</span>${service.id === 'relay' ? '<span class="nav-optional">Zusatz</span>' : ''}</a>`).join('');
    document.querySelector('#topic-nav').innerHTML = markup;
    document.querySelector('#mobile-topics').innerHTML = services.map(service => `<a href="#${esc(service.id)}" data-route="${esc(service.id)}" class="${service.id === 'relay' ? 'optional-topic' : ''}">${esc(service.id === 'relay' ? 'Relay · Zusatz' : service.title)}</a>`).join('');
  }
  function render() {
    const route = location.hash.slice(1) || 'start';
    const service = services.find(item => item.id === route);
    codeCounter = 0;
    codes.clear();
    main.innerHTML = service ? servicePage(service) : route === 'fehlerhilfe' ? troubleshootingPage() : route === 'auftrag' ? practicePage() : overview();
    document.title = `${service?.title || (route === 'fehlerhilfe' ? 'Fehlerhilfe' : route === 'auftrag' ? 'Beispielauftrag' : 'Schritt für Schritt')} · Packet Tracer`;
    document.querySelectorAll('[data-route]').forEach(link => {
      const active = link.dataset.route === route || (link.dataset.route === 'lernen' && !!service) || (link.dataset.route === 'start' && !service && !['auftrag','fehlerhilfe'].includes(route));
      if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
    });
    document.querySelector('#mobile-topics').hidden = !service;
    document.querySelector('#mobile-topics [aria-current="page"]')?.scrollIntoView({ block:'nearest', inline:'nearest', behavior:'instant' });
    window.scrollTo({top:0,behavior:'instant'});
  }
  async function copyCode(button) {
    const value = codes.get(button.dataset.copy);
    if (typeof value !== 'string') return;
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(value); copied = true; }
      else {
        const area = document.createElement('textarea');
        area.value = value; area.style.position='fixed'; area.style.opacity='0'; area.setAttribute('readonly',''); document.body.appendChild(area); area.select(); copied = document.execCommand('copy'); area.remove(); button.focus();
      }
    } catch (_) { copied = false; }
    button.textContent = copied ? 'Kopiert ✓' : 'Bitte markieren';
    document.querySelector('#copy-status').textContent = copied ? 'Der Text wurde kopiert.' : 'Kopieren war nicht möglich. Bitte markiere den Text und kopiere ihn manuell.';
    setTimeout(() => { if (button.isConnected) button.textContent='Kopieren'; }, 2200);
  }
  main.addEventListener('click', event => { const button = event.target.closest('[data-copy]'); if (button) copyCode(button); });
  initNavigation();
  window.addEventListener('hashchange', render);
  render();
})();
