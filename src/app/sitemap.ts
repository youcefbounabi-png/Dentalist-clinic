import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dentalist-clinic.vercel.app'
  const locales = ['en', 'fr'] // Supported locales
  const pages = ['', '/services', '/gallery', '/about', '/contact']
 
  const sitemapEntries: MetadataRoute.Sitemap = []
 
  locales.forEach((locale) => {
    pages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: page === '' ? 1 : 0.8,
      })
    })
  })
 
  return sitemapEntries
}
