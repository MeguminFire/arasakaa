import type { SVGProps } from 'react';

export function TitanLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 3h8" />
      <path d="M12 3v5" />
      <path d="M12 14v8" />
      <path d="M9 21h6" />
      <path d="m16 8-4 6-4-6" />
      <path d="m16 8-2-5-2 5" />
    </svg>
  );
}
