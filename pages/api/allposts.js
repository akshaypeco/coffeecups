import { getShops } from "../../lib/firestore";

export default async function handler(req, res) {
  try {
    const shopsData = await getShops();
    res.status(200).json({ shopsData });
  } catch (e) {
    res.status(400).end();
  }
}
