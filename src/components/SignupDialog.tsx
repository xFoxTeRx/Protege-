import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const PLANS = [
  "Plan Hogar Básico - Bs 50",
  "Plan Negocio Protegido - Bs 120",
  "Plan Corporativo - Bs 200",
] as const;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^\+?[\d\s-]{7,15}$/;

const schema = z.object({
  name: z.string().trim().min(2, "Ingresa tu nombre o alias").max(100),
  contact: z
    .string()
    .trim()
    .max(255)
    .refine((v: string) => emailRe.test(v) || phoneRe.test(v), "Ingresa un WhatsApp o correo válido"),
  plan: z.enum(PLANS, { errorMap: () => ({ message: "Selecciona un plan" }) }),
});

const SUCCESS =
  "¡Registro completado con éxito! Hemos guardado tu solicitud. Te enviaremos tus datos para acceder por WhatsApp para que pruebes el sistema.";

export function SignupDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; contact?: string; plan?: string }>({});

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse({ name, contact, plan });
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((issue) => {
        const path = String(issue.path[0]);
        errs[path] = issue.message;
      });
      setErrors(errs as typeof errors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/r44oben@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Nombre_Cliente: name,
          Contacto_WhatsApp_Email: contact,
          Plan_Contratado: plan,
          _subject: `🚨 Nuevo Registro SaaS: ${name} (${plan})`,
        }),
      });

      if (response.ok) {
        setName("");
        setContact("");
        setPlan("");
        setOpen(false);
        toast.success(SUCCESS, { duration: 7000 });
      } else {
        toast.error("Hubo un problema al registrar tus datos. Por favor intenta de nuevo.");
      }
    } catch {
      toast.error("Error de conexión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="shadow-glow font-semibold px-6 py-2.5">
          Inscribirme para probar el SaaS
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Prueba el sistema</DialogTitle>
          <DialogDescription>Completa tus datos y te contactaremos por WhatsApp.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="name">Nombre completo o Alias *</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} placeholder="Ej. Carlos Mendoza" />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="contact">Número de WhatsApp o Correo electrónico *</Label>
            <Input id="contact" value={contact} onChange={(e) => setContact(e.target.value)} maxLength={255} placeholder="+591 70000000 o tu@correo.com" />
            {errors.contact && <p className="text-sm text-destructive">{errors.contact}</p>}
          </div>
          <div className="space-y-1.5">
            <Label>Plan a contratar *</Label>
            <Select value={plan} onValueChange={setPlan}>
              <SelectTrigger><SelectValue placeholder="Selecciona un plan" /></SelectTrigger>
              <SelectContent>
                {PLANS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.plan && <p className="text-sm text-destructive">{errors.plan}</p>}
          </div>
          <Button type="submit" className="w-full font-semibold py-2.5" disabled={loading}>
            {loading ? "Enviando solicitud..." : "Completar Registro"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}