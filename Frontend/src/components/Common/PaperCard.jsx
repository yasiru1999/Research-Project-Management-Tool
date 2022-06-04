
function PaperCard({style,children}) {
  return (
    <div
      style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
        backgroundColor: "#FFF",
        borderRadius: "4px",
        boxShadow:
          "0 1px 3px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 10px 15px -5px, rgb(0 0 0 / 4%) 0px 7px 7px -5px",
      padding:"20px",
      ...style
      }}
    >
     {children}
    </div>
  );
}

export default PaperCard;
