<template>
  <div class="view-landing">
    <Header />
    <div
      class="section-wrapper"
      v-for="(section, index) in sections"
      :key="section.key"
      :ref="(el) => setSectionRef(el, section.key)"
    >
      <component
        :is="section.component"
        class="fade-item"
        :class="getAnimationClass(section.key, index)"
      />
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
import LandingHero from "@/components/landing/Landing-Hero.vue";
// import LandingProduct from "@/components/landing/Landing-Product.vue";
import LandingBenefits from "@/components/landing/Landing-Benefits.vue";
import LandingTestimonials from "@/components/landing/Landing-Testimonials.vue";
import LandingQA from "@/components/landing/Landing-FAQ.vue";
import LandingCTA from "@/components/landing/Landing-CTA.vue";

export default {
  name: "ViewLanding",
  components: {
    Header,
    Footer,
    LandingHero,
    // LandingProduct,
    LandingBenefits,
    LandingTestimonials,
    LandingQA,
    LandingCTA,
  },
  setup() {
    const sections = ref([
      { key: "hero", component: LandingHero },
      // { key: "product", component: LandingProduct },
      { key: "benefits", component: LandingBenefits },
      { key: "testimonials", component: LandingTestimonials },
      { key: "cta", component: LandingCTA },
      { key: "qa", component: LandingQA },
    ]);

    const visibleSections = ref({});
    const sectionRefs = ref({});

    // Gerätetype-Erkennung
    const isSmartphone = ref(false);
    const isTablet = ref(false);
    const isLaptop = ref(false);
    const isDesktop = ref(false);

    const setSectionRef = (el, key) => {
      if (el) {
        sectionRefs.value[key] = el;
      }
    };

    const checkDeviceType = () => {
      // Breakpoints für die verschiedenen Ansichten
      isSmartphone.value = window.innerWidth <= 768;
      isTablet.value = window.innerWidth > 768 && window.innerWidth <= 1024;
      isLaptop.value = window.innerWidth > 1024 && window.innerWidth <= 1440;
      isDesktop.value = window.innerWidth > 1440;
    };

    // Bestimmt, ob eine Komponente animiert werden soll
    const shouldAnimateSection = (key) => {
      // Auf Smartphones nur die Hero-Komponente animieren
      if (isSmartphone.value) {
        return key === "hero";
      }

      // Für andere Geräte: Hero und Product (wenn es nicht Smartphone und nicht Laptop ist)
      if (key === "hero") {
        return true;
      }

      if (key === "product") {
        return isTablet.value || isDesktop.value;
      }

      return false;
    };

    const getAnimationClass = (key) => {
      // Entscheiden, ob diese Sektion animiert werden soll
      if (!shouldAnimateSection(key)) {
        return "static-visible";
      }

      // Animations-Klassen für animierte Sektionen
      return {
        "fade-in": visibleSections.value[key],
        "slide-in-left": key === "hero" && visibleSections.value[key],
        "slide-in-right delay": key === "product" && visibleSections.value[key],
      };
    };

    onMounted(() => {
      // Initial überprüfen, welches Gerät wir haben
      checkDeviceType();

      // Event-Listener für Resize-Events
      window.addEventListener("resize", checkDeviceType);

      nextTick(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;

              const key = entry.target.getAttribute("data-key");

              // Wenn die Sektion nicht animiert werden soll, direkt als sichtbar markieren
              if (!shouldAnimateSection(key)) {
                entry.target.classList.add("static-visible");
              } else {
                // Sonst für Animation vorbereiten
                visibleSections.value[key] = true;
              }
            });
          },
          { threshold: 0.3 }
        );

        Object.entries(sectionRefs.value).forEach(([key, el]) => {
          if (el) {
            el.setAttribute("data-key", key);
            observer.observe(el);

            // Nicht-animierte Sektionen sofort sichtbar machen
            if (!shouldAnimateSection(key)) {
              el.classList.add("static-visible");
            }
          }
        });
      });
    });

    return {
      sections,
      visibleSections,
      setSectionRef,
      getAnimationClass,
      isSmartphone,
      isTablet,
      isLaptop,
      isDesktop,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../variables/variables.scss" as *;

.view-landing {
  .section-wrapper {
    width: 100%;
    overflow: hidden;
  }

  .fade-item {
    opacity: 0;
    transition: opacity 1.2s ease-out, transform 1.2s ease-out;
  }

  .fade-in {
    opacity: 1;
    transform: translateY(0);
  }

  .slide-in-left {
    transform: translateX(-30px);
  }

  .slide-in-right {
    transform: translateX(30px);
  }

  .delay {
    transition-delay: 0.3s;
  }

  .fade-in,
  .slide-in-left,
  .slide-in-right {
    transform: translateX(0) translateY(0);
    opacity: 1;
  }

  .static-visible {
    opacity: 1;
    transform: none;
  }
}
</style>
