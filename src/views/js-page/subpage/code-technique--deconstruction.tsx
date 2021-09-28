import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/js/code-technique--deconstruction.md'


const Deconstruction__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Deconstruction__