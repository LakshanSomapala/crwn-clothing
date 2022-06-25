import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component'

import './product-card.styles.scss'

const ProductCard = ({ products }) => {
    const { name, price, imageUrl } = products;
    const { addItemsToCart } = useContext(CartContext)

    const addProductToCart = () => {
        addItemsToCart(products)
    }

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart}>Add to card</Button>

        </div>
    )
}

export default ProductCard;