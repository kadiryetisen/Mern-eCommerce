import { Row, Button } from 'react-bootstrap'
import OrderStepper from '../../components/layouts/OrderStepper'
import { useNavigate } from 'react-router-dom'
const OrderApproveScreen = () => {
	const navigate = useNavigate()
	return (
		<>
			<Row className='mb-3'>
				<OrderStepper stepCount={2} className='mb-3'></OrderStepper>
			</Row>
			<div> Approve Information</div>
			<Button
				onClick={() => {
					navigate('/order/4')
				}}
			>
				Pass
			</Button>
		</>
	)
}

export default OrderApproveScreen
