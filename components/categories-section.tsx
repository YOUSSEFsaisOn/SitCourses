import Link from "next/link"
import { Code, Briefcase, Palette, TrendingUp, Monitor, User, Camera, Music } from "lucide-react"

const categories = [
  { name: "Development", icon: Code, count: "3,200+ courses", color: "bg-blue-500/10 text-blue-600" },
  { name: "Business", icon: Briefcase, count: "1,800+ courses", color: "bg-amber-500/10 text-amber-600" },
  { name: "Design", icon: Palette, count: "1,500+ courses", color: "bg-pink-500/10 text-pink-600" },
  { name: "Marketing", icon: TrendingUp, count: "1,200+ courses", color: "bg-green-500/10 text-green-600" },
  { name: "IT & Software", icon: Monitor, count: "2,100+ courses", color: "bg-cyan-500/10 text-cyan-600" },
  { name: "Personal Development", icon: User, count: "900+ courses", color: "bg-orange-500/10 text-orange-600" },
  { name: "Photography", icon: Camera, count: "600+ courses", color: "bg-indigo-500/10 text-indigo-600" },
  { name: "Music", icon: Music, count: "500+ courses", color: "bg-rose-500/10 text-rose-600" },
]

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Explore Top Categories</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our most popular categories and find the perfect course for your learning journey
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.name.toLowerCase().replace(/ & /g, "-")}`}
              className="group"
            >
              <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full">
                <div
                  className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">{category.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
