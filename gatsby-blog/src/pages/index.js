import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"

const BlogLink = styled(Link)`
text-decoration: none;
`
const BlogTitle = styled.h3`
margin-bottom: 20px;
color: blue;
`
export default ({ data }) => (
  <Layout>
    <div>
      <h1>Yihua`s Thoughts</h1>
      <h4>{data.allMarkdownRemark.totalCount}</h4>
    </div>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <BlogLink to={node.fields.slug}>
        <BlogTitle >
          {node.frontmatter.title} - {node.frontmatter.date}
        </BlogTitle>
        </BlogLink>
        <p>{node.excerpt}</p>
      </div>
    ))}
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            date
            title
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
