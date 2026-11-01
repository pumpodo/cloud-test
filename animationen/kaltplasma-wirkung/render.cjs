// Rendert die Papierschnitt-Animation.
//   node render.cjs stills [t1 t2 t3 t4]   -> out/storyboard_*.png + out/storyboard.png (2x2)
//   node render.cjs video                  -> out/kaltplasma-wirkung.mp4 (1920x1080, 30 fps)
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

const DIR = __dirname;
const OUT = path.join(DIR, 'out');
const url = 'file://' + path.join(DIR, 'index.html') + '?render=1';

(async () => {
  const mode = process.argv[2] || 'stills';
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('pageerror', e => console.error('Seitenfehler:', e.message));
  await page.goto(url);
  await page.waitForFunction(() => window.READY === true);
  const stage = await page.$('#stage');

  if (mode === 'stills') {
    const times = process.argv.slice(3).map(Number);
    const ts = times.length ? times : [12.5, 30, 44.6, 58.5];
    const names = ['1_anfang', '2_steigerung', '3_hoehepunkt', '4_pointe'];
    const files = [];
    for (let i = 0; i < ts.length; i++) {
      await page.evaluate(t => window.renderAt(t), ts[i]);
      const f = path.join(OUT, `storyboard_${names[i] || i}.png`);
      await stage.screenshot({ path: f });
      files.push(f);
      console.log('Standbild', ts[i], 's ->', f);
    }
    if (files.length === 4) {
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...files.flatMap(f => ['-i', f]),
        '-filter_complex', '[0][1]hstack[a];[2][3]hstack[b];[a][b]vstack,scale=1920:-1',
        path.join(OUT, 'storyboard.png')]);
      console.log('Übersicht ->', path.join(OUT, 'storyboard.png'));
    }
  } else {
    const { dur, fps } = await page.evaluate(() => ({ dur: window.DURATION, fps: window.STOP_FPS }));
    const fdir = path.join(OUT, 'frames');
    fs.rmSync(fdir, { recursive: true, force: true });
    fs.mkdirSync(fdir, { recursive: true });
    const n = Math.round(dur * fps);
    for (let i = 0; i < n; i++) {
      await page.evaluate(t => window.renderAt(t), i / fps);
      await stage.screenshot({ path: path.join(fdir, `f${String(i).padStart(5, '0')}.png`) });
      if (i % 60 === 0) console.log(`Bild ${i}/${n}`);
    }
    const mp4 = path.join(OUT, 'kaltplasma-wirkung.mp4');
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(fdir, 'f%05d.png'),
      '-vf', 'fps=30,format=yuv420p', '-c:v', 'libx264', '-crf', '18', '-preset', 'slow', '-movflags', '+faststart', mp4]);
    fs.rmSync(fdir, { recursive: true, force: true });
    console.log('Video ->', mp4);
  }
  await browser.close();
})();
