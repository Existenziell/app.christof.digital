import Link from 'next/link'
import Image from 'next/image'
import { socialLinks } from '../lib/socialLinks'

const Social = () => {
  return (
    <div className='z-20 mt-6'>
      <ul className='flex items-center justify-center gap-4'>
        {socialLinks.map(l => {
          const { name, link, image } = l
          return (
            <li className='border-b-2 border-transparent hover:border-b-2 hover:border-cta transition-all' key={name}>
              <Link href={link}>
                <a target='_blank' rel='noopener noreferrer nofollow'>
                  <Image src={image} width={32} height={32} alt={name} className='dark:invert'></Image>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div >
  )
}

export default Social
