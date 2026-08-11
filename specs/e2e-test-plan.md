# Rahul Shetty Selenium Practice E2E Test Plan

## Application Overview

End-to-end test plan for the Rahul Shetty Academy Selenium Practice e-commerce flow covering product discovery, cart management, and checkout.

## Test Scenarios

### 1. E2E Shopping Journey

**Seed:** `tests/seed.spec.js`

#### 1.1. Product discovery and search

**File:** `tests/e2e/product-discovery.spec.js`

**Steps:**
  1. Open the home page and verify the product catalog loads.
    - expect: The homepage displays product tiles, a search field, and a cart summary.
  2. Search for a known product such as 'Cucumber' or 'Tomato'.
    - expect: Only matching products are shown and the product count updates accordingly.
  3. Search for a non-existent product name.
    - expect: The UI shows no matching results and a clear empty-state message.

#### 1.2. Add products to cart

**File:** `tests/e2e/cart-management.spec.js`

**Steps:**
  1. Select a product and add it to the cart from the product listing.
    - expect: The cart count increases and the product appears in the cart summary.
  2. Add multiple quantities of the same item.
    - expect: The cart total and quantity reflect the updated amount.
  3. Remove an item from the cart.
    - expect: The cart count and total decrease and the item is no longer listed.

#### 1.3. Checkout and order placement

**File:** `tests/e2e/checkout.spec.js`

**Steps:**
  1. Proceed from the cart to checkout with valid customer information.
    - expect: The checkout form accepts the data and the order is placed successfully.
  2. Submit the checkout form with missing required fields.
    - expect: Validation errors are shown and the order is not placed.
  3. Complete the flow and confirm the order success state.
    - expect: A confirmation page or success state is displayed with an order reference or completion message.
