import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/js/data-featurs--map.md'


const Map__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Map__