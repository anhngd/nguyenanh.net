'use client'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const blogSectionRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
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
        <div className="flex w-full max-w-6xl flex-col-reverse items-center gap-12 py-8 md:flex-row md:items-center md:justify-between md:py-20">
          {/* Text content */}
          <div className="w-full text-center md:text-left md:w-1/2">
            <h1 className="font-google text-5xl font-normal tracking-tight text-gray-900 dark:text-white md:text-6xl lg:text-7xl">
              <span className="block mb-2">Hello,</span>
              <span className="block font-bold">I am <span className="text-orange-500">AnhND</span></span>
            </h1>
            
            <div className="mt-12 flex flex-wrap justify-center gap-4 md:justify-start">
              <button
                onClick={scrollToBlogSection}
                className="font-google relative overflow-hidden rounded-full bg-orange-500 px-8 py-3 text-center text-base font-medium text-white shadow-lg transition-all duration-300 hover:shadow-orange-500/30 hover:translate-y-[-2px]"
              >
                Read my blog
              </button>
              <Link
                href="/about"
                className="font-google relative overflow-hidden rounded-full border-2 border-gray-300 bg-transparent px-8 py-3 text-center text-base font-medium text-gray-900 transition-all duration-300 hover:border-orange-500 hover:text-orange-500 hover:shadow-lg dark:border-gray-700 dark:text-white dark:hover:border-orange-500 dark:hover:text-orange-500"
              >
                About me
              </Link>
            </div>
          </div>
          
          {/* Avatar with frame */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative h-64 w-64 md:h-96 md:w-96">
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
        <div className="mx-auto max-w-6xl">
          <div className="space-y-2 pb-12 md:space-y-5">
            <h2 className="font-google text-3xl font-bold leading-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
              Latest Posts
            </h2>
            <p className="font-google text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              {siteMetadata.description}
            </p>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags } = post
              return (
                <div key={slug} className="group py-12 transition-all hover:bg-gray-50 dark:hover:bg-gray-900">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="font-google text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-google text-2xl font-bold leading-8 tracking-tight transition-colors group-hover:text-orange-500">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h3>
                            <div className="mt-2 flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="font-google prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-orange-500 hover:opacity-80"
                            aria-label={`Read more: "${title}"`}
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
          
          {posts.length > MAX_DISPLAY && (
            <div className="mt-12 flex justify-center md:justify-end">
              <Link
                href="/blog"
                className="font-google inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-transparent px-6 py-2 text-center text-base font-medium text-gray-900 transition-all duration-300 hover:border-orange-500 hover:text-orange-500 hover:shadow-md dark:border-gray-700 dark:text-white dark:hover:border-orange-500 dark:hover:text-orange-500"
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
          <div className="mx-auto max-w-3xl rounded-2xl bg-orange-500/10 p-8 dark:bg-orange-500/5">
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
      `}</style>
    </>
  )
}
