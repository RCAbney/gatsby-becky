import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
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
            {(node.featured_media.localFile && (
              <Img
                alt={node.title}
                fluid={node.featured_media.localFile.childImageSharp.fluid}
                className="img-responsive folio-pic"
              />
            )) || <img src="https://placehold.it/500x500" alt="poop" />}
            <div className="folio-item">
              <div className="folio-item-details">
                <h2 className="entry-title">
                  <Link to={node.slug}>{node.title}</Link>
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
          date(formatString: "MMMM Do, YYYY")
          title
          excerpt
          slug
          featured_media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 600) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
