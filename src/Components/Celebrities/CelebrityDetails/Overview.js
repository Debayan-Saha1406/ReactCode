/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { celebrityTabs } from "./../../../Shared/Constants";

const Overview = (props) => {
  return (
    <React.Fragment>
      <div className="col-md-8 col-sm-12 col-xs-12">
        <p>
          Jackman was born in Sydney, New South Wales, to Grace McNeil
          (Greenwood) and Christopher John Jackman, an accountant. He is the
          youngest of five children. His parents both English, moved to
          Australia shortly before his birth. He also has Greek (from a
          great-grandfather) and Scottish (from a grandmother) ancestry.
        </p>
        <p>
          Hugh Michael Jackman is an Australian actor, singer,
          multi-instrumentalist, dancer and producer. Jackman has won
          international recognition for his roles in major films, notably as
          superhero, period, and romance characters.{" "}
        </p>
        <p className="time">
          <a
            onClick={() => props.redirectToTab(celebrityTabs.biography)}
            className="blue-link"
          >
            See full bio
          </a>
        </p>

        <div className="title-hd-sm">
          <h4>filmography</h4>
          <a
            onClick={() => props.redirectToTab(celebrityTabs.filmography)}
            className="blue-link"
            style={{ fontSize: "12px" }}
          >
            Full Filmography
          </a>
        </div>
        <div className="mvcast-item">
          <div className="cast-it">
            <div className="cast-left cebleb-film">
              <img src="images/uploads/film1.jpg" alt="" />
              <div>
                <a href="#">X-Men: Apocalypse </a>
                <p className="time">Logan</p>
              </div>
            </div>
            <p>... 2016</p>
          </div>
          <div className="cast-it">
            <div className="cast-left cebleb-film">
              <img src="images/uploads/film2.jpg" alt="" />
              <div>
                <a href="#">Eddie the Eagle </a>
                <p className="time">Bronson Peary</p>
              </div>
            </div>
            <p>... 2015</p>
          </div>
          <div className="cast-it">
            <div className="cast-left cebleb-film">
              <img src="images/uploads/film3.jpg" alt="" />
              <div>
                <a href="#">Me and Earl and the Dying Girl </a>
                <p className="time">Hugh Jackman</p>
              </div>
            </div>
            <p>... 2015</p>
          </div>
          <div className="cast-it">
            <div className="cast-left cebleb-film">
              <img src="images/uploads/film4.jpg" alt="" />
              <div>
                <a href="#">Night at the Museum 3 </a>
                <p className="time">Blackbeard</p>
              </div>
            </div>
            <p>... 2014</p>
          </div>
          <div className="cast-it">
            <div className="cast-left cebleb-film">
              <img src="images/uploads/film5.jpg" alt="" />
              <div>
                <a href="#">X-Men: Days of Future Past </a>
                <p className="time">Wolverine</p>
              </div>
            </div>
            <p>... 2012</p>
          </div>
          <div className="cast-it">
            <div className="cast-left cebleb-film">
              <img src="images/uploads/film6.jpg" alt="" />
              <div>
                <a href="#">The Wolverine </a>
                <p className="time">Logan</p>
              </div>
            </div>
            <p>... 2011</p>
          </div>
          <div className="cast-it">
            <div className="cast-left cebleb-film">
              <img src="images/uploads/film7.jpg" alt="" />
              <div>
                <a href="#">Rise of the Guardians </a>
                <p className="time">Bunny</p>
              </div>
            </div>
            <p>... 2011</p>
          </div>
          <div className="cast-it">
            <div className="cast-left cebleb-film">
              <img src="images/uploads/film8.jpg" alt="" />
              <div>
                <a href="#">The Prestige </a>
                <p className="time">Robert Angier</p>
              </div>
            </div>
            <p>... 2010</p>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-xs-12 col-sm-12">
        <div className="sb-it">
          <h6 className="side-heading">Date of Birth: </h6>
          <p>June 24, 1982</p>
        </div>
        <div className="sb-it">
          <h6 className="side-heading">Country: </h6>
          <p>Australian</p>
        </div>
        {/* <div className="ads">
          <img src="images/uploads/ads1.png" alt="" />
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default Overview;
