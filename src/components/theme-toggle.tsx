import { Check, Monitor, Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages'

const themeOptions = [
  { value: 'light' as const, label: () => m.theme_light(), icon: Sun },
  { value: 'dark' as const, label: () => m.theme_dark(), icon: Moon },
  { value: 'system' as const, label: () => m.theme_system(), icon: Monitor },
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="relative"
            aria-label={m.theme_label()}
          />
        }
      >
        <Sun className="motion-safe:transition-all motion-reduce:transition-none h-[1.2rem] w-[1.2rem] scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute motion-safe:transition-all motion-reduce:transition-none h-[1.2rem] w-[1.2rem] scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {themeOptions.map(({ value, label, icon: Icon }) => {
          const isActive = theme === value

          return (
            <DropdownMenuItem
              key={value}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => setTheme(value)}
            >
              <Icon />
              {label()}
              <Check
                className={cn('ml-auto size-4', !isActive && 'opacity-0')}
                aria-hidden={!isActive}
              />
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
