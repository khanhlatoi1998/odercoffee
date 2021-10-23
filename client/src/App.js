import './reset.css' ; 
import './App.scss';
import Header from "./Component/Header.js" ; 
import { BrowserRouter as Router , Route} from 'react-router-dom' ;
import MainContent from "./Component/MainContent.js" ; 
import Footer from "./Component/Footer.js" ;
import Cart from "./Component/Cart.js" ; 
import Process from "./Component/Process.js" ; 
import {useState, useEffect} from "react" ; 
import Login from "./Component/Login.js" ; 
import Signup from "./Component/Signup.js" ; 
import axios from 'axios' ;


function App() {

    const [cartItem, setcartItem] = useState([]) ; 
    const [checkLogin, setCheckLogin] = useState(false) ; 
    const cookieUser = {
        items : {} ,
        store : "",
        duration : 180 ,
        username : "" , 
        password : ""
    } ;
    const cookies = document.cookie.split("; ");

    const onAdd = (item) => {    
        cartItem.push(item) ;
        for(let i = cartItem.length - 2 ; i >= 0; i--) {
            if(item.id === cartItem[i].id) 
                cartItem.pop() ; 
        }
        setcartItem([...cartItem]) ;
        if(checkLogin === true) {
            cookieUser.items = item ;  
            axios({
                method : "POST",
                url : "http://localhost:3500/items",
                data : cookieUser
            }) 
                .catch (err => {
                    console.log(err) ; 
                })  
        }
        else { 
            localStorage.setItem("Produts", JSON.stringify(cartItem)) ;
        } ; 
    } ;  

    const onDelete = (index,item) => { 
        cartItem[index].value = 1 ; 
        cartItem.splice(index, 1) ;
        setcartItem([...cartItem]) ;
        if(checkLogin === true) {
            cookieUser.items = item ; 
            cookieUser.items.index = index ;  
            axios({
                method : "DELETE",
                url : "http://localhost:3500/items",
                data : cookieUser,
            })
                .catch((err) => {
                    console.log(err) ; 
                })
        }
        else { 
            localStorage.setItem("Produts", JSON.stringify(cartItem)) ; 
        } 
    } ;   

    for(let i of cookies) { /* lay username password server gui ve cookie de tiep tuc updata*/
        let indexof = i.indexOf("=") ; 
        let a = i.substr(0, indexof) ; 
        if(a === "username")
            cookieUser.username = i.substr(indexof + 1) ; 
        if(a === "password")
            cookieUser.password = i.substr(indexof + 1) ;
    } ;  

    useEffect(() => {
        /* kiem tra dang nhap va get data ve*/ 
        if(cookies.find(o => o.indexOf("username") >= 0)) {
            setCheckLogin(true) ;
            axios({
                method : "GET",
                url : "http://localhost:3500/dataUser",
                data : null,
            }) 
                .then(res => {
                   let data = res.data.find(o => o.username === cookieUser.username) ;
                    setcartItem([...data.items]) ; 
                })
                .catch(err => {
                    console.log(err) ; 
                })
        }
        /* cập nhật localStorage về */
        else {
            if(localStorage && localStorage.getItem("Produts") ) {
                let newCartItem = JSON.parse(localStorage.getItem("Produts")) ;
                    setcartItem(newCartItem) ;
            } 
        } 
    }, [localStorage.getItem("Produts"), checkLogin]) ; /* dependency cartItem se render nhieu lan, chua ro nguyen nhan */
    


  return (
    <Router >
      <div className="App">
        <Route path="/" render={() => (<Header cartItem={cartItem} isAuthed={true} />)} />
        <Route path="/" exact render={() => (<MainContent onAdd={onAdd} cookieUser={cookieUser} isAuthed={true} />)} />
        <Route path="/cart" exact render={() => (<Cart cartItem={cartItem} onDelete={onDelete} cookieUser={cookieUser} checkLogin={checkLogin} />)} />
        <Route path="/process" render={() => (<Process cartItem={cartItem} onDelete={onDelete} checkLogin={checkLogin} cookieUser={cookieUser} />)} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Footer} />
      </div>
    </Router>
  );
}

export default App;
