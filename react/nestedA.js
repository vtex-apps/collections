import React from 'react'
import {Link} from 'render'

const NestedA = () =>
  <div>
    a
    <Link to='/getting-started/b'>
    to b
    </Link>
  </div>

export default NestedA
