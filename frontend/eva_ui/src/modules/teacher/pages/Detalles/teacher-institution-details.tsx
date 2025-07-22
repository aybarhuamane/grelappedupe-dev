import { HeaderSection } from "@/modules/core";
import { BannerPeriodo } from "@/modules/teacher";
import { courseAssignment, period, response } from "@/types";
import { TeacherProfileCard } from "../../components/aside/teacher-profile-card";
import { TeacherInstitutionHistory } from "../../components/TeacherInstitutionDetail/teacher-institution-detail";

interface IProps {
  data: response.IResApi<courseAssignment.ITeacherAssignmentList>;
  dataPeriodo: response.IResApi<period.IPeriodList>;
}

export const TeacherInstitutionDetails = (props: IProps) => {
  const { data, dataPeriodo } = props;
  const listData = data?.results || [];

  return (
    <div className="flex flex-col">
      <HeaderSection
        title="Mi registro de institución"
        subtitle="Aquí puedes ver los cursos que has registrado en la institución"
        disableAddButton
      />
      {dataPeriodo?.count > 0 && (
        <BannerPeriodo dataPeriodo={dataPeriodo?.results[0]} />
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="col-span-1">
            <TeacherProfileCard />
          </aside>

          <section className="col-span-3 flex gap-4">
            <TeacherInstitutionHistory institutions={listData} />
          </section>
        </div>
      </main>
    </div>
  );
};
