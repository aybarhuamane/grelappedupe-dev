'use client'

// import { FiltersLocations } from "@/modules/home/sections/FilterLocation"
// import { HeaderSection } from "@/modules/home/sections/HeaderSection"

export const PanelLayout = ({
  children,
  aside,
}: {
  children: React.ReactNode
  aside?: React.ReactNode
}) => {
  return (
    <main className="flex flex-col">
      <section
        id="filter-location"
        className="bg-success-800"
      >
        {/* <FiltersLocations /> */}
      </section>
      <section
        id="header"
        className="border-b border-gray-200 bg-gray-200"
      >
        {/* <HeaderSection /> */}
      </section>
      <article className="w-full flex container p-0">
        <aside>{aside}</aside>
        <main className="w-full p-6">{children}</main>
      </article>
    </main>
  )
}
