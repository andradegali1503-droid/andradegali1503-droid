import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_scroll;
  uniform vec3 u_colorA;
  uniform vec3 u_colorB;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = rot * p * 2.02 + vec2(100.0);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 aspectUV = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 mouseUV = (u_mouse - 0.5) * vec2(u_resolution.x / min(u_resolution.x, u_resolution.y), 1.0);

    float distToMouse = length(aspectUV - mouseUV);
    float mouseRipple = sin(distToMouse * 14.0 - u_time * 3.2) * exp(-distToMouse * 3.5) * 0.12;

    vec2 q = vec2(0.0);
    q.x = fbm(aspectUV * 1.8 + 0.12 * u_time + u_scroll * 0.35);
    q.y = fbm(aspectUV * 1.8 + vec2(1.2, 3.4) - 0.1 * u_time);

    vec2 r = vec2(0.0);
    r.x = fbm(aspectUV * 2.2 + 1.5 * q + vec2(1.7, 9.2) + 0.15 * u_time + mouseRipple);
    r.y = fbm(aspectUV * 2.2 + 1.5 * q + vec2(8.3, 2.8) + 0.12 * u_time - mouseRipple);

    float f = fbm(aspectUV * 1.6 + r);

    // Base deep sapphire-to-amethyst twilight canvas (rich darks & subtle light lift)
    vec3 col = mix(vec3(0.024, 0.028, 0.072), vec3(0.068, 0.046, 0.145), clamp(uv.y * 0.85 + 0.15, 0.0, 1.0));

    // Blend harmonic Blue -> Indigo -> Light Violet through domain-warped field
    vec3 midIndigo = mix(u_colorA, u_colorB, 0.52);
    col = mix(col, u_colorA * 0.30, clamp((f * f) * 2.3, 0.0, 1.0));
    col = mix(col, midIndigo * 0.25, clamp(length(q) * 0.85, 0.0, 1.0));
    col = mix(col, u_colorB * 0.28, clamp(length(r.x) * 0.9, 0.0, 1.0));

    // Topological contour lines with soft lavender-blue iridescence
    float contour = abs(fract(f * 10.0 + u_time * 0.08) - 0.5);
    float line = smoothstep(0.46, 0.495, contour);
    col += line * mix(u_colorA, u_colorB, uv.x) * 0.11;

    // Cursor energy aura (Blue to Light Violet glow)
    float aura = exp(-distToMouse * 3.8);
    col += aura * mix(u_colorA, u_colorB, 0.55) * 0.24;

    float vignette = smoothstep(1.42, 0.18, length(aspectUV));
    col *= mix(0.45, 1.0, vignette);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const PALETTES = [
  { a: [0.22, 0.74, 0.97], b: [0.78, 0.56, 0.99] }, // Mode 0: Sky Cyan-Blue (#38bdf8) -> Light Violet (#c78ff8)
  { a: [0.38, 0.65, 0.98], b: [0.85, 0.71, 0.99] }, // Mode 1: Sapphire Blue (#60a5fa) -> Pastel Lavender (#d8b4fe)
  { a: [0.18, 0.83, 0.75], b: [0.66, 0.55, 0.98] }  // Mode 2: Teal-Blue (#2dd4bf) -> Soft Indigo-Violet (#a78bfa)
];

