const path = require(`path`)
const slash = require(`slash`)

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    WordPress_MediaItem: {
      imageFile: {
        type: 'File',
        async resolve(source) {
          let sourceUrl = source.sourceUrl

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl
          }

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      wordPress {
        posts(first: 100) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    }
  `)

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors)
  }

  // Access query results via object destructuring
  const posts = result.data.wordPress.posts.edges

  const postTemplate = path.resolve(`./src/templates/post.js`)

  posts.forEach(({ node }) => {
    createPage({
      path: `/${node.slug}/`,
      component: slash(postTemplate),
      context: {
        id: node.id,
      },
    })
  })
}
