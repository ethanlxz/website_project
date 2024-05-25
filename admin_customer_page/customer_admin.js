// Get HTML elements
const addButton = document.getElementById('addButton');
const modal = document.getElementById('modal');
const closeButton = document.getElementsByClassName('close')[0];
const saveButton = document.getElementById('saveButton');
const customerList = document.getElementById('customerList'); // Change to customerList

// Search customers by ID
const searchButton = document.getElementById('searchButton');
searchButton.onclick = function() {
    const searchInput = document.getElementById('searchInput').value;
    const rows = customerList.getElementsByTagName('tr');

    // Loop through each row and hide/show based on search input
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false;

        // Search for ID in the first cell of each row
        if (cells.length > 0 && cells[0].textContent.includes(searchInput)) {
            found = true;
        }

        // Show/hide row based on search result
        if (found) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
};

// Save customer details
let nextCustomerId = 1;
saveButton.onclick = function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Validate inputs
    if (name === '' || email === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Validate email format
    if (!email.match(/.+@gmail\.com$/)) {
        alert('Email must be in the format example@gmail.com');
        return;
    }

    // Create customer row
    const newRow = customerList.insertRow();
    const newCustomerId = nextCustomerId++;
    newRow.innerHTML = `<td>${newCustomerId}</td><td>${name}</td><td>${email}</td><td><button onclick="editCustomer(this)">Edit</button><button onclick="deleteCustomer(this)">Delete</button></td>`;

    // Save customer details in a cookie
    const customerDetails = {
        id: newCustomerId,
        name: name,
        email: email
    };

    // Set cookie expiration date to one month from now
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1);

    // Convert customerDetails object to JSON string and set it as a cookie
    document.cookie = `customerDetails=${JSON.stringify(customerDetails)};expires=${expirationDate.toUTCString()}`;

    // Clear input fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';

    // Hide modal
    modal.style.display = 'none';
};

// Show modal
addButton.onclick = function() {
    document.getElementById('modalTitle').textContent = 'Add Customer';
    modal.style.display = 'block';
};

// Hide modal when close button is clicked
closeButton.onclick = function() {
    modal.style.display = 'none';
};

// Hide modal when clicked outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Edit customer details
function editCustomer(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');

    document.getElementById('modalTitle').textContent = 'Edit Customer';
    document.getElementById('customerId').value = row.rowIndex;
    document.getElementById('name').value = cells[1].textContent;
    document.getElementById('email').value = cells[2].textContent;

    modal.style.display = 'block';
}

// Delete customer
function deleteCustomer(button) {
    if (confirm('Are you sure you want to delete this customer?')) {
        const row = button.parentNode.parentNode;
        const customerId = row.getElementsByTagName('td')[0].textContent;
        deleteCustomerFromCookies(customerId); // Remove customer from cookies
        row.parentNode.removeChild(row); // Remove row from UI
    }
}

// Function to delete customer detail from cookies
function deleteCustomerFromCookies(customerId) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('customerDetails=')) {
            const json = cookie.substring('customerDetails='.length);
            const customerDetails = JSON.parse(json);
            if (customerDetails.id == customerId) {
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() - 1); // Set expiration date in the past to delete the cookie
                document.cookie = `customerDetails=${JSON.stringify(customerDetails)};expires=${expirationDate.toUTCString()}`;
                break;
            }
        }
    }
}


// Function to retrieve customer details from cookies
function getCustomerDetails() {
    const cookies = document.cookie.split(';');
    const customerDetails = [];
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('customerDetails=')) {
            const json = cookie.substring('customerDetails='.length);
            customerDetails.push(JSON.parse(json));
        }
    }
    return customerDetails;
}

// Function to display customer details in the customer list
function displayCustomerDetails() {
    const customerDetails = getCustomerDetails();
    for (const details of customerDetails) {
        const newRow = customerList.insertRow();
        newRow.innerHTML = `<td>${details.id}</td><td>${details.name}</td><td>${details.email}</td><td><button onclick="editCustomer(this)">Edit</button><button onclick="deleteCustomer(this)">Delete</button></td>`;
    }
}

// Call displayCustomerDetails function when the page loads
window.onload = displayCustomerDetails;
