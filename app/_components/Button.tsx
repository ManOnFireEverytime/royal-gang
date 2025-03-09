export default function Button({
  children,
  disabled,
  onClick,
  className,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  className?: React.ComponentProps<"div">["className"];
}) {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
}
