import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/components/provider/ThemeProvider";

export function ModeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme()

  return (
    <Button
      className={className}
      variant="outline"
      size="icon"
      onClick={() => {
        // Toggle between 'light' and 'dark'
        // If current theme is 'dark', switch to 'light'; otherwise switch to 'dark'
        const newTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
        console.log(newTheme);
        setTheme(newTheme);
      }}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}