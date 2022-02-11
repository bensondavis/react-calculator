function Number({value, onClick, className}){
  if(value === "Undo") {
    return <button className={className} onClick={()=>onClick(value)}><i class='fas fa-undo' ></i></button>;
  }

  if(value === "Redo") {
    return <button className={className} onClick={()=>onClick(value)}><i class="fas fa-redo"></i></button>;
  }

  if(value === "<=") {
    return <button className={className} onClick={()=>onClick(value)}><i class='fas fa-backspace' ></i></button>;
  }

  if(value === "All Clear") {
    return <button className={className} onClick={()=>onClick(value)}><i class="far fa-trash-alt"></i></button>;
  }

  return <button className={className} onClick={()=>onClick(value)}>{value}</button>;
}

export default Number;