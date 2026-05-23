import Nav from '@/components/Nav'

type Props = { locale?: 'en' | 'hi' }

export default function GitaNav({ locale = 'en' }: Props) {
  const isHindi = locale === 'hi'
  return (
    <Nav
      extraLink={{
        href: isHindi ? '/gita' : '/hi/gita',
        label: isHindi ? 'English' : 'हिन्दी',
        hrefLang: isHindi ? 'en' : 'hi',
      }}
    />
  )
}
