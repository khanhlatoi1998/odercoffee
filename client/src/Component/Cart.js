import {useEffect,useState, useRef} from "react" ; 
import { BrowserRouter as Router , NavLink} from 'react-router-dom' ;
import axios from 'axios' ;

const Cart = (props) => {

	const { cartItem, onDelete, checkLogin, cookieUser} = props ;

	const [duration , setDuration ] =  useState(0) ;
	const [payed, setpayed] =  useState(false) ;
	const [store , setstore] =useState("Cửa hàng 1") ; 
	const [time1 , setTime1] = useState(0) ;
	const [startPay, setStartPay] = useState(false) ;
	const countRef = useRef(null) ; /* có thế có đã lấy dom của trình duyệt */

	const Input = document.getElementsByClassName("value-input") ;
	const fullPrice = document.getElementsByClassName("fullprice") ; 
	const total = document.getElementsByClassName("all-price") ;  

	let totalValue = 0 ;

	const deletePro =(index,item) => {
		onDelete(index,item) ; 
	} ;  

	const changeInput = (e, item, index) => { 
		let valueInput = Number(e.target.value) ; 
		cartItem[index].value = valueInput ; 
		let a = String(valueInput*item.price) ; 
		if(a.length > 3) {
			a = a.slice(0,1) + "." + a.slice(1) ; 
		}
		fullPrice[index].textContent = a + ".000đ" ;	
		if(checkLogin === true) {
			cookieUser.items =  cartItem ; 
            axios({
                method : "POST",
                url : "http://localhost:3500/valueItem",
                data : cookieUser
            }) 
                .catch (err => {
                    console.log(err) ; 
                })  
        }
        else { 
            localStorage.setItem("Produts", JSON.stringify(cartItem)) ;
        } ;
		updataTotal() ; 
	} ; 

	const updataPrice = () => {
		for(let i in cartItem) {
			let valueInput = Input[i].value ; 
			let a = String(valueInput*cartItem[i].price) ; 
			if(a.length > 3) {
				a = a.slice(0,1) + "." + a.slice(1) ; 
			}
			fullPrice[i].textContent = a + ".000đ" ;	
		}
	}

	const updataTotal = () => {
		totalValue = 0 ; 
		for(let i of fullPrice) {
			totalValue += Number(i.textContent.slice(0, i.textContent.length - 5)) ; 
		}
		total[0].textContent = totalValue + ".000đ" ;  
	} ; 

	let duration1 = 0 ;

	const pushDuration = () => {

	} ;
	let in1 ;

	const Duration = (time2) => { 
		let time ;
		if(Number.isFinite(duration) === true && duration !== 0){
			time =  Number(duration) * 60 ;  
		}
		else if(time2 > 0) { time = time2 ; }
		else { time = time1 ; }
		in1 = setInterval(() => {
			if(time <= 0 || window.location.pathname !== "/cart")
				clearInterval(countRef.current) ;
			else {
				time-- ; 
				let minute = Math.floor(time / 60) ; 
				let second = time % 60 ; 
				duration1 = (second > 9) ? (minute + "'" + second) : (minute + "'0" + second) ; 
				setDuration(duration1) ;
				setTime1(time) ;
			}
		}, 1000) ; 
	} ; 

	const onPay = (time2) => {
		setpayed(true) ;
		setStartPay(true) ;
		Duration(time2) ;  
		if(checkLogin === true && duration > 0) {
			console.log(duration) ;
			let time ;
			if(Number.isFinite(duration) === true && duration !== 0)
				 time =  Number(duration) * 60 ; 
			else { time = time1 }
			cookieUser.store = store ; 
			cookieUser.duration = time ;
            axios({
                method : "POST",
                url : "http://localhost:3500/pay",
                data : cookieUser
            }) 
                .catch (err => {
                    console.log(err) ; 
                })  
        }
	} ;

	const onFixDuration = () => { 
		setpayed(false) ;
		clearInterval(in1) ; 
	}

	const onTickTime = (time2) => {
		setpayed(true) ;
		Duration(time2) ; 
	} ;

 	useEffect(() => { 
 		updataPrice() ;
 		updataTotal() ;
		if(checkLogin === true) {
            axios({
                method : "GET",
                url : "http://localhost:3500/dataUser",
                data : null,
            }) 
                .then(res => {
                    let data = res.data.find(o => o.username === cookieUser.username) ;
                  /*	if(data.duration > 0 && payed === false) {
                  		onPay(data.duration) ;
                  	} */
                })
                .catch(err => {
                    console.log(err) ; 
                })
        }
        return clearInterval(countRef.current) ; 
	}, [checkLogin, cartItem]) ; 

	return (
		<section className="cart" >
			<div className="title" >
				<h1 > Order </h1>
				<div className="line" ></div>
				<h3 style={payed === true && startPay === true ? {} : {display : "none"}}> 
					Bạn đã dặt thành công vui lòng đợi, xem thông tin <NavLink  to="/process" >tại đây</NavLink>  
				</h3>
			</div>
			
			<div className="table-content">
				<div className="block-table" >
					<div className="time-address" >
						<div className="time" >
							<p> Cưa hàng sẽ bắt đầu làm khi thời gian đặt hàng còn 3 phút </p>
						</div>
						<div className="address" >
							<p  > Nhập địa chi muốn nhận hàng :</p>
							<select name="select" id="select" onChange={(e) => setstore(e.target.value)} >
								<option value="Cửa hàng 1">Cửa hàng 1</option>
								<option value="Cửa hàng 2">Cửa hàng 2</option>
								<option value="Cửa hàng 3">Cửa hàng 3</option>
								<option value="Cửa hàng 4">Cửa hàng 4</option>
							</select>
						</div>
						<div className="time" >
							<p  > Nhập thời gian muốn nhận hàng : </p>
							<div style={payed === false  ? {} : {display : "none"}}> 
								<input onChange={(e) => setDuration(Number(e.target.value))} type="number" min="1" defaultValue={duration} /> 
								<span >phút</span> 
							</div>
							<span style={payed === true  || payed ===  false ? {} : {display : "none"}} > {duration} </span>
							<span style={payed === true  ? {} : {display : "none"}} className="fix-data" onClick={onFixDuration} > <i className="fas fa-wrench"></i> </span>
							<span style={payed === false && startPay === true  ? {} : {display : "none"}} className="fix-data" onClick={(time1) => onTickTime(time1)} > <i className="fas fa-check"></i> </span>
						</div>
					</div>
					<table>
						<thead>
							<tr>
								<th> THỨC UỐNG </th>
								<th> HÌNH ẢNH </th>
								<th> GIA </th>
								<th> SỐ LƯỢNG </th>
								<th> THÀNH TIỀN </th>
								<th></th>
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
											<td > <p className="price" >{item.price}.000đ</p> </td>
											<td className="input" > 
												<input  
													onChange={(e) => changeInput(e, item, index)} 
													className="value-input" 
													type="number" 
													min="0" max="34"
													defaultValue={item.value} 
												/> 
											</td>
											<td > <p className="fullprice">{item.price},000đ</p> </td>
											<td className="btn-delete" onClick={() => deletePro(index, item)}> 
												<i className="far fa-trash-alt"></i> 
											</td>
										</tr>
									)
								})
								: <tr><td></td></tr>
							}
						</tbody>
					</table>
				</div>
				<div className="pay" >
					<p> Tổng thanh toán: </p>
					<p className="all-price" >{totalValue}.000đ</p>
				</div>
				<div className="btn-pay" >
					<button > TIẾP TỤC MUA HÀNG </button>
					<button onClick={onPay} > TIẾN HÀNH THANH TOÁN </button>
				</div>
			</div>
		</section>
	) ;
} ; 

export default Cart ; 