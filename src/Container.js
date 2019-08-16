import React from 'react'
import { css } from 'glamor'

function Container({ children }) {
  return (
    <div {...css(styles.container)}>
      { children }
    </div>
  )
}

const styles = {
  container: {
    width: 900,
    margin: '0 auto',
    '& h1': {
      textAlign: 'left'
    }
  }
}

export default Container