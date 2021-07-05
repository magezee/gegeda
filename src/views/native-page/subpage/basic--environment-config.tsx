import React from 'react'
import RenderMd from 'src/components/render-md'
import mdData from 'markdown/native/basic--environment-config.md'


const EnvironmentConfig:React.FC = () => {
  return (
    <RenderMd mdData={mdData}/>
  )
}


export default EnvironmentConfig