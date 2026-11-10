const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

const PORT = 8092;
const CDP_PORT = 9226;
const ROOT_DIR = path.resolve(__dirname, '..');
const FRAMES_DIR = path.resolve(ROOT_DIR, 'dist', 'gif_frames');
const ARTIFACT_DIR = 'C:\\Users\\ajela\\.gemini\\antigravity\\brain\\96e0c80c-c149-406b-aedb-c0b5f17e247a';
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.jsx': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
  let cleanUrl = req.url.split('?')[0];
  if (cleanUrl === '/') cleanUrl = '/index.html';
  const filePath = path.join(ROOT_DIR, decodeURIComponent(cleanUrl));

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, async () => {
  console.log(`Web server listening at http://127.0.0.1:${PORT}`);

  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1200,820',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1800));

  // Get WebSocket URL from CDP
  const versionData = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${CDP_PORT}/json/list`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const pageTarget = versionData[0];
  if (!pageTarget || !pageTarget.webSocketDebuggerUrl) {
    throw new Error('No target page with webSocketDebuggerUrl found');
  }

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  await new Promise(r => ws.onopen = r);
  console.log('Connected to Edge via CDP WebSocket');

  await send('Page.enable');
  await send('DOM.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1200,
    height: 820,
    deviceScaleFactor: 1,
    mobile: false
  });

  async function captureFrame(filename) {
    const res = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    const dest = path.join(FRAMES_DIR, filename);
    fs.writeFileSync(dest, buffer);
    console.log(`Saved frame: ${filename} (${buffer.length} bytes)`);
  }

  async function evaluate(expression) {
    return await send('Runtime.evaluate', { expression, awaitPromise: true });
  }

  console.log('Navigating to Manga CV Experience...');
  await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/src/routes/cv.html` });
  await new Promise(r => setTimeout(r, 2500));

  let frameIdx = 0;
  function nextName() {
    frameIdx++;
    return `frame_${String(frameIdx).padStart(2, '0')}.png`;
  }

  // 1. Frame 1: Top View (Arc 1 - Hero & Cover)
  await evaluate('window.scrollTo(0, 0);');
  await new Promise(r => setTimeout(r, 400));
  await captureFrame(nextName());

  // 2. Frame 2: Slight scroll showing Arc 1 full card
  await evaluate('window.scrollTo(0, 320);');
  await new Promise(r => setTimeout(r, 350));
  await captureFrame(nextName());

  // 3. Frame 3: Chapter 02 (El Origen & La Convergencia - Front-End & IT Infrastructure)
  await evaluate('window.scrollTo(0, 780);');
  await new Promise(r => setTimeout(r, 400));
  await captureFrame(nextName());

  // 4. Frame 4: Chapter 03 (Crónicas Profesionales - Timeline)
  await evaluate('window.scrollTo(0, 1380);');
  await new Promise(r => setTimeout(r, 400));
  await captureFrame(nextName());

  // 5. Frame 5: Chapter 03 continuation
  await evaluate('window.scrollTo(0, 1850);');
  await new Promise(r => setTimeout(r, 400));
  await captureFrame(nextName());

  // 6. Frame 6: Chapter 04 (FEATURED CASE STUDY: MEGA FRÍO SHOCK-PINK PANEL)
  await evaluate('window.scrollTo(0, 2400);');
  await new Promise(r => setTimeout(r, 450));
  await captureFrame(nextName());

  // 7. Frame 7: Chapter 05 (Arsenal Técnico & Stack Bento)
  await evaluate('window.scrollTo(0, 3050);');
  await new Promise(r => setTimeout(r, 400));
  await captureFrame(nextName());

  // 8. Frame 8: Chapter 06 (Bóveda de Diplomas SEPE / IUGT - 7 Diplomas)
  await evaluate('window.scrollTo(0, 3700);');
  await new Promise(r => setTimeout(r, 400));
  await captureFrame(nextName());

  // 9. Frame 9: Chapter 07 (Conexión, QR y Footer)
  await evaluate('window.scrollTo(0, 4350);');
  await new Promise(r => setTimeout(r, 400));
  await captureFrame(nextName());

  // 10. Frame 10: Switch to ATS Mode!
  console.log('Switching to ATS Text Mode...');
  await evaluate(`
    const atsBtn = document.querySelectorAll('.manga-pill-btn')[1];
    if (atsBtn) atsBtn.click();
    window.scrollTo(0, 0);
  `);
  await new Promise(r => setTimeout(r, 600));
  await captureFrame(nextName());

  // 11. Frame 11: Scroll ATS text
  await evaluate('window.scrollTo(0, 400);');
  await new Promise(r => setTimeout(r, 400));
  await captureFrame(nextName());

  // 12. Frame 12: Switch to Overview / Project Lab Experience
  console.log('Navigating to Overview & Projects Dashboard...');
  await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
  await new Promise(r => setTimeout(r, 2000));
  await captureFrame(nextName());

  // 13. Frame 13: Scroll Projects in Overview
  await evaluate('window.scrollTo(0, 650);');
  await new Promise(r => setTimeout(r, 400));
  await captureFrame(nextName());

  // 14. Frame 14: Project Lab full route
  console.log('Navigating to Projects Lab...');
  await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/src/routes/proyects.html` });
  await new Promise(r => setTimeout(r, 1800));
  await captureFrame(nextName());

  // 15. Frame 15: Projects grid
  await evaluate('window.scrollTo(0, 480);');
  await new Promise(r => setTimeout(r, 400));
  await captureFrame(nextName());

  console.log(`Captured ${frameIdx} frames successfully.`);

  ws.close();
  edge.kill();
  server.close(() => {
    console.log('Server and Edge closed. Triggering Python GIF compilation...');
  });
});
