import React from "react";

export function TwoButtonStack({
  topLabel = "+",
  bottomLabel = "-",
  onTopClick = () => {},
  onBottomClick = () => {},
}) {
  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={onTopClick}>
        {topLabel}
      </button>
      <button style={styles.button} onClick={onBottomClick}>
        {bottomLabel}
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1px",        // spacing between buttons
    width: "fit-content",    // adjust to taste
    
  },
  button: {
    // height: "15px",
    padding: "5px",
    lineHeight: "5px",
  },
};
