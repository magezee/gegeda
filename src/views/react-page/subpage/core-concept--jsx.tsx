import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/react/core-concept--jsx.md'


const JSX__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default JSX__