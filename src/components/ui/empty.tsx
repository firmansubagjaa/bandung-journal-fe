"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Empty Container
const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-center justify-center text-center p-8 md:p-12",
      "border-2 border-black dark:border-gray-600",
      "bg-gray-50 dark:bg-gray-800/50",
      className
    )}
    {...props}
  />
))
Empty.displayName = "Empty"

// Empty Media (Icon/Image container)
const EmptyMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mb-6 flex items-center justify-center",
      "w-20 h-20 border-2 border-black dark:border-gray-600 bg-white dark:bg-gray-900",
      "text-gray-400 dark:text-gray-500",
      "[&_svg]:h-10 [&_svg]:w-10",
      className
    )}
    {...props}
  />
))
EmptyMedia.displayName = "EmptyMedia"

// Empty Title
const EmptyTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl md:text-2xl font-black uppercase tracking-tight",
      "text-black dark:text-white mb-2",
      className
    )}
    {...props}
  />
))
EmptyTitle.displayName = "EmptyTitle"

// Empty Description
const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm md:text-base text-gray-500 dark:text-gray-400",
      "max-w-sm mb-6",
      className
    )}
    {...props}
  />
))
EmptyDescription.displayName = "EmptyDescription"

// Empty Content (Actions container)
const EmptyContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col sm:flex-row items-center gap-3",
      className
    )}
    {...props}
  />
))
EmptyContent.displayName = "EmptyContent"

export { Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent }
