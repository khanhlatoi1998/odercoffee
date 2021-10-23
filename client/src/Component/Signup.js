import { BrowserRouter as Router , NavLink} from 'react-router-dom' ;
import {useState, useEffect} from "react" ; 

const Signup = () => {

	const [username, setusername] = useState("") ;
	const [password, setpassword] = useState("") ; 
	const [checkSignup , setCheckSignup] = useState(false) ; 

	const url = `http://localhost:3500/signup?username=${username}&password=${password}` ;
 
 	let cookies = document.cookie.split("; ");  

  /* 	const deleteAllCookies = () => {
	    for (var i = 0; i < cookies.length; i++) {
	        var cookie = cookies[i];
	        var eqPos = cookie.indexOf("=");
	        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
	        document.cookie = name + "=123;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	    }
	} */
	
	let checkUser = cookies.filter((check) => {
		return check === "false=false" ; 
	}) ; 	
  	
	
  	
	useEffect(() => {
		if(checkUser.length > 0){
  			setCheckSignup(true) ;
  			document.cookie = "false=false; expires=Thu, 01 Jan 1970 00:00:00 GMT"  ;
  		} 
	}, [checkUser]) ; 

	return (
		<section className="LogIn" >
			<div className="container-Login" >
				<form className="block-Login" method="POST" action={url} >
					<h1 > Đăng Ký </h1>
					<p > Tài Khoản </p>
					<div className="block-input" >
						<div><i className="far fa-envelope" aria-hidden="true"></i></div>
						<input onChange={(e) => setusername(e.target.value)} type="text" name="username" />
					</div>
					<p id="matkhau"> Mật Khẩu </p>
					<div className="block-input" >
						<div><i className="fas fa-lock" aria-hidden="true"></i></div>
						<input onChange={(e) => setpassword(e.target.value)} type="password" name="password"/>
					</div>
					<p className="false" style={ checkSignup === false ? {display : "none"} : {} }> tài khoan đã tồn tại </p>
					<button className="btn_dangnhap-dangky" type="submit"> Đăng Ký </button>
					<br />
					<NavLink to="/login" > Đăng Nhập </NavLink>
				</form>
			</div>	
		</section>
	) ;
} ; 

export default Signup ; 