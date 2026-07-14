import { Check, Languages } from 'lucide-react'

import { getLocale, locales, setLocale } from '@/paraglide/runtime'
import type { Locale } from '@/paraglide/runtime'
import * as m from '@/paraglide/messages'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const localeLabels: Record<Locale, () => string> = {
  'zh-CN': () => m.locale_zh(),
  en: () => m.locale_en(),
}

const localeBadges: Record<Locale, string> = {
  'zh-CN': '中',
  en: 'EN',
}

export function LocaleToggle() {
  const currentLocale = getLocale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            aria-label={m.locale_label()}
          />
        }
      >
        <Languages className="size-4" />
        <span className="hidden sm:inline">
          {localeLabels[currentLocale]()}
        </span>
        <span className="sm:hidden">{localeBadges[currentLocale]}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {locales.map((locale) => {
          const isActive = locale === currentLocale

          return (
            <DropdownMenuItem
              key={locale}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => setLocale(locale)}
            >
              <span
                aria-hidden
                className="bg-muted text-muted-foreground flex size-4 items-center justify-center rounded-sm text-[10px] font-semibold"
              >
                {localeBadges[locale]}
              </span>
              {localeLabels[locale]()}
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
