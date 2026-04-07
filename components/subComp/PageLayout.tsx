import Header from '@/components/Header/Header'
import HeaderCategory from '@/components/subComp/HeaderCategory'
import Footer from '@/components/Footer/Footer'

type PageLayoutProps = {
  children: React.ReactNode
  className?: string
}

export default function PageLayout({ children, className = 'min-h-screen flex flex-col' }: PageLayoutProps) {
  return (
    <div className={className}>
      <Header />
      <HeaderCategory />
      {children}
      <Footer />
    </div>
  )
}