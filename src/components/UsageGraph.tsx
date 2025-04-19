
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface UsageGraphProps {
  data: number[];
  secondaryData?: number[];
  height: number;
  color: string;
  secondaryColor?: string;
  maxValue: number;
  label?: string;
  displayValue?: string;
  barWidth?: number;
}

const UsageGraph = ({
  data,
  secondaryData,
  height,
  color,
  secondaryColor,
  maxValue,
  label,
  displayValue,
  barWidth = 3
}: UsageGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = height;
    
    // Adjust for device pixel ratio for sharper rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    
    // Scale the context to match the device pixel ratio
    ctx.scale(dpr, dpr);
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw grid lines (optional)
    ctx.strokeStyle = "#f0f0f0";
    ctx.lineWidth = 1;
    
    // Draw horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = canvasHeight - (i * (canvasHeight / 4));
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasWidth, y);
      ctx.stroke();
    }
    
    // Only draw bars if we have a single value (for small CPU core graphs)
    if (data.length === 1) {
      const barHeight = (data[0] / maxValue) * canvasHeight;
      ctx.fillStyle = color;
      ctx.fillRect(
        (canvasWidth - barWidth) / 2,
        canvasHeight - barHeight,
        barWidth,
        barHeight
      );
      
      // Display value if provided
      if (displayValue) {
        ctx.fillStyle = "#333";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(displayValue, canvasWidth / 2, canvasHeight - barHeight - 5);
      }
      
      return;
    }
    
    // Calculate spacing
    const dataLength = data.length;
    const spacing = canvasWidth / (dataLength - 1);
    
    // Draw primary line graph
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, color + "33"); // 20% opacity
    gradient.addColorStop(1, color + "00"); // 0% opacity
    
    // Draw lines and points
    for (let i = 0; i < dataLength; i++) {
      const x = i * spacing;
      const y = canvasHeight - (data[i] / maxValue) * canvasHeight;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    // Draw the stroke
    ctx.stroke();
    
    // Draw fill
    ctx.lineTo((dataLength - 1) * spacing, canvasHeight);
    ctx.lineTo(0, canvasHeight);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw secondary line if provided
    if (secondaryData && secondaryColor) {
      ctx.strokeStyle = secondaryColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      // Create gradient
      const gradient2 = ctx.createLinearGradient(0, 0, 0, canvasHeight);
      gradient2.addColorStop(0, secondaryColor + "33"); // 20% opacity
      gradient2.addColorStop(1, secondaryColor + "00"); // 0% opacity
      
      // Draw lines and points
      for (let i = 0; i < dataLength; i++) {
        const x = i * spacing;
        const y = canvasHeight - (secondaryData[i] / maxValue) * canvasHeight;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      // Draw the stroke
      ctx.stroke();
      
      // Draw fill
      ctx.lineTo((dataLength - 1) * spacing, canvasHeight);
      ctx.lineTo(0, canvasHeight);
      ctx.closePath();
      ctx.fillStyle = gradient2;
      ctx.fill();
    }
    
    // Display current value
    if (data.length > 0 && !displayValue) {
      const currentValue = data[data.length - 1];
      const y = canvasHeight - (currentValue / maxValue) * canvasHeight;
      
      // Draw current value point
      ctx.beginPath();
      ctx.arc(canvasWidth - spacing, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      if (secondaryData && secondaryColor) {
        const secondaryValue = secondaryData[secondaryData.length - 1];
        const y2 = canvasHeight - (secondaryValue / maxValue) * canvasHeight;
        
        // Draw current value point for secondary data
        ctx.beginPath();
        ctx.arc(canvasWidth - spacing, y2, 4, 0, Math.PI * 2);
        ctx.fillStyle = secondaryColor;
        ctx.fill();
      }
    }
    
    // Display label if provided
    if (label) {
      ctx.fillStyle = "#666";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(label, canvasWidth - 5, 15);
    }
  }, [data, secondaryData, height, color, secondaryColor, maxValue, label, displayValue, barWidth]);

  return (
    <div className={cn("relative w-full", displayValue ? "h-full" : "")} style={{ height: displayValue ? "auto" : height + "px" }}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
        style={{ display: "block" }}
      ></canvas>
    </div>
  );
};

export default UsageGraph;
