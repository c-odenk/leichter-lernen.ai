<template>
  <div class="view-login">
    <!-- Mobile-Ansicht -->
    <MobileNotice v-if="isMobile" />

    <!-- Desktop/Tablet-Ansicht -->
    <div v-else class="desktop-view" :class="{ 'tablet-view': isTablet }">
      <!-- Wallpaper-Komponente wird nun immer angezeigt, auch im Tablet-Modus -->
      <div class="left-panel" :class="{ 'full-width': isTablet }">
        <LoginWallpaper />
      </div>

      <!-- Login-Panel mit zusätzlicher Klasse für Tablet-Modus -->
      <div class="right-panel" :class="{ 'overlay-panel': isTablet }">
        <LoginUserLogin />
      </div>
    </div>

    <!-- 
      Waitlist-Komponente - wird nur geladen, nicht angezeigt
      Später mit v-if="showWaitlist" steuerbar machen
    -->
    <Suspense>
      <template #default>
        <component
          :is="LoginWaitlist"
          v-if="false"
          class="waitlist-component"
        />
      </template>
      <template #fallback>
        <!-- Fallback während des Ladens, leer da nicht angezeigt -->
      </template>
    </Suspense>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, defineAsyncComponent } from "vue";
import LoginWallpaper from "@/components/login/Login-Wallpaper.vue";
import LoginUserLogin from "@/components/login/Login-User-Login.vue";
import MobileNotice from "@/components/mobilenotice/Mobile-Notice.vue";

// Lazy-Load der Waitlist-Komponente für bessere Performance
const LoginWaitlist = defineAsyncComponent(() =>
  import("@/components/login/Login-Waitlist.vue")
);

export default {
  name: "ViewLogin",
  components: {
    LoginWallpaper,
    LoginUserLogin,
    MobileNotice,
  },
  setup() {
    // Reaktive Zustände
    const isMobile = ref(false);
    const isTablet = ref(false);

    // Hilfsfunktionen
    const checkDevice = () => {
      const width = window.innerWidth;
      isMobile.value = width <= 767; // Entspricht $breakpoint-smartphone
      isTablet.value = width > 767 && width <= 1024; // Zwischen smartphone und laptop (tablet-Bereich)
    };

    // Lifecycle-Hooks und Event-Handling
    onMounted(() => {
      // Initial prüfen
      checkDevice();

      // Event-Listener hinzufügen mit throttling
      const resizeHandler = (function () {
        let timeout;
        return function () {
          clearTimeout(timeout);
          timeout = setTimeout(checkDevice, 150);
        };
      })();

      window.addEventListener("resize", resizeHandler);

      // Cleanup-Funktion
      onUnmounted(() => {
        window.removeEventListener("resize", resizeHandler);
      });
    });

    return {
      isMobile,
      isTablet,
      LoginWaitlist, // Komponente an das Template übergeben
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

// Haupt-Container
.view-login {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

// Desktop-Layout
.desktop-view {
  display: flex;
  width: 100%;
  height: 100%;

  &.tablet-view {
    // Im Tablet-Modus nutzen wir eine andere Positionierungsstrategie
    position: relative;
  }
}

// Linke Spalte (Wallpaper)
.left-panel {
  width: 50%;
  height: 100vh;

  &.full-width {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
}

// Rechte Spalte (Login)
.right-panel {
  width: 50%;
  height: 100vh;
  position: relative;

  &.overlay-panel {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }
}

// Waitlist (initial versteckt)
.waitlist-component {
  display: none;
}

// Mediaqueries für zusätzliche CSS-basierte Anpassungen
@include respond(tablet-only) {
  // Anpassungen werden jetzt hauptsächlich über die Vue-Klassen gesteuert
}
</style>
