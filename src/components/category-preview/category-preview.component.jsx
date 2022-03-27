import {CategoryPreviewContainer, CategoryPreviewTitleLink, CategoryPreviewCard} from './category-preview.styles.js'
import ProductCard from '../product-card/product-card.component';

function CategoryPreview({ title, products }) {

    return (
        <CategoryPreviewContainer>
            <h2><CategoryPreviewTitleLink to={title}>{title.toUpperCase()}</CategoryPreviewTitleLink></h2>
            <CategoryPreviewCard>
                {
                    // the first underscore means we don't care about the first param
                    products.filter((_, idx) => idx < 4)
                    .map((product) => (<ProductCard key={product.id} product={product} />))
                }
            </CategoryPreviewCard>
        </CategoryPreviewContainer>
    );
}

export default CategoryPreview;