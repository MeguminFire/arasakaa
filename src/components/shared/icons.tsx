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
      <path d="M8 3V21" />
      <path d="M4 3H12" />
      <path d="M16 3V21" />
      <path d="M12 3H20" />
    </svg>
  );
}
