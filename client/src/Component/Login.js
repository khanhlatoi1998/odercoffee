import { BrowserRouter as Router , NavLink} from 'react-router-dom' ;
import {useState, useEffect} from "react" ; 


const Login = () => {

	const [username, setusername] = useState("") ;
	const [password, setpassword] = useState("") ;
	const [checkLogin, setCheckLogin] = useState(false) ; 

	const url = `http://localhost:3500/login?username=${username}&password=${password}` ;

	let cookies = document.cookie.split("; "); 

	let checkUser = cookies.filter((check) => {
		return check === "loginFalse=false" ; 
	}) ;

	useEffect(() => {
		if(checkUser.length > 0){
  			setCheckLogin(true) ;
  			document.cookie = "loginFalse=false; expires=Thu, 01 Jan 1970 00:00:00 GMT"  ;
  		} 
	}, [checkUser]) ; 

	return (
		<section className="LogIn" >
			<div className="container-Login" >
				<form className="block-Login" method="GET" action={url} >
					<h1 > Đăng Nhập </h1>
					<p > Tài Khoản </p>
					<div className="block-input" >
						<div ><i className="far fa-envelope" aria-hidden="true"></i></div>
						<input onChange={(e) => setusername(e.target.value)} name="username" type="text" />
					</div>
					<p id="matkhau"> Mật Khẩu </p>
					<div className="block-input" >
						<div><i className="fas fa-lock" aria-hidden="true"></i></div>
						<input onChange={(e) => setpassword(e.target.value)} name="password" type="password"  />
					</div>
					<p className="false" style={ checkLogin === false ? {display : "none"} : {} }> tài khoan hoặc mật khâu không đúng </p>	
					<button className="btn_dangnhap-dangky" > Đăng Nhập </button>
					<br />
					<NavLink to="/signup" > Đăng Ký </NavLink>
					<div className="icoin-LogSig" >
						<a href="#" id="fb" > <i className="fab fa-facebook-f" aria-hidden="true"></i> </a>
						<a href="#" id="gg" > <i className="fab fa-google" aria-hidden="true"></i> </a>
						<a href="#" id="tw" > <i className="fab fa-twitter" aria-hidden="true"></i> </a>
					</div> 
				</form>
			</div>	
		</section>
	) ; 
} ; 

export default Login ; 