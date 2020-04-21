import React from "react";
import image from "../../../images/cast1.jpg";

const Cast = (props) => {
  return (
    <div
      id="cast"
      class="tab"
      style={
        props.selectedTab === "cast"
          ? { display: "block" }
          : { display: "none" }
      }
    >
      <div class="row">
        <h3>Cast & Crew of</h3>
        <br></br>
        <br></br>
        <h2>Avengers: Age of Ultron</h2>
        <br></br>
        <br></br>
        <div class="title-hd-sm">
          <h4>Directors & Credit Writers</h4>
        </div>
        <div class="mvcast-item">
          <div class="cast-it">
            <div class="cast-left">
              <h4>JW</h4>
              <a href="#">Joss Whedon</a>
            </div>
            <p>... Director</p>
          </div>
        </div>
        <div class="title-hd-sm">
          <h4>Directors & Credit Writers</h4>
        </div>
        <div class="mvcast-item">
          <div class="cast-it">
            <div class="cast-left">
              <h4>SL</h4>
              <a href="#">Stan Lee</a>
            </div>
            <p>... (based on Marvel comics)</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <h4>JK</h4>
              <a href="#">Jack Kirby</a>
            </div>
            <p>... (based on Marvel comics)</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <h4>JS</h4>
              <a href="#">Joe Simon</a>
            </div>
            <p>... (character created by: Captain America)</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <h4>JS</h4>
              <a href="#">Joe Simon</a>
            </div>
            <p>... (character created by: Thanos)</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <h4>RT</h4>
              <a href="#">Roy Thomas</a>
            </div>
            <p>... (character created by: Ultron, Vision)</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <h4>JB</h4>
              <a href="#">John Buscema</a>
            </div>
            <p>... (character created by: Ultron, Vision)</p>
          </div>
        </div>
        <div class="title-hd-sm">
          <h4>Cast</h4>
        </div>
        <div class="mvcast-item">
          <div class="cast-it">
            <div class="cast-left">
              <img src={image} alt="" />
              <a href="#">Robert Downey Jr.</a>
            </div>
            <p>... Robert Downey Jr.</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <img src="images/uploads/cast2.jpg" alt="" />
              <a href="#">Chris Hemsworth</a>
            </div>
            <p>... Thor</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <img src="images/uploads/cast3.jpg" alt="" />
              <a href="#">Mark Ruffalo</a>
            </div>
            <p>... Bruce Banner/ Hulk</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <img src="images/uploads/cast4.jpg" alt="" />
              <a href="#">Chris Evans</a>
            </div>
            <p>... Steve Rogers/ Captain America</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <img src="images/uploads/cast5.jpg" alt="" />
              <a href="#">Scarlett Johansson</a>
            </div>
            <p>... Natasha Romanoff/ Black Widow</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <img src="images/uploads/cast6.jpg" alt="" />
              <a href="#">Jeremy Renner</a>
            </div>
            <p>... Clint Barton/ Hawkeye</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <img src="images/uploads/cast7.jpg" alt="" />
              <a href="#">James Spader</a>
            </div>
            <p>... Ultron</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <img src="images/uploads/cast9.jpg" alt="" />
              <a href="#">Don Cheadle</a>
            </div>
            <p>... James Rhodes/ War Machine</p>
          </div>
        </div>
        <div class="title-hd-sm">
          <h4>Produced by</h4>
        </div>
        <div class="mvcast-item">
          <div class="cast-it">
            <div class="cast-left">
              <h4>VA</h4>
              <a href="#">Victoria Alonso</a>
            </div>
            <p>... executive producer</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <h4>MB</h4>
              <a href="#">Mitchel Bell</a>
            </div>
            <p>... co-producer (as Mitch Bell)</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <h4>JC</h4>
              <a href="#">Jamie Christopher</a>
            </div>
            <p>... associate producer</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <h4>LD</h4>
              <a href="#">Louis D’Esposito</a>
            </div>
            <p>... executive producer</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <h4>JF</h4>
              <a href="#">Jon Favreau</a>
            </div>
            <p>... executive producer</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <h4>KF</h4>
              <a href="#">Kevin Feige</a>
            </div>
            <p>... producer</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <h4>AF</h4>
              <a href="#">Alan Fine</a>
            </div>
            <p>... executive producer</p>
          </div>
          <div class="cast-it">
            <div class="cast-left">
              <h4>JF</h4>
              <a href="#">Jeffrey Ford</a>
            </div>
            <p>... associate producer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cast;
