import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "../features/products/productSlice";



const ProductCard = (props) => {
    const { data, grid } = props;
    console.log(data);
    const dispatch = useDispatch();
    let location = useLocation();
    const addToWish = (id) => {
        dispatch(addToWishList(id))
    }
    return (
        <>
            {

                data?.map((item, index) => {
                    return (
                        <div key={index} className={`${location.pathname == "/product" ? `gr-${grid}` : "col-3"}  `}>
                            <div
                                className="product-card position-relative">
                                <div className="wishlist-icon position-absolute">
                                    <button className="border-0 bg-transparent" onClick={(e) => { addToWish(item?._id) }}>
                                        <img src="/images/wish.svg" alt="wishlist"
                                        />

                                    </button>
                                </div>
                                <div className="product-image">
                                    <img src={item?.images[0].url} className="img-fluid" alt="product image" />
                                    <img src="/images/watch-1.webp" className="img-fluid" alt="product image" />

                                </div>
                                <div className="product-details">
                                    <h6 className="brand">{item?.brand}</h6>
                                    <h5 className="product-title">
                                        {item?.title}
                                    </h5>
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={item?.totalrating.toString()}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                    <p className={`description ${grid === 12 ? "d-block" : "d-none"}`} dangerouslySetInnerHTML={{ __html: item?.description }}></p>

                                    <p className="price">$ {item?.price}</p>
                                </div>
                                <div className="action-bar position-absolute">
                                    <div className="d-flex flex-column gap-15">

                                        <button className="border-0 bg-transparent">
                                            <img src="/images/prodcompare.svg" alt="compare" />
                                        </button>
                                        <Link to={'/product/' + item?._id} className="border-0 bg-transparent">
                                            <img src="/images/view.svg" alt="view" />
                                        </Link>
                                        <button className="border-0 bg-transparent">
                                            <img src="/images/add-cart.svg" alt="addcart" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                })
            }

        </>
    );
};

export default ProductCard;




