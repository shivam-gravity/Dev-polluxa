"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = (props) => {
  // Font families are not being loaded on portal because of document body
  // is not a child of the next app. That's why we are targeting inside of
  // next app in query selector as a default value.
  const { children, querySelector = "#__next > div" } = props;
  const [mountNode, setMountNode] = useState(null);

  useEffect(() => {
    setMountNode(document.querySelector(querySelector) ?? document.body);
  }, [querySelector]);

  return mountNode ? createPortal(children, mountNode) : mountNode;
};

export default Portal;
