import { useContext } from 'react'
import { ProductsContext } from '../../../context/products.context';
import ProductCard from '../../product-card/product-card.component';
import './shop.styles.scss'
function Shop() {
    const {products} = useContext(ProductsContext)
    return (
        <div className='products-container'>
           {products.map((product) => (
                
                   <ProductCard key={product.id} product={product} /> //se pasa el prop de product para poder recibirlo en el component ya que aquí está el context
              
           ))} 
        </div>
    );
}

export default Shop;