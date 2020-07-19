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
  const [youtubeUrl, setYoutubeUrl] = useState(initialState);
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
  const [currentlySelectedCeleb, setCurrentlySelectedCeleb] = useState(
    initialState
  );
  const [selectedCelebs, setSelectedCelebs] = useState([]); //To be Sent in The Payload of celeb
  const [isSuggestionBoxOpen, setIsSuggestionBoxOpen] = useState(false);
  const [directorList, setDirectorList] = useState([]);
  const [currentlySelectedDirector, setCurrentlySelectedDirector] = useState(
    initialState
  );
  const [selectedDirectors, setSelectedDirectors] = useState([]);
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
    setCurrentlySelectedCeleb({ ...currentlySelectedCeleb, value: "" });
  };

  const deleteDirectorChip = (id) => {
    const remainingDirectors = selectedDirectors.filter((x) => x.id !== id);
    setSelectedDirectors(remainingDirectors);
    setCurrentlySelectedDirector({ ...currentlySelectedDirector, value: "" });
  };

  const handleCelebChange = (value) => {
    setCurrentlySelectedCeleb({
      ...currentlySelectedCeleb,
      value: value,
      isErrorExist: false,
    });
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

  const handleDirectorChange = (value) => {
    setCurrentlySelectedDirector({
      ...currentlySelectedDirector,
      value: value,
      isErrorExist: false,
    });
    if (value.length > 2) {
      ServiceProvider.getWithParam(apiUrl.allDirectors, value).then(
        (response) => {
          if (response.status === 200) {
            setDirectorList(response.data.data);
            setIsSuggestionBoxOpen(true);
          } else if (response.status === 404) {
            setDirectorList([]);
          }
        }
      );
    } else {
      setDirectorList([]);
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
      selectedCelebs.push({
        id: celebId,
        name: value,
        characterName: "",
        isErrorExist: false,
      });
    }
    setCurrentlySelectedCeleb({
      ...currentlySelectedCeleb,
      value: "",
      isErrorExist: false,
    });
    setSelectedCelebs(selectedCelebs);
    setIsSuggestionBoxOpen(false);
  };

  const handleDirectorSelect = (value) => {
    let directorId = 0;
    let isDirectorPresent = false;
    directorList.forEach((director) => {
      if (director.directorName === value) {
        directorId = director.id;
      }
    });
    selectedDirectors.forEach((selectedDirector) => {
      if (selectedDirector.id === directorId) {
        isDirectorPresent = true;
      }
    });

    if (!isDirectorPresent) {
      selectedDirectors.push({ id: directorId, name: value });
    }
    setCurrentlySelectedDirector({
      ...currentlySelectedDirector,
      value: "",
      isErrorExist: false,
    });
    setSelectedDirectors(selectedDirectors);
    setIsSuggestionBoxOpen(false);
  };

  const handleCharacterNameChange = (celeb, e) => {
    const selectedCeleb = selectedCelebs.find((x) => x.id === celeb.id);
    selectedCeleb.characterName = e.target.value;
    selectedCeleb.isErrorExist = false;
    setSelectedCelebs(selectedCelebs);
    forceUpdate();
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const isValid = validateInputFields();
    // name.value,
    // runTimeHrs.value,
    // runTimeMins.value,
    // photo.value,
    // coverPhoto.value,
    // youtubeUrl.value,
    // currentlySelectedLanguage.value,
    // releaseDate.value,
    // selectedGenres,
    // description.value,
    // currentlySelectedCeleb.value
  };

  const validateInputFields = () =>
    // name,
    // runTimeHrs,
    // runTimeMins,
    // photo,
    // coverPhoto,
    // youtubeUrl,
    // currentlySelectedLanguage,
    // releaseDate,
    // selectedGenres,
    // description
    {
      let isErrorExist = false;
      if (name.value.length <= 0) {
        setName({ ...name, isErrorExist: true });
        isErrorExist = true;
      }
      if (runTimeHrs.value <= 0) {
        setRunTimeHrs({
          ...runTimeHrs,
          isErrorExist: true,
        });
        isErrorExist = true; //the local variable
      }

      if (runTimeMins.value <= 0) {
        setRunTimeMins({
          ...runTimeMins,
          isErrorExist: true,
        });
        isErrorExist = true;
      }

      if (photo.value.length <= 0) {
        setPhoto({ ...photo, isErrorExist: true });
        isErrorExist = true;
      }

      if (coverPhoto.value.length <= 0) {
        setCoverPhoto({ ...coverPhoto, isErrorExist: true });
        isErrorExist = true;
      }

      if (youtubeUrl.value.length <= 0) {
        setYoutubeUrl({ ...youtubeUrl, isErrorExist: true });
        isErrorExist = true;
      }

      if (currentlySelectedLanguage.value === 0) {
        setCurrentlySelectedLanguage({
          ...currentlySelectedLanguage,
          isErrorExist: true,
        });
        isErrorExist = true;
      }

      if (releaseDate.value === "") {
        setReleaseDate({
          ...releaseDate,
          isErrorExist: true,
        });
        isErrorExist = true;
      }

      if (selectedGenres.length === 0) {
        setCurrentlySelectedGenre({
          ...currentlySelectedGenre,
          isErrorExist: true,
        });
        isErrorExist = true;
      }

      if (description.value.length <= 150) {
        setDescription({
          ...description,
          isErrorExist: true,
        });
        isErrorExist = true;
      }

      if (selectedCelebs.length === 0) {
        setCurrentlySelectedCeleb({
          ...currentlySelectedCeleb,
          isErrorExist: true,
        });
      }

      if (selectedDirectors.length === 0) {
        setCurrentlySelectedDirector({
          ...currentlySelectedDirector,
          isErrorExist: true,
        });
      }

      selectedCelebs.forEach((selectedCeleb) => {
        if (selectedCeleb.characterName.length === 0) {
          selectedCeleb.isErrorExist = true;
          isErrorExist = true;
        }
      });

      if (isErrorExist) {
        return false;
      }
      return true;
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
              <div class="tooltip-info">
                <i class="fa fa-question-circle" aria-hidden="true"></i>
                <span class="tooltiptext-info" style={{ width: "250px" }}>
                  Start Typing in and you will see the list in which u have to
                  select at least 1{" "}
                </span>
              </div>
            </label>
            {currentlySelectedCeleb.isErrorExist ? (
              <span style={{ borderLeft: "5px solid red" }}>
                <Autocomplete
                  className="hello"
                  getItemValue={(item) => item.celebrityName}
                  items={celebList}
                  open={isSuggestionBoxOpen}
                  renderItem={(item, isHighlighted) => (
                    <div
                      style={{
                        background: isHighlighted ? "lightgray" : "white",
                      }}
                    >
                      {item.celebrityName}
                    </div>
                  )}
                  value={currentlySelectedCeleb.value}
                  onSelect={(val) => handleCelebSelect(val)}
                  onChange={(e) => handleCelebChange(e.target.value)}
                />
              </span>
            ) : (
              <Autocomplete
                getItemValue={(item) => item.celebrityName}
                items={celebList}
                open={isSuggestionBoxOpen}
                renderItem={(item, isHighlighted) => (
                  <div
                    style={{
                      background: isHighlighted ? "lightgray" : "white",
                    }}
                  >
                    {item.celebrityName}
                  </div>
                )}
                value={currentlySelectedCeleb.value}
                onSelect={(val) => handleCelebSelect(val)}
                onChange={(e) => handleCelebChange(e.target.value)}
              />
            )}
          </div>
        </div>
        <div className="col-6">
          {selectedCelebs.length > 0 &&
            selectedCelebs.map((celeb, index) => (
              <React.Fragment key={index}>
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
                    {celeb.isErrorExist ? (
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={(e) => handleCharacterNameChange(celeb, e)}
                        value={celeb.characterName}
                        style={{ border: "1px solid red" }}
                      />
                    ) : (
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={(e) => handleCharacterNameChange(celeb, e)}
                        value={celeb.characterName}
                      />
                    )}
                  </div>
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
      <h4>Director Details</h4>
      <div className="row">
        <div className="col-6">
          <div class="form-group">
            <label
              for="exampleFormControlSelect1"
              class="required-label"
              style={{ width: "100%", textAlign: "left" }}
            >
              Directors
              <div class="tooltip-info">
                <i class="fa fa-question-circle" aria-hidden="true"></i>
                <span class="tooltiptext-info" style={{ width: "250px" }}>
                  Start Typing in and you will see the list in which u have to
                  select at least 1{" "}
                </span>
              </div>
            </label>

            {currentlySelectedDirector.isErrorExist ? (
              <span style={{ borderLeft: "5px solid red" }}>
                <Autocomplete
                  getItemValue={(item) => item.directorName}
                  items={directorList}
                  open={isSuggestionBoxOpen}
                  renderItem={(item, isHighlighted) => (
                    <div
                      style={{
                        background: isHighlighted ? "lightgray" : "white",
                      }}
                    >
                      {item.directorName}
                    </div>
                  )}
                  value={currentlySelectedDirector.value}
                  onSelect={(val) => handleDirectorSelect(val)}
                  onChange={(e) => handleDirectorChange(e.target.value)}
                />
              </span>
            ) : (
              <Autocomplete
                getItemValue={(item) => item.directorName}
                items={directorList}
                open={isSuggestionBoxOpen}
                renderItem={(item, isHighlighted) => (
                  <div
                    style={{
                      background: isHighlighted ? "lightgray" : "white",
                    }}
                  >
                    {item.directorName}
                  </div>
                )}
                value={currentlySelectedDirector.value}
                onSelect={(val) => handleDirectorSelect(val)}
                onChange={(e) => handleDirectorChange(e.target.value)}
              />
            )}
          </div>
        </div>
        <div className="col-6">
          {selectedDirectors.length > 0 &&
            selectedDirectors.map((director, index) => (
              <React.Fragment key={index}>
                <div class="chip" style={{ marginTop: "25px" }}>
                  {director.name}
                  <span
                    class="closebtn"
                    onClick={() => deleteDirectorChip(director.id)}
                  >
                    &times;
                  </span>
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
      <div class="form-group" style={{ textAlign: "center" }}>
        <button
          type="submit"
          class="btn btn-primary"
          style={{ width: "25%" }}
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddMovies;
