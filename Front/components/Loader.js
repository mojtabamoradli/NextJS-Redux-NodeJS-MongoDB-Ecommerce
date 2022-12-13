

import React from 'react'
import ContentLoader from 'react-content-loader'

const Loader = props => (
  <ContentLoader
    viewBox="0 0 60 10"
    height={10}
    width={60}
    backgroundColor="transparent"
    {...props}
  >
    <circle cx="10" cy="5" r="4" />
    <circle cx="30" cy="5" r="4" />
    <circle cx="50" cy="5" r="4" />
  </ContentLoader>
)

export default Loader