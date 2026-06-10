import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { getDictionary, hasLocale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const titles: Record<string, string> = {
    es: "Política de Privacidad — Luna Legal Lab",
    en: "Privacy Policy — Luna Legal Lab",
    de: "Datenschutzerklärung — Luna Legal Lab",
    it: "Informativa sulla Privacy — Luna Legal Lab",
  };
  return {
    title: titles[lang] ?? titles.es,
    robots: { index: false },
  };
}

const content: Record<string, {
  title: string;
  lastUpdated: string;
  sections: { heading: string; body: string }[];
}> = {
  es: {
    title: "Política de Privacidad",
    lastUpdated: "Última actualización: junio de 2026",
    sections: [
      {
        heading: "1. Responsable del tratamiento",
        body: "Dr. Eduardo R. Luna Álvarez — Luna Legal Lab\nCalle Reina Esclaramunda nº1, 2º 1ª, 07003 Palma, Islas Baleares\nEmail de contacto: eduardo@lunalegallab.com",
      },
      {
        heading: "2. Datos que recogemos",
        body: "A través del formulario de contacto recogemos únicamente: nombre, dirección de correo electrónico y el mensaje que usted escribe libremente. No recogemos datos de navegación, no instalamos cookies de seguimiento ni utilizamos herramientas de analítica de terceros.",
      },
      {
        heading: "3. Finalidad y base jurídica",
        body: "Los datos se tratan exclusivamente para responder a su consulta (base jurídica: consentimiento del interesado, art. 6.1.a RGPD). En ningún caso se utilizarán para enviar comunicaciones comerciales no solicitadas.",
      },
      {
        heading: "4. Plazo de conservación",
        body: "Los datos se conservan durante el tiempo necesario para atender su consulta y, en todo caso, no más de dos años desde la última comunicación, salvo que la ley exija un plazo distinto.",
      },
      {
        heading: "5. Destinatarios",
        body: "Los datos no se ceden a terceros salvo obligación legal. El servicio de envío de correo electrónico está prestado por Resend (Resend Inc.), que actúa como encargado del tratamiento bajo acuerdo de confidencialidad.",
      },
      {
        heading: "6. Sus derechos",
        body: "Puede ejercer en cualquier momento sus derechos de acceso, rectificación, supresión, portabilidad, limitación y oposición enviando un correo a eduardo@lunalegallab.com con el asunto «Derechos RGPD». Tiene también derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).",
      },
      {
        heading: "7. Cookies",
        body: "Este sitio web no instala cookies propias de seguimiento ni analítica. Puede encontrar más información sobre las cookies técnicas utilizadas por el proveedor de hosting (Vercel) en su política de privacidad.",
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: June 2026",
    sections: [
      {
        heading: "1. Data Controller",
        body: "Dr. Eduardo R. Luna Álvarez — Luna Legal Lab\nCalle Reina Esclaramunda nº1, 2º 1ª, 07003 Palma, Balearic Islands, Spain\nContact email: eduardo@lunalegallab.com",
      },
      {
        heading: "2. Data We Collect",
        body: "Through the contact form we collect only: your name, email address, and the message you freely write. We do not collect browsing data, do not install tracking cookies, and do not use third-party analytics tools.",
      },
      {
        heading: "3. Purpose and Legal Basis",
        body: "Your data is processed solely to respond to your inquiry (legal basis: consent of the data subject, Art. 6.1.a GDPR). It will never be used to send unsolicited commercial communications.",
      },
      {
        heading: "4. Retention Period",
        body: "Data is kept for as long as necessary to handle your inquiry and, in any case, no longer than two years from the last communication, unless a different period is required by law.",
      },
      {
        heading: "5. Recipients",
        body: "Data is not shared with third parties except where required by law. The email delivery service is provided by Resend (Resend Inc.), acting as a data processor under a confidentiality agreement.",
      },
      {
        heading: "6. Your Rights",
        body: "You may exercise your rights of access, rectification, erasure, portability, restriction, and objection at any time by emailing eduardo@lunalegallab.com with the subject line 'GDPR Rights'. You also have the right to lodge a complaint with your local supervisory authority.",
      },
      {
        heading: "7. Cookies",
        body: "This website does not install any proprietary tracking or analytics cookies. Further information about technical cookies used by our hosting provider (Vercel) can be found in their privacy policy.",
      },
    ],
  },
  de: {
    title: "Datenschutzerklärung",
    lastUpdated: "Letzte Aktualisierung: Juni 2026",
    sections: [
      {
        heading: "1. Verantwortlicher",
        body: "Dr. Eduardo R. Luna Álvarez — Luna Legal Lab\nCalle Reina Esclaramunda nº1, 2º 1ª, 07003 Palma, Balearen, Spanien\nKontakt-E-Mail: eduardo@lunalegallab.com",
      },
      {
        heading: "2. Erhobene Daten",
        body: "Über das Kontaktformular erheben wir ausschließlich: Ihren Namen, Ihre E-Mail-Adresse und die von Ihnen eingegebene Nachricht. Wir erheben keine Browsing-Daten, setzen keine Tracking-Cookies ein und nutzen keine Analyse-Tools von Drittanbietern.",
      },
      {
        heading: "3. Zweck und Rechtsgrundlage",
        body: "Ihre Daten werden ausschließlich zur Beantwortung Ihrer Anfrage verarbeitet (Rechtsgrundlage: Einwilligung der betroffenen Person, Art. 6 Abs. 1 lit. a DSGVO). Sie werden niemals für unerwünschte Werbung verwendet.",
      },
      {
        heading: "4. Speicherdauer",
        body: "Die Daten werden so lange aufbewahrt, wie es zur Bearbeitung Ihrer Anfrage erforderlich ist, längstens jedoch zwei Jahre nach der letzten Kommunikation, sofern keine gesetzliche Aufbewahrungspflicht besteht.",
      },
      {
        heading: "5. Empfänger",
        body: "Daten werden nicht an Dritte weitergegeben, sofern keine gesetzliche Verpflichtung besteht. Der E-Mail-Versanddienst wird von Resend (Resend Inc.) bereitgestellt, der als Auftragsverarbeiter im Rahmen einer Vertraulichkeitsvereinbarung tätig ist.",
      },
      {
        heading: "6. Ihre Rechte",
        body: "Sie können jederzeit Ihre Rechte auf Auskunft, Berichtigung, Löschung, Datenübertragbarkeit, Einschränkung und Widerspruch ausüben, indem Sie eine E-Mail an eduardo@lunalegallab.com mit dem Betreff „DSGVO-Rechte" senden. Sie haben außerdem das Recht, eine Beschwerde bei der zuständigen Aufsichtsbehörde einzureichen.",
      },
      {
        heading: "7. Cookies",
        body: "Diese Website setzt keine eigenen Tracking- oder Analyse-Cookies ein. Weitere Informationen zu technischen Cookies unseres Hosting-Anbieters (Vercel) finden Sie in deren Datenschutzrichtlinie.",
      },
    ],
  },
  it: {
    title: "Informativa sulla Privacy",
    lastUpdated: "Ultimo aggiornamento: giugno 2026",
    sections: [
      {
        heading: "1. Titolare del trattamento",
        body: "Dott. Eduardo R. Luna Álvarez — Luna Legal Lab\nCalle Reina Esclaramunda nº1, 2º 1ª, 07003 Palma, Isole Baleari, Spagna\nEmail di contatto: eduardo@lunalegallab.com",
      },
      {
        heading: "2. Dati raccolti",
        body: "Tramite il modulo di contatto raccogliamo esclusivamente: nome, indirizzo e-mail e il messaggio liberamente scritto dall'utente. Non raccogliamo dati di navigazione, non installiamo cookie di tracciamento e non utilizziamo strumenti di analisi di terze parti.",
      },
      {
        heading: "3. Finalità e base giuridica",
        body: "I dati sono trattati esclusivamente per rispondere alla sua richiesta (base giuridica: consenso dell'interessato, art. 6.1.a GDPR). Non verranno mai utilizzati per comunicazioni commerciali non richieste.",
      },
      {
        heading: "4. Periodo di conservazione",
        body: "I dati sono conservati per il tempo necessario a gestire la richiesta e, in ogni caso, non oltre due anni dall'ultima comunicazione, salvo diversi obblighi di legge.",
      },
      {
        heading: "5. Destinatari",
        body: "I dati non vengono ceduti a terzi salvo obbligo di legge. Il servizio di invio e-mail è fornito da Resend (Resend Inc.), che agisce come responsabile del trattamento in base a un accordo di riservatezza.",
      },
      {
        heading: "6. I suoi diritti",
        body: "Può esercitare in qualsiasi momento i diritti di accesso, rettifica, cancellazione, portabilità, limitazione e opposizione inviando un'e-mail a eduardo@lunalegallab.com con oggetto «Diritti GDPR». Ha inoltre il diritto di proporre reclamo all'autorità di controllo competente.",
      },
      {
        heading: "7. Cookie",
        body: "Questo sito web non installa cookie proprietari di tracciamento o analisi. Ulteriori informazioni sui cookie tecnici del provider di hosting (Vercel) sono disponibili nella loro informativa sulla privacy.",
      },
    ],
  },
};

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);
  const page = content[lang] ?? content.es;

  return (
    <>
      <main className="min-h-screen bg-[#faf8f6]">
        {/* Header bar */}
        <div className="bg-primary px-6 py-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl">
            <a
              href={`/${lang}`}
              className="text-sm font-semibold text-secondary/80 hover:text-secondary"
            >
              ← Luna Legal Lab
            </a>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 lg:px-12">
          <h1 className="font-display text-4xl font-bold text-primary sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-3 text-sm text-foreground/50">{page.lastUpdated}</p>

          <div className="mt-12 space-y-10">
            {page.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-lg font-semibold text-primary">
                  {section.heading}
                </h2>
                <p className="mt-3 whitespace-pre-line text-base leading-7 text-foreground/72">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer content={dictionary.footer} />
    </>
  );
}
