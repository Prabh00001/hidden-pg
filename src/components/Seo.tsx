import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

type Props = {
  title?: string
  description?: string
  image?: string
}

const BASE = 'https://hiddenprincegeorge.ca'

export default function Seo({ title, description, image }: Props) {
  const { pathname } = useLocation()
  const url = `${BASE}${pathname || '/'}`
  const fullTitle = title
    ? `${title} — Hidden Prince George`
    : 'Hidden Prince George — Discover the Best of Prince George'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <link rel="canonical" href={url} />
      {description && <meta name="description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}
