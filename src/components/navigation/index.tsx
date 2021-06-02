import React from 'react'
import { Menu, MenuItem, SubMenu } from 'src/components/menu'
import { Link } from 'react-router-dom'
import { navConfigType } from 'src/constant/types'

type MenuMode = 'horizontal' | 'vertical'

interface PageNavProps {
  navigationConfig: navConfigType
  menuMode?: MenuMode
  highlightLine?: boolean
}

/**
 * @description 通用的渲染导航栏a标签跳转指定路由组件
 * @param navigationConfig 配置数据
 * @param menuMode 排列方向
 * @param highlightLine 控制是否显示选中高亮线
 */
const Navigation: React.FC<PageNavProps> = ({navigationConfig, menuMode='vertical', highlightLine=true}) => {
  const renderMenuNav = () => {
    return navigationConfig.map((item) => {
      if('children' in item) {
        return (
          <SubMenu key={item.id} title={item.title}>
            {item.children?.map((i) => i.path && (
              <MenuItem key={i.id}>
                <Link key={i.id} to={i.path}>{i.title}</Link>
              </MenuItem>
            ))}
          </SubMenu>
        )
      } else {
        return item.path && (
          <MenuItem key={item.id}>
            <Link key={item.id} to={item.path}>{item.title}</Link>
          </MenuItem>
        )
      }    
    })
  }

  return (
    <Menu defaultIndex='0' defaultOpenSubMenus={['0']} mode={menuMode} highlightLine={highlightLine}>
      {renderMenuNav()}
    </Menu>
  )
}


export default Navigation