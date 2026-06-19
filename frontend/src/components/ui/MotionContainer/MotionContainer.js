"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
const MotionContainer = ({ children, className }) => {
  const ref = useRef(null);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.2,
          duration: 0.5,
        },
      }}
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionContainer;
