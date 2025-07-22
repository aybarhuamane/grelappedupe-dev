import { LayoutAside } from "@/types";

export const LayoutAsideSection = (props: LayoutAside.ILayoutAsideProps) => {
  const { aside, children, asidePosition = "left" } = props;

  return (
    <main className="w-full flex flex-col md:flex-row gap-6 container">
      {asidePosition === "left" && (
        <aside className="w-full md:w-72">{aside}</aside>
      )}
      <article className="w-full max-w-[calc(100%-288px)]">{children}</article>
      {asidePosition === "right" && (
        <aside className="w-full md:w-72">{aside}</aside>
      )}
    </main>
  );
};
