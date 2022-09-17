import React from "react"
import type { HeadFC } from "gatsby"
import { BaseLayout } from "../layouts/BaseLayout"
import "../styles/pages/index.scss"

const IndexPage = () => {
  return (
    <BaseLayout>
      <h1>Start</h1>
    </BaseLayout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
