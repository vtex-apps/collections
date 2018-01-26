import React from 'react'
import {Link} from 'render'

const NestedB = () =>
  <div>
    b
    <Link to='/getting-started/a'>
    to a
    </Link>
  </div>

export default NestedB
