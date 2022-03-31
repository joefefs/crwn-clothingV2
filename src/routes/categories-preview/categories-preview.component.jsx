import { selectCategoriesMap } from "../../store/categories/category.selector";
import { useSelector } from "react-redux";

import CategoryPreview from "../../components/category-preview/category-preview.component";

function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap)
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
