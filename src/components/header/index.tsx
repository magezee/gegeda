import React, { FC } from 'react'
import { GithubIcon } from './icon'
import Navgation from 'src/components/navigation'
import { navConfigType } from 'src/constant/types'

import './style.scss'

const navData:navConfigType = [
  {
    id: 'docs',
    title: '文档',
    children: [
      {
        id: 'js',
        title: 'JS文档',
        path: '/js'
      },
      {
        id: 'css',
        title: 'CSS文档',
        path: '/css'
      },
      
    ]
  }
]


const Header: FC = () => {
  return (
    <div className="navbar">
      <a className="logo" href="/">
        咯咯哒
      </a>
      <li className="navbar-content">
        <Navgation navigationConfig={navData} menuMode='horizontal' highlightLine={false} />
      </li>
      <div className="information"> 
        <a href="https://github.com/magezee" target="_blank">
          <GithubIcon />
        </a>
      </div>
    </div>
  )
}

export default Header