import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import KeywordCloud from '@/components/KeywordCloud'

// Keywords with their relative frequency/importance
const keywordData: Record<string, number> = {
  "design": 100,
  "users": 95,
  "information": 80,
  "user": 90,
  "features": 70,
  "application": 85,
  "team": 60,
  "process": 55,
  "use": 65,
  "interface": 75,
  "also": 65,
  "usability": 75,
  "control": 45,
  "buttons": 50,
  "one page": 60,
  "data": 65,
  "pages": 60,
  "view": 55,
  "different": 50,
  "visual": 45,
  "web": 65,
  "options": 60,
  "controls": 50,
  "using": 55,
  "display": 45,
  "time": 40,
  "menu": 55,
  "tasks": 60,
  "screen": 45,
  "many": 40,
  "new": 65,
  "help": 50,
  "create": 45,
  "provides": 40,
  "work": 45,
  "task": 55,
  "development": 65,
  "list": 40,
  "applications": 50,
  "within": 35,
  "multiple": 45,
  "first": 40,
  "simple": 50,
  "easy": 55,
  "feature": 60,
  "feedback": 45,
  "dialog": 40,
  "computer": 35,
  "text": 50,
  "even": 35,
  "specific": 40,
  "system": 55,
  "like": 35,
  "wufoo": 30,
  "elements": 45,
  "allows": 40,
  "product": 55,
  "form": 45,
  "right": 35,
  "number": 30
}

export function generateMetadata(): Metadata {
  return genPageMetadata({ title: 'Keywords', description: 'Common terms and concepts in user interface design' })
}

export default function Page() {
  const keywordKeys = Object.keys(keywordData)
  const totalKeywords = keywordKeys.length
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-5xl px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="font-prompt text-4xl font-extrabold leading-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
            UI/UX Keywords
          </h1>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
            {totalKeywords} common terms in user interface design
          </p>
        </div>
        
        <div className="relative w-full mx-auto h-[550px] bg-gradient-to-b from-gray-50/80 to-white/40 dark:from-gray-900/80 dark:to-gray-950/40 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
          {/* Background gradient effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[500px] h-[500px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full -top-1/4 -left-1/4 blur-3xl"></div>
            <div className="absolute w-[400px] h-[400px] bg-gradient-radial from-purple-500/5 to-transparent rounded-full -bottom-1/4 -right-1/4 blur-3xl"></div>
          </div>
          
          {/* Keyword globe */}
          <div className="absolute inset-0 flex items-center justify-center">
            <KeywordCloud keywordCounts={keywordData} />
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hover over the globe to explore keywords. Click on any keyword to bring it to the front.
          </p>
        </div>
      </div>
    </div>
  )
} 