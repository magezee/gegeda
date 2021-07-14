import React, { FC } from 'react'
import Icon from './resource/icon.png'
import './style.scss'

const Footer: FC = () => {
  return (
    <div className="information">
      <a href="https://beian.miit.gov.cn">
        <img alt="icon" src={Icon}/>
        <span>桂ICP备 2021005699号</span>
      </a>
    </div>
  )
}

export default Footer