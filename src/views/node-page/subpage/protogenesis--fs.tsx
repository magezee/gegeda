import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/node/protogenesis--fs.md'


const Fs__:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default Fs__