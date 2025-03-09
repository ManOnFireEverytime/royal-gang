import { ReactNode } from "react";

export default function Policy({
  children,
  header,
  number,
}: {
  children: ReactNode;
  header: string;
  number?: number;
}) {
  return (
    <article>
      <header className="font-medium">
        {number && <span>{number}.&nbsp;</span>}
        {header}:
      </header>

      {children}
    </article>
  );
}
