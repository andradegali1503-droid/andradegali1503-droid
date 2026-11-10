const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const PORT = 8094;
const ROOT = path.resolve('.');

const server = http.createServer((req, res) => {
  let u = req.url.split('?')[0];
  if (u === '/') u = '/index.html';
  const p = path.join(ROOT, decodeURIComponent(u));
  if (fs.existsSync(p) && !fs.statSync(p).isDirectory()) {
    const ext = path.extname(p).toLowerCase();
    const mime = ext === '.html' ? 'text/html' : (ext === '.css' ? 'text/css' : (ext === '.js' ? 'application/javascript' : 'application/octet-stream'));
    res.writeHead(200, { 'Content-Type': mime });
    fs.createReadStream(p).pipe(res);
  } else {
    res.writeHead(404); res.end('Not found');
  }
});

server.listen(PORT, () => {
  const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const out = 'test_arc4.png';
  try {
    execFileSync(edge, [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--window-size=1200,800',
      '--virtual-time-budget=2000',
      `--screenshot=${out}`,
      `http://localhost:${PORT}/src/routes/cv.html#arc4`
    ]);
    console.log('Saved test_arc4.png, size:', fs.statSync(out).size);
  } catch(e) {
    console.error(e);
  }
  server.close();
  process.exit(0);
});
