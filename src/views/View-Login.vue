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
      <div
        v-if="!showWaitlist"
        class="right-panel"
        :class="{ 'overlay-panel': isTablet }"
      >
        <LoginUserLogin />
      </div>

      <!-- Waitlist-Komponente - wird basierend auf showWaitlist angezeigt -->
      <div
        v-if="showWaitlist"
        class="right-panel"
        :class="{ 'overlay-panel': isTablet }"
      >
        <Suspense>
          <template #default>
            <component :is="LoginWaitlist" class="waitlist-component" />
          </template>
          <template #fallback>
            <div class="loading-fallback">
              <p>Wird geladen...</p>
            </div>
          </template>
        </Suspense>
      </div>
    </div>
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
    const showWaitlist = ref(true); // Schalter zur Steuerung der Waitlist-Anzeige

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
      showWaitlist, // Schalter für Waitlist-Anzeige
      LoginWaitlist, // Komponente an das Template übergeben
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../variables/variables.scss" as *;

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

// Rechte Spalte (Login oder Waitlist)
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

// Waitlist-Komponente
.waitlist-component {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

// Fallback während des Ladens
.loading-fallback {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: $font-size-p-xl;
  color: $color-dark-blue;
}

// Mediaqueries für zusätzliche CSS-basierte Anpassungen
@include respond(tablet-only) {
  // Anpassungen werden jetzt hauptsächlich über die Vue-Klassen gesteuert
}
</style>
