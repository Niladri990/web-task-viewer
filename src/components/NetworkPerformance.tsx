
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import UsageGraph from "@/components/UsageGraph";
import { network } from "lucide-react";

interface NetworkData {
  sent: number;
  received: number;
  utilizationPercent: number;
  history: { sent: number[]; received: number[] };
}

interface NetworkPerformanceProps {
  data: NetworkData;
}

const NetworkPerformance = ({ data }: NetworkPerformanceProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <network className="h-5 w-5 mr-2 text-primary" />
        <h2 className="text-xl font-semibold">Network</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-4">
          <div className="flex justify-between mb-2">
            <div>
              <h3 className="font-medium">{data.utilizationPercent.toFixed(1)}%</h3>
              <p className="text-xs text-gray-500">Utilization</p>
            </div>
            <div className="text-right">
              <h3 className="font-medium">{data.sent.toFixed(1)} Mbps</h3>
              <p className="text-xs text-gray-500">Sending</p>
            </div>
            <div className="text-right">
              <h3 className="font-medium">{data.received.toFixed(1)} Mbps</h3>
              <p className="text-xs text-gray-500">Receiving</p>
            </div>
          </div>
          
          <div className="h-[200px]">
            <UsageGraph 
              data={data.history.received}
              secondaryData={data.history.sent}
              height={200} 
              color="#00B7C3"
              secondaryColor="#8854D0"
              maxValue={5}
              label="Mbps"
            />
          </div>
          
          <div className="flex items-center justify-end mt-2 space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#00B7C3] mr-2"></div>
              <span className="text-xs text-gray-500">Received</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#8854D0] mr-2"></div>
              <span className="text-xs text-gray-500">Sent</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-medium mb-4">Network Details</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Adapter name</span>
              <span className="text-sm font-medium">Ethernet</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Connection type</span>
              <span className="text-sm font-medium">Ethernet</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">SSID</span>
              <span className="text-sm font-medium">N/A</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">IPv4 address</span>
              <span className="text-sm font-medium">192.168.1.100</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Sent</span>
              <span className="text-sm font-medium">{data.sent.toFixed(2)} Mbps</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Received</span>
              <span className="text-sm font-medium">{data.received.toFixed(2)} Mbps</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NetworkPerformance;
