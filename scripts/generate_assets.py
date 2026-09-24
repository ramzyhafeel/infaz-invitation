import os
import math
import struct
import wave
import subprocess
from PIL import Image, ImageDraw, ImageFont

# Colors
C_IVORY = (250, 247, 240)
C_WARM_WHITE = (255, 253, 248)
C_CHAMPAGNE = (234, 216, 176)
C_GOLD = (196, 154, 74)
C_DEEP_GOLD = (165, 119, 44)
C_DARK = (41, 36, 31)
C_MUTED = (140, 129, 119)
C_ROSE = (212, 160, 168)
C_DEEP_ROSE = (180, 110, 125)

def draw_corner_ornaments(draw, w, h, margin=40, size=50, color=C_GOLD):
    # Top Left
    draw.line([(margin, margin), (margin + size, margin)], fill=color, width=2)
    draw.line([(margin, margin), (margin, margin + size)], fill=color, width=2)
    draw.ellipse((margin + 6, margin + 6, margin + 14, margin + 14), fill=color)

    # Top Right
    draw.line([(w - margin, margin), (w - margin - size, margin)], fill=color, width=2)
    draw.line([(w - margin, margin), (w - margin, margin + size)], fill=color, width=2)
    draw.ellipse((w - margin - 14, margin + 6, w - margin - 6, margin + 14), fill=color)

    # Bottom Left
    draw.line([(margin, h - margin), (margin + size, h - margin)], fill=color, width=2)
    draw.line([(margin, h - margin), (margin, h - margin - size)], fill=color, width=2)
    draw.ellipse((margin + 6, h - margin - 14, margin + 14, h - margin - 6), fill=color)

    # Bottom Right
    draw.line([(w - margin, h - margin), (w - margin - size, h - margin)], fill=color, width=2)
    draw.line([(w - margin, h - margin), (w - margin, h - margin - size)], fill=color, width=2)
    draw.ellipse((w - margin - 14, h - margin - 14, w - margin - 6, h - margin - 6), fill=color)

def draw_gradient_background(img, color1, color2, vertical=True):
    draw = ImageDraw.Draw(img)
    w, h = img.size
    steps = h if vertical else w
    for i in range(steps):
        ratio = i / float(steps)
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        if vertical:
            draw.line([(0, i), (w, i)], fill=(r, g, b))
        else:
            draw.line([(i, 0), (i, h)], fill=(r, g, b))

def create_monogram_image(filename, width=1200, height=1600, subtitle="THE WEDDING CELEBRATION"):
    img = Image.new("RGB", (width, height), C_IVORY)
    draw_gradient_background(img, C_WARM_WHITE, (244, 237, 224))
    draw = ImageDraw.Draw(img)

    # Outer and inner border
    margin = 48
    draw.rectangle([margin, margin, width - margin, height - margin], outline=C_CHAMPAGNE, width=2)
    draw.rectangle([margin + 12, margin + 12, width - margin - 12, height - margin - 12], outline=C_GOLD, width=1)
    draw_corner_ornaments(draw, width, height, margin=margin + 20, size=60, color=C_GOLD)

    # Central decorative circle
    cx, cy = width // 2, height // 2 - 80
    r = 260
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=C_CHAMPAGNE, width=2)
    draw.ellipse([cx - r + 15, cy - r + 15, cx + r - 15, cy + r - 15], outline=C_GOLD, width=1)

    # Draw Monogram initials "I & F"
    try:
        font_large = ImageFont.truetype("arial.ttf", 140)
        font_mid = ImageFont.truetype("georgia.ttf", 60)
        font_small = ImageFont.truetype("georgia.ttf", 36)
        font_tiny = ImageFont.truetype("arial.ttf", 26)
    except:
        font_large = font_mid = font_small = font_tiny = ImageFont.load_default()

    draw.text((cx, cy - 20), "I & F", fill=C_DEEP_GOLD, font=font_large, anchor="mm")
    draw.text((cx, cy + 90), "25 . 04 . 2027", fill=C_MUTED, font=font_tiny, anchor="mm")

    # Titles below
    draw.text((cx, cy + r + 80), "TOGETHER WITH THEIR FAMILIES", fill=C_MUTED, font=font_tiny, anchor="mm")
    draw.text((cx, cy + r + 140), "MOHAMED INFAZ", fill=C_DARK, font=font_mid, anchor="mm")
    draw.text((cx, cy + r + 195), "&", fill=C_GOLD, font=font_mid, anchor="mm")
    draw.text((cx, cy + r + 250), "FATHIMA HAFSA", fill=C_DARK, font=font_mid, anchor="mm")

    # Date and venue at bottom
    draw.line([(cx - 120, cy + r + 310), (cx + 120, cy + r + 310)], fill=C_GOLD, width=1)
    draw.text((cx, cy + r + 350), subtitle, fill=C_DEEP_GOLD, font=font_small, anchor="mm")
    draw.text((cx, cy + r + 400), "ILMA RECEPTION HALL  •  1:00 PM", fill=C_MUTED, font=font_tiny, anchor="mm")

    os.makedirs(os.path.dirname(filename), exist_ok=True)
    img.save(filename, quality=94)
    print(f"Created {filename}")

