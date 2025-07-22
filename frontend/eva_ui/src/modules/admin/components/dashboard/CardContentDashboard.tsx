
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface ICardProps {
    title: string
    icon: any
    count: number
    label: string
    labelButton: string
    hrefButton: string
}


export const CardContentDashboard = (props: ICardProps) => {
    const { count, title, icon, labelButton, hrefButton, label } = props
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{count}</div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <Link href={hrefButton}>
                        <Button variant="outline" size="sm">{labelButton}</Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}