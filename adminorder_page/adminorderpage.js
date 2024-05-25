document.getElementById('showFormBtn').addEventListener('click', showForm);
document.getElementById('hideFormBtn').addEventListener('click', hideForm);
document.getElementById('addOrderBtn').addEventListener('click', addOrder);

// Check if there are any saved orders in cookies when the page loads
window.addEventListener('load', loadOrdersFromCookies);

function showForm() {
    document.getElementById('orderForm').style.display = 'block';
}

function hideForm() {
    document.getElementById('orderForm').style.display = 'none';
}

function addOrder() {
    const orderId = document.getElementById('orderId').value;
    const dateTime = document.getElementById('dateTime').value;
    const customerName = document.getElementById('customerName').value;
    const status = document.getElementById('status').value;
    const itemsOrdered = document.getElementById('itemsOrdered').value;
    const totalAmount = document.getElementById('totalAmount').value;

    const table = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);
    const cell7 = newRow.insertCell(6);

    cell1.textContent = orderId;
    cell2.textContent = dateTime;
    cell3.textContent = customerName;
    cell4.innerHTML = `<span class="status ${status}">${capitalize(status)}</span>`;
    cell5.textContent = itemsOrdered;
    cell6.textContent = `RM${parseFloat(totalAmount).toFixed(2)}`;
    cell7.innerHTML = '<button class="btn btn-delete" onclick="deleteOrder(this)">Delete</button>';

    // Save the order to cookies
    saveOrderToCookies(orderId, dateTime, customerName, status, itemsOrdered, totalAmount);

    document.getElementById('orderForm').reset();
    hideForm();
}

function deleteOrder(button) {
    const row = button.parentElement.parentElement;
    const orderId = row.cells[0].textContent; // Get orderId from the row
    row.parentElement.removeChild(row);

    // Delete the order from cookies
    deleteOrderFromCookies(orderId);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function saveOrderToCookies(orderId, dateTime, customerName, status, itemsOrdered, totalAmount) {
    // Retrieve existing orders from cookies or initialize an empty array
    const orders = JSON.parse(getCookie('orders') || '[]');

    // Add the new order to the array
    orders.push({
        orderId,
        dateTime,
        customerName,
        status,
        itemsOrdered,
        totalAmount
    });

    // Save the updated orders array to cookies
    setCookie('orders', JSON.stringify(orders), 30); // 30 days expiration
}

function deleteOrderFromCookies(orderId) {
    // Retrieve existing orders from cookies
    const orders = JSON.parse(getCookie('orders') || '[]');

    // Filter out the order to be deleted
    const updatedOrders = orders.filter(order => order.orderId !== orderId);

    // Save the updated orders array to cookies
    setCookie('orders', JSON.stringify(updatedOrders), 30); // 30 days expiration
}

function loadOrdersFromCookies() {
    // Retrieve existing orders from cookies
    const orders = JSON.parse(getCookie('orders') || '[]');

    // Iterate over each order and add it to the table
    orders.forEach(order => {
        const table = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();

        newRow.insertCell(0).textContent = order.orderId;
        newRow.insertCell(1).textContent = order.dateTime;
        newRow.insertCell(2).textContent = order.customerName;
        newRow.insertCell(3).innerHTML = `<span class="status ${order.status}">${capitalize(order.status)}</span>`;
        newRow.insertCell(4).textContent = order.itemsOrdered;
        newRow.insertCell(5).textContent = `RM${parseFloat(order.totalAmount).toFixed(2)}`;
        newRow.insertCell(6).innerHTML = '<button class="btn btn-delete" onclick="deleteOrder(this)">Delete</button>';
    });
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}
