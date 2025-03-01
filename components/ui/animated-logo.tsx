"use client";

import { motion } from "framer-motion";

export function AnimatedLogo({ className }: { className?: string }) {
  return (
    <motion.svg
      initial="hidden"
      animate="visible"
      viewBox="0 0 210.81 210.81"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      variants={{
        hidden: { scale: 1, opacity: 1 },
        visible: {
          scale: [1, 1, 50],
          opacity: [1, 0.8, 0],
          transition: {
            times: [0, 0.8, 1],
            duration: 2.5,
          },
        },
      }}
    >
      {/* Chat Bubble Background */}
      <motion.path
        className="stroke-black dark:stroke-white fill-white dark:fill-background"
        strokeWidth="9"
        d="M93.27,169.06c41.69,6.53,81.58-21.27,89.3-63.48,7.65-41.82-19.98-82.57-61.65-91C78.61,6,37.28,33.24,28.5,75.57c-4.87,23.47,1.27,47.81,16.51,66.13,1.63,1.96,2.48,4.45,2.33,7l-2.54,44.25c-.14,2.43,2.56,3.96,4.57,2.59l36.66-24.89c2.11-1.44,4.7-1.99,7.22-1.59Z"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            },
          },
        }}
      />

      {/* Blue Rectangle */}
      <motion.rect
        className="fill-[#27aae1] stroke-black dark:stroke-white"
        strokeWidth="7"
        x="68.77"
        y="58.88"
        width="72.26"
        height="72.26"
        rx="2"
        ry="2"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: { delay: 0.3, duration: 0.4 },
          },
        }}
      />

      {/* Green Path */}
      <motion.path
        className="fill-[#39b54a] stroke-black dark:stroke-white"
        strokeWidth="7"
        d="M141.03,108.56l-5.85-5.85c-4.25-4.25-11.14-4.25-15.39,0l-28.43,28.43h47.85c1.01,0,1.82-.82,1.82-1.82v-20.76Z"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { delay: 0.5, duration: 0.6 },
          },
        }}
      />

      {/* Yellow Circle */}
      <motion.circle
        className="fill-[#f9ed32] stroke-black dark:stroke-white"
        strokeWidth="5"
        cx="95.87"
        cy="85.98"
        r="9.03"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.7,
            },
          },
        }}
      />
    </motion.svg>
  );
}

