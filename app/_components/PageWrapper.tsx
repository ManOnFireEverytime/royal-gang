import Footer from "./footer";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
}
