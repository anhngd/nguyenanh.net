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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="font-prompt text-4xl font-extrabold leading-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
            Tags
          </h1>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
            Browse {totalTags} tags across {totalPosts} posts
          </p>
        </div>
        
        <div>
          <div className="relative w-full mx-auto h-[450px] bg-gradient-to-b from-gray-50/80 to-white/40 dark:from-gray-900/80 dark:to-gray-950/40 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
            {/* Background gradient effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-[600px] h-[600px] bg-gradient-radial from-blue-500/10 to-transparent rounded-full -top-64 -left-20 blur-3xl"></div>
              <div className="absolute w-[500px] h-[500px] bg-gradient-radial from-purple-500/10 to-transparent rounded-full -bottom-40 -right-20 blur-3xl"></div>
            </div>
            
            {/* Tag cloud */}
            <div className="absolute inset-0 flex items-center justify-center">
              <TagCloud tagCounts={tagCounts} />
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hover over the cloud to explore tags.
          </p>
        </div>
      </div>
    </div>
  )
}
