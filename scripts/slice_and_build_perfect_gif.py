import os
from PIL import Image

ARTIFACT_DIR = r'C:\Users\ajela\.gemini\antigravity\brain\96e0c80c-c149-406b-aedb-c0b5f17e247a'
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRAMES_DIR = os.path.join(ROOT_DIR, 'dist', 'gif_frames')
FULLPAGE_IMG = os.path.join(ROOT_DIR, 'fullpage_cv.png')
OUTPUT_GIF = os.path.join(ARTIFACT_DIR, 'app_walkthrough.gif')

def main():
    print("Loading fullpage CV capture...")
    fullpage = Image.open(FULLPAGE_IMG)
    fw, fh = fullpage.size
    print(f"Fullpage dimensions: {fw}x{fh}")

    # Viewport window: 1200 x 800
    viewport_h = 800
    slices_y = [
        (0, 1800),     # ARC 1: Hero Cover, Identity & Badges
        (350, 900),    # ARC 1: Callouts & Description
        (750, 1400),   # ARC 2: El Origen & La Convergencia
        (1350, 1300),  # ARC 3: Crónicas Profesionales (Defontana ERP)
        (1950, 1100),  # ARC 3: PRTG Networks & IUGT Degree
        (2550, 1800),  # ARC 4: MEGA FRÍO Featured Panel (Shock-Pink Highlight)
        (3150, 1400),  # ARC 5: Arsenal Técnico (Bento Stack)
        (3750, 1500),  # ARC 6: Bóveda de Diplomas SEPE / IUGT (7 Certificados)
        (4450, 1300)   # ARC 7: Conexión & Transmisión QR
    ]

    target_w = 800
    target_h = int(viewport_h * (target_w / 1200)) # 533 px
    
    gif_frames = []
    durations = []

    # 1. Process Manga CV scrolling slices
    for idx, (y_start, duration) in enumerate(slices_y):
        y_end = min(y_start + viewport_h, fh)
        crop_box = (0, y_start, fw, y_end)
        cropped = fullpage.crop(crop_box)
        resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
        gif_frames.append(resized.convert('RGB'))
        durations.append(duration)
        print(f"Slice {idx+1}: Y=[{y_start}..{y_end}] (duration: {duration}ms)")

    # 2. Add extra views: ATS Mode, Overview Dashboard, Projects Lab, Digital QR
    extra_views = [
        ("10_ats_mode.png", 1600, "Modo ATS Texto"),
        ("11_dashboard_overview.png", 1500, "Dashboard Overview 360"),
        ("12_projects_lab.png", 1500, "Laboratorio de Proyectos"),
        ("13_digital_qr.png", 1400, "Tarjeta Digital QR")
    ]

    for fname, duration, label in extra_views:
        fpath = os.path.join(FRAMES_DIR, fname)
        if os.path.exists(fpath):
            with Image.open(fpath) as img:
                # Crop to 1200x800 aspect ratio if needed, then resize
                w, h = img.size
                crop_h = min(h, int(w * (viewport_h / 1200)))
                cropped = img.crop((0, 0, w, crop_h))
                resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
                gif_frames.append(resized.convert('RGB'))
                durations.append(duration)
                print(f"Added view: {label} ({fname}, duration: {duration}ms)")

    # 3. Quantize frames with consistent palette & save animated GIF
    print("\nQuantizing frames with Floyd-Steinberg dithering...")
    quantized_frames = []
    for frame in gif_frames:
        q = frame.quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
        quantized_frames.append(q)

    print(f"Writing animated GIF to {OUTPUT_GIF}...")
    quantized_frames[0].save(
        OUTPUT_GIF,
        save_all=True,
        append_images=quantized_frames[1:],
        duration=durations,
        loop=0,
        optimize=True
    )

    size_mb = os.path.getsize(OUTPUT_GIF) / (1024 * 1024)
    print(f"\nSUCCESS! Animated GIF generated: {OUTPUT_GIF}")
    print(f"Total frames: {len(quantized_frames)}, Size: {size_mb:.2f} MB")

    # Clean up temp test files
    for t in ['fullpage_cv.png', 'test_arc1.png', 'test_arc2.png', 'test_arc4.png', 'test_arc6.png', 'test_arc4_param.png']:
        tp = os.path.join(ROOT_DIR, t)
        if os.path.exists(tp):
            try: os.remove(tp)
            except: pass

if __name__ == '__main__':
    main()
