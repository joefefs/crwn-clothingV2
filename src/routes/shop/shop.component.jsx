import { Routes, Route } from "react-router-dom";

import Category from "../category/category.component";
import CategoriesPreview from "../categories-preview/categories-preview.component";
function Shop() {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}
// The Routes are nested within app.js so every Route generated in here, follows the path of the original route (/shop/newRoute)
export default Shop;
