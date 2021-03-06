/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { alphabets, gender, years } from "../../../Shared/Constants";

const CelebritySearchBox = ({
  celebrityDetails,
  setCelebrityDetails,
  handleSubmit,
  clearState,
}) => {
  const [isFormDirty, setIsFormDirty] = useState(false);

  return (
    <div class="sidebar">
      <div class="searh-form">
        <h4 class="sb-title">Search celebrity</h4>
        <form class="form-style-1 celebrity-form">
          <div class="row">
            <div class="col-md-12 form-it">
              <label>Celebrity name</label>
              <input
                type="text"
                name="celebrityName"
                placeholder="Enter keywords"
                onChange={(e) => {
                  setIsFormDirty(true);
                  setCelebrityDetails(e);
                }}
                value={celebrityDetails.celebrityName}
              />
            </div>
            <div class="col-md-12 form-it">
              <label>Celebrity Letter</label>
              <select
                name="celebrityInitial"
                style={{ textTransform: "capitalize" }}
                onChange={(e) => {
                  setIsFormDirty(true);
                  setCelebrityDetails(e);
                }}
                value={celebrityDetails.celebrityInitial}
              >
                <option value={0}>-- Select the letter below --</option>
                {alphabets.map((alphabet) => (
                  <option
                    value={alphabet.id}
                    style={{ textTransform: "capitalize" }}
                  >
                    {alphabet.value}
                  </option>
                ))}
              </select>
            </div>
            <div class="col-md-12 form-it">
              <label>Category</label>
              <select
                name="category"
                onChange={(e) => {
                  setIsFormDirty(true);
                  setCelebrityDetails(e);
                }}
                value={celebrityDetails.category}
              >
                <option value={0}>-- Select the category below --</option>
                <option value={gender.female}>Actress</option>
                <option value={gender.male}>Actor</option>
              </select>
            </div>
            <div class="col-md-12 form-it">
              <label>Year of birth</label>
              <div class="row">
                <div class="col-md-6">
                  <select
                    name="fromBirthYear"
                    onChange={(e) => {
                      setIsFormDirty(true);
                      setCelebrityDetails(e);
                    }}
                    value={celebrityDetails.fromBirthYear}
                  >
                    <option value={0}>From</option>
                    {years.map((year) => (
                      <option value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div class="col-md-6">
                  <select
                    name="toBirthYear"
                    onChange={(e) => {
                      setIsFormDirty(true);
                      setCelebrityDetails(e);
                    }}
                    value={celebrityDetails.toBirthYear}
                  >
                    <option value={0}>To</option>
                    {years.map((year) => (
                      <option value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-12 form-it">
              {celebrityDetails.celebrityName ||
              celebrityDetails.celebrityInitial != 0 ||
              celebrityDetails.category != 0 ||
              (celebrityDetails.toBirthYear > celebrityDetails.fromBirthYear &&
                celebrityDetails.fromBirthYear != 0 &&
                celebrityDetails.toBirthYear != 0) ? (
                <input
                  class="submit"
                  type="submit"
                  value="submit"
                  onClick={(e) => handleSubmit(e)}
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
              {celebrityDetails.celebrityName ||
              celebrityDetails.celebrityInitial != 0 ||
              celebrityDetails.fromBirthYear != 0 ||
              celebrityDetails.toBirthYear != 0 ||
              celebrityDetails.category != 0 ||
              isFormDirty ? (
                <button
                  className="reset"
                  type="submit"
                  onClick={(e) => clearState(e)}
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

export default CelebritySearchBox;
