import React from 'react'
import mdData from './JS.md'
import ReactMarkdown from 'react-markdown'
import style from './tt.scss'

const Test = () => (
  <div>
    <ReactMarkdown
      className="markdown-body"
      children={mdData}
    >
    </ReactMarkdown>
  </div>
)

export default Test