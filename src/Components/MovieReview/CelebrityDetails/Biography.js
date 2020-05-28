import React from "react";

const Biography = (props) => {
  const { celebrityName, biography } = props;
  return (
    <div class="biography">
      <div>
        <h3>Biography of</h3>
        <h2 style={{ color: "white" }}>{celebrityName}</h2>
      </div>
      <p>{biography}</p>
    </div>
  );
};

export default Biography;
