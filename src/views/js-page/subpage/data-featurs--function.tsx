import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/js/data-featurs--function.md'


const Function_:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Function_