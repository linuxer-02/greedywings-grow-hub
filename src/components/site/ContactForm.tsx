import { useState } from "react";
import { ArrowRight, Check, Loader2, Phone, Mail, User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { value: "web", label: "Website Design & Development" },
  { value: "video", label: "Video Editing & Production" },
  { value: "software", label: "Software & CRM Development" },
  { value: "branding", label: "Branding & Identity" },
  { value: "other", label: "Other / Not Sure Yet" },
];

type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

function InputField({
  id,
  label,
  type = "text",
  icon: Icon,
  value,
  onChange,
  placeholder,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/80"
      >
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <div
        className={`relative flex items-center border-2 transition-colors duration-200 ${focused ? "border-primary" : "border-foreground/30 hover:border-foreground/60"}`}
      >
        <Icon
          className={`absolute left-4 h-4 w-4 transition-colors ${focused ? "text-primary" : "text-foreground/60"}`}
        />
        <input
          id={id}
          type={type}
          value={value}
          required={required}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent py-3.5 pl-11 pr-4 font-sans text-sm font-medium text-foreground placeholder:text-foreground/40 focus:outline-none"
        />
      </div>
    </div>
  );
}

function ServiceSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const selected = services.find((s) => s.value === value);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/80">
        Service Type <span className="text-primary">*</span>
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`flex w-full items-center justify-between border-2 px-4 py-3.5 text-left transition-colors duration-200 ${open ? "border-primary" : "border-foreground/30 hover:border-foreground/60"}`}
        >
          <span
            className={`font-sans text-sm font-medium ${selected ? "text-foreground" : "text-foreground/40"}`}
          >
            {selected ? selected.label : "Select a service…"}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-foreground/60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute z-30 mt-1 w-full border-2 border-foreground/30 bg-background shadow-xl"
            >
              {services.map((s) => (
                <li key={s.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(s.value);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-3 font-sans text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary ${value === s.value ? "bg-primary/5 text-primary" : "text-foreground"}`}
                  >
                    {s.label}
                    {value === s.value && <Check className="h-3.5 w-3.5" />}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [state, setState] = useState<FormState>("idle");

  const set = (key: keyof FormData) => (v: string) => setForm((f) => ({ ...f, [key]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    // Simulate async submit — replace with real API call
    await new Promise((r) => setTimeout(r, 1800));
    setState("success");
  }

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center gap-6 py-20 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-black text-foreground">
                You're booked in!
              </h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-foreground/60">
                We'll reach out within 24 hours to confirm your slot.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InputField
                id="name"
                label="Full Name"
                icon={User}
                value={form.name}
                onChange={set("name")}
                placeholder="Your name"
                required
              />
              <InputField
                id="email"
                label="Email Address"
                type="email"
                icon={Mail}
                value={form.email}
                onChange={set("email")}
                placeholder="you@company.com"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InputField
                id="phone"
                label="Phone Number"
                type="tel"
                icon={Phone}
                value={form.phone}
                onChange={set("phone")}
                placeholder="+91 98765 43210"
                required
              />
              <ServiceSelect value={form.service} onChange={set("service")} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/80"
              >
                Tell us about your project
              </label>
              <textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={(e) => set("message")(e.target.value)}
                placeholder="Brief description, goals, timeline…"
                className="resize-none border-2 border-foreground/30 bg-transparent px-4 py-3.5 font-sans text-sm font-medium text-foreground placeholder:text-foreground/40 transition-colors hover:border-foreground/60 focus:border-primary focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={
                state === "loading" || !form.name || !form.email || !form.phone || !form.service
              }
              className="group mt-2 flex w-full items-center justify-center gap-3 bg-primary px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {state === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Booking your call…
                </>
              ) : (
                <>
                  Book Intro Call{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
