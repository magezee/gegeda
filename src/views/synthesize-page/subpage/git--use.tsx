import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/synthesize/git--use.md'


const Use__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Use__