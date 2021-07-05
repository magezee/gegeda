import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/js/data-featurs--base-type.md'


const BaseType:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default BaseType