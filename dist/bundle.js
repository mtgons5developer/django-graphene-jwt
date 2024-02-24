/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./myapp/static/scripts.js":
/*!*********************************!*\
  !*** ./myapp/static/scripts.js ***!
  \*********************************/
/***/ (() => {

eval("var _templateObject;\nfunction _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n// Define a function to handle the creation of a new product\nfunction createProduct() {\n  var productName = $('#product-name').val();\n  var productDescription = $('#product-description').val();\n  var productPrice = $('#product-price').val();\n\n  // Send a GraphQL mutation to create a new product\n  client.mutate({\n    mutation: gql(_templateObject || (_templateObject = _taggedTemplateLiteral([\"\\n            mutation CreateProduct($name: String!, $description: String!, $price: Float!) {\\n                createProduct(name: $name, description: $description, price: $price) {\\n                    id\\n                    name\\n                    description\\n                    price\\n                }\\n            }\\n        \"]))),\n    variables: {\n      name: productName,\n      description: productDescription,\n      price: parseFloat(productPrice)\n    }\n  }).then(function (response) {\n    // Handle success\n    console.log('Product created successfully:', response.data.createProduct);\n    // You may want to update the UI to reflect the newly created product\n  })[\"catch\"](function (error) {\n    // Handle error\n    console.error('Error creating product:', error);\n  });\n}\n\n// Function to handle the deletion of selected products\nfunction deleteSelectedProducts() {\n  // Get the IDs of selected products\n  var selectedProductIds = [];\n  $('.product-checkbox:checked').each(function () {\n    selectedProductIds.push($(this).val());\n  });\n\n  // Construct the GraphQL mutation for deleting selected products\n  var deleteProductsMutation = \"\\n        mutation DeleteProducts($ids: [ID!]!) {\\n            deleteProducts(ids: $ids) {\\n                success\\n                message\\n            }\\n        }\\n    \";\n\n  // Variables for the GraphQL mutation\n  var variables = {\n    ids: selectedProductIds\n  };\n\n  // Make a POST request to your GraphQL endpoint\n  fetch('/graphql/', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n      'X-CSRFToken': csrfToken\n    },\n    body: JSON.stringify({\n      query: deleteProductsMutation,\n      variables: variables\n    })\n  }).then(function (response) {\n    return response.json();\n  }).then(function (data) {\n    // Handle the response\n    console.log(data);\n    // Reload the page or update the UI as needed\n  })[\"catch\"](function (error) {\n    return console.error('Error:', error);\n  });\n}\n\n// Event listener for the Save button in the product form\n$('#save-product').click(function () {\n  // Determine if we are creating a new product or editing an existing one\n  // Call the appropriate function (createProduct or editProduct)\n});\n\n// Event listener for the Cancel button in the product form\n$('#cancel-product').click(function () {\n  hideProductForm();\n});\n\n// Event listener for the Delete Selected Products button\n$('#delete-selected').click(function () {\n  deleteSelectedProducts();\n});\n\n// Event listener for the Select All checkbox\n$('#select-all-checkbox').change(function () {\n  $('.product-checkbox').prop('checked', $(this).prop('checked'));\n});\n\n// Event listener for the Edit Product buttons\n$(document).on('click', '.edit-product-btn', function () {\n  var productId = $(this).data('product-id');\n  editProduct(productId);\n});\n\n// Event listener for the Delete Product buttons\n$(document).on('click', '.delete-product-btn', function () {\n  var productId = $(this).data('product-id');\n  deleteProduct(productId);\n});\n\n//# sourceURL=webpack:///./myapp/static/scripts.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./myapp/static/scripts.js"]();
/******/ 	
/******/ })()
;