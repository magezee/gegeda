import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/native/style--basic-style.md'


const BasicStyle:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default BasicStyle