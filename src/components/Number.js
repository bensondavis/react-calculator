import Button from '@mui/material/Button';

function Number({value, onClick, className}){

  if(value === "Undo") {
    return <Button variant='outlined' sx={{mb: "3px", mr: "3px"}} className={className} onClick={()=>onClick(value)}><i class='fas fa-undo' ></i></Button>;
  }

  if(value === "Redo") {
    return <Button variant='outlined' sx={{mb: "3px", mr: "3px"}} className={className} onClick={()=>onClick(value)}><i class="fas fa-redo"></i></Button>;
  }

  if(value === "<=") {
    return <Button variant='outlined' sx={{mb: "3px", mr: "3px"}} className={className} onClick={()=>onClick(value)}><i class='fas fa-backspace' ></i></Button>;
  }

  if(value === "All Clear") {
    return <Button variant='outlined' sx={{mb: "3px", mr: "3px"}} className={className} onClick={()=>onClick(value)}><i class="far fa-trash-alt"></i></Button>;
  }

  return <Button variant='outlined' sx={{mb: "3px", mr: "3px"}} className={className} onClick={()=>onClick(value)}>{value}</Button>;
}


export default Number;