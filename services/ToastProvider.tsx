"use client";
import React from "react";
import { Toaster } from "sonner";

const ToastProvider = () => {
   return (
      <Toaster richColors position="top-center" closeButton duration={8000} />
   );
};

export default ToastProvider;
