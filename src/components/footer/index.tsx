import React, { FC } from 'react'
import Icon from './resource/icon.png'
import './style.scss'

const Footer: FC = () => {
  return (
    <div className="information">
      <a href="https://beian.miit.gov.cn">
        <img alt="icon" src={Icon}/>
        <span>桂ICP备2021005699号-1</span>
      </a>
    </div>
  )
}

export default Footer