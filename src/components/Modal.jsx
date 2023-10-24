"use client";
import React, { useState } from "react";

const Modal = ({ isVisible, children }) => {
  if (!isVisible) return null;

  return (
    <section className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="mx-auto min-w-[300px] md:min-w-[600px]">
        <div className="bg-white px-14 py-4 rounded-md ">{children}</div>
      </div>
    </section>
  );
};

export default Modal;
