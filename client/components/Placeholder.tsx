import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function Placeholder({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-3xl rounded-xl border bg-card p-10 shadow-sm text-center">
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">{title}</h1>
        <p className="text-muted-foreground mb-6">{description}</p>
        {action ?? (
          <Button asChild>
            <a href="/">Return Home</a>
          </Button>
        )}
      </div>
    </section>
  );
}
