import { React, useState } from 'react'
import { Col, Row, ListGroup } from 'react-bootstrap'
import AdminAddProduct from './AdminAddProduct'
import AdminProductList from './AdminProductList'
import AdminUserList from './AdminUserList'
const AdminPanelScreen = (props) => {
	const [productList, setProductList] = useState(true)
	const [addProduct, setAddProduct] = useState(false)
	const [userList, setUserList] = useState(false)
	return (
		<>
			<Row>
				<Col md={3}>
					<Row>
						<Col>
							<ListGroup>
								<ListGroup.Item className='active'>ADMIN PANEL</ListGroup.Item>
								<ListGroup.Item
									action
									onClick={() => {
										setAddProduct(false)
										setProductList(true)
										setUserList(false)
									}}
								>
									ProductList
								</ListGroup.Item>
								<ListGroup.Item
									action
									onClick={() => {
										setProductList(false)
										setUserList(false)
										setAddProduct(true)
									}}
								>
									Add Product
								</ListGroup.Item>
								<ListGroup.Item
									action
									onClick={() => {
										setProductList(false)
										setAddProduct(false)
										setUserList(true)
									}}
								>
									User List
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</Col>
				<Col md={9}>
					{addProduct && <AdminAddProduct />}
					{productList && <AdminProductList />}
					{userList && <AdminUserList />}
				</Col>
			</Row>
		</>
	)
}

export default AdminPanelScreen
