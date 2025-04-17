import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-2 mb-2 inline-block rounded-full px-3 py-1 text-sm font-medium font-lexend text-orange-500 hover:text-white hover:bg-orange-500 bg-orange-50 dark:bg-gray-800 dark:hover:bg-orange-500 transition-colors duration-200"
    >
      {text}
    </Link>
  )
}

export default Tag
