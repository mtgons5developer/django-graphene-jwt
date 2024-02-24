import client from apolloClientPath;

// Define a function to handle the creation of a new product
function createProduct(productName, productDescription, productPrice) {
    // Send a GraphQL mutation to create a new product
    client.mutate({
        mutation: gql`
            mutation CreateProduct($name: String!, $description: String!, $price: Float!) {
                createProduct(name: $name, description: $description, price: $price) {
                    id
                    name
                    description
                    price
                }
            }
        `,
        variables: {
            name: productName,
            description: productDescription,
            price: parseFloat(productPrice)
        }
    }).then(function(response) {
        // Handle success
        console.log('Product created successfully:', response.data.createProduct);
        // You may want to update the UI to reflect the newly created product
    }).catch(function(error) {
        // Handle error
        console.error('Error creating product:', error);
    });
}

// Function to handle the deletion of selected products
function deleteSelectedProducts(selectedProductIds) {
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
        // Reload the page or update the UI as needed
    })
    .catch(error => console.error('Error:', error));
}

function deleteProduct(productId) {
    // Construct the GraphQL mutation for deleting a product
    var deleteProductMutation = `
        mutation DeleteProduct($id: ID!) {
            deleteProduct(id: $id) {
                success
                message
            }
        }
    `;
    
    // Variables for the GraphQL mutation
    var variables = { id: productId };

    // Make a POST request to your GraphQL endpoint
    fetch('/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
            query: deleteProductMutation,
            variables: variables
        })
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response
        console.log(data);
        // Optionally, update the UI or perform other actions based on the response
    })
    .catch(error => console.error('Error:', error));
}

// Event listener for the Save button in the product form
$('#save-product').click(function() {
    // Determine if we are creating a new product or editing an existing one
    // Call the appropriate function (createProduct or editProduct)
});

// Event listener for the Cancel button in the product form
$('#cancel-product').click(function() {
    hideProductForm();
});

// Event listener for the Delete Selected Products button
$('#delete-selected').click(function() {
    deleteSelectedProducts();
});

// Event listener for the Select All checkbox
$('#select-all-checkbox').change(function() {
    $('.product-checkbox').prop('checked', $(this).prop('checked'));
});

// Event listener for the Edit Product buttons
$(document).on('click', '.edit-product-btn', function() {
    var productId = $(this).data('product-id');
    editProduct(productId);
});

// Event listener for the Delete Product buttons
$(document).on('click', '.delete-product-btn', function() {
    var productId = $(this).data('product-id');
    deleteProduct(productId);
});
