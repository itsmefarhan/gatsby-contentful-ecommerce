import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Products from "../../components/products"

const Shirts = ({ data }) => {
  return (
    <Layout>
      <SEO title="Shirts" />
      <Typography variant="h3" align="center">
        Shirts
      </Typography>
      <Products data={data} />
    </Layout>
  )
}

export const data = graphql`
  query {
    allContentfulProducts(filter: { category: { title: { eq: "Shirts" } } }) {
      nodes {
        title
        slug
        description {
          description
        }
        price
        image {
          fixed(width: 300, height: 300) {
            ...GatsbyContentfulFixed_withWebp
          }
        }
        category {
          title
        }
      }
    }
  }
`

export default Shirts
