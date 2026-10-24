import { createFileRoute } from "@tanstack/react-router";
import { SignupDialog, PLANS } from "@/components/SignupDialog";
import { CameraConnectionGuide } from "@/components/CameraConnectionGuide";
import { Faq } from "@/components/Faq";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Protege+ | SaaS de alertas para tus cámaras: guía de conexión y planes" },
      {
        name: "description",
        content:
          "Descubre cómo conectar tus cámaras WiFi, PoE o tu NVR con un enlace Webhook, resuelve las preguntas frecuentes e inscríbete para probar el sistema.",
      },
      {
        property: "og:title",
        content: "Protege+ | Cómo conectar tus cámaras según tu tipo de instalación",
      },
      {
        property: "og:description",
        content:
          "Guía de instalación para cámaras sueltas y grabadores NVR, preguntas frecuentes y planes desde Bs 50.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <span className="font-display text-xl font-bold">
            Protege<span className="text-primary">+</span>
          </span>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="#guia-instalacion" className="transition-colors hover:text-foreground">
              Guía de instalación
            </a>
            <a href="#preguntas" className="transition-colors hover:text-foreground">
              Preguntas frecuentes
            </a>
          </nav>
          <SignupDialog size="default" />
        </div>
      </header>

      <section className="bg-hero text-secondary-foreground">
        <div className="mx-auto max-w-4xl px-6 py-28 text-center">
          <h1 className="font-display text-4xl font-extrabold leading-tight md:text-6xl">
            Protección inteligente para tu hogar y negocio
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg opacity-80">
            Inscríbete gratis, prueba el sistema y recibe tu acceso directo por WhatsApp.
          </p>
          <div className="mt-10">
            <SignupDialog />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-3">
        {PLANS.map((p) => {
          const [name, price] = p.split(" - ");
          return (
            <div key={p} className="rounded-xl border border-border bg-card p-8">
              <h3 className="font-display text-xl font-bold">{name}</h3>
              <p className="mt-3 font-display text-3xl font-extrabold text-primary">{price}</p>
            </div>
          );
        })}
      </section>

      <CameraConnectionGuide />
      <Faq />

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-center">
          <span className="font-display text-lg font-bold">
            Protege<span className="text-primary">+</span>
          </span>
          <p className="max-w-md text-sm text-muted-foreground">
            ¿Listo para verlo funcionando con tus propias cámaras? Inscríbete y te enviamos tu
            enlace Webhook por WhatsApp.
          </p>
          <SignupDialog size="default" />
        </div>
      </footer>
    </div>
  );
}
