"use client";
import React from "react";
import toast from "react-hot-toast";

const Record = () => {
  try {
    throw new Error("未完成");
  } catch (error) {
    toast.error("機能していません");
  }
  return <div></div>;
};

export default Record;
