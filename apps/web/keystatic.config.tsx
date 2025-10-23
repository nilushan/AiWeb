import { config, fields, collection } from '@keystatic/core';

const isProduction = process.env.NODE_ENV === 'production';
const cmsApiUrl = process.env.PUBLIC_CMS_API_URL || '';

export default config({
  storage: isProduction && cmsApiUrl ? {
    kind: 'cloud',
    apiUrl: cmsApiUrl,
  } : {
    kind: 'github',
    repo: {
      owner: process.env.GITHUB_REPO_OWNER || 'nilushan',
      name: process.env.GITHUB_REPO_NAME || 'AiWeb',
    },
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/posts/*/index',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        publishDate: fields.date({
          label: 'Publish Date',
          defaultValue: { kind: 'today' },
        }),
        author: fields.text({
          label: 'Author',
          defaultValue: 'Admin',
        }),
        image: fields.image({
          label: 'Featured Image',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        featured: fields.checkbox({
          label: 'Featured Post',
          defaultValue: false,
        }),
        draft: fields.checkbox({
          label: 'Draft',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts/',
            },
          },
        }),
      },
    }),
    knowledgeBase: collection({
      label: 'Knowledge Base',
      slugField: 'title',
      path: 'src/content/knowledge-base/*/index',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Getting Started', value: 'getting-started' },
            { label: 'Guides', value: 'guides' },
            { label: 'Tutorials', value: 'tutorials' },
            { label: 'API Reference', value: 'api-reference' },
            { label: 'FAQ', value: 'faq' },
          ],
          defaultValue: 'guides',
        }),
        order: fields.number({
          label: 'Order',
          defaultValue: 0,
        }),
        icon: fields.text({
          label: 'Icon (emoji)',
          defaultValue: '📄',
        }),
        image: fields.image({
          label: 'Featured Image',
          directory: 'public/images/kb',
          publicPath: '/images/kb/',
        }),
        lastUpdated: fields.date({
          label: 'Last Updated',
          defaultValue: { kind: 'today' },
        }),
        featured: fields.checkbox({
          label: 'Featured',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/kb',
              publicPath: '/images/kb/',
            },
          },
        }),
      },
    }),
    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        image: fields.image({
          label: 'Featured Image',
          directory: 'public/images/pages',
          publicPath: '/images/pages/',
        }),
        showInNav: fields.checkbox({
          label: 'Show in Navigation',
          defaultValue: false,
        }),
        pageType: fields.select({
          label: 'Page Type',
          options: [
            { label: 'Home', value: 'home' },
            { label: 'About', value: 'about' },
            { label: 'Features', value: 'features' },
            { label: 'Contact', value: 'contact' },
            { label: 'Pricing', value: 'pricing' },
            { label: 'Generic', value: 'generic' },
          ],
          defaultValue: 'generic',
        }),
        hero: fields.object({
          title: fields.text({ label: 'Hero Title' }),
          subtitle: fields.text({ label: 'Hero Subtitle', multiline: true }),
        }),
        sections: fields.array(
          fields.object({
            sectionType: fields.select({
              label: 'Section Type',
              options: [
                { label: 'Features Grid', value: 'features' },
                { label: 'Team Members', value: 'team' },
                { label: 'Values', value: 'values' },
                { label: 'Pricing Plans', value: 'pricing' },
                { label: 'Contact Methods', value: 'contact-methods' },
                { label: 'Offices', value: 'offices' },
                { label: 'Stats', value: 'stats' },
                { label: 'FAQs', value: 'faqs' },
                { label: 'CTA', value: 'cta' },
                { label: 'Tech Stack', value: 'tech-stack' },
                { label: 'Add-ons', value: 'addons' },
              ],
              defaultValue: 'features',
            }),
            heading: fields.text({ label: 'Section Heading' }),
            subheading: fields.text({
              label: 'Section Subheading',
              multiline: true,
            }),
            items: fields.array(
              fields.object({
                title: fields.text({ label: 'Item Title' }),
                description: fields.text({
                  label: 'Item Description',
                  multiline: true,
                }),
                icon: fields.text({ label: 'Icon (emoji or class)' }),
                image: fields.image({
                  label: 'Item Image',
                  directory: 'public/images/pages',
                  publicPath: '/images/pages/',
                }),
                link: fields.text({ label: 'Link URL' }),
                linkText: fields.text({ label: 'Link Text' }),
                metadata: fields.text({
                  label: 'Additional Metadata (JSON)',
                  multiline: true,
                }),
              }),
              {
                label: 'Section Items',
                itemLabel: (props) => props.fields.title.value || 'New Item',
              }
            ),
          }),
          {
            label: 'Page Sections',
            itemLabel: (props) => props.fields.heading.value || 'New Section',
          }
        ),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/pages',
              publicPath: '/images/pages/',
            },
          },
        }),
      },
    }),
  },
});
