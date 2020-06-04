import React from "react";
import { useState } from "react";

const DirectorSearchBox = ({ directorName, handleSubmit, clearState }) => {
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [name, setDirectorName] = useState("");

  return (
    <div class="sidebar">
      <div class="searh-form">
        <h4 class="sb-title">Search Director</h4>
        <form class="form-style-1 celebrity-form">
          <div class="row">
            <div class="col-md-12 form-it">
              <label>Director name</label>
              <input
                type="text"
                name="celebrityName"
                placeholder="Enter keywords"
                onChange={(e) => {
                  setIsFormDirty(true);
                  setDirectorName(e.target.value);
                }}
                value={name}
              />
            </div>
            <div class="col-md-12 form-it">
              {name ? (
                <input
                  class="submit"
                  type="submit"
                  value="submit"
                  onClick={(e) => handleSubmit(e, name)}
                />
              ) : (
                <input
                  className="submit"
                  type="submit"
                  disabled={true}
                  id="not-allowed"
                />
              )}
            </div>
            <div class="col-md-12 form-it">
              {name !== "" ? (
                <button
                  className="reset"
                  type="submit"
                  onClick={(e) => {
                    setDirectorName("");
                    clearState(e);
                  }}
                >
                  Reset
                </button>
              ) : (
                <button
                  className="reset"
                  type="submit"
                  disabled={true}
                  id="not-allowed"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DirectorSearchBox;
