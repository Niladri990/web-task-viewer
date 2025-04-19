
import { cn } from "@/lib/utils";

interface SideNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SideNavigation = ({ activeTab, setActiveTab }: SideNavigationProps) => {
  const navigationItems = [
    { id: "CPU", label: "CPU" },
    { id: "Memory", label: "Memory" },
    { id: "Disk", label: "Disk" },
    { id: "Network", label: "Network" },
    { id: "GPU", label: "GPU" }
  ];

  return (
    <div className="w-48 bg-white border-r border-gray-200 overflow-y-auto">
      <ul className="py-2">
        {navigationItems.map((item) => (
          <li 
            key={item.id}
            className={cn(
              "px-4 py-2 cursor-pointer hover:bg-gray-100",
              activeTab === item.id ? "bg-gray-100 text-primary font-medium" : "text-gray-800"
            )}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavigation;
