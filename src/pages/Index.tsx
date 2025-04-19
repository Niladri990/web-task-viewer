
import { useState, useEffect } from "react";
import TaskManagerHeader from "@/components/TaskManagerHeader";
import SideNavigation from "@/components/SideNavigation";
import CpuPerformance from "@/components/CpuPerformance";
import MemoryPerformance from "@/components/MemoryPerformance";
import DiskPerformance from "@/components/DiskPerformance";
import NetworkPerformance from "@/components/NetworkPerformance";
import usePerformanceData from "@/hooks/usePerformanceData";

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("CPU");
  const performanceData = usePerformanceData();

  return (
    <div className="flex flex-col h-screen bg-[#F2F2F2] overflow-hidden">
      <TaskManagerHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <SideNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 overflow-auto p-4">
          {activeTab === "CPU" && <CpuPerformance data={performanceData.cpu} />}
          {activeTab === "Memory" && <MemoryPerformance data={performanceData.memory} />}
          {activeTab === "Disk" && <DiskPerformance data={performanceData.disk} />}
          {activeTab === "Network" && <NetworkPerformance data={performanceData.network} />}
        </div>
      </div>
    </div>
  );
};

export default Index;
