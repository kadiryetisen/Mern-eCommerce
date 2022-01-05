import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from '../../style/footer.module.css'
export const Footer = () => {
	return (
		<>
			<Container className=' mt-5'>
				<Row>
					<Col md={6}>
						<h5>YETİŞENLER COMPANY</h5>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis
						maxime sed laboriosam dolorem voluptatum sit a nulla nostrum enim
						quidem!
					</Col>
					<Col md={6} className='text-end'>
						<h5 className='mb-5'>Follow us on social media</h5>
						<ul>
							<Link className='me-4' to={'/'}>
								<i className={`fab fa-facebook ${styles.facebook}`}></i>
							</Link>

							<Link className='me-4' to={'/'}>
								<i className={`fab fa-instagram ${styles.instagram}`}></i>
							</Link>
							<Link className='me-3' to={'/'}>
								<i className={`fab fa-twitter ${styles.twitter}`}></i>
							</Link>
						</ul>
					</Col>
				</Row>
			</Container>
			<div className='footer-copyright text-center py-3'>
				<Container fluid>
					&copy; {new Date().getFullYear()} Copyright: YETİŞENLER
				</Container>
			</div>
		</>
	)
}
