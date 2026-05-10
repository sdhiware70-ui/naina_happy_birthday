import { HeartbeatIcon, PillIcon } from "./icons";
import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full py-20 md:py-32 bg-primary/10 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <PillIcon className="absolute top-1/4 left-1/4 w-8 h-8 text-primary/30 rotate-45" />
        <PillIcon className="absolute top-1/2 right-1/4 w-12 h-12 text-accent/30 -rotate-12" />
        <PillIcon className="absolute bottom-1/4 left-1/2 w-6 h-6 text-primary/20 rotate-90" />
        <HeartbeatIcon className="absolute top-10 right-10 w-24 h-24 text-primary/10 opacity-50" />
      </div>
      <div className="container mx-auto px-4 text-center">
        <div className="inline-block bg-primary text-primary-foreground rounded-full px-4 py-1 text-sm font-semibold mb-4 animate-pulse">
          STAT! It's a Birthday Emergency!
        </div>
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-foreground">
          Happy Birthday, Dr. Naina Parashar!
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Your presence is the best prescription for happiness. Wishing you a day filled with joy, laughter, and everything you love.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="#guestbook">
            <Button size="lg">
              Leave a Wish
            </Button>
          </a>
          <a href="#gallery">
            <Button size="lg" variant="outline">
              Memory Lane
            </Button>
          </a>
        </div>
        <div className="mt-12 w-full max-w-lg mx-auto">
            <div className="relative w-full h-20 overflow-hidden">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary/20"></div>
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="heartbeat-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="hsl(var(--accent))" />
                            <stop offset="100%" stopColor="hsl(var(--primary))" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0 40 L50 40 L60 20 L80 60 L100 40 L120 50 L140 40 L150 45 L160 40 L200 40 L210 30 L230 50 L250 40 L300 40 L310 50 L320 30 L340 40 L400 40"
                        stroke="url(#heartbeat-gradient)"
                        strokeWidth="2"
                        fill="none"
                        className="animate-pulse-slow"
                    />
                </svg>
            </div>
        </div>
      </div>
    </section>
  );
}
