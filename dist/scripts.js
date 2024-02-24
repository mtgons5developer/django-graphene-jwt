// Function to handle the deletion of selected products
function deleteSelectedProducts() {
    // Get the IDs of selected products
    var selectedProductIds = [];
    $('.product-checkbox:checked').each(function() {
        selectedProductIds.push($(this).val());
    });

    // Construct the GraphQL mutation for deleting selected products
    var deleteProductsMutation = `
        mutation DeleteProducts($ids: [ID!]!) {
            deleteProducts(ids: $ids) {
                success
                message
            }
        }
    `;

    // Variables for the GraphQL mutation
    var variables = { ids: selectedProductIds };

    // Make a POST request to your GraphQL endpoint
    fetch('/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
            query: deleteProductsMutation,
            variables: variables
        })
    })    
    .then(response => response.json())
    .then(data => {
        // Handle the response
        console.log(data);
        if (data.success) {
            // Reload the page or update the UI as needed
            location.reload(); // For example, you can reload the page to reflect the changes
        } else {
            console.error('Error deleting products:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Function to handle the deletion of a specific product
function deleteProduct(productId) {
    // Make a request to delete the product with the given ID
    // Include the productId in the URL path
    $.ajax({
        url: `/delete_product/${productId}/`, // Include productId in the URL
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken  // Include CSRF token in the headers
        },
        success: function(response) {
            console.log('Product deleted successfully:', productId);
            // Perform any further actions after deleting the product
            // For example, you may want to update the UI or reload the page
            location.reload(); // Reload the page after successful deletion
        },
        error: function(xhr, status, error) {
            console.error('Error deleting product:', error);
            // Handle the error appropriately
        }
    });
}

// Event listener for the Select All checkbox
document.getElementById('select-all-checkbox').addEventListener('change', function() {
    var checkboxes = document.querySelectorAll('.product-checkbox');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = this.checked;
    }, this);
});

// Event listener for the Delete Selected Products button
document.getElementById('delete-selected').addEventListener('click', function() {
    var selectedProductIds = [];
    document.querySelectorAll('.product-checkbox:checked').forEach(function(checkbox) {
        selectedProductIds.push(checkbox.value);
    });
    
    // Print out selected product IDs
    console.log('Selected product IDs:', selectedProductIds);

    // Perform further actions with the selected product IDs, like deleting them
    deleteSelectedProducts();
});

// Event listener for the Delete Product button hide
document.addEventListener('DOMContentLoaded', function() {
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    const deleteButton = document.getElementById('delete-selected');
    
    // Event listener for Select All checkbox
    selectAllCheckbox.addEventListener('change', function() {
        if (this.checked) {
            deleteButton.style.display = 'inline-block'; // Show the Delete button
        } else {
            deleteButton.style.display = 'none'; // Hide the Delete button
        }
    });
});

// Event listener for the Delete Product buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-product-btn')) {
        var productId = event.target.dataset.productId;
        
        // Print out the deleted product ID
        console.log('Delete product with ID:', productId);

        // Perform further actions when a specific product is deleted
        deleteProduct(productId);
    }
});
