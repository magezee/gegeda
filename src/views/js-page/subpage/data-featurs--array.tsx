import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/js/data-featurs--array.md'


const Array__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Array__