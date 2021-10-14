import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/node/webpack--demo.md'


const Demo__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Demo__