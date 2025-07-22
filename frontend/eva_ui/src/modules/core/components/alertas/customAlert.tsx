interface IProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  color?: "success" | "danger" | "warning" | "info";
  hasIcon?: boolean;
  className?: string;
}
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";

const colors = {
  success: {
    header: "text-green-500 font-semibold",
    content: "bg-green-50 text-green-800 border-green-500",
    icon: "bg-green-300 text-green-700",
  },
  danger: {
    header: "text-red-500 font-semibold",
    content: "bg-red-50 text-red-800 border-red-500",
    icon: "bg-red-300 text-red-700",
  },
  warning: {
    header: "text-yellow-500 font-semibold",
    content: "bg-yellow-50 text-yellow-800 border-yellow-500",
    icon: "bg-yellow-300 text-yellow-700",
  },
  info: {
    header: "text-blue-500 font-semibold",
    content: "bg-blue-50 text-gray-500 border-blue-500",
    icon: "bg-blue-300 text-white",
  },
};

const sizeIcon = 20;

const icons = {
  success: <CheckCircle size={sizeIcon} />,
  danger: <AlertCircle size={sizeIcon} />,
  warning: <AlertTriangle size={sizeIcon} />,
  info: <Info size={sizeIcon} />,
};

export const AlertCustom = (props: IProps) => {
  const { title, content, color = "info", hasIcon = true } = props;

  const colorClass = colors[color];
  const icon = icons[color];

  return (
    <main
      className={`flex gap-4 lg:gap-6 p-4 sm:p-6 border-l-5 rounded-sm ${colorClass.content}`}
    >
      <section>
        {hasIcon && (
          <div className={`p-2 rounded-md shadow-lg ${colorClass.icon}`}>
            {icon}
          </div>
        )}
      </section>
      <section className="flex flex-col gap-2">
        <div className={` ${colorClass.header}`}>{title}</div>
        <div className="text-xs ">{content}</div>
      </section>
    </main>
  );
};
