const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting showreel generation matching user video...');

const FRAMES_DIR = '/tmp/showreel_frames';
if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

// Helper to base64 encode images
function getB64(filename) {
  const p = path.join(__dirname, '..', 'public', filename);
  if (fs.existsSync(p)) {
    const ext = path.extname(filename).toLowerCase().replace('.', '');
    const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
    return `data:${mime};base64,` + fs.readFileSync(p).toString('base64');
  }
  return '';
}

const borhanDpB64 = getB64('borhan-dp.jpg');
const graphic1B64 = getB64('graphic1.jpg');
const graphic2B64 = getB64('graphic2.jpg');
const graphic3B64 = getB64('graphic3.jpg');
const graphic4B64 = getB64('graphic4.jpg');
const graphic5B64 = getB64('graphic5.jpg');
const graphic6B64 = getB64('graphic6.jpg');
const graphic7B64 = getB64('graphic7.jpg');
const graphic8B64 = getB64('graphic8.jpg');

const TOTAL_FRAMES = 600; // 20 seconds at 30 fps
const FPS = 30;

for (let i = 0; i < TOTAL_FRAMES; i++) {
  const t = i / FPS; // time in seconds (0.00 to 20.00)

  let content = '';

  // Background gradient: sleek cyan-to-purple diagonal
  const bg = `
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#805d9b" />
        <stop offset="50%" stop-color="#4e729a" />
        <stop offset="100%" stop-color="#318798" />
      </linearGradient>

      <!-- Rainbow ring gradient -->
      <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00f5ff" />
        <stop offset="25%" stop-color="#10b981" />
        <stop offset="50%" stop-color="#facc15" />
        <stop offset="75%" stop-color="#ec4899" />
        <stop offset="100%" stop-color="#8b5cf6" />
      </linearGradient>

      <linearGradient id="cardGradDark" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e1b4b" />
        <stop offset="100%" stop-color="#0f172a" />
      </linearGradient>

      <!-- Avatar circular clip -->
      <clipPath id="avatarClip">
        <circle cx="340" cy="380" r="135" />
      </clipPath>

      <!-- Reel Phone Clips -->
      <clipPath id="phoneClip1"><rect x="130" y="200" width="200" height="360" rx="20" /></clipPath>
      <clipPath id="phoneClip2"><rect x="380" y="200" width="200" height="360" rx="20" /></clipPath>
      <clipPath id="phoneClip3"><rect x="630" y="200" width="200" height="360" rx="20" /></clipPath>
      <clipPath id="phoneClip4"><rect x="880" y="200" width="200" height="360" rx="20" /></clipPath>

      <!-- 16:9 Clips -->
      <clipPath id="vsClip1"><rect x="180" y="140" width="290" height="175" rx="12" /></clipPath>
      <clipPath id="vsClip2"><rect x="680" y="140" width="290" height="175" rx="12" /></clipPath>
      <clipPath id="vsClip3"><rect x="180" y="420" width="290" height="175" rx="12" /></clipPath>
      <clipPath id="vsClip4"><rect x="680" y="420" width="290" height="175" rx="12" /></clipPath>

      <!-- UI Motion Clips -->
      <clipPath id="uiClip1"><rect x="160" y="320" width="310" height="175" rx="14" /></clipPath>
      <clipPath id="uiClip2"><rect x="680" y="320" width="310" height="175" rx="14" /></clipPath>
      <clipPath id="uiClip3"><rect x="420" y="430" width="310" height="175" rx="14" /></clipPath>
    </defs>
    <rect width="1280" height="720" fill="url(#bgGrad)" />
    <!-- Dynamic curved aesthetic ribbon path -->
    <path d="M 0 680 C 400 480 450 360 800 240 C 1000 180 1150 140 1280 120" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="5" />
    <path d="M -50 720 C 350 520 400 400 750 280 C 950 220 1100 180 1280 160" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3" />
  `;

  // ==========================================
  // SCENE 1: Introduction (0s - 6.5s)
  // ==========================================
  if (t < 6.5) {
    let opacity = 1;
    if (t > 6.0) {
      opacity = Math.max(0, (6.5 - t) / 0.5); // fade out into scene 2
    }

    // Avatar + Rainbow ring (left)
    const avatar = `
      <g opacity="${opacity}">
        <!-- Rainbow Glowing Ring -->
        <circle cx="340" cy="380" r="142" fill="none" stroke="url(#rainbowGrad)" stroke-width="12" filter="drop-shadow(0 0 15px rgba(0,245,255,0.5))" />
        <!-- Inner subtle border -->
        <circle cx="340" cy="380" r="135" fill="#1e1b4b" />
        <!-- Borhan Photo -->
        <image href="${borhanDpB64}" x="180" y="220" width="320" height="320" preserveAspectRatio="xMidYMid slice" clip-path="url(#avatarClip)" />
      </g>
    `;

    // 4+ Month Experience Tag (appears at t >= 5.0s)
    let expBadge = '';
    if (t >= 5.0) {
      const expOp = Math.min(1, (t - 5.0) / 0.4) * opacity;
      expBadge = `
        <g opacity="${expOp}">
          <rect x="180" y="195" width="225" height="46" rx="23" fill="rgba(15, 23, 42, 0.4)" stroke="#6366f1" stroke-width="2.5" />
          <text x="292" y="225" fill="#ffffff" font-size="16" font-weight="700" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
            4+ Month of Experience
          </text>
        </g>
      `;
    }

    // Speech Bubble 1: "Assalamu Alaikum" (appears at t >= 0.8s)
    let bubble1 = '';
    if (t >= 0.8) {
      const b1Op = Math.min(1, (t - 0.8) / 0.4) * opacity;
      bubble1 = `
        <g opacity="${b1Op}">
          <rect x="660" y="190" width="290" height="54" rx="27" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.95)" stroke-width="2.5" />
          <text x="805" y="225" fill="#ffffff" font-size="22" font-weight="600" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
            Assalamu Alaikum
          </text>
        </g>
      `;
    }

    // Speech Bubble 2: "Looking for video editor ?" (appears at t >= 1.8s)
    let bubble2 = '';
    if (t >= 1.8) {
      const b2Op = Math.min(1, (t - 1.8) / 0.4) * opacity;
      bubble2 = `
        <g opacity="${b2Op}">
          <rect x="660" y="260" width="310" height="48" rx="24" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.85)" stroke-width="2" />
          <text x="815" y="291" fill="#ffffff" font-size="18" font-weight="500" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
            Looking for video editor ?
          </text>
        </g>
      `;
    }

    // Title: "I AM BORHAN UDDIN" (appears at t >= 2.8s)
    let nameTitle = '';
    if (t >= 2.8) {
      const nameOp = Math.min(1, (t - 2.8) / 0.4) * opacity;
      nameTitle = `
        <g opacity="${nameOp}">
          <rect x="660" y="325" width="360" height="60" rx="30" fill="rgba(255, 255, 255, 0.12)" stroke="rgba(255, 255, 255, 0.9)" stroke-width="2.5" />
          <text x="840" y="365" fill="#ffffff" font-size="26" font-weight="800" font-family="'Syne', 'Plus Jakarta Sans', sans-serif" text-anchor="middle" letter-spacing="1">
            I AM BORHAN UDDIN
          </text>
        </g>
      `;
    }

    // Subtitle: "Motion Designer & Video Editor" (appears at t >= 3.8s)
    let subtitle = '';
    if (t >= 3.8) {
      const subOp = Math.min(1, (t - 3.8) / 0.4) * opacity;
      subtitle = `
        <g opacity="${subOp}">
          <text x="840" y="420" fill="#facc15" font-size="21" font-weight="700" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle" letter-spacing="0.5">
            Motion Designer &amp; Video Editor
          </text>
        </g>
      `;
    }

    content = bg + avatar + expBadge + bubble1 + bubble2 + nameTitle + subtitle;
  }

  // ==========================================
  // SCENE 2: "Project" Center Toggle Transition (6.5s - 7.8s)
  // ==========================================
  else if (t >= 6.5 && t < 7.8) {
    const pTime = (t - 6.5) / 1.3; // 0 to 1
    const dotX = 580 + pTime * 120; // moves from 580 to 700

    content = bg + `
      <g>
        <rect x="530" y="320" width="220" height="74" rx="37" fill="rgba(15, 23, 42, 0.4)" stroke="#38bdf8" stroke-width="3" filter="drop-shadow(0 0 20px rgba(56,189,248,0.4))" />
        <text x="640" y="367" fill="#ffffff" font-size="28" font-weight="700" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
          Project
        </text>
        <!-- Sliding toggle glow dot -->
        <circle cx="${dotX}" cy="357" r="14" fill="#ffffff" filter="drop-shadow(0 0 10px #38bdf8)" opacity="0.85" />
      </g>
    `;
  }

  // ==========================================
  // SCENE 3: "Reels" Showcase (7.8s - 11.5s)
  // ==========================================
  else if (t >= 7.8 && t < 11.5) {
    let opacity = 1;
    if (t < 8.2) opacity = (t - 7.8) / 0.4;
    if (t > 11.0) opacity = Math.max(0, (11.5 - t) / 0.5);

    content = bg + `
      <g opacity="${opacity}">
        <!-- Header Pill: Reels -->
        <rect x="90" y="70" width="160" height="52" rx="26" fill="rgba(15, 23, 42, 0.4)" stroke="#ec4899" stroke-width="3" filter="drop-shadow(0 0 15px rgba(236,72,153,0.5))" />
        <text x="170" y="104" fill="#f43f5e" font-size="24" font-weight="800" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
          Reels
        </text>

        <!-- 4 Vertical Phone Cards -->
        <!-- Phone 1: Bengali Typography Reel -->
        <g>
          <rect x="130" y="180" width="220" height="420" rx="22" fill="#111827" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
          <image href="${graphic1B64}" x="130" y="180" width="220" height="420" preserveAspectRatio="xMidYMid slice" clip-path="url(#phoneClip1)" />
          <rect x="130" y="440" width="220" height="160" fill="url(#cardGradDark)" opacity="0.8" />
          <text x="240" y="360" fill="#ffffff" font-size="22" font-weight="700" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
            আপনি কি
          </text>
          <text x="240" y="390" fill="#facc15" font-size="16" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
            কারিশ্মা
          </text>
        </g>

        <!-- Phone 2: Beach / People Reel -->
        <g>
          <rect x="390" y="180" width="220" height="420" rx="22" fill="#111827" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
          <image href="${graphic2B64}" x="390" y="180" width="220" height="420" preserveAspectRatio="xMidYMid slice" clip-path="url(#phoneClip2)" />
          <rect x="390" y="440" width="220" height="160" fill="url(#cardGradDark)" opacity="0.8" />
          <text x="500" y="360" fill="#ffffff" font-size="22" font-weight="700" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
            মানুষগুলো
          </text>
        </g>

        <!-- Phone 3: Speaker / Podcast Reel -->
        <g>
          <rect x="650" y="180" width="220" height="420" rx="22" fill="#111827" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
          <image href="${graphic3B64}" x="650" y="180" width="220" height="420" preserveAspectRatio="xMidYMid slice" clip-path="url(#phoneClip3)" />
          <rect x="650" y="440" width="220" height="160" fill="url(#cardGradDark)" opacity="0.8" />
          <text x="760" y="560" fill="#38bdf8" font-size="16" font-weight="600" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
            Viral Retention
          </text>
        </g>

        <!-- Phone 4: Nature / Travel Reel -->
        <g>
          <rect x="910" y="180" width="220" height="420" rx="22" fill="#111827" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
          <image href="${graphic4B64}" x="910" y="180" width="220" height="420" preserveAspectRatio="xMidYMid slice" clip-path="url(#phoneClip4)" />
          <rect x="910" y="440" width="220" height="160" fill="url(#cardGradDark)" opacity="0.8" />
          <text x="1020" y="560" fill="#10b981" font-size="16" font-weight="600" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
            Cinematic Cuts
          </text>
        </g>
      </g>
    `;
  }

  // ==========================================
  // SCENE 4: "Visual Story" Showcase (11.5s - 14.8s)
  // ==========================================
  else if (t >= 11.5 && t < 14.8) {
    let opacity = 1;
    if (t < 11.9) opacity = (t - 11.5) / 0.4;
    if (t > 14.3) opacity = Math.max(0, (14.8 - t) / 0.5);

    content = bg + `
      <g opacity="${opacity}">
        <!-- 4 16:9 Video Cards -->
        <!-- Card 1 (Top Left) -->
        <rect x="180" y="130" width="310" height="185" rx="14" fill="#0f172a" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
        <image href="${graphic5B64}" x="180" y="130" width="310" height="185" preserveAspectRatio="xMidYMid slice" clip-path="url(#vsClip1)" />

        <!-- Card 2 (Top Right) -->
        <rect x="790" y="130" width="310" height="185" rx="14" fill="#0f172a" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
        <image href="${graphic6B64}" x="790" y="130" width="310" height="185" preserveAspectRatio="xMidYMid slice" clip-path="url(#vsClip2)" />

        <!-- Card 3 (Bottom Left) -->
        <rect x="180" y="410" width="310" height="185" rx="14" fill="#0f172a" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
        <image href="${graphic7B64}" x="180" y="410" width="310" height="185" preserveAspectRatio="xMidYMid slice" clip-path="url(#vsClip3)" />

        <!-- Card 4 (Bottom Right) -->
        <rect x="790" y="410" width="310" height="185" rx="14" fill="#0f172a" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
        <image href="${graphic8B64}" x="790" y="410" width="310" height="185" preserveAspectRatio="xMidYMid slice" clip-path="url(#vsClip4)" />

        <!-- Center Badge: Visual Story -->
        <rect x="520" y="335" width="240" height="56" rx="28" fill="rgba(15, 23, 42, 0.6)" stroke="#facc15" stroke-width="2.5" filter="drop-shadow(0 0 20px rgba(250,204,21,0.4))" />
        <text x="640" y="371" fill="#ffffff" font-size="22" font-weight="700" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
          Visual Story
        </text>
      </g>
    `;
  }

  // ==========================================
  // SCENE 5: "UI Motion" Showcase (14.8s - 17.5s)
  // ==========================================
  else if (t >= 14.8 && t < 17.5) {
    let opacity = 1;
    if (t < 15.2) opacity = (t - 14.8) / 0.4;
    if (t > 17.0) opacity = Math.max(0, (17.5 - t) / 0.5);

    content = bg + `
      <g opacity="${opacity}">
        <!-- Center Header: UI Motion -->
        <rect x="525" y="190" width="230" height="54" rx="27" fill="rgba(15, 23, 42, 0.5)" stroke="#38bdf8" stroke-width="2.5" filter="drop-shadow(0 0 15px rgba(56,189,248,0.4))" />
        <text x="640" y="225" fill="#38bdf8" font-size="22" font-weight="800" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
          UI Motion
        </text>

        <!-- Card 1 (Left: Send Button / Light Blue) -->
        <g>
          <rect x="180" y="290" width="310" height="175" rx="14" fill="#a5d8ff" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
          <rect x="250" y="350" width="170" height="50" rx="25" fill="#ffffff" />
          <!-- Send Paper Plane Icon -->
          <path d="M 280 375 L 305 365 L 290 390 Z" fill="#0284c7" />
          <text x="335" y="382" fill="#0284c7" font-size="18" font-weight="700" font-family="'Plus Jakarta Sans', sans-serif">Send</text>
          <!-- Cursor icon clicking -->
          <circle cx="280" cy="380" r="8" fill="#0f172a" opacity="0.6" />
        </g>

        <!-- Card 2 (Right: Empower Brains / Violet-Magenta) -->
        <g>
          <rect x="790" y="290" width="310" height="175" rx="14" fill="#881337" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
          <!-- Brain Glow Icon -->
          <circle cx="945" cy="360" r="32" fill="#e11d48" filter="drop-shadow(0 0 10px #f43f5e)" />
          <text x="945" y="425" fill="#ffffff" font-size="18" font-weight="600" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
            Empower brains
          </text>
        </g>

        <!-- Card 3 (Center Bottom: Borhan Uddin Team Illustration) -->
        <g>
          <rect x="470" y="450" width="340" height="190" rx="14" fill="#042f2e" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
          <text x="640" y="520" fill="#34d399" font-size="22" font-weight="800" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
            BORHAN UDDIN
          </text>
          <text x="640" y="555" fill="#a7f3d0" font-size="16" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
            Motion Graphics Production
          </text>
        </g>
      </g>
    `;
  }

  // ==========================================
  // SCENE 6: "Contact" Outro (17.5s - 20.0s)
  // ==========================================
  else {
    let opacity = 1;
    if (t < 18.0) opacity = (t - 17.5) / 0.5;

    content = bg + `
      <g opacity="${opacity}">
        <!-- Center Header: Contact -->
        <rect x="535" y="200" width="210" height="54" rx="27" fill="rgba(15, 23, 42, 0.4)" stroke="#818cf8" stroke-width="2.5" filter="drop-shadow(0 0 15px rgba(129,140,248,0.4))" />
        <text x="640" y="235" fill="#818cf8" font-size="24" font-weight="800" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
          Contact
        </text>

        <!-- Pill 1: Phone -->
        <g>
          <rect x="380" y="290" width="520" height="76" rx="38" fill="rgba(255, 255, 255, 0.08)" stroke="#818cf8" stroke-width="2.5" stroke-dasharray="8 6" />
          <!-- Phone Icon Circle -->
          <circle cx="430" cy="328" r="22" fill="#818cf8" />
          <path d="M 423 320 C 423 335 435 335 437 335" fill="none" stroke="#ffffff" stroke-width="3" />
          <text x="650" y="337" fill="#ffffff" font-size="26" font-weight="700" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
            +8801301339247
          </text>
        </g>

        <!-- "Or" divider -->
        <text x="640" y="405" fill="#e2e8f0" font-size="20" font-weight="600" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
          Or
        </text>

        <!-- Pill 2: Email -->
        <g>
          <rect x="330" y="440" width="620" height="76" rx="38" fill="rgba(255, 255, 255, 0.08)" stroke="#818cf8" stroke-width="2.5" stroke-dasharray="8 6" />
          <!-- Mail Icon Circle -->
          <circle cx="380" cy="478" r="22" fill="#818cf8" />
          <text x="650" y="487" fill="#ffffff" font-size="25" font-weight="700" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
            borhanxzone@gmail.com
          </text>
        </g>
      </g>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
    ${content}
  </svg>`;

  const frameNum = String(i).padStart(4, '0');
  fs.writeFileSync(path.join(FRAMES_DIR, `frame_${frameNum}.svg`), svg);

  if (i % 60 === 0) {
    console.log(`Generated ${i}/${TOTAL_FRAMES} frames (${Math.round((i/TOTAL_FRAMES)*100)}%)...`);
  }
}

console.log('All 600 frames generated! Now encoding to MP4 with audio using ffmpeg...');

const outputVideo = path.join(__dirname, '..', 'public', 'showreel.mp4');

// Generate 20s ambient sound track with gentle synthesizer chords and swooshes, matching the video
// and encode video
const cmd = `ffmpeg -y -framerate ${FPS} -i ${FRAMES_DIR}/frame_%04d.svg -f lavfi -i "sine=frequency=220:beep_factor=4:duration=20" -c:v libx264 -pix_fmt yuv420p -preset medium -crf 20 -c:a aac -b:a 128k -shortest ${outputVideo}`;

execSync(cmd, { stdio: 'inherit' });

console.log('Showreel generated successfully at:', outputVideo);
console.log('File size:', fs.statSync(outputVideo).size, 'bytes');
