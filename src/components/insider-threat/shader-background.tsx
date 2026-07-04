"use client";

import { useEffect, useRef } from "react";

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const gl =
      (canvas.getContext("webgl") as WebGLRenderingContext | null) ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      return;
    }

    const vertexSource = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fragmentSource = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
varying vec2 v_texCoord;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = v_texCoord;
  vec2 grid = uv * vec2(20.0, 40.0);
  vec2 ipos = floor(grid);

  float n = hash(ipos);
  float t = u_time * 0.5;

  float speed = n * 2.0 + 1.0;
  float stream = fract(grid.y * 0.1 + t * speed);
  stream = smoothstep(0.9, 1.0, stream);

  float bit = step(0.98, hash(ipos + floor(t * 10.0)));

  vec3 color = vec3(0.043, 0.055, 0.078);
  vec3 accent1 = vec3(0.176, 0.831, 0.749);
  vec3 accent2 = vec3(0.961, 0.620, 0.043);

  color += stream * accent1 * 0.1;
  color += bit * accent2 * 0.15 * (1.0 - uv.y);

  float vig = 1.0 - length(uv - 0.5) * 1.2;
  color *= clamp(vig, 0.2, 1.0);

  gl_FragColor = vec4(color, 1.0);
}`;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);

      if (!shader) {
        return null;
      }

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);

    if (!vertexShader || !fragmentShader) {
      return;
    }

    const program = gl.createProgram();

    if (!program) {
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();

    if (!buffer) {
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uResolution = gl.getUniformLocation(program, "u_resolution");

    const syncSize = () => {
      const width = canvas.clientWidth || 1280;
      const height = canvas.clientHeight || 720;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    syncSize();

    let animationFrame = 0;

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            syncSize();
          })
        : null;

    resizeObserver?.observe(canvas);

    const render = (time: number) => {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);

      if (uTime) {
        gl.uniform1f(uTime, time * 0.001);
      }

      if (uResolution) {
        gl.uniform2f(uResolution, canvas.width, canvas.height);
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrame = window.requestAnimationFrame(render);
    };

    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <div aria-hidden className="shader-backdrop">
      <canvas ref={canvasRef} className="shader-canvas" />
    </div>
  );
}
