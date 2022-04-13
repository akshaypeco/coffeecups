import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import styles from "../styles/ListPage.module.css";
import { FaLocationArrow } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import axios from "axios";
import Head from "next/head";

const ListPage = () => {
  const [searchRes, setSearchRes] = useState([]);
  const [addressVal, setAddressVal] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [allShops, setAllShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationAvailable, setLocationAvailable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if ("geolocation" in navigator) {
        console.log("Available");
        setLocationAvailable(true);
      }
      if (searchRes.length == 0) {
        await axios
          .get("/api/allposts")
          .then((response) => {
            setAllShops(response.data.shopsData);
          })
          .catch((err) => {
            if (err.response) {
              // client received an error response (5xx, 4xx)
              console.log("5xx, 4xx error");
            } else if (err.request) {
              // client never received a response, or request never left
              console.log(
                "client never received response, or request never left"
              );
            } else {
              // anything else
              console.log("other error");
            }
          });
      } else {
        setAllShops(searchRes);
      }
    };
    fetchData().then(setLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const search = async (event) => {
    const q = event.target.value;

    const params = new URLSearchParams({ q });
    const res = await fetch("/api/searchshops?" + params);
    const result = await res.json();
    setSearchRes(result["shops"]);
    setLoading(true);
  };

  const handleLocation = (async) => {
    console.log("Getting location...");
    navigator.geolocation.getCurrentPosition((location) => {
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setAddressVal(location.coords.latitude + "," + location.coords.longitude);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    await axios
      .put("/api/addpost", data)
      .then(setLoading(true))
      .catch((err) => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log("5xx, 4xx error");
        } else if (err.request) {
          // client never received a response, or request never left
          console.log("client never received response, or request never left");
        } else {
          // anything else
          console.log("other error");
        }
      });
  };

  return (
    <div className={styles.root}>
      <Head>
        <title>Find a cafe</title>
        <meta name="description" content="find eco-friendly cafes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.introContainer}>
        <h1
          style={{
            marginTop: 0,
            marginBottom: 10,
            textAlign: "center",
            paddingTop: 45,
          }}
        >
          🍰🍩☕🍵🍨
        </h1>
      </div>
      <div className={styles.searchContainer}>
        <p style={{ marginTop: 50, marginBottom: 5, fontSize: 16.5 }}>
          Search for a cafe:
        </p>
        <input type={"text"} onChange={search} className={styles.search} />
      </div>
      <div className={styles.legendContainer}>
        <p className={styles.shopNameLegend}>Name</p>
        <div style={{ display: "flex", marginLeft: "auto" }}>
          <p className={styles.updatedLegend}>Updated</p>
          <p className={styles.discountLegend}>Discount</p>
        </div>
      </div>
      <div className={styles.searchResultsContainer}>
        <ul className={styles.searchResultsList}>
          {loading ? (
            <h4 style={{ textAlign: "center" }}>loading...</h4>
          ) : (
            allShops.map((shop) => (
              <div key={shop.id}>
                <a className={styles.searchResult}>
                  <div className={styles.shopNameAndLocation}>
                    <p style={{ margin: 0, padding: 0 }}>{shop.shopname}</p>
                    <p
                      style={{
                        margin: 0,
                        padding: 0,
                        marginTop: 2,
                        fontSize: 15,
                        color: "grey",
                      }}
                    >
                      {shop.city}, {shop.state}{" "}
                    </p>
                  </div>
                  <div style={{ display: "flex", marginLeft: "auto" }}>
                    <div className={styles.updated}>
                      <p style={{ margin: 0, padding: 0 }}>
                        {Date(shop.created).substring(4, 16)}
                      </p>
                    </div>
                    {shop.discount == 0 ? (
                      <div className={styles.discount}>No</div>
                    ) : null}
                    {shop.discount >= 1 ? (
                      <div className={styles.discount}>
                        {shop.discount + "%"}
                      </div>
                    ) : (
                      <div className={styles.discount}>
                        {"$" + shop.discount}
                      </div>
                    )}
                  </div>
                </a>
              </div>
            ))
          )}
          <div>
            <form className={styles.searchResultLast} onSubmit={handleSubmit}>
              <div className={styles.searchSectionTopContainer}>
                <div className={styles.shopNameContainer}>
                  <p
                    style={{
                      fontSize: 15,
                      margin: 0,
                      padding: 0,
                      paddingBottom: 4,
                      color: "grey",
                    }}
                  >
                    Shop name:
                  </p>
                  <input
                    className={styles.addClassInput}
                    placeholder="Blue Bottle"
                    type="text"
                    name="shopname"
                  />
                </div>

                <div className={styles.discountContainer}>
                  <p
                    style={{
                      fontSize: 15,
                      margin: 0,
                      padding: 0,
                      paddingBottom: 4,
                      color: "grey",
                    }}
                  >
                    Discount ($ or %):
                  </p>
                  <input
                    className={styles.addClassInput}
                    placeholder="0.10, 10"
                    type="number"
                    name="discount"
                    min="0"
                    step="any"
                  />
                </div>
                <div className={styles.coordinateContainer}>
                  <p
                    style={{
                      fontSize: 15,
                      margin: 0,
                      padding: 0,
                      paddingBottom: 4,
                      color: "grey",
                    }}
                  >
                    Coordinates (optional):
                  </p>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <input
                      className={styles.addClassInput}
                      placeholder="Can click location button"
                      type="text"
                      name="coordinates"
                      defaultValue={addressVal}
                    />
                    <button
                      type="button"
                      className={styles.currLocationButton}
                      onClick={handleLocation}
                    >
                      <FaLocationArrow />
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.searchSectionBottomContainer}>
                <div className={styles.cityContainer}>
                  <p
                    style={{
                      fontSize: 15,
                      margin: 0,
                      padding: 0,
                      paddingBottom: 4,
                      color: "grey",
                    }}
                  >
                    City:
                  </p>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <input
                      className={styles.addClassInput}
                      placeholder="Berkeley"
                      type="text"
                      name="city"
                    />
                  </div>
                </div>
                <div className={styles.stateContainer}>
                  <p
                    style={{
                      fontSize: 15,
                      margin: 0,
                      padding: 0,
                      paddingBottom: 4,
                      color: "grey",
                    }}
                  >
                    State:
                  </p>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <input
                      className={styles.addClassInput}
                      placeholder="California"
                      type="text"
                      name="state"
                    />
                  </div>
                </div>
                <div className={styles.descriptionContainer}>
                  <p
                    style={{
                      fontSize: 15,
                      margin: 0,
                      padding: 0,
                      paddingBottom: 4,
                      color: "grey",
                    }}
                  >
                    Description (optional):
                  </p>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <input
                      className={styles.addClassInput}
                      placeholder="On Hearst and Euclid, cups need to be clean"
                      type="text"
                      name="description"
                    />
                    <button type="submit" className={styles.submitButton}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ListPage;
