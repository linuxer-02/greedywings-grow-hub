import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    id: "01",
    question: "What kind of projects does GreedyWings take on?",
    answer:
      "We focus on brand identity, digital products, and websites that need both design clarity and technical polish. From early stage to scale, we partner with teams to build meaningful, measurable outcomes.",
    colSpan: 3,
  },
  {
    id: "02",
    question: "How do you approach new projects?",
    answer:
      "We start with deep discovery to understand your business goals, target audience, and market positioning before moving into strategy and execution.",
    colSpan: 1,
  },
  {
    id: "03",
    question: "What's a realistic project timeline?",
    answer:
      "Most full-scale projects take between 6 to 12 weeks, depending on the complexity, scope, and how quickly we can iterate on feedback.",
    colSpan: 1,
  },
  {
    id: "04",
    question: "Who actually does the work?",
    answer:
      "You work directly with our senior team. No junior hand-offs, no bloated account management layers. Just direct access to the experts executing your vision.",
    colSpan: 1,
  },
  {
    id: "05",
    question: "How do we communicate during the process?",
    answer:
      "We set up a dedicated Slack channel for day-to-day comms, use Notion for project tracking, and hold weekly syncs to review progress and blockers.",
    colSpan: 2,
  },
  {
    id: "06",
    question: "What happens after launch?",
    answer:
      "We offer ongoing support and growth retainers to ensure your product continues to perform, scale, and evolve with your business needs.",
    colSpan: 1,
  },
  {
    id: "07",
    question: "Do you work with startups as well as big companies?",
    answer:
      "Yes, we love the agility of startups and the scale of enterprises. Our processes adapt to fit the speed and structure of your organization.",
    colSpan: 1,
  },
  {
    id: "08",
    question: "How do you measure success for a project?",
    answer:
      "Success metrics are defined during discovery—whether that's increased conversion rates, lower bounce rates, or improved brand sentiment.",
    colSpan: 1,
  },
  {
    id: "09",
    question: "Can we start small and scale later?",
    answer:
      "Absolutely. We often start with foundational sprints to prove value before expanding into larger, long-term engagements.",
    colSpan: 1,
  },
];

export function FaqShowcase() {
  const [activeId, setActiveId] = useState<string | null>("01");

  return (
    <section id="faq" className="relative w-full px-4 pt-12 pb-24 md:px-8 md:pt-16 md:pb-32 xl:px-10">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      {/* "Sandbox" Container */}
      <div className="relative z-10 mx-auto flex max-w-[1500px] flex-col gap-16 rounded-[2.5rem] bg-[#F7F5F2] p-8 dark:bg-[#151515] dark:border dark:border-border/50 lg:flex-row lg:items-start lg:gap-12 lg:p-16">

        {/* ── Left Column ── */}
        <div className="flex w-full shrink-0 flex-col lg:sticky lg:top-32 lg:w-[35%] xl:w-[30%]">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
            FREQUENTLY ASKED
            <br />
            QUESTIONS
          </span>
          <h2 className="mt-8 font-sans text-5xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4.2rem]">
            We've got<br />
            answers<br />
            to what<br />
            <span className="text-primary">matters.</span>
          </h2>
          <div className="mt-8 h-[1px] w-12 bg-foreground/60" />

          <div className="mt-12">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-4 bg-foreground px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-background transition-all hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background dark:bg-foreground dark:text-background"
            >
              BOOK INTRO CALL
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ── Right Column (Grid) ── */}
        <div className="flex-1 min-w-0 w-full border border-border/40 bg-border/40">
          <div className="grid grid-cols-3 gap-[1px]">
            {faqs.map((faq) => {
              const isActive = activeId === faq.id;
              // Dynamic column spans for the sliding puzzle effect
              const colSpanClass = isActive
                ? "col-span-3"
                : faq.colSpan === 2
                  ? "col-span-2"
                  : "col-span-1";

              return (
                <motion.button
                  layout
                  transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                  key={faq.id}
                  onClick={() => setActiveId(isActive ? null : faq.id)}
                  className={`group relative flex w-full flex-col overflow-hidden text-left transition-colors duration-300 ${colSpanClass} ${isActive
                      ? "bg-primary/5"
                      : "bg-background hover:bg-card/40"
                    }`}
                >
                  {/* Active Border Overlay */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pointer-events-none absolute inset-0 z-10 border border-primary/30"
                      />
                    )}
                  </AnimatePresence>

                  <motion.div layout className="flex h-full w-full flex-col p-2.5 sm:p-4 md:p-5">
                    {isActive ? (
                      /* Horizontal Layout for Active Item */
                      <motion.div
                        key="active"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex w-full items-start gap-3 md:gap-6"
                      >
                        <span className="mt-0.5 font-sans text-base font-bold text-primary sm:text-xl">
                          {faq.id}
                        </span>

                        <div className="flex flex-1 flex-col">
                          <h3 className="font-sans text-sm font-bold tracking-tight text-foreground sm:text-lg">
                            {faq.question}
                          </h3>
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-2 font-sans text-xs leading-relaxed text-foreground/70 sm:text-sm md:max-w-2xl">
                              {faq.answer}
                            </p>
                          </motion.div>
                        </div>

                        <div className="mt-1 flex-shrink-0">
                          <Minus className="h-4 w-4 text-foreground/50 transition-colors group-hover:text-primary sm:h-5 sm:w-5" strokeWidth={1.5} />
                        </div>
                      </motion.div>
                    ) : (
                      /* Vertical Layout for Closed Items */
                      <motion.div
                        key="closed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex w-full items-start justify-between">
                          <span className="font-sans text-sm font-bold text-foreground transition-colors group-hover:text-primary sm:text-base">
                            {faq.id}
                          </span>
                          <Plus className="h-3 w-3 text-foreground/40 transition-colors group-hover:text-primary sm:h-4 sm:w-4" strokeWidth={1.5} />
                        </div>
                        <div className="mt-3 text-left sm:mt-6 md:mt-8">
                          <h3 className="font-sans text-[10px] text-foreground/80 transition-colors group-hover:text-foreground sm:text-xs md:text-sm">
                            {faq.question}
                          </h3>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>

                </motion.button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
