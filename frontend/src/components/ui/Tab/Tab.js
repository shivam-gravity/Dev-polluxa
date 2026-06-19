"use client";
export default function Tab({ label, children }) {
  return (
    <div label={label} className="hidden">
      {children}
    </div>
  );
}
