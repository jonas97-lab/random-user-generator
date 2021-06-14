import axios from 'axios'
import React, { Fragment, useState } from 'react'
import './App.css'
import Button from './components/Button'

function App() {
	const [userData, setUserData] = useState([])
	const [loading, setLoading] = useState(false)
	const [activeUser, setActiveUser] = useState(false)
	const [activeLink, setActiveLink] = useState(0)

	const onClickHandler = () => {
		setLoading(true)
		setActiveLink(0)
		axios
			.get('https://randomuser.me/api/')
			.then((response) => {
				console.log(response.data.results)
				setUserData(response.data.results)
			})
			.catch((error) => {
				console.log(error)
				setLoading(true)
			})
			.finally(() => {
				setLoading(false)
				setActiveUser(true)
			})
	}

	const icons = [
		'fas fa-user fa-3x',
		'fas fa-envelope fa-3x',
		'fas fa-calendar-alt fa-3x',
		'fas fa-map-marker fa-3x',
		'fas fa-phone fa-3x',
		'fas fa-lock fa-3x',
	]

	const PhraseGenerator = ({ user }) => {
		const phrases = [
			`Hi! My name is ${user.name.first} ${user.name.last}`,
			`My email address is ${user.email}`,
			`I was born on ${user.dob.date.slice(0, 10)}`,
			`I am from ${user.location.country}`,
			`My phone number is ${user.phone}`,
			`My password is ${user.login.password}`,
		]

		return <h1>{phrases[activeLink]}</h1>
	}

	const activeLinkHandler = (index) => {
		setActiveLink(index)
	}

	const style = { color: 'green' }

	return (
		<div className='app'>
			<h1>Random User Generator App</h1>
			<Button activeUser={activeUser} onClickHandler={onClickHandler} />
			{loading ? (
				<h1>Loading ...</h1>
			) : (
				<div className='app__user'>
					{userData.map((user) => {
						return (
							<Fragment key={user.cell}>
								<img src={user.picture.large} alt='User' />
								<PhraseGenerator user={user} />
								<div className='app__icons'>
									{icons.map((icon, index) => {
										return (
											<i
												className={icon}
												onMouseEnter={() => activeLinkHandler(index)}
												style={activeLink === index ? style : null}
											></i>
										)
									})}
								</div>
							</Fragment>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default App
