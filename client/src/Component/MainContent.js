import axios from 'axios' ;
import {useState, useEffect} from "react" ; 

const MainContent = (props) => { 

	const [products, setProducts] = useState([]) ; 

	const { onAdd } = props ; 

	const addPro = (item, index) => { 
		onAdd(item) ; 		
	} ;

	useEffect(() => {
		axios({
			method : "GET",
			url : "http://localhost:3500/products",
			data : null,
		}) 
			.then(res => {
				setProducts(res.data) ; 
			})
			.catch(err => {
				console.log(err) ; 
			})
	}, []) ;  

	return (
		<section className="maincontent">
			<div className="container-maincontent">
				<div className="content">
					<h1 > Thức Uống </h1>
					<div className="line"></div>
					<div className="products" >
						{
							products.map((item, index) => {
								return (
									<div className="singer-pro" key={index} >
										<div className="img-pro" ><img src={item.img} alt="logo" /></div>
										<h2 > {item.name} </h2>
										<p> {item. price}.000 đ </p>
										<button onClick={() => addPro(item, index)} > Đặt Hàng </button>
									</div>
								)
							})
						}
						
					</div>
					<button className="load" > load moe </button>
				</div>
			</div>
		</section>
	) ; 
} ; 

export default MainContent  ; 