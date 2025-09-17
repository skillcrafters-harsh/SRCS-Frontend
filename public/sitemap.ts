import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://srcs.vercel.app'
  const now = new Date()
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  
  return [
    // Homepage - Maximum priority
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Primary application pages
    {
      url: `${baseUrl}/run`,
      lastModified: now,
      changeFrequency: 'hourly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/example`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // Technical documentation
    {
      url: `${baseUrl}/api-docs`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/api-reference`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    // High-value SEO pages
    {
      url: `${baseUrl}/roll-cutting-optimization`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/smart-roll-cutting-system`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cutting-pattern-optimization`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    // Industry-specific pages
    {
      url: `${baseUrl}/paper-roll-cutting`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/textile-cutting-optimization`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/metal-sheet-cutting`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Solution-focused pages
    {
      url: `${baseUrl}/waste-reduction-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${baseUrl}/manufacturing-efficiency-tools`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${baseUrl}/cost-optimization-software`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Primary SEO Landing Pages
    {
      url: `${baseUrl}/srcs-vercel`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/roll-cutting-calculator`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/material-waste-reduction`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    
    // Additional Industry Pages
    {
      url: `${baseUrl}/plastic-roll-cutting`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/fabric-cutting-optimization`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${baseUrl}/metal-roll-cutting`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    
    // Solution & Tool Pages
    {
      url: `${baseUrl}/cutting-cost-reduction`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${baseUrl}/production-optimization`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${baseUrl}/cutting-efficiency-software`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/roll-optimization-system`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/cutting-plan-generator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    
    // Feature pages
    {
      url: `${baseUrl}/excel-upload-optimization`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/manual-input-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    
    // Technical & Algorithm Pages
    {
      url: `${baseUrl}/roll-cutting-algorithm`,
      lastModified: lastWeek,
      changeFrequency: 'monthly',
      priority: 0.55,
    },
    {
      url: `${baseUrl}/automated-cutting-solutions`,
      lastModified: lastWeek,
      changeFrequency: 'monthly',
      priority: 0.55,
    },
    {
      url: `${baseUrl}/industrial-cutting-software`,
      lastModified: lastWeek,
      changeFrequency: 'monthly',
      priority: 0.55,
    },
    {
      url: `${baseUrl}/smart-manufacturing-tools`,
      lastModified: lastWeek,
      changeFrequency: 'monthly',
      priority: 0.55,
    },
    
    // Problem-Solution Pages
    {
      url: `${baseUrl}/roll-cutting-problem-solver`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/waste-minimization-tool`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.55,
    },
    {
      url: `${baseUrl}/manufacturing-cost-reduction`,
      lastModified: lastWeek,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    
    // Alternative & Comparison Pages
    {
      url: `${baseUrl}/free-roll-cutting-software`,
      lastModified: lastWeek,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/online-cutting-calculator`,
      lastModified: lastWeek,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cutting-optimization-guide`,
      lastModified: lastWeek,
      changeFrequency: 'monthly',
      priority: 0.45,
    },
  ]
}