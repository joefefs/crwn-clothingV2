import React, { useEffect, useState } from "react";
import {Title, CategoryContainer} from "./category.styles.js";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

import {useSelector} from 'react-redux'
import { selectCategoriesMap } from '../../store/categories/category.selector'

function Category() {
  const { category } = useParams();

  const categoriesMap = useSelector(selectCategoriesMap)

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </>
  );
}

export default Category;
