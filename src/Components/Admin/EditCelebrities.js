/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Information from "../MovieReview/Popups/Information";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import nationalities from "../../Shared/Nationality.json";
import DatePicker from "react-datepicker";
import { ToastContainer } from "react-toastify";
import ServiceProvider from "../../Provider/ServiceProvider";
import { apiUrl, monthNames } from "../../Shared/Constants";
import { toggleLoader } from "../../Store/Actions/actionCreator";
import { showErrorMessage } from "../../Provider/ToastProvider";

const initialState = {
  value: "",
  isErrorExist: false,
};

const EditCelebrities = (props) => {
  const [dateOfBirth, setDateOfBirth] = useState(initialState);
  const [name, setName] = useState(initialState);
  const [gender, setGender] = useState({ value: "NA", isErrorExist: false });
  const [nationality, setNationality] = useState(initialState);
  const [netWorth, setNetWorth] = useState({ value: 0, isErrorExist: false });
  const [biography, setBiography] = useState(initialState);
  const [photo, setPhoto] = useState(initialState);
  const [photoS3, setPhotoS3] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(initialState);
  const [coverPhotoS3, setCoverPhotoS3] = useState("");
  const dispatch = useDispatch();
  const photoInputRef = useRef();
  const coverPhotoInputRef = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(initialState);
  const [uploadedCoverPhotoUrl, setUploadedCoverPhotoUrl] = useState(
    initialState
  );
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);
  let celebId = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1,
    window.location.pathname.length
  );
  const closePopup = () => {
    setShowPopup(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateInputFields();
    if (isValid) {
      const formattedDate = formatDate(dateOfBirth.value);
      let formattedS3Photo = null,
        formattedCoverS3Photo = null;
      if (photoS3 !== "") {
        formattedS3Photo = handleFileData(photoS3);
      }

      if (photoS3 !== "") {
        formattedCoverS3Photo = handleFileData(coverPhotoS3);
      }

      const body = {
        name: name.value.trim(),
        gender: gender.value.trim(),
        photo: photo.value.trim(),
        photoS3: formattedS3Photo,
        coverPhoto: coverPhoto.value.trim(),
        coverPhotoS3: formattedCoverS3Photo,
        nationality: nationality.value.trim(),
        biography: biography.value.trim(),
        netWorth: netWorth.value.trim(),
        dateOfBirth: formattedDate,
      };
      dispatch(toggleLoader(true, 0));
      sendEditCelebrityRequest(body);
    }
  };

  const sendEditCelebrityRequest = (body) => {
    ServiceProvider.put(apiUrl.editCelebrity, celebId, body).then(
      (response) => {
        if (response.status === 200) {
          dispatch(toggleLoader(false, 1));
          setShowPopup(true);
          resetState();
        } else if (response.status === 409) {
          dispatch(toggleLoader(false, 1));
          showErrorMessage(response.data.errorMessage);
        }
      }
    );
  };

  const resetState = () => {
    setPhoto(initialState);
    setCoverPhoto(initialState);
    setPhotoS3("");
    setCoverPhotoS3("");
    photoInputRef.current.value = "";
    coverPhotoInputRef.current.value = "";
  };

  const formatDate = (date) => {
    var d = new Date(date),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (day.length < 2) day = "0" + day;
    const month = monthNames[date.getMonth()];
    return `${day} ${month}, ${year}`;
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

  const validateInputFields = () => {
    let isErrorExist = false;
    if (name.value.length <= 0) {
      setName({ ...name, value: name.value, isErrorExist: true });
      isErrorExist = true;
    }
    if (nationality.value.length <= 0) {
      setNationality({
        ...nationality,
        value: nationality.value,
        isErrorExist: true,
      });
      isErrorExist = true;
    }

    if (biography.value.length <= 150) {
      setBiography({
        ...biography,
        value: biography.value,
        isErrorExist: true,
      });
      isErrorExist = true;
    }

    if (netWorth.value <= 0) {
      setNetWorth({ ...netWorth, value: netWorth.value, isErrorExist: true });
      isErrorExist = true;
    }

    if (gender.value === "NA") {
      setGender({ ...gender, value: gender.value, isErrorExist: true });
      isErrorExist = true;
    }

    if (dateOfBirth.value === "" || dateOfBirth.value > new Date()) {
      setDateOfBirth({
        ...dateOfBirth,
        value: dateOfBirth.value,
        isErrorExist: true,
      });
      isErrorExist = true;
    }

    if (isErrorExist) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    dispatch(toggleLoader(true, 0));

    ServiceProvider.getWithParam(apiUrl.celebrity, celebId).then((response) => {
      if (response.status === 200) {
        setDefaultValues(response.data.data.celebrityResponse);
        dispatch(toggleLoader(false, 1));
      }
    });
  }, []);

  const setDefaultValues = (response) => {
    setName({
      ...name,
      value: response.celebrityName,
      isErrorExist: false,
    });

    setGender({
      ...gender,
      value: response.gender,
      isErrorExist: false,
    });

    setNationality({
      ...nationality,
      value: response.nationality,
      isErrorExist: false,
    });

    setNetWorth({
      ...netWorth,
      value: response.netWorth,
      isErrorExist: false,
    });

    setBiography({
      ...biography,
      value: response.biography,
      isErrorExist: false,
    });

    setDateOfBirth({
      ...dateOfBirth,
      value: new Date(response.dateOfBirth),
      isErrorExist: false,
    });

    setUploadedPhotoUrl({
      ...uploadedPhotoUrl,
      value: response.photo,
      isErrorExist: false,
    });

    setUploadedCoverPhotoUrl({
      ...uploadedCoverPhotoUrl,
      value: response.coverPhoto,
      isErrorExist: false,
    });
  };

  return (
    <React.Fragment>
      {showPopup && (
        <Information
          title="Celebrity Updated"
          popupClassName={"openform"}
          btnText="Ok"
          closePopup={closePopup}
          content="You have successfully updated the celebrity"
        ></Information>
      )}

      <form
        style={{
          opacity: screenOpacity,
        }}
      >
        <h1>Edit Celebrities</h1>
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
          <div className="col-3">
            <div class="form-group">
              <label for="exampleFormControlFile1" class="required-label">
                Photo
              </label>
              <div class="tooltip-info">
                <i class="fa fa-question-circle" aria-hidden="true"></i>
                <span class="tooltiptext-info">Upload New Photo</span>
              </div>
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
          <div className="col-3">
            <label for="exampleFormControlFile1">Uploaded Photo Url</label>
            <input
              type="text"
              class="form-control"
              disabled={true}
              style={{ cursor: "not-allowed" }}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={uploadedPhotoUrl.value}
            />
          </div>
          <div className="col-3">
            <div class="form-group">
              <label for="exampleFormControlFile1" class="required-label">
                Cover Photo
              </label>
              <div class="tooltip-info">
                <i class="fa fa-question-circle" aria-hidden="true"></i>
                <span class="tooltiptext-info">Upload New Cover</span>
              </div>
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
          <div className="col-3">
            <label for="exampleFormControlFile1">
              Uploaded Cover Photo Url
            </label>

            <input
              type="text"
              class="form-control"
              disabled={true}
              style={{ cursor: "not-allowed" }}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={uploadedCoverPhotoUrl.value}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div class="form-group">
              <label for="exampleInputPassword1" class="required-label">
                Nationality
              </label>
              {nationality.isErrorExist ? (
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  onChange={(e) =>
                    setNationality({
                      ...nationality,
                      value: e.target.value,
                      isErrorExist: false,
                    })
                  }
                  value={nationality.value}
                  style={{ border: "1px solid red" }}
                >
                  <option value="">Select Nationality</option>
                  {nationalities.map((nationality, index) => (
                    <option key={index} value={nationality}>
                      {nationality}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  onChange={(e) =>
                    setNationality({
                      ...nationality,
                      value: e.target.value,
                      isErrorExist: false,
                    })
                  }
                  value={nationality.value}
                >
                  <option value="">Select Nationality</option>
                  {nationalities.map((nationality, index) => (
                    <option key={index} value={nationality}>
                      {nationality}
                    </option>
                  ))}
                </select>
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

          <div className="col-3">
            <div class="form-group">
              <label for="dateOfBirth" class="required-label">
                Net Worth (in millions)
              </label>
              {netWorth.isErrorExist ? (
                <input
                  type="number"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) =>
                    setNetWorth({
                      ...netWorth,
                      value: e.target.value,
                      isErrorExist: false,
                    })
                  }
                  value={netWorth.value}
                  style={{ border: "1px solid red" }}
                />
              ) : (
                <input
                  type="number"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) =>
                    setNetWorth({
                      ...netWorth,
                      value: e.target.value,
                      isErrorExist: false,
                    })
                  }
                  value={netWorth.value}
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
            Update
          </button>
        </div>
      </form>
      <ToastContainer autoClose={8000}></ToastContainer>
    </React.Fragment>
  );
};

export default EditCelebrities;
