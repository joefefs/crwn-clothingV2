import { useContext } from "react";
import { CategoriesContext } from "../../../context/categories.context";

import CategoryPreview from "../../category-preview/category-preview.component";

function CategoriesPreview() {
  const { categoriesMap } = useContext(CategoriesContext);
 
  return (
    <>
      {     
        //return an array with the keys of an object
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
         
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      }
    </>
  );
}

export default CategoriesPreview;
