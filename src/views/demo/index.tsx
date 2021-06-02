import React from 'react'
import { Menu, MenuItem, SubMenu } from 'src/components/menu'
import PageNav from 'src/components/navigation'

const Demo: React.FC<any> = () => {
  return (
    <React.Fragment>
      <Menu defaultIndex='0' onSelect={(index) => {alert(index)}}  defaultOpenSubMenus={['4']} mode='vertical' highlightLine={false}>
        <MenuItem disabled>
          <div>aaaa</div>
        </MenuItem>
        <MenuItem >
          <div>33333</div>
        </MenuItem>
        <MenuItem >
          <div>33333</div>
        </MenuItem>
        <SubMenu title='AA' className='aaa'>
          <MenuItem>
            <div>222</div>
          </MenuItem>
        </SubMenu>
        <SubMenu title='AA' className='aaa'>
          <MenuItem>
            <div>222</div>
          </MenuItem>
          <MenuItem>
            <div>222</div>
          </MenuItem>
          <MenuItem>
            <div>222</div>
          </MenuItem>
          <MenuItem>
            <div>222</div>
          </MenuItem>
        </SubMenu>
      </Menu>
    </React.Fragment>
  )

}

export default Demo