import { Search, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-secondary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              New courses added weekly
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Learn skills that{" "}
              <span className="text-primary">advance your career</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Access over 10,000 courses taught by expert instructors. Start
              learning today and unlock your potential.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="What do you want to learn?"
                  className="pl-12 h-12 bg-card border-border text-base"
                />
              </div>
              <Button size="lg" className="h-12 px-8">
                Search
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-foreground">10,000+</p>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">
                  Expert Instructors
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2M+</p>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
            </div>
          </div>

          {/* Hero Image / Video Preview */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="maac-india-Yk3FgdgwjlE-unsplash.jpg"
                alt="Students learning online"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to  from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-4">
                  <button className="w-14 h-14 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                    <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
                  </button>
                  <div>
                    <p className="text-white font-medium">See how it works</p>
                    <p className="text-white/70 text-sm">Watch 2 min intro</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            
            {/* <div className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-lg p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Get Certified</p>
                  <p className="text-sm text-muted-foreground">
                    Earn certificates
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
