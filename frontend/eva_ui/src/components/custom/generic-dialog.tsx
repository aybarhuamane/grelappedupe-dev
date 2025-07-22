'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { ReactNode, useState } from "react";

interface GenericDialogProps {
    title: string;
    triggerLabel?: string;
    children: ReactNode;
    triggerIcon?: ReactNode;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
    withFull?: boolean
}

export const GenericDialog = ({ title, triggerLabel, children, triggerIcon, variant, withFull }: GenericDialogProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={variant ?? 'default'}
                    onClick={() => setOpen(true)}
                    className={withFull ? 'w-full gap-2 justify-start' : 'gap-2'}
                    size='default'>
                    {triggerIcon ?? <PlusCircle size={18} />}
                    {triggerLabel ? triggerLabel : null}
                </Button>
            </DialogTrigger>
            <DialogContent
                aria-describedby="dialog-description"
                ria-describedby="dialog-description">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};