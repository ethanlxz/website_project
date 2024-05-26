document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("modal");
    var addButton = document.getElementById("addButton");
    var closeButton = document.querySelector(".close");
    var saveButton = document.getElementById("saveButton");
    var productList = document.getElementById("ProductList");
    var currentEditRow = null; // Variable to store the row being edited

    // Load saved product data from cookies when the page loads
    loadProductDataFromCookies();

    addButton.addEventListener("click", function() {
        modal.style.display = "block";
        currentEditRow = null; // Reset the currentEditRow when adding a new product
    });

    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    saveButton.addEventListener("click", function() {
        var nameInput = document.getElementById("name");
        var priceInput = document.getElementById("price");
        var categoryInput = document.getElementById("category");

        var productName = nameInput.value;
        var productPrice = priceInput.value;
        var productCategory = categoryInput.value;

        if (productName.trim() !== "" && productPrice.trim() !== "") {
            // Automatically add "RM" before the price
            if (!productPrice.startsWith("RM")) {
                productPrice = "RM " + productPrice;
            }

            if (currentEditRow) {
                // If editing an existing row, update its content
                currentEditRow.cells[0].textContent = productName;
                currentEditRow.cells[1].textContent = productPrice;
                currentEditRow.cells[2].textContent = productCategory;
                currentEditRow = null; // Reset currentEditRow after editing
            } else {
                // If adding a new product, create a new row
                var newRow = document.createElement("tr");
                newRow.innerHTML = "<td>" + productName + "</td><td>" + productPrice + "</td><td>" + productCategory + "</td><td><button>Edit</button><button>Delete</button></td>";
                productList.appendChild(newRow);
            }

            // Save product data to cookies
            saveProductDataToCookies();

            nameInput.value = "";
            priceInput.value = "";
            categoryInput.value = "Shoe"; // Reset to default value

            modal.style.display = "none";
        } else {
            alert("Please enter both product name and price.");
        }
    });

    // Event delegation for edit and delete buttons
    productList.addEventListener("click", function(e) {
        if (e.target && e.target.tagName === "BUTTON") {
            var action = e.target.textContent;
            var row = e.target.parentNode.parentNode;
            if (action === "Edit") {
                // Populate the modal with the product details for editing
                var cells = row.cells;
                document.getElementById("name").value = cells[0].textContent;
                document.getElementById("price").value = cells[1].textContent.replace("RM ", ""); // Remove "RM" before displaying in the input
                document.getElementById("category").value = cells[2].textContent;
                modal.style.display = "block";
                currentEditRow = row; // Set currentEditRow to the row being edited
            } else if (action === "Delete") {
                row.parentNode.removeChild(row);
                // Save product data to cookies after deleting a product
                saveProductDataToCookies();
            }
        }
    });

    // Function to load product data from cookies
    function loadProductDataFromCookies() {
        var cookies = document.cookie.split("; ");
        cookies.forEach(function(cookie) {
            var parts = cookie.split("=");
            if (parts[0] === "productData") {
                var productData = JSON.parse(decodeURIComponent(parts[1]));
                productData.forEach(function(product) {
                    var newRow = document.createElement("tr");
                    newRow.innerHTML = "<td>" + product.name + "</td><td>" + product.price + "</td><td>" + product.category + "</td><td><button>Edit</button><button>Delete</button></td>";
                    productList.appendChild(newRow);
                });
            }
        });
    }

    // Function to save product data to cookies
    function saveProductDataToCookies() {
        var productData = [];
        var rows = productList.getElementsByTagName("tr");
        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName("td");
            if (cells.length === 4) { // Check for 4 cells (name, price, category, action)
                var productName = cells[0].textContent;
                var productPrice = cells[1].textContent;
                var productCategory = cells[2].textContent;
                productData.push({ name: productName, price: productPrice, category: productCategory });
            }
        }
        var expires = new Date();
        expires.setMonth(expires.getMonth() + 1); // Set expiration date to one month from now
        document.cookie = "productData=" + encodeURIComponent(JSON.stringify(productData)) + "; expires=" + expires.toUTCString();
    }
});
