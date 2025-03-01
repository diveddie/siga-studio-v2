import React from "react";
import { motion } from "framer-motion";

const loadingContainer = {
  width: "2rem",
  height: "2rem",
  display: "flex",
  justifyContent: "space-around",
};

const loadingCircle = {
  display: "block",
  width: "0.4rem",
  height: "0.4rem",
  borderRadius: "0.25rem",
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
      repeat: Infinity,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "50%",
  },
  end: {
    y: "150%",
  },
};

const loadingCircleTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse" as const,
  ease: "easeInOut",
};

interface ThreeDotsWaveProps {
  colorVariable?: string;
}

export default function ThreeDotsWave({
  colorVariable = "--foreground",
}: ThreeDotsWaveProps) {
  return (
    <motion.div
      style={loadingContainer}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      {[1, 2, 3].map((index) => (
        <motion.span
          key={index}
          style={{
            ...loadingCircle,
            backgroundColor: `hsl(var(${colorVariable}) / 0.7)`, // Added opacity for better visual
          }}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
      ))}
    </motion.div>
  );
}
