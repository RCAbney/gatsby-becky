import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO
      title="Becky365"
      keywords={[`photography`, `365 day photography challenge`]}
    />
    <div className="container-fluid" id="about">
      <div className="section-headline">
        <h2>BECKY365</h2>
        <p>Daily repository for my 365 day photography challenge</p>
      </div>
    </div>
    <div className="container-fluid" id="updates">
      <div className="section-headline">
        <h2>LATEST UPDATES</h2>
      </div>

      <div className="row no-gutter">
        {data.allWordpressPost.edges.map(({ node }) => (
          <div className="col-md-3 col-sm-6" key={node.id}>
            <img
              src={
                node.featured_media
                  ? node.featured_media.source_url
                  : `https://placehold.it/600x600`
              }
              alt={node.title}
              className="img-responsive responsive--full folio-pic"
            />
            <div className="folio-item">
              <div className="folio-item-details">
                <h2 className="entry-title">
                  <a href="#">{node.title}</a>
                </h2>
                <p>{node.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
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
