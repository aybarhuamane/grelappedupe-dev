"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface ITab {
    label: string;
    value: string;
    redirectTo?: string;
}

interface IProps {
    tabs: ITab[];
    defaultValue: string;
}

export const DynamicTabsUrl = ({ tabs, defaultValue }: IProps) => {
    const pathname = usePathname();
    const activeTab = tabs.find(tab => pathname.endsWith(tab.value))?.value || defaultValue;

    return (
        <section className="flex-1">
            <Tabs defaultValue={activeTab} className="w-full overflow-x-auto">
                <div className="bg-background border-b border-gray-200">
                    <TabsList className="bg-background flex justify-between w-full container items-end rounded-none p-0 h-8">
                        {tabs.map((tab) => (
                            <Link key={tab.value} href={tab.redirectTo || "#"} passHref className="w-full">
                                <TabsTrigger
                                    value={tab.value}
                                    className="w-full text-md data-[state=active]:text-md font-bold bg-transparent 
                                        data-[state=active]:border-b-2 data-[state=active]:border-primary 
                                        rounded-none data-[state=active]:shadow-none data-[state=active]:bg-primary/10 
                                        data-[state=active]:text-primary hover:border-b-2 hover:border-gray-400 
                                        hover:shadow-none hover:bg-transparent"
                                >
                                    {tab.label}
                                </TabsTrigger>
                            </Link>
                        ))}
                    </TabsList>
                </div>
            </Tabs>
        </section>
    );
};
