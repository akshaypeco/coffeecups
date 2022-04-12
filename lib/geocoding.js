import axios from "axios";

export async function getLocation(lat, long) {
  const res = axios
    .get(
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        lat +
        "," +
        long +
        "&key=" +
        process.env.NEXT_GEOCODING_API_KEY
    )
    .catch((e) => console.log("Error in reverse geocode: ", e));

  console.log(res);
}
