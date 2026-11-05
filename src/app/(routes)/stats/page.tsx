import DevBanner from "@/components/blocks/dev-banner";
import StatsDashboard from "@/features/stats/ui/stats-dashboard";

export default function Stats() {
  return (
    <div className="bg-background relative min-h-screen">
      <DevBanner />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12">
          <h1 className="text-foreground mb-4 text-4xl font-bold">Your Stats</h1>
          <p className="text-muted-foreground text-lg">
            Progress and achievements from your saved game sessions.
          </p>
        </div>
        <StatsDashboard />
      </main>
    </div>
  );
}
