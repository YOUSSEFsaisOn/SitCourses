"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { Star, Clock, Users, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";
import { getAllCourses } from "@/services/course-service";
import { Course } from "@/lib/types";

const courses = getAllCourses();

const tabs = [
  "All",
  "Development",
  "Design",
  "Marketing",
  "Data Science",
  "IT & Software",
];

export function FeaturedCourses() {
  const [activeTab, setActiveTab] = useState("All");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { addItem, isInCart } = useCartStore();

  const filteredCourses =
    activeTab === "All"
      ? courses
      : courses.filter((course) => course.category === activeTab);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (course: Course) => {
    const cartItem = {
      courseId: course.id,
      course,
      addedAt: new Date(),
    };
    addItem(cartItem);
  };

  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Featured Courses
            </h2>
            <p className="text-muted-foreground">
              Learn from the best instructors around the world
            </p>
          </div>
          <Link href="/courses">
            <Button variant="outline">View All Courses</Button>
          </Link>
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
              className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
            >
              {/* Course Image */}
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {course.rating >= 4.8 && (
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    Bestseller
                  </Badge>
                )}
                <button
                  onClick={() => toggleWishlist(course.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      wishlist.includes(course.id)
                        ? "fill-red-500 text-red-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              </div>

              {/* Course Info */}
              <div className="p-4 space-y-3">
                <div>
                  <Link href={`/courses/${course.id}`}>
                    <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">
                    {course.instructor.name}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-500">
                    {course.rating}
                  </span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(course.rating)
                            ? "fill-amber-500 text-amber-500"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({course.reviewsCount})
                  </span>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.studentsCount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Price and Cart */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-foreground">
                      ${course.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${(course.price * 1.5).toFixed(0)}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(course)}
                    disabled={isInCart(course.id)}
                    className="gap-1"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {isInCart(course.id) ? "In Cart" : "Add"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
