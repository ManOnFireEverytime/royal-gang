export default function Button({
  children,
  disabled,
  onClick,
  type = "button",
  className,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: React.ComponentProps<"button">["className"];
}) {
  return (
    <button 
      type={type}
      onClick={onClick} 
      className={className} 
      disabled={disabled}
    >
      {children}
    </button>
  );
}