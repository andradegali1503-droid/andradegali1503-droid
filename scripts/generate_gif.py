import os
import time
import threading
import subprocess
from http.server import SimpleHTTPRequestHandler, HTTPServer
from PIL import Image

PORT = 8093
EDGE_PATH = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARTIFACT_DIR = r'C:\Users\ajela\.gemini\antigravity\brain\96e0c80c-c149-406b-aedb-c0b5f17e247a'
FRAMES_DIR = os.path.join(ROOT_DIR, 'dist', 'gif_frames')
OUTPUT_GIF = os.path.join(ARTIFACT_DIR, 'app_walkthrough.gif')

os.makedirs(FRAMES_DIR, exist_ok=True)

class SilentHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass  # Quiet logs

def run_server():
    os.chdir(ROOT_DIR)
    httpd = HTTPServer(('127.0.0.1', PORT), SilentHandler)
    t = threading.Thread(target=httpd.serve_forever, daemon=True)
    t.start()
    return httpd

def capture_scenes():
    httpd = run_server()
    print(f"Local server started on port {PORT}")

    scenes = [
        # 1. ARC 1: Hero Cover, Identity, Badges
        {"name": "01_arc1_cover", "url": f"http://127.0.0.1:{PORT}/src/routes/cv.html?y=0", "duration": 1800},
        # 2. ARC 1 Lower: Status & Action Buttons
        {"name": "02_arc1_lead", "url": f"http://127.0.0.1:{PORT}/src/routes/cv.html?y=380", "duration": 1000},
        # 3. ARC 2: El Origen & La Convergencia (Frontend & IT 6+ Years)
        {"name": "03_arc2_origen", "url": f"http://127.0.0.1:{PORT}/src/routes/cv.html?y=900", "duration": 1500},
        # 4. ARC 3: Crónicas Profesionales (Timeline & ERP Defontana)
        {"name": "04_arc3_timeline1", "url": f"http://127.0.0.1:{PORT}/src/routes/cv.html?y=1520", "duration": 1300},
        # 5. ARC 3 Part 2: Support Networks & University
        {"name": "05_arc3_timeline2", "url": f"http://127.0.0.1:{PORT}/src/routes/cv.html?y=2050", "duration": 1100},
        # 6. ARC 4: MEGA FRÍO Featured Panel (Shock-Pink Highlight)
        {"name": "06_arc4_megafrio", "url": f"http://127.0.0.1:{PORT}/src/routes/cv.html?y=2650", "duration": 1800},
        # 7. ARC 5: Arsenal Técnico (Bento Grid Stack)
        {"name": "07_arc5_skills", "url": f"http://127.0.0.1:{PORT}/src/routes/cv.html?y=3250", "duration": 1400},
        # 8. ARC 6: Bóveda de Diplomas SEPE / IUGT (7 Certificados)
        {"name": "08_arc6_diplomas", "url": f"http://127.0.0.1:{PORT}/src/routes/cv.html?y=3900", "duration": 1500},
        # 9. ARC 7: Conexión, Redes & Transmisión QR
        {"name": "09_arc7_contact", "url": f"http://127.0.0.1:{PORT}/src/routes/cv.html?y=4550", "duration": 1200},
        # 10. Vista ATS en Texto Puro (1-Click Copy)
        {"name": "10_ats_mode", "url": f"http://127.0.0.1:{PORT}/src/routes/cv.html?view=ats&y=0", "duration": 1600},
        # 11. Dashboard Interactivo 360 (Overview Principal)
        {"name": "11_dashboard_overview", "url": f"http://127.0.0.1:{PORT}/index.html?y=0", "duration": 1600},
        # 12. Laboratorio de Proyectos (Project Lab Grid)
        {"name": "12_projects_lab", "url": f"http://127.0.0.1:{PORT}/src/routes/proyects.html?y=0", "duration": 1500},
        # 13. Tarjeta QR Digital
        {"name": "13_digital_qr", "url": f"http://127.0.0.1:{PORT}/src/routes/qr.html?y=0", "duration": 1400}
    ]

    captured_frames = []
    durations = []

    for idx, sc in enumerate(scenes):
        frame_path = os.path.join(FRAMES_DIR, f"{sc['name']}.png")
        print(f"[{idx+1}/{len(scenes)}] Capturing {sc['name']}...")

        # Try with virtual-time-budget
        cmd = [
            EDGE_PATH,
            '--headless=new',
            '--disable-gpu',
            '--no-sandbox',
            '--window-size=1200,800',
            '--virtual-time-budget=2200',
            '--run-all-compositor-stages-before-draw',
            f'--screenshot={frame_path}',
            sc['url']
        ]
        subprocess.run(cmd, capture_output=True)

        # Fallback if frame is too small or blank
        if not os.path.exists(frame_path) or os.path.getsize(frame_path) < 25000:
            print(f"  Frame {sc['name']} was small, re-capturing without virtual-time-budget...")
            cmd_fallback = [
                EDGE_PATH,
                '--headless=new',
                '--disable-gpu',
                '--no-sandbox',
                '--window-size=1200,800',
                f'--screenshot={frame_path}',
                sc['url']
            ]
            subprocess.run(cmd_fallback, capture_output=True)

        if os.path.exists(frame_path):
            size_kb = os.path.getsize(frame_path) / 1024
            print(f"  OK: {sc['name']}.png ({size_kb:.1f} KB)")
            captured_frames.append(frame_path)
            durations.append(sc['duration'])
        else:
            print(f"  ERROR: Could not capture {sc['name']}")

    httpd.shutdown()
    return captured_frames, durations

def build_gif(frames, durations):
    if not frames:
        print("No frames to build GIF!")
        return

    print("\nScaling and optimizing frames for animated GIF...")
    target_width = 860
    processed_images = []

    for fpath in frames:
        with Image.open(fpath) as img:
            w, h = img.size
            new_h = int(h * (target_width / w))
            resized = img.resize((target_width, new_h), Image.Resampling.LANCZOS)
            rgb_img = resized.convert('RGB')
            # Quantize with 256 colors using Floyd-Steinberg dithering for smooth manga tones
            quantized = rgb_img.quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
            processed_images.append(quantized)

    print(f"Saving compiled animated GIF to: {OUTPUT_GIF}")
    processed_images[0].save(
        OUTPUT_GIF,
        save_all=True,
        append_images=processed_images[1:],
        duration=durations,
        loop=0,
        optimize=True
    )

    gif_size_mb = os.path.getsize(OUTPUT_GIF) / (1024 * 1024)
    print(f"GIF compiled successfully! Size: {gif_size_mb:.2f} MB")

if __name__ == '__main__':
    frames, durations = capture_scenes()
    build_gif(frames, durations)
