export default function InputGroupContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col space-y-1">{children}</div>;
}
