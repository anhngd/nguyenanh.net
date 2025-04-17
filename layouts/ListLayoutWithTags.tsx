/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { useState, useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname ? pathname.split('/')[1] : ''
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50 font-prompt px-4 py-2 rounded-full" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="font-prompt px-4 py-2 rounded-full border border-gray-300 hover:border-orange-500 hover:text-orange-500 transition-all duration-200"
          >
            Previous
          </Link>
        )}
        <span className="font-lexend">
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50 font-prompt px-4 py-2 rounded-full" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link 
            href={`/${basePath}/page/${currentPage + 1}`} 
            rel="next"
            className="font-prompt px-4 py-2 rounded-full border border-gray-300 hover:border-orange-500 hover:text-orange-500 transition-all duration-200"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname() || ''
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  
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
  
  // Calculate tag sizes based on count
  const { minCount, maxCount, tagStyles } = useMemo(() => {
    const min = sortedTags.length > 0 ? 
      Math.min(...sortedTags.map(tag => tagCounts[tag])) : 0;
    const max = sortedTags.length > 0 ? 
      Math.max(...sortedTags.map(tag => tagCounts[tag])) : 0;
      
    // Create a map of tag styles
    const styles = {} as Record<string, {
      fontSize: string;
      padding: string;
      fontWeight: string;
    }>;
    
    sortedTags.forEach(tag => {
      const count = tagCounts[tag];
      const range = max - min || 1;
      const ratio = (count - min) / range;
      
      // Scale from 0.8rem to 1.4rem for font size
      const fontSize = 0.8 + (ratio * 0.6);
      
      // Scale padding based on font size
      const paddingV = 0.25 + (ratio * 0.25);
      const paddingH = 0.6 + (ratio * 0.4);
      
      // Make more popular tags bolder
      const fontWeight = 400 + Math.floor(ratio * 300);
      
      styles[tag] = {
        fontSize: `${fontSize}rem`,
        padding: `${paddingV}rem ${paddingH}rem`,
        fontWeight: fontWeight.toString(),
      };
    });
    
    return { minCount: min, maxCount: max, tagStyles: styles };
  }, [sortedTags, tagCounts]);
  
  // Check if screen is smaller than or equal to 2/3 of full HD (1280px)
  const isSmallScreen = windowWidth <= 1280;

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="font-prompt text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-6">
          <div className="hidden max-h-screen h-full min-w-[280px] max-w-[280px] overflow-auto rounded-xl bg-gray-50/80 backdrop-blur-sm pt-5 shadow-lg dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="px-6 py-4 w-full">
              {pathname.startsWith('/blog') ? (
                <h3 className="font-prompt font-bold uppercase text-orange-500">All Posts</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="font-prompt font-bold uppercase text-gray-700 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-500"
                >
                  All Posts
                </Link>
              )}
              <div className="mt-6 flex flex-wrap gap-2">
                {sortedTags.map((t) => {
                  const style = tagStyles[t];
                  const isActiveTag = pathname.split('/tags/')[1] === slug(t);
                  
                  return (
                    <div key={t}>
                      {isActiveTag ? (
                        <span 
                          className="font-prompt inline-block rounded-full bg-orange-500 text-white"
                          style={{ 
                            fontSize: style.fontSize,
                            padding: style.padding,
                            fontWeight: style.fontWeight
                          }}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </span>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="font-prompt inline-block text-gray-500 hover:text-orange-500 hover:bg-orange-50 dark:text-gray-300 dark:hover:text-orange-500 dark:hover:bg-gray-800 transition-colors rounded-full"
                          style={{ 
                            fontSize: style.fontSize,
                            padding: style.padding,
                            fontWeight: style.fontWeight
                          }}
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className={`w-full ${isSmallScreen ? 'sm:max-w-full' : 'sm:max-w-[calc(100%-304px)]'}`}>
            <div className="space-y-8">
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  <div 
                    key={path} 
                    className="group p-6 rounded-xl transition-all duration-300 cursor-pointer hover:bg-white hover:shadow-xl dark:hover:bg-gray-800/50 border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                    onClick={() => window.location.href = `/${path}`}
                  >
                    <article className="flex flex-col space-y-4">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="font-lexend text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <h2 className="font-prompt text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-orange-500 transition-colors">
                            <Link 
                              href={`/${path}`} 
                              className="text-gray-900 dark:text-gray-100"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                          </div>
                        </div>
                        <div className="font-lexend prose max-w-none text-gray-500 dark:text-gray-400 line-clamp-3">
                          {summary}
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/${path}`}
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
                    </article>
                  </div>
                )
              })}
            </div>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
