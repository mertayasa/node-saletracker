import express from "express";
const router = express.Router()

router.get('/get-users', (req, res) => {
	const users = [
		{
			name: 'John',
			age: '30'
		},
		{
			name: 'Jane',
			age: '25'
		},
		{
			name: 'Bob',
			age: '20'
		},
		{
			name: 'Mary',
			age: '35'
		}
	]

	res.send(users)
})

export default router