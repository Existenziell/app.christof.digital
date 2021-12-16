const Footer = () => {
  return (
    <footer className='static bottom-0 flex items-center justify-center w-full py-1 text-xs
    text-gray-500 transition-all border-t border-black border-opacity-10
      bg-brand dark:bg-brand-dark dark:border-brand dark:border-opacity-10'>

      <a href='#top' aria-label='Scroll back up'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 hover:text-brand transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </a>

      <a href='https://www.christof.digital/coding' className='absolute left-0' aria-label='Back Home'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 hover:text-brand transition-colors cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </a>
    </footer>
  )
}

export default Footer
