import React, { FC } from 'react'
import { GithubIcon } from './icon'
import Navgation from 'src/components/navigation'
import navConfig from 'src/config/header-nav'

import './style.scss'

const Header: FC = () => {
  return (
    <div className="navbar">
      <a className="logo" href="/">
        咯咯哒
      </a>
      <li className="navbar-content">
        <Navgation navigationConfig={navConfig} menuMode='horizontal' highlightLine={false} />
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