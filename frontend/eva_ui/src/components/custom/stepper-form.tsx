import { cn } from "@/lib/utils"; // Asegúrate de que tienes esta función para manejar clases dinámicas en Tailwind
import React from "react";

interface StepperProps {
    steps: { label: string }[];
    currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
    return (
        <div className="flex items-center justify-between w-full px-6 py-4 bg-white shadow-md rounded-lg">
            {steps.map((step, index) => (
                <div key={index} className="relative flex flex-col items-center">
                    {/* Línea de conexión */}
                    {index > 0 && (
                        <div
                            className={cn(
                                "absolute top-1/2 left-0 w-full h-1 bg-gray-300 -z-10",
                                currentStep >= index && "bg-blue-500"
                            )}
                        />
                    )}

                    {/* Número del paso */}
                    <div
                        className={cn(
                            "w-8 h-8 flex items-center justify-center rounded-full border-2",
                            currentStep >= index
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-gray-100 text-gray-500 border-gray-300"
                        )}
                    >
                        {index + 1}
                    </div>

                    {/* Etiqueta del paso */}
                    <span
                        className={cn(
                            "mt-2 text-sm",
                            currentStep >= index ? "text-blue-600 font-semibold" : "text-gray-500"
                        )}
                    >
                        {step.label}
                    </span>
                </div>
            ))}
        </div>
    );
};
