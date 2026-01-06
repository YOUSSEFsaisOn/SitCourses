import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Frontend Developer at Google",
    avatar: "/professional-woman-headshot.png",
    content:
      "LearnHub completely changed my career. I went from knowing nothing about coding to landing my dream job at Google in just 8 months.",
    rating: 5,
    course: "Web Development Bootcamp",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Data Scientist at Meta",
    avatar: "/professional-asian-man-headshot.png",
    content:
      "The machine learning courses here are world-class. The instructors break down complex concepts into digestible pieces.",
    rating: 5,
    course: "Machine Learning A-Z",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Designer at Airbnb",
    avatar: "/professional-latina-woman-headshot.png",
    content:
      "I've taken design courses everywhere, but nothing compares to the quality and depth of instruction here. Highly recommend!",
    rating: 5,
    course: "UI/UX Design Masterclass",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">What Our Students Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join millions of learners who have transformed their careers with LearnHub
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-foreground mb-6 leading-relaxed">{testimonial.content}</p>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Course: <span className="text-primary font-medium">{testimonial.course}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/20">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to start learning?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join over 2 million students and start your learning journey today. First course is on us!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Get Started for Free
            </button>
            <button className="px-8 py-3 bg-card text-foreground rounded-lg font-semibold border border-border hover:bg-secondary transition-colors">
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
