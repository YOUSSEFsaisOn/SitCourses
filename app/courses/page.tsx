"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Search, Filter, Star, Clock, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getAllCourses } from "@/services/course-service";
import { Course } from "@/lib/types";
import dynamic from "next/dynamic";

// Lazy load course card component
const CourseCard = dynamic(() => import("@/components/CourseCard"), {
  loading: () => <CourseCardSkeleton />,
});

function CourseCardSkeleton() {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden animate-pulse">
      <div className="h-48 bg-muted"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-3 bg-muted rounded w-1/2"></div>
        <div className="flex items-center gap-2">
          <div className="h-4 bg-muted rounded w-12"></div>
          <div className="h-3 bg-muted rounded w-16"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-3 bg-muted rounded w-16"></div>
          <div className="h-3 bg-muted rounded w-20"></div>
        </div>
        <div className="h-6 bg-muted rounded w-20"></div>
      </div>
    </div>
  );
}

const categories = [
  "All Categories",
  "Development",
  "Business",
  "Design",
  "Marketing",
  "IT & Software",
  "Personal Development",
  "Photography",
  "Music",
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    const loadCourses = () => {
      try {
        const allCourses = getAllCourses();
        setCourses(allCourses);
        setFilteredCourses(allCourses);
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" ||
        course.category === selectedCategory;

      const matchesLevel =
        selectedLevel === "All Levels" ||
        course.level === selectedLevel.toLowerCase();

      return matchesSearch && matchesCategory && matchesLevel;
    });

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "popular":
        default:
          return b.studentsCount - a.studentsCount;
      }
    });

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedCategory, selectedLevel, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-64"></div>
            <div className="h-12 bg-muted rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Browse Courses
          </h1>
          <p className="text-muted-foreground">
            Discover thousands of courses from expert instructors
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card p-6 rounded-lg border border-border mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="w-full lg:w-40">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="w-full lg:w-40">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {filteredCourses.length} course
            {filteredCourses.length !== 1 ? "s" : ""} found
          </p>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Filters applied
            </span>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No courses found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All Categories");
                setSelectedLevel("All Levels");
                setSortBy("popular");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Suspense fallback={<CourseCardSkeleton />}>
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </Suspense>
          </div>
        )}

        {/* Load More (for future pagination) */}
        {filteredCourses.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
            <Button variant="outline" disabled>
              Load More Courses (Coming Soon)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
