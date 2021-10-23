

import { BrowserRouter as Router , NavLink} from 'react-router-dom' ;

const Header = (props) => {

	const { cartItem } = props ; 

	return (
		<header className="header">
			<nav>
				<div className="container-header">
					<div className="destop-header" >
						<div className="top-header" >
							<ul >
								<li>
									<NavLink to="/"><img src="https://phuclong.com.vn/images/common/delivery.png" alt="logo" /></NavLink>
								</li>
								<li className="right_t-h" >
									<div className="login" >
										<NavLink to="/signup" > Đăng Ký </NavLink>
									</div>
									/
									<div className="login" >
										<NavLink to="/login" > Đăng nhập </NavLink>
									</div>
									<div className="cart-login" >
										<NavLink to="/cart" >
											Gio hàng: {cartItem.length}
										</NavLink>
									</div>
								</li>
							</ul>
						</div>
						<div className="bottom-header">
							<div className="block_b-h" >
								<ul >
									<li>
										<a href="#" > TRANG CHỦ </a>
									</li>
									<li>
										<a href="#" > CÀ PHÊ </a>
									</li>
									<li>
										<a href="#" > TRÀ </a>
									</li>
									<li>
										<a href="#" > THỨC UỐNG </a>
									</li>
									<li>
										<a href="#" > SẢN PHẨM </a>
									</li>
									<li>
										<a href="#" > KHUYẾN MÃI </a>
									</li>
									<li>
										<a href="#" > VỀ CHÚNG TÔI </a>
									</li><li>
										<a href="#" > THẺ </a>
									</li>
								</ul>
								<div className="search" ><i className="fas fa-search"></i></div>
							</div>
						</div>
					</div>
					<div className="mobile-header">
						<div className="container_m-h" >
							<div className="block_c-m-h" >
								<NavLink to="/" >
									<div className="humberger">
										<div className="line" ></div>
										<div className="line" ></div>
										<div className="line" ></div>
									</div>
								</NavLink >
								<div className="center_m-h" >
									<NavLink to="/cart"> 
										<i className="fas fa-shopping-cart"></i>
										<b > Giỏ hàng: </b>
										<span>{cartItem.length}</span> 
									</NavLink>
								</div>
								<div className="right_m-h" >
									<NavLink to="/signup" ><i className="fas fa-user"></i></NavLink>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	) ; 
} ; 

export default Header ; 