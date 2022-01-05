import { React } from 'react'
import { Card, Row, Container } from 'react-bootstrap'
import style from '../../style/successMessage.module.css'
const SuccessMessage = ({ email }) => {
	return (
		<>
			<Container>
				<Card className='mb-3'>
					<Card.Body>
						<h3 className={style['message']}>Successfully</h3>
						<Row className='text-center'>
							<i
								className={`far fa-check-circle mb-5 ${style['success-icon']}`}
							></i>
						</Row>
						<h5 className='text-center'>Reset password link has been sent.</h5>
						<h6 className='text-center'> ~ {email} ~</h6>
					</Card.Body>
				</Card>
			</Container>
		</>
	)
}

export default SuccessMessage
