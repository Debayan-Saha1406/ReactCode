/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import ServiceProvider from "./../Provider/ServiceProvider";
import { apiUrl, monthNames } from "./../Shared/Constants";

const AddCelebrities = () => {
  const [dateOfBirth, setDateOfBirth] = useState();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("NA");
  const [nationality, setNationality] = useState("");
  const [netWorth, setNetWorth] = useState("");
  const [biography, setBiography] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoS3, setPhotoS3] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [coverPhotoS3, setCoverPhotoS3] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = formatDate(dateOfBirth);
    const formattedS3Photo = handleFileData(photoS3);
    const formattedCoverS3Photo = handleFileData(coverPhotoS3);
    const body = {
      name: name,
      gender: gender,
      photo: photo,
      photoS3: formattedS3Photo,
      coverPhoto: coverPhoto,
      coverPhotoS3: formattedCoverS3Photo,
      nationality: nationality,
      biography: biography,
      netWorth: netWorth,
      dateOfBirth: formattedDate,
    };

    ServiceProvider.post(apiUrl.addCelebrity, body).then((response) => {
      if (response.status === 200) {
        alert("Successful");
      }
    });
  };

  const handleFileData = (image) => {
    let updatedImage;
    if (image[image.indexOf("/") + 1] === "j")
      updatedImage = image.replace("data:image/jpeg;base64,", "");
    else {
      updatedImage = image.replace("data:image/png;base64,", "");
    }
    return updatedImage;
  };

  const formatDate = (date) => {
    var d = new Date(date),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (day.length < 2) day = "0" + day;
    const month = monthNames[date.getMonth()];
    return `${day} ${month}, ${year}`;
  };

  const readFileDataAsBase64 = (e, type) => {
    const file = e.target.files[0];
    if (type === "photo") {
      setPhoto(file.name);
    } else {
      setCoverPhoto(file.name);
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
        if (type === "photo") {
          setPhotoS3(event.target.result);
        } else {
          setCoverPhotoS3(event.target.result);
        }
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <React.Fragment>
      <h1>Add Celebrities</h1>
      <form>
        <div className="row">
          <div className="col-6">
            <div class="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-6">
            <div class="form-group">
              <label for="exampleFormControlSelect1">Gender</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="NA">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
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
                name="photo"
                onChange={(e) => readFileDataAsBase64(e, e.target.name)}
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
                name="coverphoto"
                onChange={(e) => readFileDataAsBase64(e, e.target.name)}
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
                onChange={(e) => setNationality(e.target.value)}
              />
            </div>
          </div>
          <div className="col-3">
            <div class="form-group">
              <label for="dateOfBirth">Date Of Birth</label>
              <DatePicker
                selected={dateOfBirth}
                onChange={(date) => setDateOfBirth(date)}
              />
            </div>
          </div>
          <div className="col-3">
            <div class="form-group">
              <label for="dateOfBirth">Net Worth</label>
              <input
                type="netWorth"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setNetWorth(e.target.value)}
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
            onChange={(e) => setBiography(e.target.value)}
          ></textarea>
        </div>
        <div class="form-group" style={{ textAlign: "center" }}>
          <button
            type="submit"
            class="btn btn-primary"
            style={{ width: "25%" }}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AddCelebrities;
