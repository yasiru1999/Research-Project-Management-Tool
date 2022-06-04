import React from 'react'

function Center({children,style}) {
  return (
    <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",...style}}>{children}</div>
  )
}

export default Center