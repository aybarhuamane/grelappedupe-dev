import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HeaderSection } from "@/modules/core";
import { CardList } from "@/modules/admin/components/dashboard/CardList";

export default function Page() {
    return (
        <>
            <HeaderSection
                title="Panel de Administrador"
                subtitle="Bienvenido al panel de control"
                disableAddButton
            />
            <main className="container py-8">
                <CardList/>
                {/* <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
                    <ul className="space-y-4">
                        {[
                            { user: 'María López', action: 'creó un nuevo periodo de evaluación', time: 'Hace 2 horas' },
                            { user: 'Juan Pérez', action: 'actualizó la información de una institución', time: 'Hace 4 horas' },
                            { user: 'Ana García', action: 'generó un reporte de evaluaciones', time: 'Ayer' },
                            { user: 'Carlos Rodríguez', action: 'añadió un nuevo director', time: 'Hace 2 días' },
                        ].map((activity, index) => (
                            <li key={index} className="flex items-center space-x-3">
                                <Avatar>
                                    <AvatarFallback>{activity.user[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">{activity.user} {activity.action}</p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        <Button variant="link">Ver toda la actividad</Button>
                    </div>
                </div> */}
            </main>
        </>
    )
}