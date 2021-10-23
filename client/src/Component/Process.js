import { BrowserRouter as Router, Link,  useLocation} from "react-router-dom";
import {useEffect,useState} from "react" ;
import axios from 'axios' ;


const Process = (props) => {

	const { cartItem, onDelete, checkLogin, cookieUser } = props ;

	const Input = document.getElementsByClassName("value-input") ;
	const fullPrice = document.getElementsByClassName("fullprice") ; 
	const total = document.getElementsByClassName("all-price") ; 

	const useQuery = () => { return new URLSearchParams(useLocation().search); } ; 

	let query = useQuery().get("cuahang");

	useEffect(() => {
		if(checkLogin === true) {
			axios({
				method : "GET",
				url : "http://localhost:3500/dataUser",
				data : null
			})
				.then((res) => {
					let data = res.data.find(o => o.username === cookieUser.username) ;
					console.log(data) ;
				})
				.catch((err) => {
					console.log(err) ;
				})
		}
	}, [checkLogin]) ;


	return (
		<section className="cart" >
			<div className="title" >
				<h1 > Cửa Hàng {query} </h1>
				<div className="line" ></div>
			</div>
			<div className="table-content">
				<div className="block-table" >
					<table>
						<thead>
							<tr ><th id="info-customer" colSpan="5"> <i className="fas fa-times"></i> </th></tr>
							<tr id="info-customer">
								<th> Ngo Quoc Khanh : id </th>
								<th> Time : number </th>
								<th> Số Lượng : number </th>
							</tr>
							<tr>
								<th> THỨC UỐNG </th>
								<th> HÌNH ẢNH </th>
								<th> SỐ LƯỢNG </th>
							</tr>

						</thead>
						<tbody>
							{	
								cartItem.length > 0 
								? cartItem.map((item, index) => {
									return (
										<tr key={item.id} >
											<td > <p className="name-pro" > {item.name}</p> </td>
											<td className="img" > <img src={item.img} alt="logo" /> </td>
											<td className="input" > 
												<div id="inputP" >{item.value}</div> 
											</td>
										</tr>
									)
								})
								: <tr><td></td></tr>
							}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	) ;
} ; 

export default Process ; 