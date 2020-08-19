const path = require("path")
// Create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allContentfulProducts {
        nodes {
          slug
          category {
            title
          }
        }
      }
    }
  `)
  
  result.data.allContentfulProducts.nodes.forEach(product => {
    createPage({
      path: `/category/${product.category.title.toLowerCase()}/${product.slug}`,
      component: path.resolve(
        `src/templates/${product.category.title.toLowerCase()}.js`
      ),
      context: {
        slug: product.slug,
      },
    })
  })
}
