import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import style from './codeStyle'
import './style.scss'


const components = {
  code({node, inline, className, children, ...props}) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter style={style} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
    ) : (
      <code className={className} children={String(children[0]).replace(/\n$/, '')} {...props} />
    )
  }
}

const ReactMd = ({data}) => (
  <ReactMarkdown
    className="markdown-body"
    components={components}
    remarkPlugins={[gfm]}
    children={data}
  />
)


export default ReactMd


