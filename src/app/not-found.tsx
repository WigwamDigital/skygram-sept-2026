import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center glass-card p-10">
        <h1 className="font-display mb-2 text-5xl font-bold gradient-text">404</h1>
        <p className="mb-6 text-lg text-muted-foreground">This corner of the sky is empty.</p>
        <Button variant="cta" asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
