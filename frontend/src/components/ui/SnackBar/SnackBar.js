"use client";
import { Transition } from "react-transition-group";
import { useEffect, useRef } from "react";
import cx from "classnames";

const SnackBar = (props) => {
  const { className, duration = 3000, snackbar, setSnackbar } = props;
  const nodeRef = useRef();

  const defaultStyle = {
    transform: "translateY(0%)", // Start from above the top edge
    transition: `transform 150ms ease-in-out`,
  };

  const transitionStyles = {
    entering: { transform: "translateY(0%)" },
    entered: { transform: "translateY(0)" },
    exiting: { transform: "translateY(-100%)" },
    exited: { transform: "translateY(-100%)" },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSnackbar({ ...snackbar, open: false });
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [snackbar?.open]);

  return (
    <Transition nodeRef={nodeRef} in={snackbar?.open} timeout={150}>
      {(state) => (
        <div
          ref={nodeRef}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
          className={cx(
            "fixed left-0 right-0 top-0 z-50 p-3 text-center text-white",
            snackbar?.type === "error" && "bg-red-700",
            snackbar?.type === "success" && "bg-green-800",
            snackbar?.type === "info" && "bg-stone-800",
            className
          )}
        >
          <h6>{snackbar?.message}</h6>
        </div>
      )}
    </Transition>
  );
};

export default SnackBar;
