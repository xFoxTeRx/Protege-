import {
  ArrowRight,
  Check,
  CircleAlert,
  Cctv,
  ListChecks,
  Server,
  TriangleAlert,
  Webhook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SignupDialog } from "@/components/SignupDialog";

type Guide = {
  id: string;
  option: string;
  title: string;
  subtitle: string;
  icon: typeof Cctv;
  summary: string;
  points: string[];
  steps: string[];
  dialogHint: string;
};

const GUIDES: Guide[] = [
  {
    id: "individual",
    option: "Opción A",
    title: "Cámaras WiFi / PoE independientes",
    subtitle: "Cámaras sueltas, sin grabador",
    icon: Cctv,
    summary:
      "Ingresas a la dirección IP de cada cámara desde tu navegador (ej. Reolink, Amcrest o Hikvision IP) y pegas el enlace Webhook individualmente en su apartado de alertas. Cada cámara enviará sus capturas de forma autónoma.",
    points: [
      "Un enlace Webhook por cada cámara",
      "Ideal para 1 a 4 cámaras repartidas",
      "Sin dependencia de un equipo central",
      "Cada cámara decide cuándo enviar su captura",
    ],
    steps: [
      "Conecta la cámara a tu red WiFi o al switch PoE y enciéndela.",
      "Averigua su dirección IP local: usa la app del fabricante o la lista de dispositivos conectados de tu router.",
      "Escribe esa IP en el navegador (ej. http://192.168.1.42) e inicia sesión con tu usuario y contraseña.",
      "Busca el apartado de alertas: en Reolink es Red → Email & HTTP; en Amcrest, Alerta → HTTP; en Hikvision, Eventos → HTTP listening.",
      "Pega ahí el enlace Webhook individual que te entregamos y guarda los cambios.",
      "Repite el paso anterior en cada cámara: cada una enviará sus capturas de forma autónoma.",
      "Prueba la conexión: dispara una detección de movimiento y confirma que la captura llegue.",
    ],
    dialogHint:
      "Cada cámara funciona por su cuenta: si una se apaga o se desconecta, las demás siguen enviando sus capturas.",
  },
  {
    id: "nvr",
    option: "Opción B",
    title: "Grabador centralizado (NVR IP)",
    subtitle: "Todas las cámaras pasan por un NVR",
    icon: Server,
    summary:
      "No necesitas configurar cada cámara por separado. Ingresas al menú web de tu grabador NVR y pegas un único enlace de Webhook centralizado para todo tu perfil. El NVR empaquetará las alertas y nos reportará automáticamente qué canal físico se activó.",
    points: [
      "Un solo enlace Webhook para todo el perfil",
      "Configuras el grabador una única vez",
      "Identifica el canal físico que se activó",
      "Ideal para negocios con varias cámaras",
    ],
    steps: [
      "Entra al menú web de tu grabador escribiendo su IP en el navegador (ej. http://192.168.1.10).",
      "Ve a Configuración → Red o Eventos y busca la opción de notificación HTTP / HTTP listening / push central.",
      "Pega el único enlace Webhook centralizado de tu perfil en ese campo.",
      "Marca las cámaras o canales que quieres que reporten alertas.",
      "Guarda: el NVR empaquetará las alertas y nos reportará automáticamente qué canal físico se activó.",
      "Prueba la conexión: muévete frente a una cámara y confirma que la captura llegue con el canal correcto.",
    ],
    dialogHint:
      "Si cambias, añades o reemplazas una cámara en el NVR, el enlace Webhook no se toca: solo se marca el canal nuevo.",
  },
];

function GuideCard({ guide }: { guide: Guide }) {
  const Icon = guide.icon;
  return (
    <Card className="flex h-full flex-col border-border/70 bg-card transition-shadow hover:shadow-glow">
      <CardHeader className="gap-4">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/25">
            <Icon className="h-6 w-6" />
          </span>
          <div className="space-y-1">
            <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {guide.option}
            </span>
            <h3 className="font-display text-lg font-bold leading-snug">{guide.title}</h3>
            <p className="text-sm text-muted-foreground">{guide.subtitle}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <p className="text-sm leading-relaxed text-foreground/85">{guide.summary}</p>
        <ul className="space-y-2 border-t border-border pt-4">
          {guide.points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full font-semibold">
              Ver guía de configuración
              <ArrowRight />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-display text-xl">
                <ListChecks className="h-5 w-5 text-primary" />
                Guía de configuración · {guide.option}
              </DialogTitle>
              <DialogDescription>{guide.title}</DialogDescription>
            </DialogHeader>
            <ol className="space-y-3">
              {guide.steps.map((s, i) => (
                <li
                  key={s}
                  className="flex gap-3 rounded-lg border border-border bg-background p-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed">{s}</span>
                </li>
              ))}
            </ol>
            <p className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
              {guide.dialogHint}
            </p>
            <div className="flex flex-col items-center gap-2 border-t border-border pt-4 text-center">
              <p className="text-sm text-muted-foreground">
                ¿Aún no tienes tu enlace Webhook? Inscríbete y te lo enviamos por WhatsApp.
              </p>
              <SignupDialog size="default" />
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export function CameraConnectionGuide() {
  return (
    <section id="guia-instalacion" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <div className="rounded-3xl border border-primary/25 bg-accent/35 p-6 md:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <Webhook className="h-3.5 w-3.5" />
            Guía de instalación
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight md:text-4xl">
            ¿Cómo conectar mis cámaras según mi tipo de instalación?
          </h2>
          <p className="mt-4 text-muted-foreground">
            El enlace Webhook se pega en un lugar distinto según tengas cámaras sueltas o un grabador
            central. Elige el caso que se parece al tuyo.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {GUIDES.map((g) => (
            <GuideCard key={g.id} guide={g} />
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-warning/45 bg-warning/12 p-5 md:p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning/25 text-warning-foreground ring-1 ring-warning/50">
              <TriangleAlert className="h-5 w-5" />
            </span>
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-foreground">
                <span className="font-bold">Nota de compatibilidad:</span> Compatible con NVRs y
                cámaras IP modernas (2020 a la fecha) con salida HTTP/Webhook. Los grabadores
                analógicos tradicionales antiguos (HVR/DVR con cables coaxiales) no son compatibles
                con este enlace web directo.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/50 bg-warning/20 px-3 py-1 text-xs font-semibold text-warning-foreground">
                  <Check className="h-3.5 w-3.5" />
                  NVRs y cámaras IP modernas (2020+)
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/35 bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
                  <CircleAlert className="h-3.5 w-3.5" />
                  DVR / HVR analógicos con cable coaxial
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