export default function WebGLShaderCanvas({ shaderPreset = 0 }) {
  const glCanvasRef = useRef(null);
  const netCanvasRef = useRef(null);
  const targetPresetRef = useRef(shaderPreset);

  useEffect(() => {
    targetPresetRef.current = shaderPreset;
  }, [shaderPreset]);

  useEffect(() => {
    const glCanvas = glCanvasRef.current;
    const netCanvas = netCanvasRef.current;
    if (!glCanvas || !netCanvas) return;

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const gl = glCanvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'high-performance' });
    const ctx2d = netCanvas.getContext('2d');

    let animId = null;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let scrollNorm = 0;

    // Interpolated RGB colors for smooth shader morphing
    const curColorA = [...PALETTES[0].a];
    const curColorB = [...PALETTES[0].b];

    // Compile WebGL Shader Program if WebGL is available
    let program = null;
    let uniforms = {};

    if (gl) {
      const compile = (type, src) => {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
          gl.deleteShader(s);
          return null;
        }
        return s;
      };

      const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

      if (vs && fs) {
        program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
          gl.useProgram(program);
          const buf = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, buf);
          gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
            gl.STATIC_DRAW
          );
          const posLoc = gl.getAttribLocation(program, 'a_position');
          gl.enableVertexAttribArray(posLoc);
          gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

          uniforms = {
            res: gl.getUniformLocation(program, 'u_resolution'),
            time: gl.getUniformLocation(program, 'u_time'),
            mouse: gl.getUniformLocation(program, 'u_mouse'),
            scroll: gl.getUniformLocation(program, 'u_scroll'),
            colA: gl.getUniformLocation(program, 'u_colorA'),
            colB: gl.getUniformLocation(program, 'u_colorB')
          };
        } else {
          program = null;
        }
      }
    }

    // 3D Topological Network Nodes (Layer 2)
    const NODE_COUNT = width < 768 ? 28 : 52;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.6 + 0.8
    }));

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);

      glCanvas.width = Math.floor(width * dpr * 0.65);
      glCanvas.height = Math.floor(height * dpr * 0.65);
      if (gl) {
        gl.viewport(0, 0, glCanvas.width, glCanvas.height);
      }

      netCanvas.width = Math.floor(width * dpr);
      netCanvas.height = Math.floor(height * dpr);
      if (ctx2d) {
        ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    const handlePointerMove = (e) => {
      mouse.tx = e.clientX / Math.max(width, 1);
      mouse.ty = 1.0 - e.clientY / Math.max(height, 1);
    };

    const handleScroll = () => {
      scrollNorm = window.scrollY / Math.max(window.innerHeight, 1);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const startTime = performance.now();

    const renderFrame = (now) => {
      const elapsed = (now - startTime) * 0.001;

      // Smooth pointer interpolation
      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;

      // Smooth palette morphing
      const targetPal = PALETTES[targetPresetRef.current] || PALETTES[0];
      for (let i = 0; i < 3; i++) {
        curColorA[i] += (targetPal.a[i] - curColorA[i]) * 0.024;
        curColorB[i] += (targetPal.b[i] - curColorB[i]) * 0.024;
      }

      // Render WebGL Shader
      if (gl && program) {
        gl.uniform2f(uniforms.res, glCanvas.width, glCanvas.height);
        gl.uniform1f(uniforms.time, prefersReduced ? 1.0 : elapsed);
        gl.uniform2f(uniforms.mouse, mouse.x, mouse.y);
        gl.uniform1f(uniforms.scroll, scrollNorm);
        gl.uniform3f(uniforms.colA, curColorA[0], curColorA[1], curColorA[2]);
        gl.uniform3f(uniforms.colB, curColorB[0], curColorB[1], curColorB[2]);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      // Render 2D Telemetry Constellation Overlay (Blue-to-Light-Violet Dual Tone)
      if (ctx2d) {
        ctx2d.clearRect(0, 0, width, height);
        const mx = mouse.x * width;
        const my = (1.0 - mouse.y) * height;
        const rgbA = `${Math.round(curColorA[0] * 255)}, ${Math.round(curColorA[1] * 255)}, ${Math.round(curColorA[2] * 255)}`;
        const rgbB = `${Math.round(curColorB[0] * 255)}, ${Math.round(curColorB[1] * 255)}, ${Math.round(curColorB[2] * 255)}`;

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const nodeRgb = i % 2 === 0 ? rgbA : rgbB;
          if (!prefersReduced) {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > width) n.vx *= -1;
            if (n.y < 0 || n.y > height) n.vy *= -1;
          }

          const dxm = mx - n.x;
          const dym = my - n.y;
          const distM = Math.hypot(dxm, dym);
          if (distM < 190) {
            ctx2d.beginPath();
            ctx2d.moveTo(n.x, n.y);
            ctx2d.lineTo(mx, my);
            ctx2d.strokeStyle = `rgba(${nodeRgb}, ${(1 - distM / 190) * 0.28})`;
            ctx2d.lineWidth = 0.85;
            ctx2d.stroke();
          }

          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
            if (dist < 135) {
              ctx2d.beginPath();
              ctx2d.moveTo(n.x, n.y);
              ctx2d.lineTo(n2.x, n2.y);
              ctx2d.strokeStyle = `rgba(${nodeRgb}, ${(1 - dist / 135) * 0.15})`;
              ctx2d.lineWidth = 0.65;
              ctx2d.stroke();
            }
          }

          ctx2d.beginPath();
          ctx2d.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx2d.fillStyle = `rgba(${nodeRgb}, 0.54)`;
          ctx2d.fill();
        }
      }

      if (!prefersReduced) {
        animId = requestAnimationFrame(renderFrame);
      }
    };

    animId = requestAnimationFrame(renderFrame);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="quantum-canvas-stage" aria-hidden="true">
      <canvas ref={glCanvasRef} className="quantum-gl-canvas" />
      <canvas ref={netCanvasRef} className="quantum-net-canvas" />
      <div className="quantum-noise-overlay" />
      <div className="quantum-vignette-overlay" />
    </div>
  );
}
