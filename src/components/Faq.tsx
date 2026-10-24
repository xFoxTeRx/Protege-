import { Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  {
    q: "¿Necesito comprar cámaras nuevas?",
    a: "No, si ya tienes cámaras IP o un NVR moderno (2020 a la fecha) con salida HTTP/Webhook: solo se configura el enlace de alertas. Los grabadores analógicos antiguos (HVR/DVR con cables coaxiales) no son compatibles con este enlace web directo.",
  },
  {
    q: "¿Cómo y cuándo recibo mi enlace Webhook?",
    a: "Al completar el registro guardamos tu solicitud y te contactamos por WhatsApp con tus datos de acceso y el enlace que corresponde a tu caso: uno individual por cámara, o uno central si usas un NVR.",
  },
  {
    q: "¿Cuánto tiempo toma dejar todo conectado?",
    a: "Con un NVR basta configurar el grabador una sola vez, unos minutos. Con cámaras sueltas repites el pegado del enlace en cada cámara, así que el tiempo crece según cuántas tengas.",
  },
  {
    q: "¿Puedo tener cámaras sueltas y un NVR al mismo tiempo?",
    a: "Sí. En instalaciones mixtas se combinan ambos casos: las cámaras independientes usan su propio enlace y el grabador central usa el enlace único de tu perfil. Al registrarte cuéntanos cómo está montado tu sistema.",
  },
  {
    q: "¿Qué planes hay y puedo cambiar más adelante?",
    a: "Plan Hogar Básico - Bs 50, Plan Negocio Protegido - Bs 120 y Plan Corporativo - Bs 200. Eliges uno al inscribirte para la prueba y puedes cambiar de plan cuando quieras.",
  },
  {
    q: "¿Qué recibo cuando salta la alerta?",
    a: "La captura que envía tu cámara o tu grabador en el momento de la detección. Con un NVR además llega identificado el canal físico que se activó, para que sepas de dónde vino.",
  },
];

export function Faq() {
  return (
    <section id="preguntas" className="mx-auto max-w-4xl scroll-mt-20 px-6 py-20">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <Info className="h-3.5 w-3.5" />
          Preguntas frecuentes
        </span>
        <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight md:text-4xl">
          Lo que más nos preguntan antes de empezar
        </h2>
      </div>
      <Accordion
        type="single"
        collapsible
        className="mt-8 rounded-2xl border border-border bg-card px-6 shadow-sm"
      >
        {FAQS.map((f, i) => (
          <AccordionItem key={f.q} value={`item-${i}`}>
            <AccordionTrigger className="font-display text-base font-semibold">{f.q}</AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
