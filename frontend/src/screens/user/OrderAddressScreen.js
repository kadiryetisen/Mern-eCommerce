import { React, useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import AddressForm from './components/AddressForm'
import AddressList from './components/AddressList'
import OrderStepper from '../../components/layouts/OrderStepper'
const OrderAdressScreen = () => {
	const [addressList, setAddressList] = useState(true)
	return (
		<>
			<Row className='mb-3'>
				<OrderStepper stepCount={0} className='mb-3'></OrderStepper>
			</Row>
			<Row>
				<Row>
					<Col md={3} className='mt-5'>
						<Button
							className='mb-3 bg-info'
							onClick={() => {
								setAddressList((prev) => !prev)
							}}
						>
							Add New One
						</Button>
					</Col>
				</Row>
			</Row>
			{addressList ? (
				<AddressList />
			) : (
				<>
					<Button
						className='btn btn-light my-3 '
						onClick={() => {
							setAddressList(true)
						}}
					>
						Go Back
					</Button>

					<AddressForm />
				</>
			)}
		</>
	)
}

export default OrderAdressScreen
