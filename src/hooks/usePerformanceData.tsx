
import { useState, useEffect } from "react";

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

interface DiskData {
  active: number;
  readSpeed: number;
  writeSpeed: number;
  responseTimes: number[];
  history: { read: number[]; write: number[] };
}

interface NetworkData {
  sent: number;
  received: number;
  utilizationPercent: number;
  history: { sent: number[]; received: number[] };
}

interface PerformanceData {
  cpu: CpuData;
  memory: MemoryData;
  disk: DiskData;
  network: NetworkData;
}

const MAX_HISTORY = 60;

const usePerformanceData = () => {
  const [data, setData] = useState<PerformanceData>({
    cpu: {
      utilization: 0,
      speed: "3.20 GHz",
      coreCount: 8,
      coreData: Array(8).fill(0),
      processes: 150,
      threads: 1895,
      handles: 59028,
      upTime: "0:00:00:00",
      history: Array(MAX_HISTORY).fill(0)
    },
    memory: {
      inUse: 0,
      available: 16000,
      committed: 0,
      cached: 0,
      pagedPool: 0,
      nonPagedPool: 0,
      total: 16000,
      history: Array(MAX_HISTORY).fill(0)
    },
    disk: {
      active: 0,
      readSpeed: 0,
      writeSpeed: 0,
      responseTimes: Array(MAX_HISTORY).fill(0),
      history: { 
        read: Array(MAX_HISTORY).fill(0), 
        write: Array(MAX_HISTORY).fill(0) 
      }
    },
    network: {
      sent: 0,
      received: 0,
      utilizationPercent: 0,
      history: { 
        sent: Array(MAX_HISTORY).fill(0), 
        received: Array(MAX_HISTORY).fill(0) 
      }
    }
  });

  useEffect(() => {
    let seconds = 0;
    const timer = setInterval(() => {
      seconds++;
      
      setData(prev => {
        // CPU data update
        const newCpuUtilization = Math.min(100, Math.max(5, prev.cpu.utilization + (Math.random() * 20) - 10));
        const newCoreData = prev.cpu.coreData.map(() => Math.min(100, Math.max(0, Math.random() * 100)));
        
        // Memory update
        const newMemoryInUse = Math.min(prev.memory.total, Math.max(2000, prev.memory.inUse + (Math.random() * 500) - 250));
        const newMemoryCommitted = Math.min(prev.memory.total * 1.2, Math.max(newMemoryInUse, newMemoryInUse * 1.2));
        const newMemoryCached = Math.min(prev.memory.total * 0.3, Math.max(500, Math.random() * 3000));
        
        // Disk update
        const newDiskActive = Math.min(100, Math.max(0, prev.disk.active + (Math.random() * 20) - 10));
        const newReadSpeed = Math.max(0, Math.random() * 10);
        const newWriteSpeed = Math.max(0, Math.random() * 7);
        
        // Network update
        const newSent = Math.max(0, Math.random() * 1);
        const newReceived = Math.max(0, Math.random() * 3);
        const newUtilization = Math.min(100, Math.max(0, (newSent + newReceived) / 10 * 100));

        // Calculate uptime
        const days = Math.floor(seconds / (24 * 3600));
        const hours = Math.floor((seconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const upTime = `${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        // Update histories (add new value and remove oldest)
        const updateHistory = (arr: number[], newVal: number) => {
          const newHistory = [...arr.slice(1), newVal];
          return newHistory;
        };
        
        return {
          cpu: {
            ...prev.cpu,
            utilization: newCpuUtilization,
            coreData: newCoreData,
            processes: Math.floor(Math.random() * 30) + 130,
            threads: Math.floor(Math.random() * 100) + 1800,
            handles: Math.floor(Math.random() * 1000) + 58500,
            upTime,
            history: updateHistory(prev.cpu.history, newCpuUtilization)
          },
          memory: {
            ...prev.memory,
            inUse: newMemoryInUse,
            available: prev.memory.total - newMemoryInUse,
            committed: newMemoryCommitted,
            cached: newMemoryCached,
            pagedPool: Math.random() * 500,
            nonPagedPool: Math.random() * 300,
            history: updateHistory(prev.memory.history, newMemoryInUse / prev.memory.total * 100)
          },
          disk: {
            ...prev.disk,
            active: newDiskActive,
            readSpeed: newReadSpeed,
            writeSpeed: newWriteSpeed,
            responseTimes: updateHistory(prev.disk.responseTimes, Math.random() * 20),
            history: {
              read: updateHistory(prev.disk.history.read, newReadSpeed),
              write: updateHistory(prev.disk.history.write, newWriteSpeed)
            }
          },
          network: {
            ...prev.network,
            sent: newSent,
            received: newReceived,
            utilizationPercent: newUtilization,
            history: {
              sent: updateHistory(prev.network.history.sent, newSent),
              received: updateHistory(prev.network.history.received, newReceived)
            }
          }
        };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return data;
};

export default usePerformanceData;
