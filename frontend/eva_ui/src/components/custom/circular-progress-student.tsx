"use client";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircularProgressProps {
  value: number; // Valor del progreso (0 a 100)
  color?: string; // Color personalizado del progreso
  label?: string; // Etiqueta opcional
  count?: number;
}

export const StudentCircularProgress = ({
  value,
  color,
  label,
  count,
}: CircularProgressProps) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-base text-gray-400 font-bold">{count}</span>
      <div className="w-16 h-16">
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            textSize: "20px",
            pathColor: color
              ? color
              : value === 0
              ? "#D4D4D8" // Gris si es 0%
              : value > 0 && value <= 25
              ? "#F54180" // Rojo de 1% a 25%
              : value > 25 && value <= 50
              ? "#F7B750" // Naranja de 26% a 50%
              : value > 50 && value < 100
              ? "#F5A524" // Amarillo de 51% a 99%
              : "#17C964", // Verde para 100%
            textColor: "#000",
            trailColor: "#E5E7EB", // Color de fondo del círculo
          })}
        />
      </div>
      {label && (
        <span className="mt-2 text-sm font-medium text-gray-600">{label}</span>
      )}
    </div>
  );
};
