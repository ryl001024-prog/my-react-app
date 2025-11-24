declare module '*.svg' {
  const content: string
  export default content
}

// 如果使用 vite-plugin-svgr，还需要这个
declare module '*.svg' {
  import React from 'react'
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}