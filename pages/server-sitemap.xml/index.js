import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import superagent from 'superagent'


export const getServerSideProps = async (ctx) => {
  // Method to source urls from cms
  
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const res = await superagent.get(`${apiBaseUrl}/phones`)

  const fields = res.body.map((phone) => ({ 
      loc: `${process.env.SITE_URL}/phones/${phone.slug}`, // Absolute url
      lastmod: new Date().toISOString(), 
      // changefreq
      // priority
    })
  )

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default () => {}