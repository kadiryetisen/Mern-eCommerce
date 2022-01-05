import { useState, useCallback, useEffect } from 'react'

export const useAuth = () => {
	const [token, setToken] = useState(false)
	const [userId, setUserId] = useState()
	const [admin, setAdmin] = useState(null)

	const login = useCallback((id, accessToken, isAdmin) => {
		setUserId(id)
		setToken(accessToken)
		setAdmin(isAdmin)
		sessionStorage.setItem(
			'userData',
			JSON.stringify({
				userId: id,
				token: accessToken,
				isAdmin: isAdmin,
			})
		)
	}, [])

	const logout = useCallback(async () => {
		setToken(false)
		setUserId(null)
		setAdmin(false)
		sessionStorage.removeItem('userData')
	}, [])

	useEffect(() => {
		const storedData = JSON.parse(sessionStorage.getItem('userData'))
		if (storedData && storedData.token) {
			login(storedData.userId, storedData.token, storedData.isAdmin)
		}
	}, [login, logout])

	return { token, login, logout, userId, admin }
}
