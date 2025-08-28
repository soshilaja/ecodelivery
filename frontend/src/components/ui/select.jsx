// ../components/ui/select.jsx
import React from "react";

export const Select = React.forwardRef(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
    {...props}
  />
));

Select.displayName = "Select"; // Optional
