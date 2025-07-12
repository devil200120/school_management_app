import React, { forwardRef } from "react";
import { cn } from "../../lib/utils"; // Adjust the path as necessary

const Card = forwardRef(({ className='', ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border px-0 rounded-lg bg-card mt-0 text-card-foreground shadow-sm", className)}
    {...props}
  />
));
Card.displayName = "Card";

const ColoredBorderedCard = forwardRef(({ className='', ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg bg-card mt-0 text-card-foreground shadow-sm", className)}
    {...props}
  />
));
ColoredBorderedCard.displayName = "ColoredBorderedCard"; 
const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.2 p-3 sm:p-3", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl sm:text-2xl font-semibold leading-tight tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-3 sm:p-3 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-3 sm:p-3 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  ColoredBorderedCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
