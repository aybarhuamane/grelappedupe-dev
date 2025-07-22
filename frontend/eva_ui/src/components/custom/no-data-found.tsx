import Image from "next/image";

interface NoDataFoundProps {
  title?: string;
}

export const NoDataFound = ({ title }: NoDataFoundProps) => {
  return (
    <section className="flex flex-col items-center justify-center">
      <Image src="/svg/no-data.svg" alt="Timeout" width={300} height={200} />
      <h1 className="text-sm text-center">
        {title ||
          "No se encontraron datos. Por favor, intente nuevamente más tarde."}
      </h1>
    </section>
  );
};
