import { course, detailInstitution } from "@/types";
import { Suspense } from "react";
import { DetailsSection, RecentList } from "./sections";
import { TableSectionResume } from "./sections/TableSectionResume";
interface IDirectorHomeProps {
  data: detailInstitution.IDetailInstitutionList[] | null;
  courses: course.ICourse[];
}

export const DirectorHome = (props: IDirectorHomeProps) => {
  const { data, courses } = props;

  return (
    <div className="grid grid-cols-12 gap-5 container pt-6 h-full">
      <div className="col-span-3 h-full">
        <Suspense fallback={<div>Cargando...</div>}>
          {data && <DetailsSection data={data} />}
        </Suspense>
      </div>
      <div className="col-span-9 grid grid-cols-1 gap-5">
        <Suspense fallback={<div>Cargando...</div>}>
          <TableSectionResume courses={courses} institutionDetails={data} />
          {/* <NoDataFound /> */}
        </Suspense>
        <Suspense fallback={<div>Cargando...</div>}>
          <RecentList data={data} />
        </Suspense>
      </div>
    </div>
  );
};
