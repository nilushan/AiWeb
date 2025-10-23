import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const knowledgeBase = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['getting-started', 'guides', 'tutorials', 'api-reference', 'faq']),
    order: z.number().default(0),
    icon: z.string().optional(),
    image: z.string().optional(),
    lastUpdated: z.coerce.date().optional(),
    featured: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    showInNav: z.boolean().default(false),
    pageType: z.enum(['home', 'about', 'features', 'contact', 'pricing', 'generic']).optional(),
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
    }).optional(),
    // Structured data for different page types
    sections: z.array(z.any()).optional(),
  }),
});

export const collections = {
  posts,
  'knowledge-base': knowledgeBase,
  pages,
};
