export const PanelLayout = ({
  children,
  aside,
}: {
  children: React.ReactNode
  aside?: React.ReactNode
}) => {
  return (
    <article className="w-full flex container gap-5 py-6 ">
      <aside className="w-72">{aside}</aside>
      <main className="w-full border-l pl-4">{children}</main>
    </article>
  )
}
