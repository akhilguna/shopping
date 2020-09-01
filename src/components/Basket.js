// import React, { Component } from 'react';
// class Basket extends Component{
//   render(){
//      const {cartItems}=this.props 
//      return(
//          <div className="alert alert-info">
//              {cartItems.length===0?"Basket is empty":<div>you have {cartItems.length}products in basket</div>}
//              {cartItems.length>0&&
//            <div>
//                <ul>
//                    {cartItems.map(item=>
//                     <li><b>{item.title}</b>
//                     X{item.count}={item.price + item.count}
//                     <button className="btn btn-danger" onClick={(e)=>this.props.handleRemoveFromCart(e,item)}></button></li>
//                     )}
//                </ul>
//                Total:{cartItems.reduce((a,c)=>a+c.price+c.count,0)}
//            </div>
//         }   
//          </div> 
       
//      )
//   }
// }

// export default Basket;
import React, { Component } from "react";
import { connect } from "react-redux";
import util from "../util";
import { addToCart, removeFromCart } from "../actions/cartActions";
class Basket extends Component {
  render() {
    const { cartItems } = this.props;

    return (
      <div className="container feedback">
        <div className="row">
          <div className="col-lg-8">
      <div className="cart-table">
        {cartItems.length === 0 ? (
          <h6>Basket is empty</h6>
        ) : (
          <div className="cart-items">
            <h6>You have {cartItems.length} items in the basket.</h6>
          </div>
        )}
        {cartItems.length > 0 && (
          <div>
            <table>
            <thead>
								<tr>
									<th class="product-th">Product</th>
									<th class="quy-th">Quantity</th>
									<th class="size-th">Size</th>
									<th class="total-th">Price</th>
								</tr>
							</thead>
            <tbody style={{ marginLeft: -25 }}>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td class="product-col"><img src={`products/${item.sku}.jpg`}/>
                  <div class="pc-title">
											<h4>{item.title}</h4>
                      <p>{item.price}</p>
										</div>
                  </td>
                  <td className="quy-col"><h4>{item.count}</h4></td>
                  <td className="size-col"><h4>Size{item.availableSizes[0]}</h4></td>
                  <td className="total-col"><h4>{item.count} X {util.formatCurrency(item.price)}<button    onClick={(e) =>
                      this.props.removeFromCart(this.props.cartItems, item)
                    }>X</button></h4></td>
                </tr>
              ))}
            </tbody>
           </table>
            <div className="total-cost">
              <h6>Total:{" "}
              {util.formatCurrency(
                cartItems.reduce((a, c) => a + c.price * c.count, 0)
              )}</h6>
            <button
              onClick={() => alert("Todo: Implement checkout page.")}
              className="btn btn-primary"
            >
              checkout
            </button>
            </div>
          </div>
        )}
      </div>
      </div>
      <div class="col-lg-4 card-right">
					<a href="" class="site-btn">Proceed to checkout</a>
					<a href="/dashboard" class="site-btn sb-dark">Continue shopping</a>
				</div>
      </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
});
export default connect(mapStateToProps, { addToCart, removeFromCart })(Basket);
