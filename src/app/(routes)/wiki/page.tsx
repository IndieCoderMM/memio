import DevBanner from "@/components/blocks/dev-banner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import techniques from "@/data/wiki.json";

export default function Wiki() {
  return (
    <div className="bg-background relative min-h-screen">
      <DevBanner />

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-foreground mb-4 text-4xl font-bold">
            Memory Techniques
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Learn proven techniques to improve your memory and train your brain
            for peak performance.
          </p>
        </div>

        {/* Techniques Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {techniques.map((technique, index) => (
            <Card key={index} className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-xl">{technique.title}</CardTitle>
                <CardDescription className="text-base">
                  {technique.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-foreground text-sm font-semibold uppercase">
                    Tips:
                  </p>
                  <ul className="space-y-2">
                    {technique.tips.map((tip, tipIndex) => (
                      <li
                        key={tipIndex}
                        className="text-muted-foreground flex gap-3 text-sm"
                      >
                        <span className="text-primary font-bold">→</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Best Practices Section */}
        <div className="border-border mt-12 border-t pt-12">
          <h2 className="text-foreground mb-6 text-2xl font-bold">
            Best Practices
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="bg-card border-border border p-6">
              <h3 className="text-foreground mb-3 font-bold">
                Getting Started
              </h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>• Start with one technique at a time</li>
                <li>• Practice for short, focused sessions</li>
                <li>• Combine techniques as you improve</li>
                <li>• Be patient—improvement takes time</li>
              </ul>
            </div>
            <div className="bg-card border-border border p-6">
              <h3 className="text-foreground mb-3 font-bold">
                Maximizing Results
              </h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>• Play our games regularly for practice</li>
                <li>• Track your progress and improvements</li>
                <li>• Stay consistent with your training</li>
                <li>• Mix different techniques for variety</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
