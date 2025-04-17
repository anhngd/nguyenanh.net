import Link from '@/components/Link'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import TagCloud from 'components/TagCloud'

export function generateMetadata(): Metadata {
  return genPageMetadata({ title: 'Tags', description: 'Things I blog about' })
}

export default function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const totalTags = tagKeys.length
  const totalPosts = Object.values(tagCounts).reduce((sum, count) => sum + count, 0)
  
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="font-prompt text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl sm:leading-10 md:text-6xl md:leading-14 text-center">
          Tags
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-center">
          Browse {totalTags} tags across {totalPosts} posts
        </p>
      </div>
      
      <div className="container max-w-4xl mx-auto py-12">
        <div className="flex flex-col items-center">
          <div className="bg-gray-50/70 dark:bg-gray-900/30 backdrop-blur-sm rounded-xl p-8 shadow-lg w-full min-h-[500px] border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="absolute w-[600px] h-[600px] bg-gradient-radial from-blue-500/10 to-transparent rounded-full -top-64 -left-20 blur-3xl"></div>
            <div className="absolute w-[500px] h-[500px] bg-gradient-radial from-purple-500/10 to-transparent rounded-full -bottom-40 -right-20 blur-3xl"></div>
            <TagCloud tagCounts={tagCounts} />
          </div>
        </div>
      </div>
    </div>
  )
}
