import React, { useState, Fragment } from "react"
import { Link } from "gatsby"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import Img from "gatsby-image"

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
    fontSize: "20px",
    fontWeight: "bold",
    opacity: "0.7",
  },
  image: {
    marginTop: "20px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}))

const Products = ({ data }) => {
  const classes = useStyles()

  const [search, setSearch] = useState("")
  const [products, setProducts] = useState([])

  const handleSearch = e => {
    setSearch(e.target.value)

    const productsArray = data.allContentfulProducts.nodes.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )

    setProducts(productsArray)
  }

  const renderData = (catTitle, slug, img, title, price) => (
    <Link to={`/category/${catTitle}/${slug}`} className={classes.link}>
      <div>
        <Img fixed={img} className={classes.image} />
        <Typography className={classes.title}>{title}</Typography>
        <Typography>{price}</Typography>
      </div>
    </Link>
  )

  return (
    <>
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

      <div className={classes.main}>
        {/* Search results */}
        {products.length > 0 &&
          search !== "" &&
          products.map(product => (
            <Fragment key={product.title}>
              {renderData(
                product.category.title.toLowerCase(),
                product.slug,
                product.image.fixed,
                product.title,
                product.price
              )}
            </Fragment>
          ))}
        {/* End search results */}

        {/* All products */}
        {search === "" &&
          data.allContentfulProducts.nodes.map(node => {
            return (
              <Fragment key={node.title}>
                {renderData(
                  node.category.title.toLowerCase(),
                  node.slug,
                  node.image.fixed,
                  node.title,
                  node.price
                )}
              </Fragment>
            )
          })}
        {/* End all products */}
      </div>
    </>
  )
}
export default Products
