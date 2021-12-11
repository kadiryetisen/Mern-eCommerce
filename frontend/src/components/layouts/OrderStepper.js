import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

const steps = [
	'Add an address',
	'Select Shipping Company',
	'Approve all Informations',
	'Payment and Finish...',
]

export default function HorizontalStepperWithError({ stepCount }) {
	const isStepFailed = (step) => {
		return step === null
	}

	return (
		<>
			<Box sx={{ width: '100%' }}>
				<Stepper activeStep={stepCount}>
					{steps.map((label, index) => {
						const labelProps = {}
						if (isStepFailed(index)) {
							labelProps.optional = (
								<Typography variant='caption' color='error'>
									Alert message
								</Typography>
							)

							labelProps.error = true
						}

						return (
							<Step key={label}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						)
					})}
				</Stepper>
			</Box>
		</>
	)
}
