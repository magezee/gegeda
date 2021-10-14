import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/node/protogenesis--path.md'


const Path__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Path__