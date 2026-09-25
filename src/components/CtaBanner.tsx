import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { appLink } from "@/lib/site";

export default function CtaBanner({
  title = "Your Sun sign is just the beginning",
  body = "Your Moon, Rising sign and every planet in your chart shape who you are. Get your free natal chart and AI-powered compatibility reports with friends on Skygram.",
  cta = "Get my free birth chart",
  href = appLink("/register"),
}: { title?: string; body?: string; cta?: string; href?: string }) {
  return (
    <section className="glass-card cosmic-glow border border-primary/30 p-6 sm:p-8 mb-6 text-center">
      <h2 className="font-display text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-foreground/75 max-w-xl mx-auto mb-5">{body}</p>
      <Button variant="cta" size="lg" className="h-auto min-h-12 whitespace-normal py-3 text-center" asChild>
        <a href={href}>
          {cta} <ArrowRight className="w-4 h-4" />
        </a>
      </Button>
    </section>
  );
}
