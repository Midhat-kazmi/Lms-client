// CustomModel.tsx
import React, { FC } from "react";

export interface CustomModelProps<T extends object> {
  open: boolean;
  setOpen: (open: boolean) => void;
  component: FC<T>;
  componentProps?: T;
}

const CustomModel = <T extends object>({
  open,
  setOpen,
  component: Component,
  componentProps,
}: CustomModelProps<T>) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg relative">
        <button
          className="absolute top-2 right-2"
          onClick={() => setOpen(false)}
        >
          X
        </button>
        <Component {...(componentProps as T)} />
      </div>
    </div>
  );
};

export default CustomModel;
