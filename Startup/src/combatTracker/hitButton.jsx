import React from "react";

export function HitButton({index, onHit=()=>{}}){

    return(
        <td><button onClick={()=>{onHit(index)}} style={styles.hitButton}>Hit</button></td>
    )
}

const styles= {
    hitButton: {
      // height: "15px",
      padding: "5px",
      lineHeight: "15px",
    },
  }