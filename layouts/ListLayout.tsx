'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

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

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
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
  
  // Check if screen is smaller than or equal to 2/3 of full HD (1280px)
  const isSmallScreen = windowWidth <= 1280;
  
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div>
        <div className="space-y-4 pb-8 pt-6 md:space-y-5">
          <h1 className="font-prompt text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <label>
              <span className="sr-only">Search articles</span>
              <input
                aria-label="Search articles"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles"
                className="font-lexend block w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-orange-500 focus:ring-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </label>
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="space-y-8">
          {!filteredBlogPosts.length && <p className="font-lexend">No posts found.</p>}
          {displayPosts.map((post) => {
            const { path, date, title, summary, tags } = post
            return (
              <div 
                key={path} 
                className="group p-6 rounded-xl transition-all duration-300 cursor-pointer hover:bg-white hover:shadow-xl dark:hover:bg-gray-800/50 border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                onClick={() => window.location.href = `/${path}`}
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
                            {tags?.map((tag) => (
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
                  </div>
                </article>
              </div>
            )
          })}
        </div>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
