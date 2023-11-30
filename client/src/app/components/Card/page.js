import React from'react'
function page(props){
    return(
        <div style={{ padding: '30px', width: '100px',border:'1px solid', margin: '10px' }}>
      {(props.item.price)}
      {(props.item.productName)}
    </div>
    )
}
export default page