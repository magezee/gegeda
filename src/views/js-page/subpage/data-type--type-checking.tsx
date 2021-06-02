import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/js/data-type--type-checking.md'


const TypeChecking:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default TypeChecking