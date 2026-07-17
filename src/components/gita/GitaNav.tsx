import Nav from '@/components/Nav'

type Props = { locale?: 'en' | 'hi' }

export default function GitaNav({ locale = 'en' }: Props) {
  return <Nav />
}
