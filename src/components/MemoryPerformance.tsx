
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import UsageGraph from "@/components/UsageGraph";
import { hard-drive } from "lucide-react";

interface MemoryData {
  inUse: number;
  available: number;
  committed: number;
  cached: number;
  pagedPool: number;
  nonPagedPool: number;
  total: number;
  history: number[];
}

interface MemoryPerformanceProps {
  data: MemoryData;
}

const formatMemory = (mb: number): string => {
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(1)} GB`;
  }
  return `${mb.toFixed(1)} MB`;
};

const MemoryPerformance = ({ data }: MemoryPerformanceProps) => {
  const usedPercentage = (data.inUse / data.total) * 100;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <hard-drive className="h-5 w-5 mr-2 text-primary" />
        <h2 className="text-xl font-semibold">Memory</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-4">
          <div className="flex justify-between mb-2">
            <div>
              <h3 className="font-medium">{usedPercentage.toFixed(1)}%</h3>
              <p className="text-xs text-gray-500">In use</p>
            </div>
            <div className="text-right">
              <h3 className="font-medium">{formatMemory(data.inUse)}</h3>
              <p className="text-xs text-gray-500">{formatMemory(data.total)} total</p>
            </div>
          </div>
          
          <UsageGraph 
            data={data.history} 
            height={200} 
            color="#00B7C3"
            maxValue={100}
            label="% In use"
          />
          
          <div className="mt-4">
            <div className="w-full bg-gray-200 h-8 rounded-sm">
              <div 
                className="h-full bg-[#00B7C3] rounded-sm" 
                style={{ width: `${usedPercentage}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">0</span>
              <span className="text-xs text-gray-500">{formatMemory(data.total)}</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-medium mb-4">Memory Details</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">In use</span>
              <span className="text-sm font-medium">{formatMemory(data.inUse)}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Available</span>
              <span className="text-sm font-medium">{formatMemory(data.available)}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Committed</span>
              <span className="text-sm font-medium">{formatMemory(data.committed)}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Cached</span>
              <span className="text-sm font-medium">{formatMemory(data.cached)}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Paged pool</span>
              <span className="text-sm font-medium">{formatMemory(data.pagedPool)}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Non-paged pool</span>
              <span className="text-sm font-medium">{formatMemory(data.nonPagedPool)}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MemoryPerformance;
