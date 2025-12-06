"use client";

import React, { FC } from "react";

export interface CustomModelProps<T extends object> {
  open: boolean;
  setOpen: (open: boolean) => void;
  component: FC<T & ExtraProps>;  // extend the child props
  componentProps?: T;
  extraProps?: ExtraProps; // props passed to the child component
}

// Props automatically passed to every modal
export interface ExtraProps {
  setRoute?: (route: string) => void;
  activeItem?: number;
  refetch?: () => void;
}

const CustomModel = <T extends object>({
  open,
  setOpen,
  component: Component,
  componentProps,
  extraProps,
}: CustomModelProps<T>) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2"
          onClick={() => setOpen(false)}
        >
          X
        </button>

        {/* Render the child component with all props */}
        <Component {...(componentProps as T)} {...extraProps} />
      </div>
    </div>
  );
};

export default CustomModel;
