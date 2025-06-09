import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useContextApp } from "@/contexts";

export function DarkModeToggle() {
  const { theme, toggleTheme } = useContextApp();
  const [animating, setAnimating] = useState(false);
  
  const isDark = theme === 'dark';

  const handleToggle = () => {
    toggleTheme();
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isDark}
        onCheckedChange={handleToggle}
        id="darkmode-toggle"
        aria-label="Alternar modo escuro"
        className="relative"
      >
        {/* empty, just for accessibility */}
      </Switch>
      <span className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={`absolute transition-all duration-300 w-5 h-5 ${isDark ? 'opacity-0 scale-75' : 'opacity-100 scale-100'} ${animating ? 'animate-spin' : ''}`}
        />
        <Moon
          className={`absolute transition-all duration-300 w-5 h-5 ${isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} ${animating ? 'animate-spin' : ''}`}
        />
      </span>
    </div>
  );
}
