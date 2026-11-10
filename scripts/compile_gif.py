import os
import glob
from PIL import Image

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRAMES_DIR = os.path.join(ROOT_DIR, 'dist', 'gif_frames')
ARTIFACT_DIR = r'C:\Users\ajela\.gemini\antigravity\brain\96e0c80c-c149-406b-aedb-c0b5f17e247a'
OUTPUT_GIF = os.path.join(ARTIFACT_DIR, 'portfolio_walkthrough.gif')

def create_walkthrough_gif():
    frame_files = sorted(glob.glob(os.path.join(FRAMES_DIR, 'frame_*.png')))
    if not frame_files:
        print(f"No frames found in {FRAMES_DIR}")
        return

    print(f"Found {len(frame_files)} frames. Processing...")

    target_width = 880
    processed_images = []
    durations = []

    # Custom durations per frame in ms:
    # Key anchor frames hold longer (1400-1800ms), intermediate scroll frames hold 800-1000ms
    duration_map = {
        0: 1800,  # Hero Arc 1
        1: 900,   # Arc 1 lower
        2: 1400,  # Arc 2 Origen & Convergencia
        3: 1300,  # Arc 3 Crónicas Timeline
        4: 1100,  # Arc 3 Details
        5: 1800,  # Arc 4 Shock Pink Featured Panel (MEGA FRÍO)
        6: 1400,  # Arc 5 Arsenal Técnico
        7: 1500,  # Arc 6 Diplomas SEPE / IUGT
        8: 1200,  # Arc 7 QR & Contact
        9: 1600,  # Modo ATS Texto
        10: 1100, # ATS scroll
        11: 1500, # Overview Experience
        12: 1000, # Overview scroll
        13: 1500, # Projects Lab
        14: 1200  # Projects grid
    }

    for idx, f in enumerate(frame_files):
        with Image.open(f) as img:
            # Resize while preserving aspect ratio
            w, h = img.size
            new_h = int(h * (target_width / w))
            resized = img.resize((target_width, new_h), Image.Resampling.LANCZOS)
            
            # Convert to RGB then quantize with adaptive palette
            rgb_img = resized.convert('RGB')
            # Quantize to 256 colors with dithering for crisp gradients
            p_img = rgb_img.quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
            
            processed_images.append(p_img)
            durations.append(duration_map.get(idx, 1000))

    if processed_images:
        print(f"Saving animated GIF to: {OUTPUT_GIF}")
        first_frame = processed_images[0]
        first_frame.save(
            OUTPUT_GIF,
            save_all=True,
            append_images=processed_images[1:],
            duration=durations,
            loop=0,
            optimize=True
        )
        file_size = os.path.getsize(OUTPUT_GIF)
        print(f"GIF created successfully! Size: {file_size / (1024*1024):.2f} MB ({file_size} bytes)")

if __name__ == '__main__':
    create_walkthrough_gif()
