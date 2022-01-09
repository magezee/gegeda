import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/c-sharp/data--class.md'


const Class__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}

export default Class__