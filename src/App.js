// import React, { Component } from 'react';
// import Products from './components/Product';
// import Filter from "./components/Filter";
// import Basket from './components/Basket';

// class App extends Component{
//   constructor(props){
//     super(props);
//     this.state={products:[],filteredProducts:[],cartItems:[]}
//     this.handleChangeSort=this.handleChangeSort.bind(this);
//     this.handleChangeSize=this.handleChangeSize.bind(this);
//     this.handleAddToCart=this.handleAddToCart.bind(this);
//     this.handleRemoveFromCart=this.handleRemoveFromCart.bind(this);
//   }
//   componentWillMount(){
//     fetch('http://localhost:3004/products').then(res=>res.json()).then(
//       data=>this.setState({
//         products:data,
//         filteredProducts:data
//       }));
//     if(localStorage.getItem('cartItems')){
//       this.setState({cartItems:JSON.parse(localStorage.getItem('cartItems'))});
//     }
//   }
//   handleChangeSort(e){
//     this.setState({sort:e.target.value});
//     this.listProducts()
//   }
//   handleChangeSize(e){
//     this.setState({size:e.target.value});
//     this.listProducts()
//   }
//   listProducts(){
//    this.setState(state=>{
//       if(state.sort!==''){
//         state.products.sort((a, b) => (state.sort==='lowest')?(a.price>b.price?1:-1): (a.price<b.price?1:-1));
//       }else{
//         state.products.sort((a, b) => (a.id<b.id?1:-1))
//       }
//         // if(state.size!==''){
//         //   return {filteredProducts:state.products.filter(a=>
//         //     a.availableSizes.indexOf(state.size.toUpperCase())>=0)}
//         // }
//       return{filteredProducts:state.products}
//    })
//   }
//   handleAddToCart(e,product){
//      this.setState(state=>{
//        const cartItems=state.cartItems;
//        let productAlreadyInCart=false;
//        cartItems.forEach(item => {
//          if(item.id===product.id){
//            productAlreadyInCart=true;
//            item.count++;
//          }
//        });
//        if(!productAlreadyInCart){
//          cartItems.push({...product,count:1})
//        }
//        localStorage.setItem("cartItems",JSON.stringify(cartItems))
//        return cartItems
//      })
//   }
//   handleRemoveFromCart(e,item){
//     this.setState(state=>{
//          const cartItems=state.cartItems.filter(elm=>elm.id!==item.id)
//          localStorage.setItem('cartItem',cartItems)
//          return(cartItems)
//     });

//   }
//   render(){
//   return (
//        <div className="container">
//        <h1>Ecommerce shooping application</h1>
//         <div className="row">
//          <div className="col-md-8">
//          <Filter size={this.state.size} sort={this.state.sort} handleChangeSize={this.handleChangeSize} handleChangeSort={this.handleChangeSort} count={this.state.filteredProducts.length}/>
//            <Products products={this.state.filteredProducts} handleAddToCart={this.handleAddToCart}/>
//          </div>
//          <div className="col-md-4">
//               <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart}/>
//          </div>
//        </div> 
//      </div>
//   )
//   }
// }

// export default App;
import React, { Component ,useState, useEffect}  from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter,Route, NavLink} from "react-router-dom";
import "./App.css";
// import App1 from "./App1";
import axios from 'axios';
import FormComponent from "./components/Feedback";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Basket from "./components/Basket";

class App extends Component {
  render() {
 
    return (
      <Provider store={store}>
        <App2/>
        <Footer/>
      </Provider>
    );
  }
}
function App2() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <BrowserRouter>
    {/* <div className="header">
      <NavLink exact activeClassName="active" to="/">Home</NavLink>
      <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
      <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
    </div> */}
    <Navigation/>
      {/* <PrivateRoute path="/Home" component={App1} /> */}
      <PrivateRoute path="/feedback" component={FormComponent} />
      <Route exact path="/" component={Home} />
        <PublicRoute path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/cart" component={Basket} />
      </BrowserRouter>
     
  );
}

export default App;