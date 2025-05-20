import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

export function DarkModeToggle() {
  const [enabled, setEnabled] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setAnimating(true);
    const timeout = setTimeout(() => setAnimating(false), 300);
    return () => clearTimeout(timeout);
  }, [enabled]);

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={enabled}
        onCheckedChange={setEnabled}
        id="darkmode-toggle"
        aria-label="Alternar modo escuro"
        className="relative"
      >
        {/* empty, just for accessibility */}
      </Switch>
      <span className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={`absolute transition-all duration-300 w-5 h-5 ${enabled ? 'opacity-0 scale-75' : 'opacity-100 scale-100'} ${animating ? 'animate-spin' : ''}`}
        />
        <Moon
          className={`absolute transition-all duration-300 w-5 h-5 ${enabled ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} ${animating ? 'animate-spin' : ''}`}
        />
      </span>
    </div>
  );
}
