import { LayoutAsideSection } from "@/modules/core";
import AsideInfo from "./info-aside";

interface IProps {
  title?: string;
  children?: React.ReactNode;
  infoTitle?: string;
  infoDescription?: string;
}

export const TabsLayout = (props: IProps) => {
  const { title, children, infoTitle, infoDescription } = props;

  return (
    <>
      <section className="container mx-auto">
        <LayoutAsideSection
          aside={<AsideInfo title={infoTitle} description={infoDescription} />}
          asidePosition="left"
        >
          <div className="p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-4">
              {title || "Title"}
            </h2>
          </div>
          {children}
        </LayoutAsideSection>
      </section>
    </>
  );
};
