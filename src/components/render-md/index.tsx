import React, { FC } from 'react'
import ReactMd from './react-md'
import MarkdownNav from './markdown-nav'
import './style.scss'

interface renderMdProps {
  mdData: any
}

/**
 * @description 渲染md数据组件
 * @param mdData md数据文件
 */
const RenderMd: FC<renderMdProps> = ({mdData}) => (
  <div className="md-content">
    <div className="md-navigation">
      <MarkdownNav source={mdData} ordered={false} headingTopOffset={100}/>
    </div>
    <div className="md-main">
      <ReactMd data={mdData} />
    </div>
  </div>
)

export default RenderMd