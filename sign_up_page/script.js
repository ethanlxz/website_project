const container = document.
querySelector(".container"); 
const signUpBtn = document.
querySelector(".green-bg button");

signUpBtn.addEventListener("click", 
() => {
    container.classList.toggle("change");
});


const email = document.getElementById('email');
const password = document.getElementById('password');
const username = document.getElementById('username');
const submit = document.getElementById('submit');


// runs when you press the lets go button
submit.addEventListener('click', (event) => {
	event.preventDefault();

	// alert("hello");

	checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const usernameValue = username.value.trim();

	if(usernameValue === '') {
		setErrorFor(username, ' Username cannot be blank');
	} else {
		setSuccessFor(username);
	}

	if(emailValue === '') {
		setErrorFor(email, ' Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Invalid email');
	} else {
		setSuccessFor(email);
	}
	
	if(passwordValue === '') {
		setErrorFor(password, ' Password cannot be blank');
	} else {
		setSuccessFor(password);
	}

	if(usernameValue !== '' && emailValue !== '' && passwordValue !== '' && isEmail(emailValue))
	{ 
		window.location.href = "../main_page/index.html";
	}

}

function setErrorFor(id, message) {
	const parent = id.parentElement
	const p = parent.querySelector('p');
	p.textContent = message;
	p.style.visibility = 'visible';
}

function setPassErrorFor(id, message) {
	const parent = id.parentElement
	const p = parent.querySelector('p');
	p.textContent = message;
	p.style.visibility = 'visible';
}

function setSuccessFor(id) {
	// const field = input.parentElement;
	// field.className = 'field success';

	const parent = id.parentElement
	const p = parent.querySelector('p');
	p.style.visibility = 'hidden';

	// alert("correct");
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}