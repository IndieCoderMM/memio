import DevBanner from "@/components/blocks/dev-banner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AccuracyChart from "@/features/stats/ui/accuracy-chart";

export default function Stats() {
  return (
    <div className="bg-background relative min-h-screen">
      <DevBanner />
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-foreground mb-4 text-4xl font-bold">
            Your Stats
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your progress and achievements across all memory games.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Total Games
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-foreground text-3xl font-bold">1,247</div>
              <p className="text-muted-foreground mt-1 text-xs">
                +24 this week
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-foreground text-3xl font-bold">87%</div>
              <p className="text-muted-foreground mt-1 text-xs">
                +2% vs last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Best Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-foreground text-3xl font-bold">2:45</div>
              <p className="text-muted-foreground mt-1 text-xs">Chessboard</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-foreground text-3xl font-bold">12</div>
              <p className="text-muted-foreground mt-1 text-xs">days</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Placeholders */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Performance Over Time */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Performance Over Time</CardTitle>
              <CardDescription>
                Your accuracy trend across all games
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AccuracyChart />
            </CardContent>
          </Card>

          {/* Game Statistics */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Game Statistics</CardTitle>
              <CardDescription>Breakdown by game type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 border-border flex h-64 items-center justify-center rounded border">
                <span className="text-muted-foreground text-sm">
                  Chart placeholder
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Games played per day this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 border-border flex h-64 items-center justify-center rounded border">
                <span className="text-muted-foreground text-sm">
                  Chart placeholder
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Top Achievements */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Top Achievements</CardTitle>
              <CardDescription>Your best performances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-primary/10 border-primary/20 flex items-center justify-between rounded border p-3">
                  <div>
                    <p className="text-foreground text-sm font-semibold">
                      Perfect Score
                    </p>
                    <p className="text-muted-foreground text-xs">Chessboard</p>
                  </div>
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="bg-muted/50 border-border flex items-center justify-between rounded border p-3">
                  <div>
                    <p className="text-foreground text-sm font-semibold">
                      Speed Demon
                    </p>
                    <p className="text-muted-foreground text-xs">Numbers</p>
                  </div>
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="bg-muted/50 border-border flex items-center justify-between rounded border p-3">
                  <div>
                    <p className="text-foreground text-sm font-semibold">
                      Consistency Pro
                    </p>
                    <p className="text-muted-foreground text-xs">
                      7-day streak
                    </p>
                  </div>
                  <span className="text-2xl">🔥</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
