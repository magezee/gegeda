import React, { useContext, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuContext }from './menu'
import { MenuItemProps } from './menu-item'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = ({index, title, className, children}) => {
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
  const [ menuOpen, setOpen ] = useState(isOpened)
  
  const classes = classNames(className, 'submenu-item', {
    'is-active': context.index[0] === index,
    'is-highlight-line': context.highlightLine === true
  })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }

  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault()
    setOpen(toggle)
 
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}

  const hoverEvents = context.mode !== 'vertical'? {
    onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
    onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)}
  } : {}

  const renderChildren = () => {
    const subMenuclasses = classNames('submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if(childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem component')
      }
    })
    
    return (
      <ul className={subMenuclasses}>
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents} >
      <div className='submenu-title' onClick={handleClick} {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu