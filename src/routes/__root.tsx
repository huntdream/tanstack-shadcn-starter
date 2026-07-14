import {
  HeadContent,
  Link,
  ScriptOnce,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { SiteHeader } from '@/components/site-header'
import { SkipLink } from '@/components/skip-link'
import { ThemeProvider } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { getLocale } from '@/paraglide/runtime'
import { m } from '@/paraglide/messages'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: m.app_title() },
      { name: 'description', content: m.app_description() },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  errorComponent: RootError,
  notFoundComponent: RootNotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={getLocale()} suppressHydrationWarning>
      <head>
        <HeadContent />
        <ScriptOnce>
          {`(function(){try{var t=localStorage.getItem('theme')||'system';var d=document.documentElement;d.classList.remove('light','dark');if(t==='system'){d.classList.add(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}else{d.classList.add(t)}}catch(e){}})();`}
        </ScriptOnce>
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <SkipLink />
          <SiteHeader />
          <main id="main-content" className="mx-auto max-w-5xl px-4 py-8">
            {children}
          </main>
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}

function RootError({ error }: { error: Error }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{m.error_title()}</h1>
      <p className="text-muted-foreground">{m.error_description()}</p>
      {import.meta.env.DEV ? (
        <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
          {error.message}
        </pre>
      ) : null}
      <Button render={<Link to="/" />}>{m.not_found_back()}</Button>
    </div>
  )
}

function RootNotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{m.not_found_title()}</h1>
      <p className="text-muted-foreground">{m.not_found_description()}</p>
      <Button render={<Link to="/" />}>{m.not_found_back()}</Button>
    </div>
  )
}
