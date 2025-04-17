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
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  
  // Track scroll position to add animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Show back to top button when scrolled down 300px
      if (scrollPosition > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Track window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Add animation when component mounts
  useEffect(() => {
    // Delay the animation to make it noticeable after page load
    const timer = setTimeout(() => {
      setIsTextVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to scroll to blog section when "Read my blog" is clicked
  const scrollToBlogSection = (e) => {
    e.preventDefault();
    if (blogSectionRef.current) {
      blogSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Function to scroll back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Check if screen is smaller than or equal to 2/3 of full HD (1280px)
  const isSmallScreen = windowWidth <= 1280;

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
        <div className={`flex w-full ${isSmallScreen ? 'max-w-full' : 'max-w-6xl'} flex-col-reverse items-center gap-12 py-8 ${isSmallScreen ? 'md:flex-col' : 'md:flex-row'} md:items-center md:justify-between md:py-20`}>
          {/* Text content */}
          <div className={`w-full text-center ${isSmallScreen ? 'md:text-center md:w-full' : 'md:text-left md:w-1/2'}`}>
            <h1 className="font-prompt tracking-tight text-gray-900 dark:text-white overflow-hidden">
              <span className={`text-5xl md:text-6xl lg:text-7xl block font-normal mb-2 transform transition-all duration-1000 ${isTextVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                Hello,
              </span>
              <span className={`text-5xl md:text-6xl lg:text-7xl block font-light mt-2 transform transition-all duration-1000 delay-300 ${isTextVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} font-lexend`}>
                I am <span className="text-orange-500 relative inline-block">
                  <NameTyper />
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-orange-500 transition-all duration-1000 delay-1000" style={{ width: isTextVisible ? '100%' : '0%' }}></span>
                </span>
              </span>
            </h1>
            
            <div className={`mt-12 flex flex-wrap justify-center gap-4 ${isSmallScreen ? 'md:justify-center' : 'md:justify-start'} transform transition-all duration-700 delay-700 ${isTextVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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
          
          {/* Avatar with frame */}
          <div className={`w-full ${isSmallScreen ? 'md:w-full' : 'md:w-1/2'} flex justify-center transform transition-all duration-1000 delay-500 ${isTextVisible ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-10 opacity-0 rotate-12'}`}>
            <div className={`relative ${isSmallScreen ? 'h-56 w-56 md:h-80 md:w-80' : 'h-64 w-64 md:h-96 md:w-96'}`}>
              {/* Avatar container with shadow */}
              <div className="absolute inset-0 overflow-hidden rounded-full shadow-2xl">
                <Image
                  src="/static/images/avatar.png"
                  alt="AnhND"
                  fill
                  style={{objectFit: 'cover'}}
                  className="transition-transform duration-700 hover:scale-105"
                  priority
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
        <div className={`mx-auto ${isSmallScreen ? 'max-w-full' : 'max-w-6xl'}`}>
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
                            className="font-lexend text-orange-500 inline-flex items-center gap-1 hover:gap-2 transition-all hover:opacity-80 hover:underline"
                            aria-label={`Read more: "${title}"`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Read more
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>
          
          {posts.length > MAX_DISPLAY && (
            <div className="mt-12 flex justify-center md:justify-end">
              <Link
                href="/blog"
                className="font-prompt inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-transparent px-6 py-2 text-center text-base font-medium text-gray-900 transition-all duration-300 hover:border-orange-500 hover:text-orange-500 hover:shadow-md dark:border-gray-700 dark:text-white dark:hover:border-orange-500 dark:hover:text-orange-500"
                aria-label="All posts"
              >
                View all posts
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Newsletter section */}
      {siteMetadata.newsletter?.provider && (
        <div className="relative bg-gray-50/90 backdrop-blur-sm px-4 py-16 dark:bg-gray-900/90 md:px-6">
          <div className={`mx-auto ${isSmallScreen ? 'max-w-full' : 'max-w-3xl'} rounded-2xl bg-orange-500/10 p-8 dark:bg-orange-500/5`}>
            <NewsletterForm />
          </div>
        </div>
      )}
      
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 shadow-lg transition-all duration-300 hover:bg-orange-500/90 hover:shadow-orange-500/30 ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
        aria-label="Back to top"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
            
      {/* Custom animations and styles */}
      <style jsx global>{`
        .pattern-grid-lg {
          background-image: 
            linear-gradient(to right, rgba(100, 100, 100, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(100, 100, 100, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-12px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        .hover\:shadow-orange-500\/30:hover {
          box-shadow: 0 8px 16px -4px rgba(249, 115, 22, 0.3);
        }
        
        /* Text reveal animation */
        @keyframes reveal {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes underline {
          from { width: 0; }
          to { width: 100%; }
        }
        
        /* Cursor blink animation */
        .animate-blink {
          animation: blink 0.7s infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </>
  )
}
