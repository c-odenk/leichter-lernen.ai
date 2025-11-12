<template>
  <section class="shader-hero">
    <!-- Shader Background -->
    <div ref="containerRef" class="shader-canvas"></div>

    <!-- Content Layer -->
    <div class="shader-hero__content">
      <div class="welcome-badge">✨ Willkommen bei deinem KI-Tutor</div>

      <h1>
        Effizienter <span class="highlight">lernen mit KI</span> – schneller
        verstehen, besser merken!
      </h1>

      <p>
        Automatische Zusammenfassungen, smarte Lernkarten und ein intelligenter
        KI-Tutor für all deine Fragen.
        <b>Lerne schneller, effektiver und ohne Umwege!</b>
      </p>

      <div class="button-group">
        <LinkButtonBlue class="button" to="/login"
          >Jetzt ausprobieren <i className="fa-solid fa-arrow-right"></i
        ></LinkButtonBlue>
        <LinkButtonWhite class="button" to="/login"
          >Mehr erfahren <i class="fa-solid fa-circle-info"></i
        ></LinkButtonWhite>

        <!-- <LinkButtonBlue text="Jetzt ausprobieren" to="/login" /> -->
        <!-- <LinkButtonWhite text="Mehr erfahren" to="/produkt" /> -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import * as THREE from "three";

const containerRef = ref(null);
let sceneRef = null;

onMounted(() => {
  if (!containerRef.value) return;
  const container = containerRef.value;

  // Vertex Shader
  const vertexShader = `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `;

  // Fragment Shader
  const fragmentShader = `
    precision highp float;
    uniform vec2 resolution;
    uniform float time;

    void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.05;
        float lineWidth = 0.002;

        // Start mit reinem Weiß
        vec3 backgroundColor = vec3(1.0);
        
        // Exakter Blauton aus .highlight: darken(#3083e9, 10%) = #2874d3
        vec3 highlightBlue = vec3(0.157, 0.455, 0.827); // #2874d3
        vec3 lighterBlue = vec3(0.188, 0.514, 0.914);   // #3083e9 für Varianz
        
        // Akkumulator für Linienintensität pro Kanal
        vec3 lineIntensity = vec3(0.0);

        // Shader Linien Effekt
        for(int j = 0; j < 3; j++){
            for(int i = 0; i < 5; i++){
                float line = lineWidth * float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
                lineIntensity[j] += line * 0.15;
            }
        }

        lineIntensity = clamp(lineIntensity, 0.0, 1.0);
        
        // Mische die Highlight-Blue Farbe ein
        vec3 targetColor = mix(lighterBlue, highlightBlue, 0.7);
        vec3 color = backgroundColor - lineIntensity * (1.0 - targetColor);
        
        // Gamma-Korrektur für helleren Hintergrund
        color = pow(color, vec3(0.65));
        
        color = clamp(color, 0.0, 1.0);
        gl_FragColor = vec4(color, 1.0);
    }
  `;

  // THREE.js Setup
  const camera = new THREE.Camera();
  camera.position.z = 1;

  const scene = new THREE.Scene();
  const geometry = new THREE.PlaneGeometry(2, 2);

  const uniforms = {
    time: { value: 1.0 },
    resolution: { value: new THREE.Vector2() },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0xffffff, 1); // Hintergrund explizit weiß
  container.appendChild(renderer.domElement);

  const onWindowResize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    uniforms.resolution.value.x = renderer.domElement.width;
    uniforms.resolution.value.y = renderer.domElement.height;
  };

  onWindowResize();
  window.addEventListener("resize", onWindowResize, false);

  const animate = () => {
    sceneRef.animationId = requestAnimationFrame(animate);
    uniforms.time.value += 0.05;
    renderer.render(scene, camera);
  };

  sceneRef = {
    camera,
    scene,
    renderer,
    uniforms,
    geometry,
    material,
    animationId: 0,
  };

  animate();

  onBeforeUnmount(() => {
    window.removeEventListener("resize", onWindowResize);
    cancelAnimationFrame(sceneRef.animationId);
    container.removeChild(renderer.domElement);
    renderer.dispose();
    geometry.dispose();
    material.dispose();
  });
});
</script>

<style lang="scss" scoped>
@use "@/variables/variables.scss" as *;

.shader-hero {
  position: relative;
  width: 100%;
  height: 85vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  .shader-canvas {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  &__content {
    width: 45vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 1;
    color: $color-text-dark;

    @include respond(tablet) {
      width: 90%;
    }

    .welcome-badge {
      background: #fff;
      padding: 8px 20px;
      border-radius: 100px;
      font-size: $font-size-p-md;
      font-weight: 500;
      color: $color-text-dark;
      margin-bottom: $spacing-md;
      letter-spacing: $letter-spacing;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    h1 {
      margin: 0 0 $spacing-md 0;
      font-size: 60px;
      line-height: 1.1;
      letter-spacing: $letter-spacing;
      font-weight: 700;
      color: $color-text-dark;

      .highlight {
        color: $color-light-blue;
      }

      @include respond(laptop) {
        font-size: 40px;
      }

      @include respond(phone) {
        font-size: 32px;
      }
    }

    p {
      max-width: 700px;
      margin: 0 auto $spacing-lg auto;
      font-size: $font-size-p-xl;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
      color: $color-text-dark;

      b {
        font-weight: 600;
      }

      @include respond(laptop) {
        margin-bottom: $spacing-md;
        font-size: $font-size-p-lg;
      }

      @include respond(phone) {
        font-size: $font-size-p-sm;
      }
    }

    .button-group {
      display: flex;
      gap: $spacing-sm;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;

      @include respond(phone) {
        flex-direction: column;
        width: 100%;
      }
      & .button i {
        margin: 0 0 0 5px;
        font-size: 14px;
      }
    }
  }
}
</style>
