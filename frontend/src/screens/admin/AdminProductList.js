import { React, useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import Loader from '../../components/layouts/Loader'
import Message from '../../components/layouts/Message'
import { AuthContext } from '../../context/AuthContext'
const ProductList = () => {
	const auth = useContext(AuthContext)
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()
	const [successMessage, setSuccessMessage] = useState(false)
	axios.interceptors.request.use((config) => {
		config.headers['Content-Type'] = 'application/json'
		config.headers['Authorization'] = `Bearer ${auth.token}`
		return config
	})
	useEffect(() => {
		const getProducts = async () => {
			try {
				setLoading(true)
				const { data } = await axios.get('/admin/product/all')

				setProducts(data)
				setLoading(false)
			} catch (err) {
				if (err.response.status === 401) {
					setError(err.response.data.message)
					auth.logout()
				}

				setLoading(false)
			}
		}
		getProducts()
	}, [auth])
	const deleteHandler = async (id) => {
		if (window.confirm('Are you sure ?')) {
			try {
				setLoading(true)
				const { data } = await axios.delete(`admin/product/delete/${id}`)
				const latestProducts = data.products
				setProducts(latestProducts)
				setLoading(false)
				setSuccessMessage(data.message)
			} catch (err) {
				if (err.response.data.status === 401) {
					auth.logout()
				}
				setLoading(false)
				setError(err)
			}
		}
	}

	return (
		<div>
			{successMessage && <Message variant={'danger'}>{successMessage}</Message>}
			{loading && <Loader />}
			{error ? (
				error
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>${product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td>
									<Link to={`/panel/product/${product._id}`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-cog fa-xl'></i>
										</Button>
									</Link>
									<Button
										variant='danger'
										className='btn-sm '
										onClick={() => deleteHandler(product._id)}
									>
										<i className='fas fa-trash fa-xl'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	)
}

export default ProductList
