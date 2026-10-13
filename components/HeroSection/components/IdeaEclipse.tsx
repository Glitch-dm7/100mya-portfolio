"use client";

import { useLayoutEffect, useRef } from "react";

const ECLIPSE_PATH_1 =
  "M 8 40 A 92 34 0 1 1 192 40 A 92 34 0 1 1 8 40";

const ECLIPSE_PATH_2 =
  "M 6 40 A 94 36 0 1 1 194 40 A 94 36 0 1 1 6 40";

const IdeaEclipse = () => {
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    [path1Ref, path2Ref].forEach((ref) => {
      const path = ref.current;
      if (!path) return;

      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });
  }, []);

  return (
    <svg
      viewBox="0 0 200 80"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[1.5em] w-[132%] -translate-x-1/2 -translate-y-1/2 md:h-[1.45em]"
    >
      <g transform="rotate(-4 100 40)">
        <path
          ref={path1Ref}
          d={ECLIPSE_PATH_1}
          className="idea-eclipse-path idea-eclipse-path-1"
        />
      </g>
      <g transform="rotate(3 100 40)">
        <path
          ref={path2Ref}
          d={ECLIPSE_PATH_2}
          className="idea-eclipse-path idea-eclipse-path-2"
        />
      </g>
    </svg>
  );
};

export default IdeaEclipse;
