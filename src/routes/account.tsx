import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — UNIBOX" }] }),
  component: Account,
});

function Account() {
  return (
    <div className="mx-auto max-w-3xl px-6 md:px-10 py-12">
      <p className="text-xs uppercase tracking-[0.4em] text-primary mb-2">Profile</p>
      <h1 className="text-4xl font-display mb-8">Account</h1>
      <div className="bg-surface border border-border p-6 flex items-center gap-4">
        <span className="w-14 h-14 rounded-full bg-surface-2 flex items-center justify-center"><User className="w-7 h-7" /></span>
        <div>
          <h2 className="text-lg">Guest Operator</h2>
          <p className="text-sm text-muted-foreground">Sign-in coming soon.</p>
        </div>
      </div>
    </div>
  );
}
