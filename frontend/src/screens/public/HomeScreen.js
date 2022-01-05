import { React, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import { Row, Col } from 'react-bootstrap'
import Product from '../../components/product/Product'
import Loader from '../../components/layouts/Loader'
import Paginate from '../../components/product/Paginate'
import axios from 'axios'
import Message from '../../components/layouts/Message'
const HomeScreen = () => {
	const componentMounted = useRef(true)
	const [products, setProducts] = useState([])
	const [error, setError] = useState()
	const [page, setPage] = useState()
	const [pages, setPages] = useState()
	const [loading, setLoading] = useState(true)
	const pageNumber = useParams().pageNumber || 1
	useEffect(() => {
		const getProducts = async () => {
			try {
				const { data } = await axios.get(
					`public/product?pageNumber=${pageNumber}`
				)

				if (componentMounted.current) {
					setLoading(false)
					setProducts(data.products)
					setPage(data.page)
					setPages(data.pages)
				}
				return () => {
					componentMounted.current = false
				}
			} catch (err) {
				setError(err.response.data.message)
			}
		}
		getProducts()
	}, [pageNumber])

	return (
		<>
			<h1>{error && <Message>{error}</Message>}</h1>
			{loading && <Loader />}
			<>
				<Paginate pages={pages} page={page} />
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md={4} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			</>
		</>
	)
}

export default HomeScreen
