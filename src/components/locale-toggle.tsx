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

const localeLabels: Record<Locale, () => string> = {
  'zh-CN': () => m.locale_zh(),
  en: () => m.locale_en(),
}

export function LocaleToggle() {
  const currentLocale = getLocale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" aria-label={m.locale_label()}>
            {localeLabels[currentLocale]()}
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            aria-current={locale === currentLocale ? 'true' : undefined}
            onClick={() => setLocale(locale)}
          >
            {localeLabels[locale]()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
