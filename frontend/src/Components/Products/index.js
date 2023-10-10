import { useEffect, useState } from 'react'
import { Hearts} from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import Header from '../Header'

import './index.css'


const AllProductsSection = () => {
    const [productsList, setProducts] = useState([]);
    const [apiStatus, setApiStatus] = useState(false);


    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        setApiStatus(true)

        const apiUrl = `https://ekart-t7sz.onrender.com/api/products/get`

        const response = await fetch(apiUrl)
        const fetchedData = await response.json()
        //console.log(fetchedData)


        const updatedData = fetchedData.map(product => ({
            title: product.title,
            brand: product.brand,
            price: product.price,
            id: product._id,
            imageUrl: product.imageUrl,
            rating: product.rating,
        }))
        //console.log(updatedData)
        setProducts(updatedData);
        setApiStatus(false);


    }


    const renderLoadingView = () => (
        <div className="products-loader-container">
            <Hearts  color="#0b69ff" height="150" width="150" />
        </div>
    )


    const shouldShowProductsList = productsList.length > 0

    return (
        <div className="all-products-section">
            <Header />
            {apiStatus?renderLoadingView():
                <div className='inner'>
                    {shouldShowProductsList ? (
                        <div className="all-products-container">
                            <ul className="products-list">
                                {productsList.map(product => (

                                    <Link to={`/products/${product.id}`} className="link-item" key={product.id}>
                                        <li className="product-item" >
                                            <img src={product.imageUrl} alt="product" className="thumbnail" />
                                            <h1 className="title">{product.title}</h1>
                                            <p className="brand">by {product.brand}</p>
                                            <div className="product-details">
                                                <p className="price">Rs {product.price}/-</p>
                                                <div className="rating-container">
                                                    <p className="rating">{product.rating}</p>
                                                    <img
                                                        src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                                                        alt="star"
                                                        className="star"
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="no-products-view">
                            <img
                                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                                className="no-products-img"
                                alt="no products"
                            />
                            <h1 className="no-products-heading">No Products Found</h1>
                            <p className="no-products-description">
                                We could not find any products. Try other filters.
                            </p>
                        </div>
                    )}
                </div>
            }

        </div>
    )

}

export default AllProductsSection
