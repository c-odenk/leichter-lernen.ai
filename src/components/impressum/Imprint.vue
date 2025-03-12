<template>
  <div class="imprint">
    <div class="imprint_row">
      <h2>
        Impressum <br />
        Angaben gemäß § 5 TMG:
      </h2>

      <p>
        <strong>Unternehmen:</strong> {{ unternehmen }} <br />
        <strong>Rechtsform:</strong> {{ rechtsform }} <br />
        <strong>Adresse:</strong> {{ adresse }} <br />
        <strong>Vertreten durch:</strong> {{ vertretung }}
      </p>

      <p>
        <strong>Kontakt:</strong> <br />
        Telefon: {{ telefon }} <br />
        E-Mail: {{ eMail }} <br />
        Website: {{ website }}
      </p>

      <p>
        <strong>Umsatzsteuer-ID:</strong> {{ umsatzsteuerId }} gemäß § 27a UStG
        <br />
        <strong>Wirtschafts-Identifikationsnummer:</strong> {{ wirtschaftsId }}
        <br />
        <strong>Finanzamt:</strong> {{ finanzamt }}
      </p>

      <p>
        <strong>Handelsregister:</strong> {{ handelsregister }} <br />
        <strong>Registernummer:</strong> {{ registernummer }}
      </p>

      <p>
        <strong>Berufshaftpflichtversicherung:</strong> <br />
        Name: {{ versicherung }} <br />
        Geltungsraum der Versicherung: {{ versicherungsraum }}
      </p>

      <p>
        <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong>
        <br />
        {{ inhaltVerantwortlicher }} <br />
        {{ inhaltAdresse }}
      </p>

      <h3>Streitschlichtung</h3>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:
        <a href="https://ec.europa.eu/consumers/odr" target="_blank"
          >https://ec.europa.eu/consumers/odr</a
        >.<br />
        Wir sind {{ streitschlichtung ? "" : "nicht" }} bereit oder
        verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h3>Haftung für Inhalte</h3>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
        bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
        übermittelte oder gespeicherte fremde Informationen zu überwachen oder
        nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
        hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
        Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
      </p>

      <h3>Haftung für Links</h3>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Die verlinkten Seiten wurden zum
        Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
        Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
        erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten
        ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
        zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
        Links umgehend entfernen.
      </p>

      <h3>Urheberrecht</h3>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
        sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImprintSection",
  data() {
    return {
      unternehmen: "Musterfirma GmbH",
      rechtsform: "GmbH",
      adresse: "Musterstraße 123, 12345 Musterstadt",
      vertretung: "Max Mustermann",
      telefon: "+49 123 4567890",
      eMail: "info@musterfirma.de",
      website: "https://www.musterfirma.de",
      umsatzsteuerId: "DE123456789",
      wirtschaftsId: "DE987654321",
      finanzamt: "Finanzamt Musterstadt",
      handelsregister: "Amtsgericht Musterstadt",
      registernummer: "HRB 12345",
      versicherung: "Muster Versicherung AG",
      versicherungsraum: "Deutschland",
      inhaltVerantwortlicher: "Max Mustermann",
      inhaltAdresse: "Musterstraße 123, 12345 Musterstadt",
      streitschlichtung: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.imprint {
  width: 100%;

  &_row {
    @include content-container;
  }
}
</style>
