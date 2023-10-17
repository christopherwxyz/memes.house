import React from "react";
// File: components/buttons/Button.tsx
export function Button({ children, variant }: {
    children: React.ReactNode;
    variant: string;
  }): React.JSX.Element {
    const baseClasses = "px-4 py-2 rounded transition";
    const variantClasses = {
      outline: "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white",
      // ... other variants
    };
  
    const classes = `${baseClasses} ${variantClasses[variant]}`;
  
    return (
      <div className={classes}>
        {children}
      </div>
    );
  }
  