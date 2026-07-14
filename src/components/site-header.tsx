import { Link } from '@tanstack/react-router'

import { LocaleToggle } from '@/components/locale-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { m } from '@/paraglide/messages'

export function SiteHeader() {
  return (
    <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <nav aria-label="Primary" className="flex items-center gap-4 text-sm">
          <Link
            to="/"
            className="font-medium hover:underline"
            activeProps={{ className: 'text-primary font-semibold' }}
          >
            {m.nav_home()}
          </Link>
          <Link
            to="/dashboard"
            className="hover:underline"
            activeProps={{ className: 'text-primary font-semibold' }}
          >
            {m.nav_dashboard()}
          </Link>
          <Link
            to="/login"
            className="hover:underline"
            activeProps={{ className: 'text-primary font-semibold' }}
          >
            {m.nav_login()}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
