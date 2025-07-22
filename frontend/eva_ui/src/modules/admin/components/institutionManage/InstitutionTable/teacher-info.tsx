import { InstitutionTeacherList } from "@/modules/admin/pages/institution-manage/institution-teacher-list";

interface IProps {
  id: string;
}

export const TeachersInfo = ({ id }: IProps) => {
  return <InstitutionTeacherList id={id} headerSection={false} />;
};
