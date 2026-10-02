export const SITE_ORIGIN = 'https://wisdomquotes.in'
export const APP_ID = '6747684125'

export function pageContext(pathname: string) {
  const path = pathname.split(/[?#]/)[0].replace(/\/+$/, '') || '/'
  const locale = path.startsWith('/hi/') ? 'hi' : 'en'
  const clean = path.replace(/^\/hi(?=\/)/, '')
  const page_type = clean === '/' ? 'home' : /\/verse\//.test(clean) ? 'verse'
    : /\/chapter\//.test(clean) ? 'chapter' : /\/topic\//.test(clean) ? 'topic'
    : clean.startsWith('/blogs/') ? 'blog' : clean.endsWith('/today') ? 'today'
    : clean === '/app' ? 'app' : clean === '/gita' ? 'gita' : 'page'
  const slug = clean === '/' ? 'home' : clean.replace(/^\/(?:blogs|gita)\/?/, '').replace(/^\/+/, '').replace(/^chapter\//, '').replace(/^topic\//, '').replace('/verse/', '-').replace(/[^a-zA-Z0-9-]/g, '-') || 'gita'
  const ct = `${page_type}-${slug}${locale === 'hi' ? '-hi' : ''}`.slice(0, 40)
  return { source_path: path, locale, page_type, ct }
}

export function appStoreUrl(pathname: string, providerId?: string): string {
  const url = new URL(`https://apps.apple.com/app/apple-store/id${APP_ID}`)
  if (providerId && /^\d+$/.test(providerId)) url.searchParams.set('pt', providerId)
  url.searchParams.set('ct', pageContext(pathname).ct)
  url.searchParams.set('mt', '8')
  return url.toString()
}

export function smartBanner(path: string) {
  return { appId: APP_ID, appArgument: `${SITE_ORIGIN}${/^\/(?:hi\/)?gita\/chapter\/\d+$/.test(path) ? `${path}/verse/1` : path}` }
}
