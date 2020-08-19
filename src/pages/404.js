import React from "react"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Typography variant="h4" align="center">
      NOT FOUND
    </Typography>
    <Typography variant="body1" align="center">
      You just hit a route that doesn&#39;t exist... the sadness.
    </Typography>
  </Layout>
)

export default NotFoundPage
