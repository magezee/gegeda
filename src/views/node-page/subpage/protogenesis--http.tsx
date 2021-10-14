import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/node/protogenesis--http.md'


const Http__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Http__