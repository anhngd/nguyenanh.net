'use client'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import NameTyper from '@/components/NameTyper'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const blogSectionRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track scroll position to add animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Function to scroll to blog section when "Read my blog" is clicked
  const scrollToBlogSection = (e) => {
    e.preventDefault();
    if (blogSectionRef.current) {
      blogSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Background for entire page */}
      <div className="fixed inset-0 z-[-1]">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-100/60 to-white dark:from-orange-900/30 dark:to-gray-950"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 pattern-grid-lg dark:opacity-5"></div>
        
        {/* Floating circles */}
        <div className="absolute inset-0">
          <div className="absolute h-64 w-64 -left-20 top-[20%] rounded-full bg-orange-200 dark:bg-orange-800 opacity-20 blur-3xl"></div>
          <div className="absolute h-72 w-72 -right-20 top-[30%] rounded-full bg-yellow-200 dark:bg-yellow-800 opacity-20 blur-3xl"></div>
          <div className="absolute h-56 w-56 left-[20%] bottom-[10%] rounded-full bg-red-200 dark:bg-red-800 opacity-20 blur-3xl"></div>
        </div>
      </div>
      
      {/* Hero section with frame */}
      <div className="relative min-h-[100vh] w-full flex items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col-reverse md:flex-row items-center gap-12 py-8 md:py-20">
          {/* Text content - Always on left for md screens and up */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="font-prompt tracking-tight text-gray-900 dark:text-white">
              <span className="text-5xl md:text-6xl lg:text-7xl block font-normal mb-2">
                Hello,
              </span>
              <span className="text-5xl md:text-6xl lg:text-7xl block font-light mt-2 font-lexend">
                I am <span className="text-orange-500 relative inline-block">
                  <NameTyper />
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-orange-500"></span>
                </span>
              </span>
            </h1>
            
            <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-4">
              <button
                onClick={scrollToBlogSection}
                className="font-prompt relative overflow-hidden rounded-full bg-orange-500 px-8 py-3 text-center text-base font-medium text-white shadow-lg transition-all duration-300 hover:shadow-orange-500/30 hover:translate-y-[-2px]"
              >
                Read my blog
              </button>
              <Link
                href="/about"
                className="font-prompt relative overflow-hidden rounded-full border-2 border-gray-300 bg-transparent px-8 py-3 text-center text-base font-medium text-gray-900 transition-all duration-300 hover:border-orange-500 hover:text-orange-500 hover:shadow-lg dark:border-gray-700 dark:text-white dark:hover:border-orange-500 dark:hover:text-orange-500"
              >
                About me
              </Link>
            </div>
          </div>
          
          {/* Avatar with frame - Always on right for md screens and up */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative h-56 w-56 md:h-80 md:w-80">
              {/* Avatar container with shadow */}
              <div className="absolute inset-0 overflow-hidden rounded-full shadow-2xl">
                <Image
                  src="/static/images/avatar.png"
                  alt="AnhND"
                  fill
                  style={{objectFit: 'cover'}}
                  className="transition-transform duration-700 hover:scale-105"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QVQpZQAAAABJRU5ErkJggg=="
                />
              </div>
              
              {/* Small accent circles */}
              <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-orange-100 shadow-lg dark:bg-orange-900"></div>
              <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-yellow-100 shadow-lg dark:bg-yellow-800"></div>
            </div>
          </div>
        </div>
        
        {/* Arrow scroll down indicator */}
        <div className={`absolute bottom-[5%] left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
          <button 
            onClick={scrollToBlogSection}
            className="group flex items-center justify-center h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg dark:bg-gray-800/80 hover:shadow-xl transition-all duration-300"
            aria-label="Scroll to blog content"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-orange-500 animate-bounce-slow" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Latest posts section */}
      <div ref={blogSectionRef} className="relative bg-white/90 backdrop-blur-sm px-4 py-16 dark:bg-gray-950/90 md:px-6 rounded-t-3xl shadow-lg">
        <div className="mx-auto max-w-[1200px]">
          <div className="space-y-2 pb-12 md:space-y-5">
            <h2 className="font-prompt text-3xl font-bold leading-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
              Latest Posts
            </h2>
            <p className="font-lexend text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              {siteMetadata.description}
            </p>
          </div>
          
          <div className="space-y-8">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags } = post
              return (
                <div 
                  key={slug} 
                  className="group p-6 rounded-xl transition-all duration-300 cursor-pointer hover:bg-white hover:shadow-xl dark:hover:bg-gray-800/50 border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                  onClick={() => window.location.href = `/blog/${slug}`}
                >
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 xl:gap-6">
                      <dl className="xl:border-r xl:pr-6 xl:dark:border-gray-700">
                        <dt className="sr-only">Published on</dt>
                        <dd className="font-lexend text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-prompt text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-orange-500 transition-colors">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {title}
                              </Link>
                            </h3>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="font-lexend prose max-w-none text-gray-500 dark:text-gray-400 line-clamp-3">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400"
                            aria-label={`Read "${title}"`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Read more &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
