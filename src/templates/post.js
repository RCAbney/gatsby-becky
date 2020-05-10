import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Img from 'gatsby-image'
// import parse from 'html-react-parser'

class PostTemplate extends Component {
  render() {
    const post = this.props.data.wordPress.post

    // const postBody = parse(post.content, {
    //   replace: ({ attribs }) =>
    //     attribs && attribs.class === 'wp-block-image' && <React.Fragment />,
    // })
    // console.log(postBody)
    return (
      <Layout>
        <SEO
          title="Becky365"
          keywords={[`photography`, `365 day photography challenge`]}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-push-2">
              <div className="post">
                <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
                {(post.featuredImage && (
                  <Img
                    resolutions={
                      post.featuredImage.imageFile.childImageSharp.resolutions
                    }
                    alt={post.title}
                    className="post-image"
                  />
                )) || (
                  <img src="https://placehold.it/1500x1500" alt="placeholder" />
                )}
                <div
                  className="post-body"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query currentPostQuery($id: ID!) {
    wordPress {
      post(id: $id) {
        title
        content
        featuredImage {
          sourceUrl
          imageFile {
            childImageSharp {
              resolutions(height: 1200, width: 1600) {
                src
                height
                width
              }
            }
          }
        }
      }
      generalSettings {
        title
      }
    }
  }
`
