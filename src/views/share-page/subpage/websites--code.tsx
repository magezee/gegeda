import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/share/websites--code.md'


const Code__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Code__