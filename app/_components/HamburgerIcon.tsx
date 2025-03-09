"use client";

export default function HamburgerIcon({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className="group relative aspect-square h-4 cursor-pointer"
      onClick={onClick}
    >
      <span
        className={`absolute left-1/2 top-0 inline-block h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white transition-all duration-300 ease-in-out ${isActive && "!top-1/2 rotate-45 !bg-black"}`}
      ></span>
      <span
        className={`absolute left-1/2 top-1/2 inline-block h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white transition-all duration-300 ease-in-out ${isActive && "opacity-0"}`}
      ></span>
      <span
        className={`absolute left-1/2 top-full inline-block h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white transition-all duration-300 ease-in-out ${isActive && "!top-1/2 -rotate-45 !bg-black"}`}
      ></span>
    </div>
  );
}
