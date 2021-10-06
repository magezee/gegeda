import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/js/data-featurs--promise.md'


const Promise__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Promise__