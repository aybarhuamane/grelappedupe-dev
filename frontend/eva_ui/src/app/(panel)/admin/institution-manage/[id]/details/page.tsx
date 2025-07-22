import { InstitutionDetailList } from "@/modules/admin/components/institutionManage/InstitutionTable/InstitutionDetails";

interface IProps {
  params: {
    id: string;
  };
  searchParams: {
    detail_institution: string;
  };
}

export default function page(props: IProps) {
  const { params, searchParams } = props;
  const { id } = params;
  const { detail_institution } = searchParams;

  return (
    <InstitutionDetailList id={id} detail_institution={detail_institution} />
  );
}
