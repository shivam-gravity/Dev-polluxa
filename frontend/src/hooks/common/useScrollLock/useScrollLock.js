"use client";
import { useCallback, useEffect, useId, useRef } from "react";
// based on lock property we need to ensure
// the document.body will not be scrollable.
//
// this is required for any component using an individual
// backdrop, as they don't implement a common way to
// disable the scroll bar. A backdrop component must be created to be used
// in Modals, Drawers or any component that required it.
//
const useScrollLock = (props) => {
  const { lock } = props;
  const bodyRef = useRef();
  const lockId = useId();
  // check if the scroll can be locked, or
  // it is already locked by another component
  const scrollCanBeLocked = useCallback(() => {
    const { current: body } = bodyRef;

    if (!("scrollLocked" in body.dataset)) {
      body.dataset.scrollLocked = lockId;
    }

    return body.dataset.scrollLocked === lockId;
  }, [lockId]);

  useEffect(() => {
    if (!bodyRef.current) {
      bodyRef.current = document.body;
    }

    const { current: body } = bodyRef;

    if (scrollCanBeLocked()) {
      body.style.overflow = lock ? "hidden" : null;
      // clear the locked scroll allowing the next component acquire it
      if (!lock) {
        delete body.dataset.scrollLocked;
      }
    }

    return () => {
      // This will ensure that the element will
      // unlock the scroll when it gets unmounted
      if (scrollCanBeLocked()) {
        body.style.overflow = null;
        delete body.dataset.scrollLocked;
      }
    };
  }, [lock, scrollCanBeLocked]);
};

export default useScrollLock;
