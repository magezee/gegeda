
import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/vue/core-concept--data-traffic.md'


const DataTraffic__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default DataTraffic__