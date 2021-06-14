import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/js/data-featurs--constructor.md'


const Constructor:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Constructor