/* eslint-disable array-callback-return */
import React from "react";
import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import ServiceProvider from "./../../Provider/ServiceProvider";
import { apiUrl } from "./../../Shared/Constants";

const initialState = {
  value: "",
  isErrorExist: false,
};

const AddMovies = () => {
  const [name, setName] = useState(initialState);
  const [runTimeHrs, setRunTimeHrs] = useState({
    value: 0,
    isErrorExist: false,
  });
  const [runTimeMins, setRunTimeMins] = useState({
    value: 0,
    isErrorExist: false,
  });
  const [photo, setPhoto] = useState(initialState);
  const [photoS3, setPhotoS3] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(initialState);
  const [coverPhotoS3, setCoverPhotoS3] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [releaseDate, setReleaseDate] = useState(initialState);
  const [languages, setLanguages] = useState([]);
  const [currentlySelectedLanguage, setCurrentlySelectedLanguage] = useState({
    value: 0,
    isErrorExist: false,
  });
  const [currentlySelectedGenre, setCurrentlySelectedGenre] = useState({
    value: 0,
    isErrorExist: false,
  });
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [description, setDescription] = useState(initialState);
  const photoInputRef = useRef();
  const coverPhotoInputRef = useRef();

  useEffect(() => {
    ServiceProvider.get(apiUrl.movieLanguages).then((response) => {
      if (response.status === 200) {
        setLanguages(response.data.data);
      }
    });
    ServiceProvider.get(apiUrl.genres).then((response) => {
      if (response.status === 200) {
        setGenres(response.data.data);
      }
    });
  }, []);

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

  const handleGenreChange = (e) => {
    let isGenrePresent = false;
    const index = e.nativeEvent.target.selectedIndex;
    const label = e.nativeEvent.target[index].text;
    setCurrentlySelectedGenre(e.target.value);
    selectedGenres.map((genre) => {
      if (genre.id === index) {
        isGenrePresent = true;
      }
    });

    if (!isGenrePresent && index !== 0) {
      selectedGenres.push({ id: index, name: label });
    }
    setSelectedGenres(selectedGenres);
  };

  const deleteChip = (id) => {
    const remainingGenres = selectedGenres.filter((x) => x.id !== id);
    setSelectedGenres(remainingGenres);
  };

  return (
    <form>
      <h1>Add Movies</h1>
      <h4>Movie Details</h4>
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
        <div className="col-3">
          <div class="form-group">
            <label for="exampleFormControlSelect1" class="required-label">
              Run Time (hrs)
            </label>
            {runTimeHrs.isErrorExist ? (
              <input
                type="number"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) =>
                  setRunTimeHrs({
                    ...runTimeHrs,
                    value: e.target.value,
                    isErrorExist: false,
                  })
                }
                value={runTimeHrs.value}
                style={{ border: "1px solid red" }}
              />
            ) : (
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) =>
                  setRunTimeHrs({
                    ...runTimeHrs,
                    value: e.target.value,
                    isErrorExist: false,
                  })
                }
                value={runTimeHrs.value}
              />
            )}
          </div>
        </div>
        <div className="col-3">
          <div class="form-group">
            <label for="exampleFormControlSelect1" class="required-label">
              Run Time (mins)
            </label>
            {runTimeMins.isErrorExist ? (
              <input
                type="number"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) =>
                  setRunTimeMins({
                    ...runTimeMins,
                    value: e.target.value,
                    isErrorExist: false,
                  })
                }
                value={runTimeMins.value}
                style={{ border: "1px solid red" }}
              />
            ) : (
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) =>
                  setRunTimeMins({
                    ...runTimeMins,
                    value: e.target.value,
                    isErrorExist: false,
                  })
                }
                value={runTimeMins.value}
              />
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
              Youtube Embed Url
            </label>
            {youtubeUrl.isErrorExist ? (
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                onChange={(e) =>
                  setYoutubeUrl({
                    ...youtubeUrl,
                    value: e.target.value,
                    isErrorExist: false,
                  })
                }
                value={youtubeUrl.value}
                style={{ border: "1px solid red" }}
              />
            ) : (
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                onChange={(e) =>
                  setYoutubeUrl({
                    ...youtubeUrl,
                    value: e.target.value,
                    isErrorExist: false,
                  })
                }
                value={youtubeUrl.value}
              />
            )}
          </div>
        </div>
        <div className="col-6">
          <div class="form-group">
            <label for="dateOfBirth" class="required-label">
              Release Date
            </label>
            {releaseDate.isErrorExist ? (
              <DatePicker
                selected={releaseDate.value}
                onChange={(date) =>
                  setReleaseDate({
                    ...releaseDate,
                    value: date,
                    isErrorExist: false,
                  })
                }
                value={releaseDate.value}
                className="error-class"
              />
            ) : (
              <DatePicker
                selected={releaseDate.value}
                onChange={(date) =>
                  setReleaseDate({
                    ...releaseDate,
                    value: date,
                    isErrorExist: false,
                  })
                }
                value={releaseDate.value}
              />
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <div class="form-group">
            <label for="exampleFormControlSelect1" class="required-label">
              Movie Language
            </label>
            {currentlySelectedLanguage.isErrorExist ? (
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                name="language"
                onChange={(e) =>
                  setCurrentlySelectedLanguage({
                    ...currentlySelectedLanguage,
                    value: e.target.value,
                    isErrorExist: false,
                  })
                }
                value={currentlySelectedLanguage.value}
                style={{ border: "1px solid red" }}
              >
                <option value={0}>-- Select the language below --</option>
                {languages.map((language, index) => (
                  <option key={index} value={language.id}>
                    {language.language}
                  </option>
                ))}
              </select>
            ) : (
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                name="language"
                onChange={(e) =>
                  setCurrentlySelectedLanguage({
                    ...currentlySelectedLanguage,
                    value: e.target.value,
                    isErrorExist: false,
                  })
                }
                value={currentlySelectedLanguage.value}
              >
                <option value={0}>-- Select the language below --</option>
                {languages.map((language, index) => (
                  <option key={index} value={language.id}>
                    {language.language}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="col-6">
          <div class="form-group">
            <label for="exampleFormControlSelect1" class="required-label">
              Movie Genres
            </label>
            {currentlySelectedGenre.isErrorExist ? (
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                name="language"
                onChange={(e) => handleGenreChange(e)}
                value={currentlySelectedGenre.value}
                style={{ border: "1px solid red" }}
              >
                <option value={0}>-- Select the genre below --</option>
                {genres.map((genre, index) => (
                  <option key={index} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            ) : (
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                name="language"
                onChange={(e) => handleGenreChange(e)}
                value={currentlySelectedGenre.value}
              >
                <option value={0}>-- Select the genre below --</option>
                {genres.map((genre, index) => (
                  <option key={index} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            )}
            {selectedGenres.length > 0 &&
              selectedGenres.map((genre, index) => (
                <div class="chip">
                  {genre.name}
                  <span class="closebtn" onClick={() => deleteChip(genre.id)}>
                    &times;
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="exampleFormControlTextarea2" class="required-label">
          Description
        </label>
        <div class="tooltip-info">
          <i class="fa fa-question-circle" aria-hidden="true"></i>
          <span class="tooltiptext-info">Min 150 characters</span>
        </div>

        {description.isErrorExist ? (
          <textarea
            class="form-control rounded-0"
            id="exampleFormControlTextarea2"
            rows="10"
            onChange={(e) =>
              setDescription({
                ...description,
                value: e.target.value,
                isErrorExist: false,
              })
            }
            value={description.value}
            style={{ border: "1px solid red" }}
          ></textarea>
        ) : (
          <textarea
            class="form-control rounded-0"
            id="exampleFormControlTextarea2"
            rows="10"
            onChange={(e) =>
              setDescription({
                ...description,
                value: e.target.value,
                isErrorExist: false,
              })
            }
            value={description.value}
          ></textarea>
        )}
      </div>
      <h4>Celebrity Details</h4>
    </form>
  );
};

export default AddMovies;
