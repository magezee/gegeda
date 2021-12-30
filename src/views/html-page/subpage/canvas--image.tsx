import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/html/canvas--image.md'


const Image__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Image__