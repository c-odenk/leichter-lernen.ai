<template>
  <section class="shader-hero">
    <!-- Shader Background -->
    <div ref="containerRef" class="shader-canvas"></div>

    <!-- Content Layer -->
    <div class="shader-hero__content">
      <h1>
        Effizienter <span class="highlight">lernen mit KI</span> – schneller
        verstehen, besser merken!
      </h1>

      <p>
        Automatische Zusammenfassungen, smarte Lernkarten und ein intelligenter
        KI-Tutor für all deine Fragen.
        <b>Lerne schneller, effektiver und ohne Umwege!</b>
      </p>

      <div class="link-group">
        <LinkButtonBlue to="/login">
          Jetzt ausprobieren <i class="fa-solid fa-arrow-right"></i>
        </LinkButtonBlue>
        <router-link to="/produkt" class="text-link">
          Mehr erfahren
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-search-icon lucide-search"
          >
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
        </router-link>
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
  renderer.setClearColor(0xffffff, 1);
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
  height: 60vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  @include respond(laptop) {
  }

  @include respond(tablet) {
    height: 40vh;
  }

  @include respond(phone) {
    height: 80vh;
  }

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
      width: 90vw;
    }

    @include respond(phone) {
      width: 90vw;
    }

    h1 {
      margin: 0;
      padding: 0;
      font-size: 35px;
      line-height: 1.1;
      color: $color-dark-blue;

      @include respond(laptop) {
        font-size: 28px;
      }

      @include respond(tablet) {
        font-size: 32px;
      }

      @include respond(phone) {
        font-size: 26px;
        line-height: 1.35;
      }

      .highlight {
        color: $color-light-blue;
      }
    }

    p {
      margin: $spacing-md 0 calc($spacing-md + 10px) 0;
      font-size: $font-size-p-desktop;
      letter-spacing: $letter-spacing-p-desktop;
      line-height: $line-height-p-desktop;
      color: $color-text-dark;

      @include respond(laptop) {
        margin: calc($spacing-xs + 5px) 0 calc($spacing-xs + 10px) 0;
        font-size: $font-size-p-laptop;
        letter-spacing: $letter-spacing-p-laptop;
        line-height: $line-height-p-laptop;
      }

      @include respond(tablet) {
        font-size: $font-size-p-tablet;
        letter-spacing: $letter-spacing-p-tablet;
        line-height: $line-height-p-tablet;
        margin: $spacing-sm 0 $spacing-md 0;
      }

      @include respond(phone) {
        font-size: $font-size-p-phone;
        letter-spacing: $letter-spacing-p-phone;
        line-height: $line-height-p-phone;
        margin: $spacing-sm 0 $spacing-md 0;
      }
    }

    .link-group {
      display: flex;
      gap: $spacing-sm;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;

      @include respond(phone) {
        flex-direction: column;
        width: 100%;
        gap: $spacing-xs;
      }

      .text-link {
        margin: 0 0 0 10px;
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        font-size: $font-size-p-desktop;
        letter-spacing: $letter-spacing-p-desktop;
        font-weight: 600;
        color: $color-dark-blue;

        @include respond(laptop) {
          font-size: $font-size-p-laptop;
          letter-spacing: $letter-spacing-p-laptop;
        }

        @include respond(tablet) {
          font-size: $font-size-p-tablet;
          letter-spacing: $letter-spacing-p-tablet;
        }

        @include respond(phone) {
          font-size: $font-size-p-phone;
          letter-spacing: $letter-spacing-p-phone;
          margin: 0;
        }

        svg {
          width: 16px;
          height: 16px;
          margin: 0 0 0 10px;

          @include respond(laptop) {
            width: 15px;
            height: 15px;
          }

          @include respond(tablet) {
            width: 14px;
            height: 14px;
          }

          @include respond(phone) {
            width: 13px;
            height: 13px;
            margin: 0 0 0 8px;
          }
        }
      }
    }
  }
}
</style>
