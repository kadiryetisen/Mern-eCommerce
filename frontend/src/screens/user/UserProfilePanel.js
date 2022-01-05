import { React, useState } from 'react'
import { Col, Row, ListGroup } from 'react-bootstrap'
import UserProfile from './UserProfile'
import UserOrderList from './UserOrderList'
const UserProfilePanel = (props) => {
	const [accountInfo, setAccountInfo] = useState(true)
	const [orderInfo, setOrderInfo] = useState(false)

	return (
		<>
			<Row>
				<Col md={3}>
					<Row>
						<Col>
							<ListGroup>
								<ListGroup.Item className='active'>My Account</ListGroup.Item>
								<ListGroup.Item
									action
									onClick={() => {
										setAccountInfo(true)
										setOrderInfo(false)
									}}
								>
									Profile
								</ListGroup.Item>
								<ListGroup.Item
									action
									onClick={() => {
										setAccountInfo(false)
										setOrderInfo(true)
									}}
								>
									Order List
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</Col>
				<Col md={9}>
					{accountInfo && <UserProfile />}
					{orderInfo && <UserOrderList />}
				</Col>
			</Row>
		</>
	)
}

export default UserProfilePanel
