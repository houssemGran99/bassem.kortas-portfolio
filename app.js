import * as THREE from 'three';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = t => t * t * (3 - 2 * t);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = matchMedia('(pointer: coarse)').matches;
const root = document.documentElement;

/* ───────────── theme ───────────── */
try { root.dataset.theme = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'); } catch { }
const C = { bg: new THREE.Color(), a: new THREE.Color(), b: new THREE.Color(), ink: new THREE.Color() };
const themed = [];          // { mat, key, mix? }  → recolored on theme change
const themeHooks = [];      // callbacks after recolor
let isLight = false;

function readTheme() {
  const cs = getComputedStyle(root);
  for (const k of ['bg', 'a', 'b', 'ink']) C[k].set(cs.getPropertyValue('--' + k).trim());
  isLight = root.dataset.theme === 'light';
}
function applyTheme() {
  readTheme();
  themed.forEach(({ mat, key }) => mat.color.copy(C[key]));
  if (scene) { scene.background = C.bg; scene.fog.color.copy(C.bg); }
  themeHooks.forEach(fn => fn());
}
function track(mat, key) { themed.push({ mat, key }); mat.color.copy(C[key]); return mat; }

/* ───────────── text splitting / role ticker ───────────── */
$$('[data-split]').forEach(el => {
  const t = el.textContent; el.textContent = '';
  [...t].forEach((c, i) => { const s = document.createElement('span'); s.className = 'ch'; s.style.setProperty('--i', i); s.textContent = c; el.appendChild(s); });
});
const roles = ['Frontend Team Lead', 'Design-System Architect', 'SDK Builder', 'Full-Stack Capable', 'AI-Assisted Engineer'];
(() => {
  const el = $('#role-text'); let i = 0, j = roles[0].length, del = true;
  if (reduce) return;
  const tick = () => {
    const w = roles[i];
    if (del) { j--; if (j <= 0) { del = false; i = (i + 1) % roles.length; } }
    else { j++; if (j >= roles[i].length) { del = true; el.textContent = roles[i]; return setTimeout(tick, 1800); } }
    el.textContent = roles[i].slice(0, Math.max(j, 0)) || ' ';
    setTimeout(tick, del ? 28 : 55);
  };
  setTimeout(tick, 2600);
})();

/* ───────────── skills data ───────────── */
const SKILLS = [
  ['Frontend', ['React.js', 'React Native', 'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Chakra UI', 'Taiga UI']],
  ['Architecture', ['Design Systems', 'SDK Development', 'Micro Frontends', 'Redux Saga', 'NgRx', 'Zustand']],
  ['Mobile', ['Cordova', 'Capacitor', 'Android / iOS builds']],
  ['Backend', ['Node.js', 'Express.js', 'NestJS', 'Spring Boot', 'WebSocket', 'REST APIs', 'MongoDB']],
  ['Security', ['Keycloak', 'Request signing', 'Device trust', 'Facia AI']],
  ['Quality', ['Jest', 'Cypress', 'Puppeteer', 'Storybook', 'SonarQube']],
  ['DevOps', ['Docker', 'Kubernetes', 'GitLab CI', 'GitHub', 'NGINX', 'Nexus']],
  ['Platforms', ['Flowable BPMN', 'Formio.js']],
  ['AI-assisted', ['GitHub Copilot', 'Claude Code', 'Context design', 'Token optimization']],
];
const catHue = i => i / SKILLS.length;
const catColor = (i, out = new THREE.Color()) => out.setHSL(catHue(i), .75, isLight ? .36 : .7);

/* ───────────── three.js ───────────── */
let scene, renderer, camera;
const canvas = $('#scene');
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
} catch (e) { document.body.classList.add('no-webgl'); }

const sections = $$('.sec');
const labelsEl = $('#labels');
const labelDefs = [];       // { el, pos(THREE.Vector3), sec }
const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
let focusApp = -1, focusProj = -1, skillFocus = -1;

