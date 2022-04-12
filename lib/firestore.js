import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import db from "./firebase";

export async function addShop(data) {
  var coordinates = "";
  var description = "";
  var discount = 0;
  if (data.coordinates) {
    coordinates = data.coordinates;
  }
  if (data.description) {
    description = data.description;
  }
  if (data.discount) {
    discount = data.discount;
  }

  try {
    await setDoc(
      doc(collection(db, "shops")),
      {
        shopname: data.shopname,
        shopname_lower: data.shopname.toLowerCase(),
        discount: discount,
        coordinates: coordinates,
        city: data.city,
        state: data.state,
        description: description,
        created: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (e) {
    console.error("Error adding shop: ", e);
  }
}

export async function getShops() {
  const shops = [];
  try {
    const querySnapshot = await getDocs(collection(db, "shops"));
    querySnapshot.forEach((doc) =>
      shops.push({
        id: doc.id,
        ...doc.data(),
      })
    );
    return shops;
  } catch (e) {
    console.log("Error in getShops function : ", e);
  }
}

export async function searchShops(param) {
  try {
    if (param != null) {
      var strSearch = param.toLowerCase();
      var strLength = strSearch.length;
      var strFrontCode = strSearch.slice(0, strLength - 1);
      var strEndCode = strSearch.slice(strLength - 1, strSearch.length);

      var startcode = strSearch;
      var endcode =
        strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
      const shopRef = collection(db, "shops");
      const q = query(
        shopRef,
        where("shopname_lower", ">=", startcode),
        where("shopname_lower", "<", endcode)
      );
      const results = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) =>
        results.push({
          id: doc.id,
          ...doc.data(),
        })
      );
      return results;
    }
  } catch (e) {
    console.error("Error finding search results: ", e);
  }
}
