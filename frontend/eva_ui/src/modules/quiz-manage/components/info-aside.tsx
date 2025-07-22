interface IProps {
  title?: string;
  description?: string;
}

export default function AsideInfo(props: IProps) {
  const { title, description } = props;

  return (
    <>
      <div className="bg-white p-6 space-y-4 w-full">
        <h2 className="text-lg font-semibold border-b pb-4">
          {title ? title : "Detalles"}
        </h2>
        <p className="text-sm text-gray-500">
          {description ? description : "Detalles de recursos"}
        </p>
      </div>
    </>
  );
}
