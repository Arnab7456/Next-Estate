'use client'

import React from "react";
import { motion } from "motion/react"
import { AboutData } from "@/types/about.types"; 

const Page = () => {
  return (
    <motion.main
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay: 0.25,
      type: "spring",
      damping: 10,
      stiffness: 100,
    }}
  >
    <div className="py-20 px-4 max-w-6xl mx-auto">
      <h1 className="mx-auto mb-8 w-full text-center text-4xl md:mb-12 md:text-5xl">
        About <span className="text-blue-600">Nest Scout</span>
      </h1>
      <div className="mx-auto max-w-3xl">
        {AboutData.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.5 + item.id * 0.1,
              type: "spring",
              damping: 10,
              stiffness: 100,
            }}
            className="mb-6"
          >
            <p className="mb-2 text-lg font-medium text-foreground/80">
              {item.title}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.main>
);
};

export default Page;
