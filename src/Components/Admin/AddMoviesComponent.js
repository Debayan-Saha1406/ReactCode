/* eslint-disable array-callback-return */
import React, { useCallback } from "react";
import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import ServiceProvider from "./../../Provider/ServiceProvider";
import { apiUrl } from "./../../Shared/Constants";
import Autocomplete from "react-autocomplete";

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
  const [celebList, setCelebList] = useState([]);
  const [currentlySelectedCeleb, setCurrentlySelectedCeleb] = useState("");
  const [selectedCelebs, setSelectedCelebs] = useState([]); //To be Sent in The Payload of celeb
  const [isSuggestionBoxOpen, setIsSuggestionBoxOpen] = useState(false);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

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

  const deleteCelebChip = (id) => {
    const remainingCelebs = selectedCelebs.filter((x) => x.id !== id);
    setSelectedCelebs(remainingCelebs);
    setCurrentlySelectedCeleb("");
  };

  const handleCelebChange = (value) => {
    setCurrentlySelectedCeleb(value);
    if (value.length > 2) {
      ServiceProvider.getWithParam(apiUrl.allCelebs, value).then((response) => {
        if (response.status === 200) {
          setCelebList(response.data.data);
          setIsSuggestionBoxOpen(true);
        } else if (response.status === 404) {
          setCelebList([]);
        }
      });
    } else {
      setCelebList([]);
    }
  };

  const handleCelebSelect = (value) => {
    let celebId = 0;
    let isCelebPresent = false;
    celebList.forEach((celeb) => {
      if (celeb.celebrityName === value) {
        celebId = celeb.id;
      }
    });
    selectedCelebs.forEach((selectedCeleb) => {
      if (selectedCeleb.id === celebId) {
        isCelebPresent = true;
      }
    });

    if (!isCelebPresent) {
      selectedCelebs.push({ id: celebId, name: value, characterName: "" });
    }
    setCurrentlySelectedCeleb("");
    setSelectedCelebs(selectedCelebs);
    setIsSuggestionBoxOpen(false);
  };

  const handleCharacterNameChange = (celeb, e) => {
    const selectedCeleb = selectedCelebs.find((x) => x.id === celeb.id);
    selectedCeleb.characterName = e.target.value;
    debugger;
    setSelectedCelebs(selectedCelebs);
    forceUpdate();
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
      <div className="row">
        <div className="col-6">
          <div class="form-group">
            <label
              for="exampleFormControlSelect1"
              class="required-label"
              style={{ width: "100%", textAlign: "left" }}
            >
              Actors/Actress
            </label>
            <Autocomplete
              getItemValue={(item) => item.celebrityName}
              items={celebList}
              open={isSuggestionBoxOpen}
              renderItem={(item, isHighlighted) => (
                <div
                  style={{ background: isHighlighted ? "lightgray" : "white" }}
                >
                  {item.celebrityName}
                </div>
              )}
              value={currentlySelectedCeleb}
              onSelect={(val) => handleCelebSelect(val)}
              onChange={(e) => handleCelebChange(e.target.value)}
            />
          </div>
        </div>
        <div className="col-6">
          {selectedCelebs.length > 0 &&
            selectedCelebs.map((celeb, index) => (
              <React.Fragment>
                <div className="first">
                  <div class="chip" style={{ marginTop: "25px" }}>
                    {celeb.name}
                    <span
                      class="closebtn"
                      onClick={() => deleteCelebChip(celeb.id)}
                    >
                      &times;
                    </span>
                  </div>
                </div>
                <div className="second">
                  <div class="form-group">
                    <label
                      for="exampleFormControlSelect1"
                      class="required-label"
                    >
                      Character Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={(e) => handleCharacterNameChange(celeb, e)}
                      value={celeb.characterName}
                    />
                  </div>
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
      <h4>Director Details</h4>
    </form>
  );
};

export default AddMovies;
