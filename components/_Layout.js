import NextNprogress from 'nextjs-progressbar'
import Footer from './Footer'
import Nav from './Nav'
import DarkModeToggle from './DarkModeToggle'

const Layout = ({ children }) => {
  return (
    <>
      <NextNprogress startPosition={0.3} stopDelayMs={100} height={3} showOnShallow={true} color='var(--color-brand)' />
      <Nav />
      <DarkModeToggle />

      <main className='w-full min-h-[calc(100vh-49px)] py-24 px-4 md:px-8 text-center text-brand-dark bg-brand bg-repeat dark:bg-brand-dark dark:text-brand'>
        {children}
      </main>

      <Footer />
    </>
  )
}

export default Layout
