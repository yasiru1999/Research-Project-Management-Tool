

function Container({vertical=false,children,style}) {
  return (
    <div style={{display:'flex',flexDirection:vertical?"column":"row",alignItems:"center",justifyContent:"center" ,...style}}>{children}</div>
  )
}

export default Container