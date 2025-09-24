import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border-2 border-[#004A58]/20 bg-white px-3 py-2 text-base text-[#2E2F2D] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#2E2F2D] placeholder:text-[#2E2F2D]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004A58]/20 focus-visible:ring-offset-2 focus-visible:border-[#004A58] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
