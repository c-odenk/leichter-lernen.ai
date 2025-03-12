<template>
  <div class="privacy">
    <div class="privacy_row">
      <h2>Datenschutzerklärung</h2>

      <h3>1. Verantwortliche Stelle</h3>
      <p>
        Verantwortlich für die Erhebung, Verarbeitung und Nutzung Ihrer
        personenbezogenen Daten im Sinne der Datenschutz-Grundverordnung (DSGVO)
        ist:
        <br />
        <strong>{{ unternehmen }}</strong> <br />
        {{ adresse }} <br />
        Telefon: {{ telefon }} <br />
        E-Mail: {{ eMail }}
      </p>

      <h3>2. Erhebung und Speicherung personenbezogener Daten</h3>
      <p>
        Wir erheben personenbezogene Daten nur, wenn Sie uns diese freiwillig
        mitteilen, z. B. bei der Nutzung unserer Website, einer Bestellung oder
        einer Kontaktaufnahme.
      </p>

      <h3>3. Verwendungszwecke der Daten</h3>
      <p>Ihre Daten werden für folgende Zwecke verwendet:</p>
      <ul>
        <li>Zur Vertragserfüllung und Abwicklung Ihrer Bestellungen</li>
        <li>Zur Beantwortung Ihrer Anfragen</li>
        <li>Zur Verbesserung unseres Angebots und unserer Services</li>
      </ul>

      <h3>4. Rechtsgrundlagen der Datenverarbeitung</h3>
      <p>
        Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf Grundlage von
        Art. 6 Abs. 1 lit. b DSGVO zur Vertragserfüllung oder auf Basis Ihrer
        Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
      </p>

      <h3>5. Weitergabe von Daten an Dritte</h3>
      <p>
        Eine Weitergabe Ihrer personenbezogenen Daten an Dritte erfolgt nur,
        wenn dies für die Vertragserfüllung notwendig ist oder Sie ausdrücklich
        eingewilligt haben.
      </p>

      <h3>6. Speicherdauer</h3>
      <p>
        Ihre personenbezogenen Daten werden nur so lange gespeichert, wie dies
        für die genannten Zwecke erforderlich ist oder gesetzliche
        Aufbewahrungspflichten bestehen.
      </p>

      <h3>7. Ihre Rechte</h3>
      <p>Sie haben das Recht auf:</p>
      <ul>
        <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
      </ul>
      <p>Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: {{ eMail }}</p>

      <h3>8. Verwendung von Cookies</h3>
      <p>
        Unsere Website verwendet Cookies. Sie können die Verwendung von Cookies
        über die Einstellungen Ihres Browsers steuern.
      </p>

      <h3>9. Beschwerderecht</h3>
      <p>
        Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über die
        Verarbeitung Ihrer Daten zu beschweren.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrivacySection",
  data() {
    return {
      unternehmen: "Musterfirma GmbH",
      adresse: "Musterstraße 123, 12345 Musterstadt",
      telefon: "+49 123 4567890",
      eMail: "datenschutz@musterfirma.de",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.privacy {
  width: 100%;

  &_row {
    @include content-container;
  }
}
</style>
