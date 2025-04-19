
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TaskManagerHeader = () => {
  const [activeTab, setActiveTab] = useState("Performance");

  return (
    <div className="bg-white border-b border-gray-200 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-lg font-medium">Task Manager</h1>
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm">_</Button>
          <Button variant="ghost" size="sm">□</Button>
          <Button variant="ghost" size="sm" className="text-red-500">×</Button>
        </div>
      </div>
      
      <div className="px-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start bg-transparent h-9">
            <TabsTrigger value="File" className="data-[state=active]:bg-transparent">File</TabsTrigger>
            <TabsTrigger value="Options" className="data-[state=active]:bg-transparent">Options</TabsTrigger>
            <TabsTrigger value="View" className="data-[state=active]:bg-transparent">View</TabsTrigger>
            <TabsTrigger value="Help" className="data-[state=active]:bg-transparent">Help</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="px-2 pb-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start h-9">
            <TabsTrigger value="Processes">Processes</TabsTrigger>
            <TabsTrigger value="Performance" className="bg-gray-100 data-[state=active]:bg-white">Performance</TabsTrigger>
            <TabsTrigger value="App history">App history</TabsTrigger>
            <TabsTrigger value="Startup">Startup</TabsTrigger>
            <TabsTrigger value="Users">Users</TabsTrigger>
            <TabsTrigger value="Details">Details</TabsTrigger>
            <TabsTrigger value="Services">Services</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default TaskManagerHeader;
