import React, { FC } from 'react' 
import './style.scss'
import loadingImg from './resource/loading.gif'

const Loading:FC = () => {
  return (
    <div className="loading-content">
      <img alt="loading" src={loadingImg} />
    </div>
    
  )
}



export default Loading