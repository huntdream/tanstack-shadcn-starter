import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/components/theme-provider'
import { m } from '@/paraglide/messages'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon" aria-label={m.theme_label()} />
        }
      >
        <Sun className="motion-safe:transition-all motion-reduce:transition-none h-[1.2rem] w-[1.2rem] scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute motion-safe:transition-all motion-reduce:transition-none h-[1.2rem] w-[1.2rem] scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          aria-current={theme === 'light' ? 'true' : undefined}
          onClick={() => setTheme('light')}
        >
          {m.theme_light()}
        </DropdownMenuItem>
        <DropdownMenuItem
          aria-current={theme === 'dark' ? 'true' : undefined}
          onClick={() => setTheme('dark')}
        >
          {m.theme_dark()}
        </DropdownMenuItem>
        <DropdownMenuItem
          aria-current={theme === 'system' ? 'true' : undefined}
          onClick={() => setTheme('system')}
        >
          {m.theme_system()}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
