
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import UsageGraph from "@/components/UsageGraph";
import { cpu } from "lucide-react";

interface CpuData {
  utilization: number;
  speed: string;
  coreCount: number;
  coreData: number[];
  processes: number;
  threads: number;
  handles: number;
  upTime: string;
  history: number[];
}

interface CpuPerformanceProps {
  data: CpuData;
}

const CpuPerformance = ({ data }: CpuPerformanceProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <cpu className="h-5 w-5 mr-2 text-primary" />
        <h2 className="text-xl font-semibold">CPU</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-4">
          <div className="flex justify-between mb-2">
            <div>
              <h3 className="font-medium">{data.utilization.toFixed(1)}%</h3>
              <p className="text-xs text-gray-500">Utilization</p>
            </div>
            <div className="text-right">
              <h3 className="font-medium">{data.speed}</h3>
              <p className="text-xs text-gray-500">Speed</p>
            </div>
          </div>
          
          <UsageGraph 
            data={data.history} 
            height={200} 
            color="#0078D7"
            maxValue={100}
            label="% Utilization"
          />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {data.coreData.map((usage, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded">
                <div className="text-xs text-gray-500 mb-1">CPU {index}</div>
                <div className="h-16">
                  <UsageGraph 
                    data={[usage]} 
                    height={50} 
                    color="#0078D7"
                    maxValue={100}
                    displayValue={usage.toFixed(0) + "%"}
                    barWidth={30}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-medium mb-4">CPU Details</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Utilization</span>
              <span className="text-sm font-medium">{data.utilization.toFixed(1)}%</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Speed</span>
              <span className="text-sm font-medium">{data.speed}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Processes</span>
              <span className="text-sm font-medium">{data.processes}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Threads</span>
              <span className="text-sm font-medium">{data.threads}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Handles</span>
              <span className="text-sm font-medium">{data.handles}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Up time</span>
              <span className="text-sm font-medium">{data.upTime}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CpuPerformance;
