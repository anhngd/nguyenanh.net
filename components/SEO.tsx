import { NextSeo } from 'next-seo'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

interface Props {
  title: string
  description: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  authorDetails?: CoreContent<Authors>[]
  date?: string
  lastmod?: string
  url: string
}

export function BlogSEO({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'article',
  twitterCard = 'summary_large_image',
  authorDetails,
  date,
  lastmod,
  url,
}: Props) {
  const publishedAt = date ? new Date(date).toISOString() : undefined
  const modifiedAt = lastmod ? new Date(lastmod).toISOString() : publishedAt
  let images = ogImage ? [ogImage] : []
  const featuredImages = images

  const authorNames = authorDetails?.map((author) => author.name)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    author: authorNames?.map((author) => ({
      '@type': 'Person',
      name: author,
    })),
    datePublished: publishedAt,
    dateModified: modifiedAt,
    description: description,
    headline: title,
    image: featuredImages,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url: url,
  }

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonicalUrl || url}
      openGraph={{
        url,
        title,
        description,
        images: featuredImages.map((img) => ({
          url: img,
          alt: title,
        })),
        type: ogType,
        article: {
          publishedTime: publishedAt,
          modifiedTime: modifiedAt,
          authors: authorNames,
        },
      }}
      twitter={{
        cardType: twitterCard,
      }}
      additionalMetaTags={[
        {
          name: 'twitter:image',
          content: featuredImages[0] || '',
        },
      ]}
      additionalLinkTags={[
        {
          rel: 'canonical',
          href: canonicalUrl || url,
        },
      ]}
    />
  )
} 