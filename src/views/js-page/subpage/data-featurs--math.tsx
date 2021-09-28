import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/js/data-featurs--math.md'


const Math__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Math__