"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import "./Cart.css";
import { useState } from "react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, markAsRedeemed } = useCart();
  const { pointsBalance, deductPoints, pendingRedemption, clearPendingRedemption } = useUser();
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [voucherMessage, setVoucherMessage] = useState("");

  // Handle increment quantity
  const handleIncrement = (cartItemId, currentQuantity) => {
    updateQuantity(cartItemId, currentQuantity + 1);
  };

  // Handle decrement quantity
  const handleDecrement = (cartItemId, currentQuantity) => {
    updateQuantity(cartItemId, currentQuantity - 1);
  };

  // Handle delete item
  const handleDelete = (cartItemId) => {
    removeFromCart(cartItemId);
    alert("Item removed from cart!");
  };

  // Calculate total points (excluding redeemed items)
  const totalPoints = cart.reduce((total, item) => {
    const itemPrice = item.isRedeemed ? 0 : item.price; // If redeemed, price is 0
    return total + itemPrice * item.quantity;
  }, 0);

  // Handle voucher code application
  const handleApplyVoucher = () => {
    if (!voucherCode) {
      setVoucherMessage("Please enter a voucher code.");
      setVoucherApplied(false);
      return;
    }

    // Check if there is a pending redemption and the voucher code matches
    if (
      pendingRedemption &&
      pendingRedemption.voucherCode === voucherCode &&
      cart.some((item) => item.id === pendingRedemption.productId)
    ) {
      // Deduct points for the redeemed product
      const success = deductPoints(pendingRedemption.price);
      if (success) {
        // Mark the product as redeemed in the cart
        markAsRedeemed(pendingRedemption.productId);
        setVoucherApplied(true);
        setVoucherMessage(
          `Voucher applied successfully! ${pendingRedemption.price} points deducted for ${pendingRedemption.productName}.`
        );
        clearPendingRedemption(); // Clear the pending redemption
      } else {
        setVoucherApplied(false);
        setVoucherMessage(
          `Insufficient points to redeem ${pendingRedemption.productName}. You need ${pendingRedemption.price} points, but you only have ${pointsBalance} points.`
        );
      }
    } else {
      setVoucherApplied(false);
      setVoucherMessage("Invalid voucher code or no matching product in cart.");
    }
  };

  return (
    <div className="cart-page-container">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link href="/home">Home</Link> &gt; <span>Cart</span>
      </nav>

      {/* Cart Title */}
      <h1 className="cart-title">Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart-message">
          Your cart is empty. <Link href="/shop">Go shopping!</Link>
        </p>
      ) : (
        <div className="cart-content">
          {/* Cart Items Table */}
          <div className="cart-table">
            {/* Table Header */}
            <div className="cart-table-header">
              <div className="header-item">Product</div>
              <div className="header-item">Price</div>
              <div className="header-item">Quantity</div>
              <div className="header-item">Subtotal</div>
            </div>

            {/* Table Rows */}
            {cart.map((item) => (
              <div key={item.cartItemId} className="cart-table-row">
                {/* Product Column */}
                <div className="cart-table-cell product-cell">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <span>{item.name}</span>
                  {item.isRedeemed && <span className="redeemed-label"> (Redeemed)</span>}
                </div>

                {/* Price Column */}
                <div className="cart-table-cell">
                  {item.isRedeemed ? "0" : item.price.toLocaleString()}.00 Points
                </div>

                {/* Quantity Column */}
                <div className="cart-table-cell quantity-cell">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleDecrement(item.cartItemId, item.quantity)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleIncrement(item.cartItemId, item.quantity)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal Column */}
                <div className="cart-table-cell">
                  {item.isRedeemed
                    ? "0"
                    : (item.price * item.quantity).toLocaleString()}.00 Points
                </div>
                <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.cartItemId)}
                  >
                    Delete
                  </button>
              </div>
            ))}
          </div>

          {/* Cart Totals Section */}
          <div className="cart-totals">
            <h2 className="cart-totals-title">Cart Totals</h2>
            <div className="totals-row">
              <span>Subtotal</span>
              <span>{totalPoints.toLocaleString()}.00 Points</span>
            </div>
            <div className="totals-row">
              <span>Total</span>
              <span className="total-amount">{totalPoints.toLocaleString()}.00 Points</span>
            </div>

            {/* Voucher Code Input */}
            <div className="voucher-section">
              <label htmlFor="voucher-code">Voucher Code</label>
              <div className="voucher-input-container">
                <input
                  type="text"
                  id="voucher-code"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  placeholder="Enter voucher code"
                  disabled={voucherApplied}
                />
                <button
                  className="apply-voucher-btn"
                  onClick={handleApplyVoucher}
                  disabled={voucherApplied}
                >
                  Apply
                </button>
              </div>
              {voucherMessage && (
                <p className={`voucher-message ${voucherApplied ? "success" : "error"}`}>
                  {voucherMessage}
                </p>
              )}
            </div>

            <button className="checkout-btn">Check Out</button>
          </div>
        </div>
      )}
    </div>
  );
}