import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import Img from "gatsby-image"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Loader from "../components/loader"
import "./index.css"

const useStyles = makeStyles(() => ({
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0px",
  },
  search: {
    width: "50%",
  },
  main: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    ["@media only screen and (max-width: 734px)"]: {
      justifyContent: "center",
    },
  },
  title: {
    position: "absolute",
    background: "black",
    opacity: "0.6",
    bottom: "5px",
    color: "white",
    fontWeight: "bold",
    width: "100%",
    padding: "10px 0px 10px",
    textAlign: "center",
  },
  image: {
    marginTop: "20px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  searchTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    opacity: "0.7",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}))

const IndexPage = ({ data }) => {
  const classes = useStyles()

  const [render, setRender] = useState(false)
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setRender(true)
    }, 1000)
  }, [])

  // Filter products based on search field
  const handleSearch = e => {
    setSearch(e.target.value)

    const productsArray = data.allContentfulProducts.nodes.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )

    setProducts(productsArray)
  }

  return render ? (
    <Layout>
      <SEO title="Home" />
      {/* Search Field */}
      <div className={classes.searchContainer}>
        <TextField
          value={search}
          onChange={handleSearch}
          label="Search"
          variant="outlined"
          className={classes.search}
          size="small"
          placeholder="Search Product eg: maroon plimsoll"
        />
      </div>
      {/* End search field */}

      {/* Carousel */}
      <Carousel showThumbs={false} infiniteLoop autoPlay stopOnHover>
        {data.allContentfulCategories.nodes.map(node => (
          <Img
            fluid={node.image.fluid}
            key={node.title}
            style={{ height: "400px" }}
          />
        ))}
      </Carousel>
      {/* End carousel */}

      <div className={classes.main}>
        {/* Search results */}
        {products.length > 0 &&
          search !== "" &&
          products.map(product => (
            <div key={product.title}>
              <Link
                to={`/category/${product.category.title.toLowerCase()}/${
                  product.slug
                }`}
                className={classes.link}
              >
                <div>
                  <Img fixed={product.image.fixed} className={classes.image} />
                  <Typography className={classes.searchTitle}>
                    {product.title}
                  </Typography>
                  <Typography>$ {product.price}</Typography>
                </div>
              </Link>
            </div>
          ))}
        {/* End search results */}

        {/* Categories */}
        {search === "" &&
          data.allContentfulCategories.nodes.map(node => (
            <div style={{ position: "relative" }} key={node.title}>
              <Link to={`/category/${node.title.toLowerCase()}`}>
                <Img fixed={node.image.fixed} className={classes.image} />
                <Typography className={classes.title}>{node.title}</Typography>
              </Link>
            </div>
          ))}
        {/* End categories */}
      </div>
    </Layout>
  ) : (
    <Loader />
  )
}

export const data = graphql`
  query {
    allContentfulCategories {
      nodes {
        title
        image {
          fixed(width: 300, height: 300) {
            ...GatsbyContentfulFixed_withWebp
          }
          fluid {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
    allContentfulProducts {
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

export default IndexPage