def create_couple_photo(filename, title, subtitle, width=1000, height=1300):
    img = Image.new("RGB", (width, height), C_WARM_WHITE)
    draw_gradient_background(img, (246, 240, 230), (236, 226, 212))
    draw = ImageDraw.Draw(img)

    margin = 36
    draw.rectangle([margin, margin, width - margin, height - margin], outline=C_GOLD, width=1)
    draw_corner_ornaments(draw, width, height, margin=margin + 10, size=40, color=C_DEEP_GOLD)

    cx, cy = width // 2, height // 2
    # Decorative arched frame
    arch_w, arch_h = width - 180, height - 260
    draw.rectangle([cx - arch_w//2, cy - arch_h//2, cx + arch_w//2, cy + arch_h//2], outline=C_CHAMPAGNE, width=2)

    try:
        font_large = ImageFont.truetype("georgia.ttf", 64)
        font_mid = ImageFont.truetype("georgia.ttf", 34)
        font_small = ImageFont.truetype("arial.ttf", 24)
    except:
        font_large = font_mid = font_small = ImageFont.load_default()

    draw.text((cx, cy - 60), "I & F", fill=C_GOLD, font=font_large, anchor="mm")
    draw.line([(cx - 80, cy), (cx + 80, cy)], fill=C_DEEP_GOLD, width=1)
    draw.text((cx, cy + 50), title.upper(), fill=C_DARK, font=font_mid, anchor="mm")
    draw.text((cx, cy + 95), subtitle, fill=C_MUTED, font=font_small, anchor="mm")
    draw.text((cx, cy + 140), "Mohamed Infaz & Fathima Hafsa", fill=C_DEEP_GOLD, font=font_small, anchor="mm")

    os.makedirs(os.path.dirname(filename), exist_ok=True)
    img.save(filename, quality=94)
    print(f"Created {filename}")

def create_gallery_photo(filename, index, title, width=1000, height=1000):
    img = Image.new("RGB", (width, height), C_IVORY)
    # Subtle tint variety
    tints = [
        ((250, 246, 240), (242, 234, 220)),
        ((248, 242, 236), (238, 226, 218)),
        ((245, 245, 238), (232, 232, 220)),
        ((252, 248, 242), (245, 236, 225)),
        ((246, 243, 239), (235, 228, 220)),
        ((250, 245, 242), (240, 230, 225)),
    ]
    t1, t2 = tints[(index - 1) % len(tints)]
    draw_gradient_background(img, t1, t2)
    draw = ImageDraw.Draw(img)

    margin = 30
    draw.rectangle([margin, margin, width - margin, height - margin], outline=C_CHAMPAGNE, width=1)
    draw.rectangle([margin + 8, margin + 8, width - margin - 8, height - margin - 8], outline=C_GOLD, width=1)

    cx, cy = width // 2, height // 2
    # Inner circle or diamond
    draw.ellipse([cx - 160, cy - 160, cx + 160, cy + 160], outline=C_GOLD, width=1)

    try:
        font_large = ImageFont.truetype("georgia.ttf", 52)
        font_mid = ImageFont.truetype("georgia.ttf", 28)
        font_small = ImageFont.truetype("arial.ttf", 20)
    except:
        font_large = font_mid = font_small = ImageFont.load_default()

    draw.text((cx, cy - 30), f"Moment 0{index}", fill=C_GOLD, font=font_large, anchor="mm")
    draw.text((cx, cy + 30), title, fill=C_DARK, font=font_mid, anchor="mm")
    draw.text((cx, cy + 68), "Infaz & Hafsa", fill=C_MUTED, font=font_small, anchor="mm")

    os.makedirs(os.path.dirname(filename), exist_ok=True)
    img.save(filename, quality=94)
    print(f"Created {filename}")

def create_preview_card(filename, width=1200, height=630):
    img = Image.new("RGB", (width, height), C_IVORY)
    draw_gradient_background(img, C_WARM_WHITE, (242, 232, 216), vertical=False)
    draw = ImageDraw.Draw(img)

    margin = 32
    draw.rectangle([margin, margin, width - margin, height - margin], outline=C_GOLD, width=2)
    draw.rectangle([margin + 10, margin + 10, width - margin - 10, height - margin - 10], outline=C_CHAMPAGNE, width=1)
    draw_corner_ornaments(draw, width, height, margin=margin + 16, size=50, color=C_GOLD)

    cx = width // 2
    try:
        font_tag = ImageFont.truetype("arial.ttf", 22)
        font_names = ImageFont.truetype("georgia.ttf", 68)
        font_date = ImageFont.truetype("georgia.ttf", 38)
        font_venue = ImageFont.truetype("arial.ttf", 26)
    except:
        font_tag = font_names = font_date = font_venue = ImageFont.load_default()

    draw.text((cx, 130), "WEDDING INVITATION", fill=C_MUTED, font=font_tag, anchor="mm")
    draw.text((cx, 220), "Mohamed Infaz & Fathima Hafsa", fill=C_DARK, font=font_names, anchor="mm")
    draw.line([(cx - 180, 285), (cx + 180, 285)], fill=C_GOLD, width=2)
    draw.text((cx, 345), "25 April 2027  •  Sunday  •  1:00 PM", fill=C_DEEP_GOLD, font=font_date, anchor="mm")
    draw.text((cx, 415), "Ilma Reception Hall", fill=C_DARK, font=font_venue, anchor="mm")
    draw.text((cx, 490), "Together with their families, cordially invite you to celebrate their union", fill=C_MUTED, font=font_tag, anchor="mm")

    os.makedirs(os.path.dirname(filename), exist_ok=True)
    img.save(filename, quality=94)
    print(f"Created {filename}")

def create_favicon(filename, size=512):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Circle background
    margin = 16
    draw.ellipse([margin, margin, size - margin, size - margin], fill=(250, 247, 240, 255), outline=C_GOLD, width=12)
    draw.ellipse([margin + 20, margin + 20, size - margin - 20, size - margin - 20], outline=C_CHAMPAGNE, width=4)

    cx, cy = size // 2, size // 2
    try:
        font_mono = ImageFont.truetype("georgia.ttf", 180)
        font_sub = ImageFont.truetype("arial.ttf", 40)
    except:
        font_mono = font_sub = ImageFont.load_default()

    draw.text((cx, cy - 20), "I & F", fill=C_DEEP_GOLD, font=font_mono, anchor="mm")
    draw.text((cx, cy + 110), "2027", fill=C_MUTED, font=font_sub, anchor="mm")

    os.makedirs(os.path.dirname(filename), exist_ok=True)
    img.save(filename, format="PNG")
    print(f"Created {filename}")

def create_petal_png(filename, size=256):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Draw organic rose petal shape
    cx, cy = size // 2, size // 2
    # Curved petal
    points = []
    for angle_deg in range(0, 360, 5):
        rad = math.radians(angle_deg)
        r = 85 * (1 + 0.3 * math.sin(rad * 2) - 0.2 * math.cos(rad))
        x = cx + r * math.sin(rad)
        y = cy + r * 1.3 * math.cos(rad)
        points.append((x, y))

    draw.polygon(points, fill=(225, 172, 180, 230), outline=(198, 142, 152, 255))
    # Petal highlight
    draw.line([(cx - 10, cy - 50), (cx + 5, cy + 60)], fill=(245, 210, 216, 180), width=3)

    os.makedirs(os.path.dirname(filename), exist_ok=True)
    img.save(filename, format="PNG")
    print(f"Created {filename}")

def create_flower_png(filename, size=300):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = size // 2, size // 2

    # Draw luxury multi-layer gold blossom
    num_petals = 8
    for layer, (rad_dist, p_radius, alpha) in enumerate([(60, 45, 140), (45, 38, 190), (25, 28, 230)]):
        for i in range(num_petals):
            angle = i * (2 * math.pi / num_petals) + (layer * 0.4)
            px = cx + rad_dist * math.cos(angle)
            py = cy + rad_dist * math.sin(angle)
            draw.ellipse([px - p_radius, py - p_radius, px + p_radius, py + p_radius],
                         fill=(212, 175, 95, alpha), outline=(165, 119, 44, 240), width=2)

    # Flower center
    draw.ellipse([cx - 20, cy - 20, cx + 20, cy + 20], fill=(234, 216, 176, 255), outline=C_DEEP_GOLD, width=3)
    draw.ellipse([cx - 8, cy - 8, cx + 8, cy + 8], fill=C_DEEP_GOLD)

    os.makedirs(os.path.dirname(filename), exist_ok=True)
    img.save(filename, format="PNG")
    print(f"Created {filename}")

def create_gold_decoration_png(filename, width=600, height=120):
    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = width // 2, height // 2

    # Central diamond & flourish divider
    draw.line([(60, cy), (cx - 40, cy)], fill=(196, 154, 74, 200), width=2)
    draw.line([(cx + 40, cy), (width - 60, cy)], fill=(196, 154, 74, 200), width=2)

    # Center ornaments
    diamond_size = 14
    draw.polygon([(cx, cy - diamond_size), (cx + diamond_size, cy), (cx, cy + diamond_size), (cx - diamond_size, cy)],
                 fill=(234, 216, 176, 255), outline=C_DEEP_GOLD)
    draw.ellipse([cx - 28, cy - 5, cx - 18, cy + 5], fill=C_GOLD)
    draw.ellipse([cx + 18, cy - 5, cx + 28, cy + 5], fill=C_GOLD)

    # End dots
    draw.ellipse([54, cy - 4, 62, cy + 4], fill=C_GOLD)
    draw.ellipse([width - 62, cy - 4, width - 54, cy + 4], fill=C_GOLD)

    os.makedirs(os.path.dirname(filename), exist_ok=True)
    img.save(filename, format="PNG")
    print(f"Created {filename}")

def generate_wedding_music_audio(mp3_filename):
    # Generates a soft, romantic, soothing acoustic harp/piano arpeggio progression in C Major / F Major / G Major
    # Sample rate 44100Hz, 16-bit stereo PCM, converted to MP3 with ffmpeg
    sample_rate = 44100
    tempo = 66  # BPM
    beat_dur = 60.0 / tempo
    
    # 4 chords progression: Cmaj7 -> Am9 -> Fmaj7 -> Gsus4 -> G
    # Notes in Hz
    notes = {
        'C3': 130.81, 'E3': 164.81, 'G3': 196.00, 'B3': 246.94,
        'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
        'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
        'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'G5': 783.99,
        'A3': 220.00, 'F3': 174.61
    }

    # Arpeggio patterns (each item: (note_name, start_beat, duration_beats, velocity))
    # 16 beats total (4 bars, ~14.5 seconds loop)
    pattern = [
        # Bar 1: Cmaj7
        ('C3', 0.0, 4.0, 0.6), ('G3', 0.5, 3.5, 0.5), ('E4', 1.0, 3.0, 0.5),
        ('B4', 1.5, 2.5, 0.45), ('C5', 2.0, 2.0, 0.5), ('E4', 2.5, 1.5, 0.4),
        ('G4', 3.0, 1.0, 0.4), ('B4', 3.5, 0.5, 0.35),
        
        # Bar 2: Am9
        ('A3', 4.0, 4.0, 0.6), ('E4', 4.5, 3.5, 0.5), ('C4', 5.0, 3.0, 0.5),
        ('G4', 5.5, 2.5, 0.45), ('B4', 6.0, 2.0, 0.5), ('C5', 6.5, 1.5, 0.45),
        ('E4', 7.0, 1.0, 0.4), ('G4', 7.5, 0.5, 0.35),
        
        # Bar 3: Fmaj7
        ('F3', 8.0, 4.0, 0.6), ('C4', 8.5, 3.5, 0.5), ('A4', 9.0, 3.0, 0.5),
        ('E5', 9.5, 2.5, 0.45), ('C5', 10.0, 2.0, 0.5), ('A4', 10.5, 1.5, 0.4),
        ('F4', 11.0, 1.0, 0.4), ('G4', 11.5, 0.5, 0.35),
        
        # Bar 4: Gsus4 to G
        ('G3', 12.0, 4.0, 0.6), ('D4', 12.5, 3.5, 0.5), ('G4', 13.0, 3.0, 0.5),
        ('C5', 13.5, 1.5, 0.5), ('B4', 14.5, 1.5, 0.5), ('D5', 15.0, 1.0, 0.45)
    ]

    total_beats = 16.0
    total_samples = int(total_beats * beat_dur * sample_rate)
    left_channel = [0.0] * total_samples
    right_channel = [0.0] * total_samples

    for note_name, start_beat, dur_beat, vel in pattern:
        freq = notes.get(note_name, 440.0)
        start_samp = int(start_beat * beat_dur * sample_rate)
        dur_samp = int(dur_beat * beat_dur * sample_rate)
        end_samp = min(total_samples, start_samp + dur_samp)

        # Stereo pan slightly based on frequency
        pan = 0.5 + 0.3 * (freq - 300.0) / 500.0
        pan = max(0.2, min(0.8, pan))

        for s in range(start_samp, end_samp):
            t = (s - start_samp) / float(sample_rate)
            # Gentle exponential decay envelope + soft attack
            attack = min(1.0, t / 0.02)
            decay = math.exp(-t * 1.4)
            env = attack * decay * vel

            # Rich acoustic harmonics: fundamental + soft 2nd & 3rd harmonics
            val = (
                math.sin(2 * math.pi * freq * t) * 0.7 +
                math.sin(4 * math.pi * freq * t) * 0.2 +
                math.sin(6 * math.pi * freq * t) * 0.08 +
                math.sin(8 * math.pi * freq * t) * 0.02
            ) * env

            left_channel[s] += val * (1.0 - pan)
            right_channel[s] += val * pan

    # Normalize audio to prevent clipping (-1dB)
    max_amp = max(max(map(abs, left_channel)), max(map(abs, right_channel)), 0.001)
    scale = 0.85 / max_amp

    wav_filename = mp3_filename.replace('.mp3', '.wav')
    os.makedirs(os.path.dirname(wav_filename), exist_ok=True)
    
    with wave.open(wav_filename, 'w') as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        frames = bytearray()
        for i in range(total_samples):
            # Apply subtle crossfade at ends for seamless loop
            cf_len = int(sample_rate * 0.4)
            fade = 1.0
            if i < cf_len:
                fade = i / float(cf_len)
            elif i > total_samples - cf_len:
                fade = (total_samples - i) / float(cf_len)

            l = int(left_channel[i] * scale * fade * 32767)
            r = int(right_channel[i] * scale * fade * 32767)
            l = max(-32768, min(32767, l))
            r = max(-32768, min(32767, r))
            frames.extend(struct.pack('<hh', l, r))
        wf.writeframes(frames)
    print(f"Generated WAV {wav_filename}")

    # Convert WAV to MP3 using ffmpeg
    try:
        subprocess.run(
            ['ffmpeg', '-y', '-i', wav_filename, '-codec:a', 'libmp3lame', '-b:a', '128k', mp3_filename],
            check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        print(f"Converted to MP3: {mp3_filename}")
        if os.path.exists(wav_filename):
            os.remove(wav_filename)
    except Exception as e:
        print(f"FFmpeg conversion notice: {e}, keeping wav or renaming.")
        if os.path.exists(wav_filename) and not os.path.exists(mp3_filename):
            os.rename(wav_filename, mp3_filename)

if __name__ == "__main__":
    print("Generating initial luxury wedding assets...")
    create_monogram_image("public/images/cover/cover.jpg", 1200, 1600, "CELEBRATION OF LOVE")
    
    create_couple_photo("public/images/couple/couple-01.jpg", "A Sacred Union", "Two Souls Bound in Faith & Love")
    create_couple_photo("public/images/couple/couple-02.jpg", "Eternal Promise", "Walking Together Towards Tomorrow")
    create_couple_photo("public/images/couple/couple-03.jpg", "With Every Heartbeat", "Blessed by Families, Cherished Forever")
    
    gallery_titles = [
        "Quiet Moments", "Sweet Anticipation", "Gilded Horizons",
        "Family Blessings", "The Journey Begins", "Hand in Hand"
    ]
    for idx, title in enumerate(gallery_titles, start=1):
        create_gallery_photo(f"public/images/gallery/gallery-0{idx}.jpg", idx, title, 1000, 1000 if idx % 2 == 0 else 1250)
        
    create_preview_card("public/images/preview/wedding-preview.jpg")
    create_favicon("public/favicon/favicon.png")
    create_petal_png("public/images/decorations/petal.png")
    create_flower_png("public/images/decorations/flower.png")
    create_gold_decoration_png("public/images/decorations/gold-decoration.png")
    
    generate_wedding_music_audio("public/audio/wedding-music.mp3")
    print("All initial wedding assets successfully created!")
