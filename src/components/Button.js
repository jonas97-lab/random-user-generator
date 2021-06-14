import React from 'react'

function Button({ activeUser, onClickHandler }) {
	return (
		<div>
			<button onClick={onClickHandler}>
				{!activeUser ? 'Get User' : 'Get Another User'}
			</button>
		</div>
	)
}

export default Button
