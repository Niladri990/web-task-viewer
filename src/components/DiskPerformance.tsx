
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import UsageGraph from "@/components/UsageGraph";
import { hard-drive } from "lucide-react";

interface DiskData {
  active: number;
  readSpeed: number;
  writeSpeed: number;
  responseTimes: number[];
  history: { read: number[]; write: number[] };
}

interface DiskPerformanceProps {
  data: DiskData;
}

const DiskPerformance = ({ data }: DiskPerformanceProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <hard-drive className="h-5 w-5 mr-2 text-primary" />
        <h2 className="text-xl font-semibold">Disk</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-4">
          <div className="flex justify-between mb-2">
            <div>
              <h3 className="font-medium">{data.active.toFixed(1)}%</h3>
              <p className="text-xs text-gray-500">Active time</p>
            </div>
            <div className="text-right">
              <h3 className="font-medium">{data.readSpeed.toFixed(1)} MB/s</h3>
              <p className="text-xs text-gray-500">Read speed</p>
            </div>
            <div className="text-right">
              <h3 className="font-medium">{data.writeSpeed.toFixed(1)} MB/s</h3>
              <p className="text-xs text-gray-500">Write speed</p>
            </div>
          </div>
          
          <div className="h-[200px]">
            {/* This component will render two overlapping graphs */}
            <UsageGraph 
              data={data.history.read}
              secondaryData={data.history.write}
              height={200} 
              color="#E74856"
              secondaryColor="#0078D7"
              maxValue={12}
              label="MB/s"
            />
          </div>
          
          <div className="flex items-center justify-end mt-2 space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#E74856] mr-2"></div>
              <span className="text-xs text-gray-500">Read</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#0078D7] mr-2"></div>
              <span className="text-xs text-gray-500">Write</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-medium mb-4">Disk Details</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Active time</span>
              <span className="text-sm font-medium">{data.active.toFixed(1)}%</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Read speed</span>
              <span className="text-sm font-medium">{data.readSpeed.toFixed(1)} MB/s</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Write speed</span>
              <span className="text-sm font-medium">{data.writeSpeed.toFixed(1)} MB/s</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Average response time</span>
              <span className="text-sm font-medium">
                {(data.responseTimes.reduce((a, b) => a + b, 0) / data.responseTimes.length).toFixed(1)} ms
              </span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Disk type</span>
              <span className="text-sm font-medium">SSD</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Capacity</span>
              <span className="text-sm font-medium">512 GB</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DiskPerformance;
