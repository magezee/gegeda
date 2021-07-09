import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/js/execution-context--hoisting.md'


const Hoisting__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}

export default Hoisting__