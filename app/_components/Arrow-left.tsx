export function CaretLeft({
  className,
}: {
  className?: React.ComponentProps<"svg">["className"];
}) {
  return (
    <svg
      width="36"
      height="35"
      viewBox="0 0 36 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_1208_1626)">
        <path
          d="M22.375 28.4375L11.4375 17.5L22.375 6.5625"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1208_1626">
          <rect
            width="35"
            height="35"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function CaretRight({
  className,
}: {
  className?: React.ComponentProps<"svg">["className"];
}) {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_1208_1622)">
        <path
          d="M13.125 6.5625L24.0625 17.5L13.125 28.4375"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1208_1622">
          <rect width="35" height="35" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
