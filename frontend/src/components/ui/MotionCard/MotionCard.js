"use client";
import { motion } from "framer-motion";
const MotionCard = ({ children, className }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ type: "tween", stiffness: 400, damping: 10 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionCard;
