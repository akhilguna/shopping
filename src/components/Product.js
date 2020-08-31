// import React, { Component } from 'react';
// import util from '../utils';
// class Products extends Component{
//   render(){
//     const ProductItems=this.props.products.map(product=>(
//        <div className="col-md-4" key={product.id}>
//          <div className="thumbnail">
//            <a href={`#${product.id}`} onClick={(e)=>this.props.handleAddToCart(e,product)}>
//              <img src={`/products/${product.sku}_1.jpg`} alt={product.title}/>
//            </a>
//            {product.title}
//          </div>
//          <b>{util.formatCurrency(product.price)}</b>
//          <button className="btn btn-default" onClick={(e)=>this.props.handleAddToCart(e,product)}> Add to cart</button>
//        </div>
//     ))
//   return (
//      <div className="row">
//        {ProductItems}
//      </div>
//   )
//   }
// }

// export default Products;
import React, { Component } from "react";
import { connect } from "react-redux";
import util from "../util";
import { addToCart } from "../actions/cartActions";
import { fetchProducts } from "../actions/productActions";
class Products extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    const productItems = this.props.products.map((product) => (
      <div className="col-md-4" key={product.id}>
        <div className="text-center product-item">
          <div className="pi-pic">
          <a
            href={`#${product.id}`}
            onClick={(e) => this.props.addToCart(this.props.cartItems, product)}
          >
            <img src={`products/${product.sku}.jpg`} alt={product.title} width="264" height="409"/>
          </a>
          </div>
          <div className="pi-text">
          <p>{product.title}</p>
          <b>{util.formatCurrency(product.price)}</b>
          <button
            className="btn btn-primary"
            onClick={(e) => this.props.addToCart(this.props.cartItems, product)}
          >
            Add to cart
          </button>
          </div>
        </div>
      </div>
    ));

    return <div className="row">{productItems}</div>;
  }
}
const mapStateToProps = (state) => ({
  products: state.products.filteredItems,
  cartItems: state.cart.items,
});
export default connect(mapStateToProps, { fetchProducts, addToCart })(Products);