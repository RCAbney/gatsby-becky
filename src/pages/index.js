import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Img from 'gatsby-image'

export const pageQuery = graphql`
  {
    wordPress {
      posts(first: 100) {
        edges {
          node {
            id
            date
            title
            excerpt
            slug
            featuredImage {
              sourceUrl
              imageFile {
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
  }
`

const IndexPage = ({ data }) => {
  const posts = data.wordPress.posts.edges
  return (
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
          {posts.map(({ node }) => (
            <div className="col-md-3 col-sm-6" key={node.id}>
              {(node.featuredImage.sourceUrl && (
                <Img
                  alt={node.title}
                  className="img-responsive folio-pic"
                  fluid={node.featuredImage.imageFile.childImageSharp.fluid}
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
}

export default IndexPage
