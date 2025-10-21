import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
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
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value,
          }
        ),
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
      path: 'src/content/knowledge-base/*',
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
