"use client";

import Link from "next/link";
import { useState, use } from "react";
import { useCart } from "../../../context/CartContext";
import { useUser } from "../../../context/UserContext";
import "./Product.css";

export default function ProductDetail({ params }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const { pointsBalance, setPendingRedemption } = useUser();

  // Define product first, before using it in useState
  const product = {
    id: id,
    name: "Lenovo 27\" Monitor",
    price: 2500,
    rating: 4,
    reviews: 5,
    images: ["/image/lenovo.jpeg", "/image/lenovo2.jpeg"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    additionalInfo:
      "Screen Size: 27 inches\nResolution: 1920x1080\nRefresh Rate: 60Hz\nPorts: HDMI, VGA, DisplayPort",
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [activeTab, setActiveTab] = useState("description");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");

  const relatedProducts = [
    { id: 2, name: "Lenovo Headset", price: 1500, image: "/image/headphone.jpg" },
    { id: 3, name: "Asus RTX4070 Ti", price: 8799, image: "/image/Card.jpeg" },
    { id: 4, name: "Zotac RTX4090", price: 8799, image: "/image/zt.jpg" },
    { id: 5, name: "HP Laptop", price: 2500, image: "/image/hplap.PNG" },
  ];

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    alert(`${product.name} has been added to your cart!`);
  };

  const handleRedeem = () => {
    if (!agreedToTerms) {
      alert("You must agree to the terms and policies before redeeming.");
      return;
    }

    if (pointsBalance >= product.price) {
      // Generate a voucher code
      const generatedVoucherCode = `VOUCHER-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      setVoucherCode(generatedVoucherCode);

      // Store the product and voucher code in pendingRedemption
      setPendingRedemption({
        productId: product.id,
        productName: product.name,
        price: product.price,
        voucherCode: generatedVoucherCode,
      });

      // Show the modal
      setShowModal(true);
    } else {
      alert(
        `Insufficient points to redeem ${product.name}. You need ${product.price} points, but you only have ${pointsBalance} points.`
      );
    }
  };

  const handleDownloadVoucher = () => {
    alert(`Voucher Code: ${voucherCode}\nUse this code at checkout to apply your redemption and deduct points.`);
    setShowModal(false);
  };

  return (
    <div className="product-container">
      {/* Redemption Success Modal */}
      {showModal && (
        <div className="redemption-modal-overlay">
          <div className="redemption-modal">
            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
              ✕
            </button>
            <div className="modal-content">
              <div className="success-icon">✔</div>
              <h2>Successfully Redeemed</h2>
              <p>Your Points Balance: {pointsBalance.toLocaleString()}</p>
              <p>Apply the voucher code in the cart to deduct points.</p>
              <button className="download-voucher-btn" onClick={handleDownloadVoucher}>
                Download Voucher
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="breadcrumb">
        <Link href="/home">Home</Link> &gt; <Link href="/shop">Shop</Link> &gt;{" "}
        <span>{product.name}</span>
      </nav>

      <div className="product-detail">
        <div className="product-images">
          <div className="thumbnail-gallery">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className={selectedImage === image ? "thumbnail active" : "thumbnail"}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
          <div className="main-image">
            <img src={selectedImage} alt={product.name} />
          </div>
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">{product.price.toLocaleString()}.00 Points</p>
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < product.rating ? "star filled" : "star"}>
                ★
              </span>
            ))}
            <span className="review-count">({product.reviews} reviews)</span>
          </div>
          <p className="product-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="product-actions">
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <div className="redeem-actions">
              <button
                className="redeem"
                onClick={handleRedeem}
                disabled={!agreedToTerms}
              >
                Redeem
              </button>
            </div>
          </div>

          {/* Redemption Terms and Policies Section */}
          <div className="redemption-terms">
            <h3>Redemption Terms and Policies</h3>
            <ul>
              <li>
                <strong>Points Deduction:</strong> Upon applying the voucher in the cart, the required points ({product.price.toLocaleString()}) will be deducted from your balance.
              </li>
              <li>
                <strong>Non-Refundable:</strong> Redeemed products are non-refundable. Points will not be returned once the redemption is completed.
              </li>
              <li>
                <strong>Product Availability:</strong> Redemption is subject to product availability. If the product is out of stock, you will be notified, and your points will not be deducted.
              </li>
              <li>
                <strong>Expiration:</strong> Points used for redemption must be valid and not expired. Check your points expiration date in your account settings.
              </li>
              <li>
                <strong>One-Time Use:</strong> Each product can only be redeemed once per user unless otherwise stated.
              </li>
            </ul>
            <div className="terms-agreement">
              <label>
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                I agree to the redemption terms and policies.
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="tabs">
        <div className="tab-buttons">
          <button
            className={activeTab === "description" ? "tab active" : "tab"}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={activeTab === "additional" ? "tab active" : "tab"}
            onClick={() => setActiveTab("additional")}
          >
            Additional Information
          </button>
          <button
            className={activeTab === "reviews" ? "tab active" : "tab"}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews [{product.reviews}]
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "description" && <p>{product.description}</p>}
          {activeTab === "additional" && (
            <p style={{ whiteSpace: "pre-line" }}>{product.additionalInfo}</p>
          )}
          {activeTab === "reviews" && (
            <p>No reviews yet. Be the first to review this product!</p>
          )}
        </div>
      </div>

      <div className="additional-images">
        <img src="/image/lenovo.jpeg" alt="Additional Image 1" />
        <img src="/image/lenovo2.jpeg" alt="Additional Image 2" />
      </div>

      <div className="related-products">
        <h2 className="section-title">Related Products</h2>
        <div className="product-grid">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="product-card">
              <img src={relatedProduct.image} alt={relatedProduct.name} />
              <h4>{relatedProduct.name}</h4>
              <p>{relatedProduct.price.toLocaleString()}.00 Points</p>
              <Link href={`/product/${relatedProduct.id}`} className="view-details">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}