import { useRouter } from "next/router";
import { getLocation } from "../../lib/geocoding";

export default async function handler(req, res) {
  try {
    const { query } = useRouter();
    // const location = await getLocation(latitude, longitude);
    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
}
