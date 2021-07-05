import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/js/data-featurs--string.md'

const String__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default String__