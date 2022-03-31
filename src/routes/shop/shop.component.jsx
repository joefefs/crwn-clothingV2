import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Category from "../category/category.component";
import CategoriesPreview from "../categories-preview/categories-preview.component";

import { useDispatch } from "react-redux";
import { setCategoriesMap } from "../../store/categories/category.action";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";


function Shop() {
  const dispatch = useDispatch()
  useEffect(()=> {
    const getCategoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments('categories')
        dispatch(setCategoriesMap(categoryMap))

    }
    getCategoriesMap()
},[])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}
// The Routes are nested within app.js so every Route generated in here, follows the path of the original route (/shop/newRoute)
export default Shop;
