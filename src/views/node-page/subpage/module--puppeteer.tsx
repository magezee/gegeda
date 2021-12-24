import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/node/module--puppeteer.md'


const Puppeteer__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Puppeteer__