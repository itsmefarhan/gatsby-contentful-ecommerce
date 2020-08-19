import React from "react"
import { graphql } from "gatsby"
import Product from "../components/product"

const Bags = props => {
  return <Product data={props.data} />
}

export const data = graphql`
  query($slug: String) {
    product: contentfulProducts(slug: { eq: $slug }) {
      id
      title
      slug
      description {
        description
      }
      price
      image {
        fixed(width:400, height: 400) {
          ...GatsbyContentfulFixed_withWebp
        }
      }
      category {
        title
      }
    }
  }
`

export default Bags
