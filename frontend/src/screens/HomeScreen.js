import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listProducts } from "../actions/productActions";
import { listTopSellers } from "../actions/userActions";
import { Link } from "react-router-dom";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const userTopSellers = useSelector((state) => state.userTopSellers);
  const {
    loading: loadingTopSellers,
    error: errorTopSellers,
    users: topSellers,
  } = userTopSellers;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);

  return (
    <div>
      <h2>Top Sellers</h2>
      {loadingTopSellers ? (
        <LoadingBox />
      ) : errorTopSellers ? (
        <MessageBox variant="danger">{errorTopSellers}</MessageBox>
      ) : (
        <>
          {topSellers.length === 0 && <MessageBox>No Sellers Found</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {topSellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )}
      <h2>Featured Products</h2>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
