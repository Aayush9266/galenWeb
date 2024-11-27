// import React from 'react';

// export function Card({ className, ...props }) {
//   return (
//     <div className={`bg-teal-100 shadow rounded-lg ${className}`} {...props} />
//   );
// }

// export function CardContent({ className, ...props }) {
//   return (
//     <div className={`p-6 ${className}`} {...props} />
//   );
// }

import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ className, ...props }) {
  return (
    <div className={cn("bg-teal-100 shadow rounded-lg", className)} {...props} />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div className={cn("px-6 py-4 border-b", className)} {...props} />
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div className={cn("p-6", className)} {...props} />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h3 className={cn("text-lg font-semibold", className)} {...props} />
  );
}

