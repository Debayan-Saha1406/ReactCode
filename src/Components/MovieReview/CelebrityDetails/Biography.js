import React from "react";

const Biography = (props) => {
  const { name, biography } = props;
  return (
    <div class="biography">
      <div>
        <h3>Biography of</h3>
        <h2 style={{ color: "white" }}>{name}</h2>
      </div>
      <pre>
        <p>{biography} </p>
      </pre>
    </div>
  );
};

export default Biography;
