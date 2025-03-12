<template>
  <div class="agb">
    <div class="agb_row">
      <h2>Allgemeine Geschäftsbedingungen (AGB)</h2>

      <h3>1. Geltungsbereich</h3>
      <p>
        Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle
        Geschäftsbeziehungen zwischen der {{ unternehmen }} (nachfolgend
        „Anbieter“) und ihren Kunden in der jeweils gültigen Fassung.
      </p>

      <h3>2. Vertragsschluss</h3>
      <p>
        Die Darstellung der Produkte und Dienstleistungen auf unserer Website
        stellt kein rechtlich bindendes Angebot dar, sondern eine unverbindliche
        Einladung zur Abgabe einer Bestellung. Ein Vertrag kommt erst durch
        unsere ausdrückliche Annahme der Bestellung zustande.
      </p>

      <h3>3. Preise und Zahlungsbedingungen</h3>
      <p>
        Alle angegebenen Preise sind Endpreise und enthalten die gesetzliche
        Mehrwertsteuer. Der Anbieter behält sich das Recht vor, Preise jederzeit
        zu ändern. Die Zahlung erfolgt wahlweise per {{ zahlungsarten }}.
      </p>

      <h3>4. Widerrufsrecht</h3>
      <p>
        Kunden haben das Recht, binnen {{ widerrufsfrist }} Tagen ohne Angabe
        von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beginnt mit
        dem Tag des Vertragsschlusses.
      </p>

      <h3>5. Haftung</h3>
      <p>
        Der Anbieter haftet nur für Schäden, die auf vorsätzlichem oder grob
        fahrlässigem Verhalten beruhen. Für leichte Fahrlässigkeit haftet der
        Anbieter nur bei der Verletzung wesentlicher Vertragspflichten.
      </p>

      <h3>6. Datenschutz</h3>
      <p>
        Die Erhebung und Verarbeitung personenbezogener Daten erfolgt gemäß
        unserer
        <a :href="datenschutzUrl" target="_blank">Datenschutzerklärung</a>.
      </p>

      <h3>7. Schlussbestimmungen</h3>
      <p>
        Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden,
        bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Es gilt das
        Recht der Bundesrepublik Deutschland.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AGBSection",
  data() {
    return {
      unternehmen: "Musterfirma GmbH",
      zahlungsarten: "Überweisung, PayPal, Kreditkarte",
      widerrufsfrist: 14,
      datenschutzUrl: "https://www.musterfirma.de/datenschutz",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.agb {
  width: 100%;

  &_row {
    @include content-container;
  }
}
</style>
