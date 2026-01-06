"use client"

import { useState } from "react"
import { Star, Clock, Users, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const courses = [
  {
    id: 1,
    title: "The Complete Web Development Bootcamp 2025",
    instructor: "Dr. Angela Yu",
    rating: 4.8,
    reviews: 245000,
    price: 84.99,
    originalPrice: 199.99,
    image: "altumcode-dC6Pb2JdAqs-unsplash.jpg",
    category: "Development",
    bestseller: true,
    hours: 65,
    students: 890000,
  },
  {
    id: 2,
    title: "Machine Learning A-Z: AI, Python & R",
    instructor: "Kirill Eremenko",
    rating: 4.7,
    reviews: 178000,
    price: 79.99,
    originalPrice: 189.99,
    image: "/brooke-cagle-g1Kr4Ozfoac-unsplash.jpg",
    category: "Data Science",
    bestseller: true,
    hours: 44,
    students: 650000,
  },
  {
    id: 3,
    title: "iOS & Swift - The Complete iOS App Development",
    instructor: "Dr. Angela Yu",
    rating: 4.8,
    reviews: 89000,
    price: 89.99,
    originalPrice: 199.99,
    image: "/boliviainteligente-aP61AhDoAm0-unsplash.jpg",
    category: "Development",
    bestseller: false,
    hours: 60,
    students: 320000,
  },
  {
    id: 4,
    title: "Digital Marketing Masterclass - 23 Courses in 1",
    instructor: "Phil Ebiner",
    rating: 4.6,
    reviews: 45000,
    price: 74.99,
    originalPrice: 169.99,
    image: "/alexander-shatov-mr4JG4SYOF8-unsplash.jpg",
    category: "Marketing",
    bestseller: false,
    hours: 38,
    students: 180000,
  },
  {
    id: 5,
    title: "Complete UI/UX Design: From Figma to Reality",
    instructor: "Daniel Scott",
    rating: 4.9,
    reviews: 67000,
    price: 69.99,
    originalPrice: 159.99,
    image: "/daniel-korpai-mxPiMiz7KCo-unsplash.jpg",
    category: "Design",
    bestseller: true,
    hours: 42,
    students: 240000,
  },
  {
    id: 6,
    title: "Python for Data Science and Machine Learning",
    instructor: "Jose Portilla",
    rating: 4.7,
    reviews: 134000,
    price: 84.99,
    originalPrice: 189.99,
    image: "/brecht-corbeel-QUwM2LDVs3A-unsplash.jpg",
    category: "Data Science",
    bestseller: true,
    hours: 52,
    students: 520000,
  },
  {
    id: 7,
    title: "AWS Certified Solutions Architect 2025",
    instructor: "Stephane Maarek",
    rating: 4.8,
    reviews: 98000,
    price: 94.99,
    originalPrice: 199.99,
    image: "/campaign-creators-gMsnXqILjp4-unsplash.jpg",
    category: "IT & Software",
    bestseller: true,
    hours: 48,
    students: 380000,
  },
  {
    id: 8,
    title: "Complete Photography Masterclass",
    instructor: "Phil Ebiner",
    rating: 4.6,
    reviews: 32000,
    price: 59.99,
    originalPrice: 139.99,
    image: "/erik-mclean-2Wv9VnwzeeI-unsplash.jpg",
    category: "Photography",
    bestseller: false,
    hours: 28,
    students: 95000,
  },
]

const tabs = ["All", "Development", "Design", "Marketing", "Data Science", "IT & Software"]

export function FeaturedCourses() {
  const [activeTab, setActiveTab] = useState("All")
  const [wishlist, setWishlist] = useState<number[]>([])

  const filteredCourses = activeTab === "All" ? courses : courses.filter((course) => course.category === activeTab)

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Featured Courses</h2>
            <p className="text-muted-foreground">Learn from the best instructors around the world</p>
          </div>
          <Button variant="outline">View All Courses</Button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className="rounded-full"
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
            >
              {/* Course Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {course.bestseller && (
                  <Badge className="absolute top-3 left-3 bg-amber-500 text-white hover:bg-amber-600">Bestseller</Badge>
                )}
                <button
                  onClick={() => toggleWishlist(course.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      wishlist.includes(course.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                    }`}
                  />
                </button>
              </div>

              {/* Course Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{course.instructor}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-500">{course.rating}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(course.rating) ? "fill-amber-500 text-amber-500" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({(course.reviews / 1000).toFixed(0)}K)</span>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.hours}h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{(course.students / 1000).toFixed(0)}K</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  <span className="text-xl font-bold text-foreground">${course.price}</span>
                  <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
