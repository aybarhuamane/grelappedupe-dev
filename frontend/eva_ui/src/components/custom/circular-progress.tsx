"use client";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircularProgressProps {
  value: number; // Valor del progreso (0 a 100)
}

export const CircularProgress = ({ value }: CircularProgressProps) => {
  return (
    <div style={{ width: 40, height: 40 }}>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          textSize: "24px",
          pathColor: `${
            value === 0
              ? "#D4D4D8" // Gris si es 0%
              : value > 0 && value <= 25
              ? "#F54180" // Rojo de 1% a 25%
              : value > 25 && value <= 50
              ? "#F7B750" // Naranja de 26% a 50%
              : value > 50 && value < 100
              ? "#F5A524" // Amarillo de 51% a 99%
              : "#17C964" // Verde para 100%
          }`,
          textColor: "#000",
          trailColor: "#E5E7EB", // Color de fondo del círculo
        })}
      />
    </div>
  );
};
