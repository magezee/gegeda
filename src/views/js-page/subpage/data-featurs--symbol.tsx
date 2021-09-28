import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/js/data-featurs--symbol.md'

const Symbol__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Symbol__