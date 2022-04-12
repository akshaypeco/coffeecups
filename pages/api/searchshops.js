import { searchShops } from "../../lib/firestore";

export default async function handler(req, res) {
  try {
    const q = req.query.q;
    const shops = await searchShops(q);
    res.status(200).json({ shops });
  } catch (e) {
    res.status(400).end();
  }
}
