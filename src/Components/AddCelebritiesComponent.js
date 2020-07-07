/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const AddCelebrities = () => {
  const [startDate, setStartDate] = useState();
  return (
    <React.Fragment>
      <h1>Add Celebrities</h1>
      <form>
        <div className="row">
          <div className="col-6">
            <div class="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div className="col-6">
            <div class="form-group">
              <label for="exampleFormControlSelect1">Gender</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div class="form-group">
              <label for="exampleFormControlFile1">Photo</label>
              <input
                type="file"
                class="form-control-file"
                id="exampleFormControlFile1"
              />
            </div>
          </div>
          <div className="col-6">
            <div class="form-group">
              <label for="exampleFormControlFile1">Cover Photo</label>
              <input
                type="file"
                class="form-control-file"
                id="exampleFormControlFile1"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div class="form-group">
              <label for="exampleInputPassword1">Nationality</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
          </div>
          <div className="col-6">
            <div class="form-group">
              <label for="dateOfBirth">Date Of Birth</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="exampleFormControlTextarea2">Biography</label>
          <textarea
            class="form-control rounded-0"
            id="exampleFormControlTextarea2"
            rows="10"
          ></textarea>
        </div>
        <div class="form-group" style={{ textAlign: "center" }}>
          <button
            type="submit"
            class="btn btn-primary"
            style={{ width: "25%" }}
          >
            Add
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AddCelebrities;
