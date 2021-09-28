import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/architecture/modules--general.md'


const General__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default General__