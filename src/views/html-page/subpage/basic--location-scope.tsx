import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/html/basic--location-scope.md'


const Scope__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Scope__