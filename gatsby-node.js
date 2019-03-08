const path = require(`path`)
const slash = require(`slash`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allWordpressPost {
        edges {
          node {
            id
            slug
            status
            template
            format
            slug
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
  const { allWordpressPost } = result.data

  // Create Page pages CURRENTLY NO PAGES ON BECKY SITE.
  //   const pageTemplate = path.resolve(`./src/templates/page.js`)
  //   allWordpressPage.edges.forEach(edge => {
  //     createPage({
  //       path: `/${edge.node.slug}/`,
  //       component: slash(pageTemplate),
  //       context: {
  //         id: edge.node.id,
  //       },
  //     })
  //   })

  const postTemplate = path.resolve(`./src/templates/post.js`)

  allWordpressPost.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.slug}/`,
      component: slash(postTemplate),
      context: {
        id: edge.node.id,
      },
    })
  })
}
