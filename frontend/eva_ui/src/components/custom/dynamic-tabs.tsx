import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface ITabContent {
    label: string;
    value: string;
    content: React.ReactNode;
}

interface IProps {
    tabs: ITabContent[];
    defaultValue: string;
}

export const DynamicTabs = (props: IProps) => {
    const { tabs, defaultValue } = props;

    return (
        <section className="flex-1">
            <Tabs defaultValue={defaultValue} className="w-full overflow-x-auto">
                <div className='bg-background border-b border-gray-200'>
                    <TabsList className="bg-background flex justify-between w-full container items-end rounded-none p-0 h-8">
                        {tabs.map((tab) => (
                            <TabsTrigger key={tab.value} value={tab.value} className={"w-full text-md data-[state=active]:text-md font-bold bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none data-[state=active]:bg-primary/10 data-[state=active]:text-primary hover:border-b-2 hover:border-gray-400 hover:shadow-none hover:bg-transparent"}>
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
                {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className="pt-2">
                        {tab.content}
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    );
};
