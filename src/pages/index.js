import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO
      title="Becky365"
      keywords={[`photography`, `365 day photography challenge`]}
    />
    <h1>Latest Updates</h1>
    <p>Now go build something great.</p>
    <div className="image-grid">
      {data.allWordpressPost.edges.map(({ node }) => (
        <img key={node.id} src={node.featured_media.source_url} alt={node.title} className="grid-photo-item" />
      ))}
    </div>
  </Layout>
)

export default IndexPage

export const postQuery = graphql`
  query {
    allWordpressPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          id
          date
          title
          excerpt
          slug
          featured_media {
            source_url
          }
        }
      }
    }
  }
`
