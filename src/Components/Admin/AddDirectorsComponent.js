import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Information from "../MovieReview/Popups/Information";
import { toggleLoader } from "../../Store/Actions/actionCreator";
import { monthNames } from "../../Shared/Constants";

const initialState = {
  value: "",
  isErrorExist: false,
};

const AddDirectors = () => {
  const [dateOfBirth, setDateOfBirth] = useState(initialState);
  const [name, setName] = useState(initialState);
  const [gender, setGender] = useState({ value: "NA", isErrorExist: false });
  const [nationality, setNationality] = useState(initialState);
  const [biography, setBiography] = useState(initialState);
  const [photo, setPhoto] = useState(initialState);
  const [photoS3, setPhotoS3] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(initialState);
  const [coverPhotoS3, setCoverPhotoS3] = useState("");
  const dispatch = useDispatch();
  const photoInputRef = useRef();
  const coverPhotoInputRef = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateInputFields(
      name.value,
      nationality.value,
      biography.value,
      photo.value,
      coverPhoto.value,
      gender.value,
      dateOfBirth.value
    );
    if (isValid) {
      const formattedDate = formatDate(dateOfBirth.value);
      const formattedS3Photo = handleFileData(photoS3);
      const formattedCoverS3Photo = handleFileData(coverPhotoS3);
      const body = {
        name: name.value.trim(),
        gender: gender.value.trim(),
        photo: photo.value.trim(),
        photoS3: formattedS3Photo,
        coverPhoto: coverPhoto.value.trim(),
        coverPhotoS3: formattedCoverS3Photo,
        nationality: nationality.value.trim(),
        biography: biography.value.trim(),
        dateOfBirth: formattedDate,
      };
      dispatch(toggleLoader(true, 0));
      //sendAddCelebrityRequest(body);
    }
  };

  const resetState = () => {
    setName(initialState);
    setDateOfBirth(initialState);
    setNationality(initialState);
    setBiography(initialState);
    setPhoto(initialState);
    setCoverPhoto(initialState);
    setPhotoS3("");
    setCoverPhotoS3("");
    setGender({ value: "NA", isErrorExist: false });
    photoInputRef.current.value = "";
    coverPhotoInputRef.current.value = "";
  };

  const validateInputFields = (
    name,
    nationality,
    biography,
    photo,
    coverPhoto,
    gender,
    dateOfBirth
  ) => {
    let isErrorExist = false;
    if (name.length <= 0) {
      setName({ ...name, value: name, isErrorExist: true });
      isErrorExist = true;
    }
    if (nationality.length <= 0) {
      setNationality({
        ...nationality,
        value: nationality,
        isErrorExist: true,
      });
      isErrorExist = true;
    }

    if (biography.length <= 150) {
      setBiography({ ...biography, value: biography, isErrorExist: true });
      isErrorExist = true;
    }

    if (photo.length <= 0) {
      setPhoto({ ...photo, value: photo, isErrorExist: true });
      isErrorExist = true;
    }

    if (coverPhoto.length <= 0) {
      setCoverPhoto({ ...coverPhoto, value: coverPhoto, isErrorExist: true });
      isErrorExist = true;
    }

    if (gender === "NA") {
      setGender({ ...gender, value: gender, isErrorExist: true });
      isErrorExist = true;
    }

    if (dateOfBirth === "" || dateOfBirth > new Date()) {
      setDateOfBirth({
        ...dateOfBirth,
        value: dateOfBirth,
        isErrorExist: true,
      });
      isErrorExist = true;
    }

    if (isErrorExist) {
      return false;
    }
    return true;
  };

  const closePopup = () => {
    setShowPopup(false);
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
      setPhoto({ ...photo, value: file.name, isErrorExist: false });
    } else {
      setCoverPhoto({ ...coverPhoto, value: file.name, isErrorExist: false });
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
      {showPopup && (
        <Information
          title="Director Added"
          popupClassName={"openform"}
          btnText="Ok"
          closePopup={closePopup}
          content="You have successfully added the director"
        ></Information>
      )}
      <form
        style={{
          opacity: screenOpacity,
        }}
      >
        <h1>Add Directors</h1>
        <div className="row">
          <div className="col-6">
            <div class="form-group">
              <label for="exampleInputEmail1" class="required-label">
                Name
              </label>
              {name.isErrorExist ? (
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) =>
                    setName({
                      ...name,
                      value: e.target.value,
                      isErrorExist: false,
                    })
                  }
                  value={name.value}
                  style={{ border: "1px solid red" }}
                />
              ) : (
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) =>
                    setName({
                      ...name,
                      value: e.target.value,
                      isErrorExist: false,
                    })
                  }
                  value={name.value}
                />
              )}
            </div>
          </div>
          <div className="col-6">
            <div class="form-group">
              <label for="exampleFormControlSelect1" class="required-label">
                Gender
              </label>
              {gender.isErrorExist ? (
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  onChange={(e) =>
                    setGender({
                      ...gender,
                      value: e.target.value,
                      isErrorExist: false,
                    })
                  }
                  value={gender.value}
                  style={{ border: "1px solid red" }}
                >
                  <option value="NA">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  onChange={(e) =>
                    setGender({
                      ...gender,
                      value: e.target.value,
                      isErrorExist: false,
                    })
                  }
                  value={gender.value}
                >
                  <option value="NA">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div class="form-group">
              <label for="exampleFormControlFile1" class="required-label">
                Photo
              </label>
              {photo.isErrorExist ? (
                <input
                  type="file"
                  class="form-control-file"
                  id="exampleFormControlFile1"
                  name="photo"
                  onChange={(e) => readFileDataAsBase64(e, e.target.name)}
                  style={{ border: "1px solid red" }}
                  ref={photoInputRef}
                />
              ) : (
                <input
                  type="file"
                  class="form-control-file"
                  id="exampleFormControlFile1"
                  name="photo"
                  onChange={(e) => readFileDataAsBase64(e, e.target.name)}
                  ref={photoInputRef}
                />
              )}
            </div>
          </div>
          <div className="col-6">
            <div class="form-group">
              <label for="exampleFormControlFile1" class="required-label">
                Cover Photo
              </label>
              {coverPhoto.isErrorExist ? (
                <input
                  type="file"
                  class="form-control-file"
                  id="exampleFormControlFile1"
                  name="coverphoto"
                  onChange={(e) => readFileDataAsBase64(e, e.target.name)}
                  style={{ border: "1px solid red" }}
                  ref={coverPhotoInputRef}
                />
              ) : (
                <input
                  type="file"
                  class="form-control-file"
                  id="exampleFormControlFile1"
                  name="coverphoto"
                  onChange={(e) => readFileDataAsBase64(e, e.target.name)}
                  ref={coverPhotoInputRef}
                />
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div class="form-group">
              <label for="exampleInputPassword1" class="required-label">
                Nationality
              </label>
              {nationality.isErrorExist ? (
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) =>
                    setNationality({
                      ...name,
                      value: e.target.value,
                      isErrorExist: false,
                    })
                  }
                  value={nationality.value}
                  style={{ border: "1px solid red" }}
                />
              ) : (
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) =>
                    setNationality({
                      ...name,
                      value: e.target.value,
                      isErrorExist: false,
                    })
                  }
                  value={nationality.value}
                />
              )}
            </div>
          </div>
          <div className="col-3">
            <div class="form-group">
              <label for="dateOfBirth" class="required-label">
                Date Of Birth
              </label>
              <div class="tooltip-info">
                <i class="fa fa-question-circle" aria-hidden="true"></i>
                <span class="tooltiptext-info">No Future Dates</span>
              </div>
              {dateOfBirth.isErrorExist ? (
                <DatePicker
                  selected={dateOfBirth.value}
                  onChange={(date) =>
                    setDateOfBirth({
                      ...dateOfBirth,
                      value: date,
                      isErrorExist: false,
                    })
                  }
                  value={dateOfBirth.value}
                  className="error-class"
                />
              ) : (
                <DatePicker
                  selected={dateOfBirth.value}
                  onChange={(date) =>
                    setDateOfBirth({
                      ...dateOfBirth,
                      value: date,
                      isErrorExist: false,
                    })
                  }
                  value={dateOfBirth.value}
                />
              )}
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="exampleFormControlTextarea2" class="required-label">
            Biography
          </label>
          <div class="tooltip-info">
            <i class="fa fa-question-circle" aria-hidden="true"></i>
            <span class="tooltiptext-info">Min 150 characters</span>
          </div>

          {biography.isErrorExist ? (
            <textarea
              class="form-control rounded-0"
              id="exampleFormControlTextarea2"
              rows="10"
              onChange={(e) =>
                setBiography({
                  ...biography,
                  value: e.target.value,
                  isErrorExist: false,
                })
              }
              value={biography.value}
              style={{ border: "1px solid red" }}
            ></textarea>
          ) : (
            <textarea
              class="form-control rounded-0"
              id="exampleFormControlTextarea2"
              rows="10"
              onChange={(e) =>
                setBiography({
                  ...biography,
                  value: e.target.value,
                  isErrorExist: false,
                })
              }
              value={biography.value}
            ></textarea>
          )}
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
      <ToastContainer autoClose={8000}></ToastContainer>
    </React.Fragment>
  );
};

export default AddDirectors;