if (renderer) {
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.011);
  camera = new THREE.PerspectiveCamera(55, 1, 0.1, 400);
  camera.position.set(0, 1.2, 16);
  readTheme(); scene.background = C.bg; scene.fog.color.copy(C.bg);

  /* ── core: displaced fresnel shader ── */
  const coreMat = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: { uTime: { value: 0 }, uA: { value: C.a }, uB: { value: C.b }, uLight: { value: 0 } },
    vertexShader: /* glsl */`
      uniform float uTime; varying vec3 vN; varying vec3 vP; varying vec3 vV;
      void main(){
        vec3 p = position;
        float d = sin(p.x*1.7+uTime*.9)*.5 + sin(p.y*2.1-uTime*1.2)*.5 + sin(p.z*1.9+uTime*.7)*.5;
        p += normal * d * .14;
        vec4 mv = modelViewMatrix * vec4(p,1.);
        vN = normalize(normalMatrix*normal); vP = p; vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */`
      uniform float uTime; uniform vec3 uA; uniform vec3 uB; uniform float uLight; varying vec3 vN; varying vec3 vP; varying vec3 vV;
      void main(){
        float f = pow(1.-abs(dot(normalize(vN),normalize(vV))), 2.2);
        float scan = smoothstep(.45,.5,fract(vP.y*2.2 - uTime*.25));
        vec3 col = mix(uA,uB,clamp(f*1.2+vP.y*.12+.3,0.,1.));
        float alpha = .16 + f*.8 + scan*.18;
        gl_FragColor = vec4(col, alpha);
      }`
  });
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(2, 5), coreMat);
  scene.add(core);
  const coreWire = new THREE.Mesh(new THREE.IcosahedronGeometry(2.45, 2), track(new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: .16 }), 'a'));
  scene.add(coreWire);
  const coreInner = new THREE.Mesh(new THREE.OctahedronGeometry(.7, 0), track(new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: .9 }), 'ink'));
  scene.add(coreInner);
  themeHooks.push(() => { coreMat.uniforms.uLight.value = isLight ? 1 : 0; });

  /* ── apps in orbit ── */
  const appDefs = [
    { name: 'End-user', geo: new THREE.IcosahedronGeometry(.6, 0), r: 5.4, tilt: .35, speed: .3, phase: 0 },
    { name: 'Bank agent', geo: new THREE.OctahedronGeometry(.7, 0), r: 6.4, tilt: -.5, speed: -.24, phase: 1.7 },
    { name: 'Admin', geo: new THREE.DodecahedronGeometry(.6, 0), r: 7.4, tilt: .8, speed: .19, phase: 3.2 },
    { name: 'Business', geo: new THREE.TetrahedronGeometry(.78, 0), r: 8.4, tilt: -.18, speed: -.15, phase: 4.7 },
  ];
  const apps = appDefs.map((d, i) => {
    const g = new THREE.Group();
    const w = new THREE.Mesh(d.geo, track(new THREE.MeshBasicMaterial({ wireframe: true, transparent: true }), 'a'));
    const s = new THREE.Mesh(d.geo, track(new THREE.MeshBasicMaterial({ transparent: true, opacity: .22 }), 'b'));
    s.scale.setScalar(.82);
    g.add(w, s); scene.add(g);

    // orbit ring
    const pts = []; for (let k = 0; k <= 128; k++) { const a = k / 128 * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * d.r, 0, Math.sin(a) * d.r)); }
    const ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), track(new THREE.LineBasicMaterial({ transparent: true, opacity: .13 }), 'ink'));
    ring.rotation.x = d.tilt; scene.add(ring);

    // link to core
    const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    const link = new THREE.Line(lg, track(new THREE.LineBasicMaterial({ transparent: true, opacity: .28 }), 'a'));
    scene.add(link);

    const tag = document.createElement('div'); tag.className = 'tag'; tag.textContent = d.name; labelsEl.appendChild(tag);
    const pos = new THREE.Vector3();
    labelDefs.push({ el: tag, pos, sec: 3, app: i });
    return { ...d, g, w, s, link, pos, scale: 1 };
  });
  const PULSES = 4;
  const pulseGeo = new THREE.BufferGeometry();
  pulseGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(apps.length * PULSES * 3), 3));
  const pulses = new THREE.Points(pulseGeo, track(new THREE.PointsMaterial({ size: .16, transparent: true, opacity: .95, depthWrite: false }), 'b'));
  pulses.frustumCulled = false; scene.add(pulses);

  /* ── SDK satellites (Nexus ring) ── */
  const sdk = new THREE.Group(); sdk.rotation.x = .22;
  const sdkMat = track(new THREE.MeshBasicMaterial({ transparent: true, opacity: .9 }), 'a');
  const sdkGeo = new THREE.SphereGeometry(.13, 12, 12);
  for (let i = 0; i < 14; i++) { const m = new THREE.Mesh(sdkGeo, sdkMat); const a = i / 14 * Math.PI * 2; m.position.set(Math.cos(a) * 10.8, 0, Math.sin(a) * 10.8); sdk.add(m); }
  const sdkRing = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 129 }, (_, k) => { const a = k / 128 * Math.PI * 2; return new THREE.Vector3(Math.cos(a) * 10.8, 0, Math.sin(a) * 10.8); })), track(new THREE.LineBasicMaterial({ transparent: true, opacity: .2 }), 'a'));
  sdk.add(sdkRing); scene.add(sdk);

  /* ── particle field ── */
  const N = 2400, pp = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = 14 + Math.pow(Math.random(), .6) * 90, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    pp[i * 3] = r * Math.sin(ph) * Math.cos(th); pp[i * 3 + 1] = r * Math.cos(ph) * .7; pp[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
  }
  const starGeo = new THREE.BufferGeometry(); starGeo.setAttribute('position', new THREE.BufferAttribute(pp, 3));
  const starMat = track(new THREE.PointsMaterial({ size: .16, transparent: true, depthWrite: false, opacity: .8 }), 'ink');
  const stars = new THREE.Points(starGeo, starMat); scene.add(stars);
  themeHooks.push(() => { starMat.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending; starMat.opacity = isLight ? .5 : .7; starMat.needsUpdate = true; });

  /* ── lab cluster (personal projects) ── */
  const LAB = new THREE.Vector3(-32, 0, -6);
  const lab = new THREE.Group(); lab.position.copy(LAB); scene.add(lab);
  const edge = (geo, key = 'a', op = .85) => new THREE.LineSegments(new THREE.EdgesGeometry(geo), track(new THREE.LineBasicMaterial({ transparent: true, opacity: op }), key));
  const solid = (geo, key = 'b', op = .25) => new THREE.Mesh(geo, track(new THREE.MeshBasicMaterial({ transparent: true, opacity: op, depthWrite: false }), key));
  const labItems = [];
  // 1 — chat: connected bubbles
  { const g = new THREE.Group(); g.position.x = -7;
    const bubbles = [[0, 0, 0, 1.2], [2, 1.4, .4, .75], [-1.8, -1.5, -.3, .6], [1.6, -1.8, .6, .45]];
    bubbles.forEach(([x, y, z, r]) => { const geo = new THREE.IcosahedronGeometry(r, 1); const m = new THREE.Group(); m.position.set(x, y, z); m.add(edge(geo), solid(geo)); g.add(m); });
    const lp = []; [[0, 1], [0, 2], [0, 3]].forEach(([a, b]) => lp.push(new THREE.Vector3(...bubbles[a].slice(0, 3)), new THREE.Vector3(...bubbles[b].slice(0, 3))));
    g.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(lp), track(new THREE.LineBasicMaterial({ transparent: true, opacity: .5 }), 'b')));
    lab.add(g); labItems.push(g); }
  // 2 — kanban columns
  { const g = new THREE.Group(); g.position.x = 0;
    [[3, -1.6], [2, 0], [4, 1.6]].forEach(([n, x], c) => { for (let i = 0; i < n; i++) { const geo = new THREE.BoxGeometry(1.2, .6, .25); const m = new THREE.Group(); m.position.set(x, i * .8 - 1.2, 0); m.add(edge(geo, c === 2 ? 'b' : 'a'), solid(geo, c === 2 ? 'b' : 'a', .18)); g.add(m); } });
    lab.add(g); labItems.push(g); }
  // 3 — vehicle gauge
  { const g = new THREE.Group(); g.position.x = 7;
    const arc = new THREE.Mesh(new THREE.TorusGeometry(1.9, .08, 8, 64, Math.PI * 1.5), track(new THREE.MeshBasicMaterial({ transparent: true, opacity: .9 }), 'a')); arc.rotation.z = Math.PI * 0.75;
    const arc2 = new THREE.Mesh(new THREE.TorusGeometry(1.3, .04, 8, 64), track(new THREE.MeshBasicMaterial({ transparent: true, opacity: .5 }), 'b'));
    const needle = new THREE.Mesh(new THREE.BoxGeometry(1.6, .07, .07), track(new THREE.MeshBasicMaterial(), 'ink')); needle.geometry.translate(.8, 0, 0);
    const hub = new THREE.Mesh(new THREE.SphereGeometry(.16, 12, 12), track(new THREE.MeshBasicMaterial(), 'b'));
    g.userData.needle = needle;
    g.add(arc, arc2, needle, hub); lab.add(g); labItems.push(g); }
  ['Real-time chat', 'Task manager', 'Vehicle dashboard'].forEach((t, i) => {
    const tag = document.createElement('div'); tag.className = 'tag'; tag.textContent = t; labelsEl.appendChild(tag);
    labelDefs.push({ el: tag, pos: new THREE.Vector3(LAB.x + (i - 1) * 7, LAB.y - 3.6, LAB.z), sec: 4, proj: i });
  });

  /* ── skills sphere ── */
  const SK = new THREE.Vector3(30, 1.5, -10);
  const skillGroup = new THREE.Group(); skillGroup.position.copy(SK); scene.add(skillGroup);
  const skillCore = new THREE.Mesh(new THREE.IcosahedronGeometry(3.4, 1), track(new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: .1 }), 'ink'));
  skillGroup.add(skillCore);
  const sprites = [];
  const labelTex = (text, color) => {
    const cv = document.createElement('canvas'), cx = cv.getContext('2d'), fs = 46;
    cx.font = `500 ${fs}px "JetBrains Mono", monospace`;
    const w = Math.ceil(cx.measureText(text).width) + 24; cv.width = w; cv.height = fs + 24;
    cx.font = `500 ${fs}px "JetBrains Mono", monospace`; cx.textBaseline = 'middle'; cx.fillStyle = '#' + color.getHexString(); cx.fillText(text, 12, cv.height / 2 + 2);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return { t, w: cv.width, h: cv.height };
  };
  const total = SKILLS.reduce((n, [, l]) => n + l.length, 0); let idx = 0;
  SKILLS.forEach(([cat, list], ci) => list.forEach(name => {
    const y = 1 - (idx / (total - 1)) * 2, rr = Math.sqrt(1 - y * y), th = idx * 2.399963;
    const R = 5.6, p = new THREE.Vector3(Math.cos(th) * rr * R, y * R, Math.sin(th) * rr * R);
    const mat = new THREE.SpriteMaterial({ transparent: true, depthWrite: false });
    const sp = new THREE.Sprite(mat); sp.position.copy(p);
    sp.userData = { name, ci, base: p.clone() };
    skillGroup.add(sp); sprites.push(sp); idx++;
  }));
  const buildSkillTextures = () => sprites.forEach(sp => {
    const { t, w, h } = labelTex(sp.userData.name, catColor(sp.userData.ci));
    sp.material.map?.dispose(); sp.material.map = t; sp.material.needsUpdate = true; sp.scale.set(w / h * .62, .62, 1);
  });
  themeHooks.push(buildSkillTextures);

  /* skills UI */
  const sgWrap = $('#skill-groups');
  SKILLS.forEach(([cat, list], i) => {
    const d = document.createElement('div'); d.className = 'sg glass reveal';
    d.innerHTML = `<h4><i></i>${cat}</h4><p>${list.join(' · ')}</p>`;
    d.addEventListener('pointerenter', () => skillFocus = i);
    d.addEventListener('pointerleave', () => skillFocus = -1);
    sgWrap.appendChild(d);
  });
  const sgRefresh = () => $$('.sg').forEach((d, i) => d.style.setProperty('--c', '#' + catColor(i).getHexString()));
  themeHooks.push(sgRefresh);

  applyTheme();

  /* ── camera keyframes ── */
  const KF = [
    { p: [0, 1.2, 16], l: [0, 0, 0] },        // hero
    { p: [8, 2.5, 10], l: [-4.5, 0, 0] },     // profile   (core drifts right)
    { p: [-8, 4, 9], l: [5, 0, 0] },          // experience (core drifts left)
    { p: [0, 11, 14], l: [0, 0, 0] },         // system
    { p: [-32, 1.2, 8.5], l: [-27, .2, -6] }, // lab (cluster right of text)
    { p: [31, 2, 11], l: [27.5, 1.5, -10] },     // skills (sphere right of text)
    { p: [0, 3, 26], l: [0, 0, 0] },          // contact
  ];
  const ARC = [0, 0, 0, 0, 0, 14, 0];  // lift while crossing the core between lab → skills
  const P = KF.map(k => new THREE.Vector3(...k.p)), L = KF.map(k => new THREE.Vector3(...k.l));
  const camPos = new THREE.Vector3().copy(P[0]), camLook = new THREE.Vector3().copy(L[0]);
  const tp = new THREE.Vector3(), tl = new THREE.Vector3(), tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3();
  let anchors = [], docH = 1;
  const measure = () => { anchors = sections.map(s => s.offsetTop + s.offsetHeight / 2); docH = document.documentElement.scrollHeight - innerHeight; };
  let focusBlend = 0, secF = 0;

  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h;
    camera.fov = w < 700 ? 70 : 55; camera.updateProjectionMatrix(); measure();
  }
  addEventListener('resize', resize); resize();
  addEventListener('load', measure);
  new ResizeObserver(measure).observe(document.body);

  /* ── frame loop ── */
  const clock = new THREE.Clock(); const tv = new THREE.Vector3();
  const timeScale = reduce ? .15 : 1;
  const cursorBlend = { v: 0 };
  function frame() {
    const dt = Math.min(clock.getDelta(), .05), t = clock.elapsedTime * timeScale;
    mouse.sx = lerp(mouse.sx, mouse.x, .05); mouse.sy = lerp(mouse.sy, mouse.y, .05);

    // scene motion
    coreMat.uniforms.uTime.value = t;
    core.rotation.y = t * .12; coreWire.rotation.y = -t * .08; coreWire.rotation.x = t * .05;
    coreInner.rotation.x = t * .6; coreInner.rotation.y = t * .8;
    sdk.rotation.y = t * .05; stars.rotation.y = t * .004;

    const pa = pulseGeo.attributes.position.array;
    apps.forEach((a, i) => {
      const ang = t * a.speed + a.phase, x = Math.cos(ang) * a.r, z0 = Math.sin(ang) * a.r;
      a.pos.set(x, z0 * Math.sin(a.tilt), z0 * Math.cos(a.tilt));
      a.g.position.copy(a.pos); a.g.rotation.x = t * .5 + i; a.g.rotation.y = t * .7;
      const target = focusApp === i ? 1.9 : 1; a.scale = lerp(a.scale, target, .1); a.g.scale.setScalar(a.scale);
      const dim = focusApp >= 0 && focusApp !== i ? .35 : 1;
      a.w.material.opacity = lerp(a.w.material.opacity, dim, .1);
      const lp = a.link.geometry.attributes.position; lp.setXYZ(1, a.pos.x, a.pos.y, a.pos.z); lp.needsUpdate = true;
      a.link.material.opacity = focusApp === i ? .9 : .28 * dim;
      for (let k = 0; k < PULSES; k++) { const u = (t * (.22 + i * .03) + k / PULSES) % 1, o = (i * PULSES + k) * 3; pa[o] = a.pos.x * u; pa[o + 1] = a.pos.y * u; pa[o + 2] = a.pos.z * u; }
    });
    pulseGeo.attributes.position.needsUpdate = true;

    labItems.forEach((g, i) => {
      const f = focusProj === i ? 1.3 : 1; g.scale.setScalar(lerp(g.scale.x, f, .1));
      g.rotation.y += dt * (focusProj === i ? 1.4 : .35);
      if (g.userData.needle) g.userData.needle.rotation.z = Math.PI * .75 + (Math.sin(t * 1.2) * .5 + .5) * Math.PI * 1.4;
    });
    skillGroup.rotation.y += dt * (skillFocus >= 0 ? .05 : .12);
    sprites.forEach(sp => { const on = skillFocus < 0 || sp.userData.ci === skillFocus; sp.material.opacity = lerp(sp.material.opacity, on ? 1 : .12, .12); });

    // camera path
    const sc = scrollY + innerHeight * .5;
    let i = 0; while (i < anchors.length - 1 && sc >= anchors[i + 1]) i++;
    let f = i >= anchors.length - 1 ? 0 : clamp((sc - anchors[i]) / (anchors[i + 1] - anchors[i]));
    if (sc < anchors[0]) f = 0;
    f = smooth(clamp((f - .2) / .6));                       // dwell at each station
    const j = Math.min(i + 1, KF.length - 1);
    tp.lerpVectors(P[i], P[j], f); tl.lerpVectors(L[i], L[j], f);
    tp.y += Math.sin(f * Math.PI) * ARC[i];
    secF = i + f;

    // focus overrides
    const wantFocus = focusApp >= 0 && Math.abs(secF - 3) < .6 ? 1 : 0;
    focusBlend = lerp(focusBlend, wantFocus, .06);
    if (focusBlend > .001) {
      const a = apps[Math.max(focusApp, 0)];
      tmp.copy(a.pos).normalize().multiplyScalar(4.2).add(a.pos); tmp.y += 1.4;
      tp.lerp(tmp, focusBlend); tl.lerp(a.pos, focusBlend);
    }
    tp.x += mouse.sx * 1.1; tp.y += -mouse.sy * .7;
    const k = reduce ? 1 : 1 - Math.pow(.0009, dt);         // frame-rate independent damping
    camPos.lerp(tp, k); camLook.lerp(tl, k);
    camera.position.copy(camPos); camera.lookAt(camLook);

    // html labels
    const w = innerWidth, h = innerHeight;
    labelDefs.forEach(d => {
      const near = 1 - clamp(Math.abs(secF - d.sec) / .85);
      if (d.app !== undefined) tv.copy(apps[d.app].pos); else tv.copy(d.pos);
      if (d.proj !== undefined) { tv.set(0, -3.6, 0); tv.x = (d.proj - 1) * 7; tv.applyAxisAngle(new THREE.Vector3(0, 1, 0), labItems[d.proj].rotation.y * 0); tv.add(LAB); }
      tv.project(camera);
      const vis = tv.z < 1 && near > .05;
      d.el.style.opacity = vis ? near : 0;
      d.el.style.transform = `translate(${(tv.x * .5 + .5) * w}px,${(-tv.y * .5 + .5) * h}px) translate(-50%, -140%)`;
      d.el.classList.toggle('on', (d.app === focusApp && focusApp >= 0) || (d.proj === focusProj && focusProj >= 0));
    });

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* hover bindings */
  $$('.app').forEach(el => {
    const i = +el.dataset.app;
    const on = () => focusApp = i, off = () => focusApp = -1;
    el.addEventListener('pointerenter', on); el.addEventListener('pointerleave', off);
    el.addEventListener('focus', on); el.addEventListener('blur', off);
  });
  $$('.proj').forEach(el => {
    const i = +el.dataset.proj;
    el.addEventListener('pointerenter', () => focusProj = i); el.addEventListener('pointerleave', () => focusProj = -1);
    el.addEventListener('focus', () => focusProj = i); el.addEventListener('blur', () => focusProj = -1);
  });
} else {
  applyTheme();
}

/* ───────────── UI: theme, nav, scroll fx ───────────── */
$('#theme-btn').addEventListener('click', toggleTheme);
function toggleTheme() {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch { }
  setTimeout(applyTheme, 20);
}
addEventListener('pointermove', e => { mouse.x = e.clientX / innerWidth * 2 - 1; mouse.y = e.clientY / innerHeight * 2 - 1; });

// reveal + counters
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; e.target.classList.add('in'); io.unobserve(e.target);
  const n = $('[data-count]', e.target); if (n) countUp(n);
}), { threshold: .15 });
$$('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 6) * 60 + 'ms'; io.observe(el); });
function countUp(el) {
  const to = +el.dataset.count, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '', t0 = performance.now(), d = 1400;
  if (reduce) return;
  const step = now => { const p = clamp((now - t0) / d); el.textContent = pre + Math.round(to * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

// active nav + progress rail
const links = $$('.nav nav a'), fill = $('.rail-fill');
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -45% 0px' });
sections.forEach(s => spy.observe(s));
addEventListener('scroll', () => { fill.style.height = clamp(scrollY / (document.documentElement.scrollHeight - innerHeight)) * 100 + '%'; }, { passive: true });

// tilt cards
$$('.tilt').forEach(el => {
  if (isTouch) return;
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', (x - .5) * 6 + 'deg'); el.style.setProperty('--rx', (.5 - y) * 6 + 'deg');
    el.style.setProperty('--gx', x * 100 + '%'); el.style.setProperty('--gy', y * 100 + '%');
  });
  el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
});

// cursor
const cur = $('.cursor');
if (!isTouch) {
  let cx = 0, cy = 0, tx = 0, ty = 0;
  addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; cur.classList.add('on'); });
  (function loop() { cx = lerp(cx, tx, .2); cy = lerp(cy, ty, .2); cur.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
  document.addEventListener('pointerover', e => cur.classList.toggle('big', !!e.target.closest('a,button,.app,.proj,.sg,.tilt,input')));
}

/* ───────────── command palette ───────────── */
const pal = $('#palette'), pin = $('#palette-input'), plist = $('#palette-list');
const cmds = [
  ...[['Hero', '#hero'], ['Profile', '#profile'], ['Experience', '#experience'], ['The Bankerise system', '#system'], ['The lab (projects)', '#work'], ['Skills', '#skills'], ['Contact', '#contact']].map(([n, h]) => ({ n, k: 'section', run: () => document.querySelector(h).scrollIntoView({ behavior: 'smooth', block: 'center' }) })),
  { n: 'Toggle dark / light', k: 'theme', run: toggleTheme },
  { n: 'Download CV', k: 'file', run: () => { const a = document.createElement('a'); a.href = 'Bessem_Kortas_CV.pdf'; a.download = ''; a.click(); } },
  { n: 'Send an email', k: 'contact', run: () => location.href = 'mailto:Bessem.kortas.1@gmail.com' },
  { n: 'Open LinkedIn', k: 'link', run: () => open('https://www.linkedin.com/in/bessem-kortas', '_blank', 'noopener') },
  { n: 'Open GitHub', k: 'link', run: () => open('https://github.com/Bessem-kortas', '_blank', 'noopener') },
];
let sel = 0, shown = cmds;
function renderPal() {
  const q = pin.value.trim().toLowerCase(); shown = cmds.filter(c => c.n.toLowerCase().includes(q) || c.k.includes(q)); sel = Math.min(sel, Math.max(shown.length - 1, 0));
  plist.innerHTML = shown.map((c, i) => `<li class="${i === sel ? 'sel' : ''}" data-i="${i}">${c.n}<small>${c.k}</small></li>`).join('');
}
function openPal() { pal.hidden = false; pin.value = ''; sel = 0; renderPal(); pin.focus(); }
function closePal() { pal.hidden = true; }
function runSel(i = sel) { const c = shown[i]; if (!c) return; closePal(); c.run(); }
$('#palette-btn').addEventListener('click', openPal);
pin.addEventListener('input', () => { sel = 0; renderPal(); });
plist.addEventListener('click', e => { const li = e.target.closest('li'); if (li) runSel(+li.dataset.i); });
pal.addEventListener('pointerdown', e => { if (e.target === pal) closePal(); });
addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.hidden ? openPal() : closePal(); return; }
  if (pal.hidden) return;
  if (e.key === 'Escape') closePal();
  else if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % shown.length; renderPal(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); sel = (sel - 1 + shown.length) % shown.length; renderPal(); }
  else if (e.key === 'Enter') runSel();
});

/* ───────────── loader ───────────── */
(() => {
  const L = $('#loader'), pct = $('#loader-pct'); let p = 0;
  const t0 = performance.now();
  const iv = setInterval(() => {
    const target = document.readyState === 'complete' ? 100 : 85; p = Math.min(target, p + (target - p) * .08 + .6);
    pct.textContent = Math.round(p) + '%'; L.style.setProperty('--p', p / 100);
    if (p >= 99.5 && performance.now() - t0 > 900) { clearInterval(iv); L.classList.add('done'); document.body.classList.add('ready'); }
  }, 30);
})();
