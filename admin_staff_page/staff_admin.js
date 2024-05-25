// Get HTML elements
const addButton = document.getElementById('addButton');
const modal = document.getElementById('modal');
const closeButton = document.getElementsByClassName('close')[0];
const saveButton = document.getElementById('saveButton');
const staffList = document.getElementById('staffList');

// Search staff by ID
const searchButton = document.getElementById('searchButton');
searchButton.onclick = function() {
    const searchInput = document.getElementById('searchInput').value;
    const rows = staffList.getElementsByTagName('tr');

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

// Save staff details
let nextEmployeeId = 1;
saveButton.onclick = function() {
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const email = document.getElementById('email').value;

    // Validate inputs
    if (name === '' || position === '' || email === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Validate email format
    if (!email.match(/.+@gmail\.com$/)) {
        alert('Email must be in the format example@gmail.com');
        return;
    }

    // Create staff row
    const newRow = staffList.insertRow();
    const newEmployeeId = nextEmployeeId++;
    newRow.innerHTML = `<td>${newEmployeeId}</td><td>${name}</td><td>${position}</td><td>${email}</td><td><button onclick="editStaff(this)">Edit</button><button onclick="deleteStaff(this)">Delete</button></td>`;

    // Save staff details in a cookie
    const staffDetails = {
        id: newEmployeeId,
        name: name,
        position: position,
        email: email
    };

    // Set cookie expiration date to one month from now
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1);

    // Convert staffDetails object to JSON string and set it as a cookie
    document.cookie = `staffDetails=${JSON.stringify(staffDetails)};expires=${expirationDate.toUTCString()}`;

    // Clear input fields
    document.getElementById('name').value = '';
    document.getElementById('position').value = '';
    document.getElementById('email').value = '';

    // Hide modal
    modal.style.display = 'none';
};

// Show modal
addButton.onclick = function() {
    document.getElementById('modalTitle').textContent = 'Add Staff';
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

// Edit staff details
function editStaff(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');

    document.getElementById('modalTitle').textContent = 'Edit Staff';
    document.getElementById('staffId').value = row.rowIndex;
    document.getElementById('name').value = cells[1].textContent;
    document.getElementById('position').value = cells[2].textContent;
    document.getElementById('email').value = cells[3].textContent;

    modal.style.display = 'block';
}

// Delete staff
function deleteStaff(button) {
    if (confirm('Are you sure you want to delete this staff?')) {
        const row = button.parentNode.parentNode;
        const staffId = row.getElementsByTagName('td')[0].textContent;
        deleteStaffFromCookies(staffId); 
        row.parentNode.removeChild(row); 
    }
}

// Function to delete staff detail from cookies
function deleteStaffFromCookies(staffId) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('staffDetails=')) {
            const json = cookie.substring('staffDetails='.length);
            const staffDetails = JSON.parse(json);
            if (staffDetails.id == staffId) {
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() - 1); // Set expiration date in the past to delete the cookie
                document.cookie = `staffDetails=${JSON.stringify(staffDetails)};expires=${expirationDate.toUTCString()}`;
                break;
            }
        }
    }
}



// Function to retrieve staff details from cookies
function getStaffDetails() {
    const cookies = document.cookie.split(';');
    const staffDetails = [];
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('staffDetails=')) {
            const json = cookie.substring('staffDetails='.length);
            staffDetails.push(JSON.parse(json));
        }
    }
    return staffDetails;
}

// Function to display staff details in the staff list
function displayStaffDetails() {
    const staffDetails = getStaffDetails();
    for (const details of staffDetails) {
        const newRow = staffList.insertRow();
        newRow.innerHTML = `<td>${details.id}</td><td>${details.name}</td><td>${details.position}</td><td>${details.email}</td><td><button onclick="editStaff(this)">Edit</button><button onclick="deleteStaff(this)">Delete</button></td>`;
    }
}

// Call displayStaffDetails function when the page loads
window.onload = displayStaffDetails;