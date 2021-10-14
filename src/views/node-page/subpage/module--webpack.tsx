import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/node/module--webpack.md'


const Webpack__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Webpack__