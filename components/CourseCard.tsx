"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Clock, Users, ShoppingCart, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/lib/types";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const cartItem = {
      courseId: course.id,
      course,
      addedAt: new Date(),
    };
    addItem(cartItem);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const cartItem = {
      courseId: course.id,
      course,
      addedAt: new Date(),
    };
    addItem(cartItem);
    router.push("/checkout");
  };

  return (
    <Link
      href={`/courses/${course.id}`}
      className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {course.price === 0 && (
          <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
            Free
          </Badge>
        )}
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 bg-black/70 text-white hover:bg-black/80"
        >
          {course.category}
        </Badge>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {course.instructor.name}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-amber-500">{course.rating}</span>
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
            ({course.reviewsCount.toLocaleString()})
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
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">
              ${course.price}
            </span>
            {course.price > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                ${(course.price * 1.5).toFixed(0)}
              </span>
            )}
          </div>
          {isAuthenticated && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleAddToCart}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Level Badge */}
        <Badge variant="outline" className="text-xs capitalize">
          {course.level}
        </Badge>
      </div>
    </Link>
  );
}
