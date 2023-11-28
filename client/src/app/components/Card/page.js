import React from'react'
function page(props){
    return(
        <div style={{ padding: '30px', width: '100px', backgroundColor: 'aqua', margin: '10px' }}>
      {JSON.stringify(props.item)}
    </div>
    )
}
export default page