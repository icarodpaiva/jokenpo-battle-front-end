import React from "react"
import type { HeadFC } from "gatsby"

const NotFoundPage = () => {
  return <h1>Not found: 404</h1>
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
