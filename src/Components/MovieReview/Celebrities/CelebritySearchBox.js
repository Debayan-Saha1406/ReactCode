import React from "react";

const CelebritySearchBox = () => {
  return (
    <div class="sidebar">
      <div class="searh-form">
        <h4 class="sb-title">Search celebrity</h4>
        <form class="form-style-1 celebrity-form" action="#">
          <div class="row">
            <div class="col-md-12 form-it">
              <label>Celebrity name</label>
              <input type="text" placeholder="Enter keywords" />
            </div>
            <div class="col-md-12 form-it">
              <label>Celebrity Letter</label>
              <select>
                <option value="range">A</option>
                <option value="saab">B</option>
              </select>
            </div>
            <div class="col-md-12 form-it">
              <label>Category</label>
              <select>
                <option value="actress">Actress</option>
                <option value="actor">Actor</option>
              </select>
            </div>
            <div class="col-md-12 form-it">
              <label>Year of birth</label>
              <div class="row">
                <div class="col-md-6">
                  <select>
                    <option value="range">1970</option>
                    <option value="number">Other</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <select>
                    <option value="range">1990</option>
                    <option value="number">others</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-12 form-it">
              <input class="submit" type="submit" value="submit" />
            </div>
            <div class="col-md-12 form-it">
              <button
                className="reset"
                type="submit"
                disabled={true}
                id="not-allowed"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CelebritySearchBox;
