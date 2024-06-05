
const email = document.getElementById('email');
const password = document.getElementById('password');
const login = document.getElementById('login');


// runs when you press the login button
login.addEventListener('click', (event) => {
	event.preventDefault();

	checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();


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

	if ( (emailValue.localeCompare("admin@gmail.com") == 0) && (passwordValue.localeCompare("admin") == 0) ) {
		window.location.href = "../admin_page/admin.html";
	}
}


function setErrorFor(id, message) {
	// const field = input.parentElement;
	// alert(input  + message);
	// test 1
	// const text = document.getElementById('email-text');
	// text.content = message;
	// text.visibility = visible;
	const parent = id.parentElement
	const p = parent.querySelector('p');
	p.textContent = message;
	p.style.visibility = 'visible';

	// field.className = 'field error';
	// small.innerText = message; 

	// alert(input  + message);
}

function setPassErrorFor(id, message) {
	// const field = input.parentElement;

	const parent = id.parentElement
	const p = parent.querySelector('p');
	p.textContent = message;
	p.style.visibility = 'visible';

	// field.className = 'field error';
	// small.innerText = message;
	// alert(input  + message);
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