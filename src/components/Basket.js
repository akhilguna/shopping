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
      <div className="alert alert-info">
        {cartItems.length === 0 ? (
          "Basket is empty"
        ) : (
          <div>
            You have {cartItems.length} items in the basket. <hr />
          </div>
        )}
        {cartItems.length > 0 && (
          <div>
            <ul style={{ marginLeft: -25 }}>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <b>{item.title}</b>
                  <button
                    style={{ float: "right" }}
                    className="btn btn-danger btn-xs"
                    onClick={(e) =>
                      this.props.removeFromCart(this.props.cartItems, item)
                    }
                  >
                    X
                  </button>
                  <br />
                  {item.count} X {util.formatCurrency(item.price)}
                </li>
              ))}
            </ul>

            <b>
              Sum:{" "}
              {util.formatCurrency(
                cartItems.reduce((a, c) => a + c.price * c.count, 0)
              )}
            </b>
            <button
              onClick={() => alert("Todo: Implement checkout page.")}
              className="btn btn-primary"
            >
              checkout
            </button>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
});
export default connect(mapStateToProps, { addToCart, removeFromCart })(Basket);
