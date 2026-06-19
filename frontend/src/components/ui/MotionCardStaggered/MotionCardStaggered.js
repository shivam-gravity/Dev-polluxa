"use client";
import { motion } from "framer-motion";

const staggeredAnimationVariant = {
  initial: {
    opacity: 0,
    y: 200,
  },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

const MotionCardStaggered = ({ children, className, index }) => {
  return (
    <motion.div
      variants={staggeredAnimationVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      custom={index}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionCardStaggered;
