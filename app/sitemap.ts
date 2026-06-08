import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://stackandscale.in',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        // add more pages here
    ]
}