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

export function GoogleIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" {...props}>
            <path
                fill="currentColor"
                d="M488 261.8C488 403.3 381.5 512 244 512 111.2 512 0 400.8 0 264.8 0 128.8 111.2 17.8 244 17.8c68.8 0 125.2 26.7 172.4 72.4l-64.5 64.5C337 137.4 294.6 116.8 244 116.8c-79.6 0-144.1 64.4-144.1 144s64.5 144 144.1 144c92.3 0 121.1-68.5 125.6-104.3H244V261.8h244z"
            />
        </svg>
    );
}
