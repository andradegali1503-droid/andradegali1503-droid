const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, execFile } = require('child_process');

const PORT = 8089;
const ROOT_DIR = path.resolve(__dirname, '..');
const ARTIFACT_DIR = 'C:\\Users\\ajela\\.gemini\\antigravity\\brain\\96e0c80c-c149-406b-aedb-c0b5f17e247a';
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

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
  
  const decodedPath = decodeURIComponent(cleanUrl);
  const filePath = path.join(ROOT_DIR, decodedPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found: ' + cleanUrl);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, async () => {
  console.log(`Local test server running at http://localhost:${PORT}/`);

  const targets = [
    {
      name: 'dashboard_overview.png',
      url: `http://localhost:${PORT}/index.html`,
      width: 1440,
      height: 1080
    },
    {
      name: 'dashboard_manga_cv.png',
      url: `http://localhost:${PORT}/src/routes/cv.html`,
      width: 1440,
      height: 1080
    },
    {
      name: 'dashboard_projects.png',
      url: `http://localhost:${PORT}/src/routes/proyects.html`,
      width: 1440,
      height: 1080
    }
  ];

  for (const target of targets) {
    const outPath = path.join(ARTIFACT_DIR, target.name);
    console.log(`Capturing ${target.url} -> ${outPath}...`);
    
    await new Promise((resolve) => {
      const args = [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        `--window-size=${target.width},${target.height}`,
        '--virtual-time-budget=3000',
        '--run-all-compositor-stages-before-draw',
        `--screenshot=${outPath}`,
        target.url
      ];

      execFile(EDGE_PATH, args, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error capturing ${target.name}:`, err);
        } else {
          console.log(`Successfully captured ${target.name} (size: ${fs.existsSync(outPath) ? fs.statSync(outPath).size : 0} bytes)`);
        }
        resolve();
      });
    });
  }

  console.log('All screenshots completed.');
  server.close(() => {
    console.log('Server stopped.');
    process.exit(0);
  });
});
