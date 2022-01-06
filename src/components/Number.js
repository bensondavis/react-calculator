function Number({value, onClick, className}){

  return <button className={className} onClick={()=>onClick(value)}>{value}</button>;
}

export default Number;