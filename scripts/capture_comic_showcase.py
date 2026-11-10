import os
import time
import threading
import subprocess
from http.server import SimpleHTTPRequestHandler, HTTPServer
from PIL import Image

PORT = 8095
EDGE_PATH = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARTIFACT_DIR = r'C:\Users\ajela\.gemini\antigravity\brain\96e0c80c-c149-406b-aedb-c0b5f17e247a'
FULLPAGE_IMG = os.path.join(ROOT_DIR, 'fullpage_cv.png')
OUTPUT_GIF = os.path.join(ARTIFACT_DIR, 'app_walkthrough.gif')

class SilentHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

def run_server():
    os.chdir(ROOT_DIR)
    httpd = HTTPServer(('127.0.0.1', PORT), SilentHandler)
    t = threading.Thread(target=httpd.serve_forever, daemon=True)
    t.start()
    return httpd

def capture_and_build():
    httpd = run_server()
    print(f"HTTP server running on port {PORT}")
    time.sleep(1)

    targets = [
        ("comic_overview.png", f"http://127.0.0.1:{PORT}/index.html", "1280,850"),
        ("comic_arc3_jumps.png", f"http://127.0.0.1:{PORT}/index.html?arc=arc3", "1280,850"),
        ("comic_cv.png", f"http://127.0.0.1:{PORT}/src/routes/cv.html", "1280,850"),
        ("comic_projects.png", f"http://127.0.0.1:{PORT}/src/routes/proyects.html", "1280,850"),
        ("comic_qr.png", f"http://127.0.0.1:{PORT}/src/routes/qr.html", "1280,850"),
    ]

    for filename, url, win_size in targets:
        out_path = os.path.join(ARTIFACT_DIR, filename)
        cmd = [
            EDGE_PATH,
            '--headless=new',
            '--disable-gpu',
            '--no-sandbox',
            f'--window-size={win_size}',
            f'--screenshot={out_path}',
            url
        ]
        print(f"Capturing {filename}...")
        subprocess.run(cmd, capture_output=True)
        if os.path.exists(out_path):
            kb = os.path.getsize(out_path) / 1024
            print(f"  Saved {filename}: {kb:.1f} KB")

    # Capture 1200x5300 fullpage CV
    print("Capturing 1200x5300 fullpage CV...")
    cmd_full = [
        EDGE_PATH,
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--window-size=1200,5300',
        f'--screenshot={FULLPAGE_IMG}',
        f"http://127.0.0.1:{PORT}/src/routes/cv.html"
    ]
    subprocess.run(cmd_full, capture_output=True)
    httpd.shutdown()

    if not os.path.exists(FULLPAGE_IMG):
        print("ERROR: fullpage_cv.png was not created!")
        return

    full_kb = os.path.getsize(FULLPAGE_IMG) / 1024
    print(f"Fullpage CV captured: {full_kb:.1f} KB")

    # Now load and slice into animated GIF
    fullpage = Image.open(FULLPAGE_IMG)
    fw, fh = fullpage.size
    print(f"Fullpage image size: {fw}x{fh}")

    viewport_h = 800
    target_w = 800
    target_h = int(viewport_h * (target_w / 1200)) # 533 px

    slices_y = [
        (0, 1800),     # ARC 1: Hero Cover
        (350, 900),    # ARC 1: Callouts
        (750, 1400),   # ARC 2: El Origen
        (1350, 1300),  # ARC 3: Crónicas Profesionales
        (1950, 1100),  # ARC 3: PRTG Networks
        (2550, 1800),  # ARC 4: MEGA FRÍO Shock-Pink Viñeta
        (3150, 1400),  # ARC 5: Arsenal Bento
        (3750, 1500),  # ARC 6: Bóveda de Diplomas
        (4400, 1300)   # ARC 7: Transmisión QR
    ]

    # Save individual detailed crops for artifacts
    crop_slanted = fullpage.crop((0, 480, fw, min(fh, 1380)))
    crop_slanted.save(os.path.join(ARTIFACT_DIR, "comic_slanted_panels.png"))
    print("Saved comic_slanted_panels.png")

    crop_pink = fullpage.crop((0, 1150, fw, min(fh, 2050)))
    crop_pink.save(os.path.join(ARTIFACT_DIR, "comic_jumps_pink.png"))
    print("Saved comic_jumps_pink.png")

    gif_frames = []
    durations = []

    for idx, (y_start, duration) in enumerate(slices_y):
        if y_start < fh:
            y_end = min(y_start + viewport_h, fh)
            cropped = fullpage.crop((0, y_start, fw, y_end))
            resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
            gif_frames.append(resized.convert('RGB'))
            durations.append(duration)
            print(f"Slice {idx+1}: Y=[{y_start}..{y_end}]")

    # Add extra showcase views
    extra_views = [
        (os.path.join(ARTIFACT_DIR, "comic_overview.png"), 1600),
        (os.path.join(ARTIFACT_DIR, "comic_projects.png"), 1600),
        (os.path.join(ARTIFACT_DIR, "comic_qr.png"), 1400),
    ]

    for fpath, dur in extra_views:
        if os.path.exists(fpath):
            with Image.open(fpath) as img:
                w, h = img.size
                crop_h = min(h, int(w * (viewport_h / 1200)))
                cropped = img.crop((0, 0, w, crop_h))
                resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
                gif_frames.append(resized.convert('RGB'))
                durations.append(dur)

    print(f"Total frames: {len(gif_frames)}. Quantizing palette...")
    quantized_frames = [
        frame.quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
        for frame in gif_frames
    ]

    print(f"Writing GIF to {OUTPUT_GIF}...")
    quantized_frames[0].save(
        OUTPUT_GIF,
        save_all=True,
        append_images=quantized_frames[1:],
        duration=durations,
        loop=0,
        optimize=True
    )

    size_mb = os.path.getsize(OUTPUT_GIF) / (1024 * 1024)
    print(f"GIF generation complete! Size: {size_mb:.2f} MB")

    if os.path.exists(FULLPAGE_IMG):
        try: os.remove(FULLPAGE_IMG)
        except: pass

if __name__ == '__main__':
    capture_and_build()
