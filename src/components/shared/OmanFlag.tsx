
import React from "react";

export function OmanFlag({ className = "h-4 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 600"
    >
      {/* Red top */}
      <rect width="1200" height="200" fill="#c8102e" />
      {/* White middle */}
      <rect width="1200" height="200" y="200" fill="#ffffff" />
      {/* Green bottom */}
      <rect width="1200" height="200" y="400" fill="#008000" />
      {/* Red banner */}
      <rect width="400" height="600" fill="#c8102e" />
      {/* Emblem */}
      <g transform="translate(200, 300) scale(0.2)">
        <path d="M-125,-25 L0,-175 L125,-25 L0,75 Z" fill="#ffffff" />
        <path d="M-100,-25 L0,-150 L100,-25 L0,50 Z" fill="#c8102e" />
      </g>
    </svg>
  );
}
