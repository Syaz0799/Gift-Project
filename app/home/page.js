"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./Home.css";

export default function Home() {
  const { addToCart } = useCart();
  const [visibleVouchers, setVisibleVouchers] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [userPoints, setUserPoints] = useState(10000);
  const [voucherCode, setVoucherCode] = useState("");

  const vouchers = [
    { id: 1, name: "Lenovo 27\" Monitor", price: 2500, image: "/image/lenovo.jpeg" },
    { id: 2, name: "Surface Laptop Go 2", price: 2500, image: "/image/lenovo2.jpeg" },
    { id: 3, name: "Surface Laptop 4", price: 7000, image: "/image/Surface4.jpg" },
    { id: 4, name: "Surface Laptop Studio", price: 8890, image: "/image/Surface5.png", isNew: true },
    { id: 5, name: "Lenovo Headset", price: 1500, image: "/image/headphone.jpg" },
    { id: 6, name: "HP Laptop", price: 2500, image: "/image/hplap.PNG", isNew: true },
    { id: 7, name: "Asus RTX4070 Ti Graphic Card", price: 8799, image: "/image/Card.jpeg", isNew: true },
    { id: 8, name: "Zotac RTX4090 Graphic Card", price: 8799, image: "/image/zt.jpg" },
  ];

  const handleAddToCart = (voucher) => {
    addToCart({ ...voucher, quantity: 1 });
    alert(`${voucher.name} has been added to your cart!`);
  };

  const handleShowMore = () => setVisibleVouchers((prev) => prev + 4);

  const filteredVouchers = vouchers.filter((voucher) =>
    voucher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openRedeemModal = (voucher) => {
    setSelectedVoucher(voucher);
    setAgreeTerms(false);
    setShowTermsModal(true);
  };

  const handleAcceptTerms = () => {
    if (agreeTerms) {
      const remainingPoints = userPoints - selectedVoucher.price;
      setUserPoints(remainingPoints);
      setVoucherCode(`VCH-${Date.now().toString().slice(-6)}`);
      setShowTermsModal(false);
      setShowSuccessModal(true);
    } else {
      alert("Please agree to the redemption terms and policies.");
    }
  };

  const handleDownloadVoucher = () => {
    const element = document.createElement("a");
    const content = `🎫 Voucher Redeemed:\n\nProduct: ${selectedVoucher.name}\nPoints Used: ${selectedVoucher.price}\nVoucher Code: ${voucherCode}`;
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Voucher-${selectedVoucher.name}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="home-container">
      {/* Category Section */}
      <section className="category-section">
        <h2 className="section-title">Browse The Category</h2>
        <p className="section-subtitle">The best way to get the product you love.</p>
        <div className="category-grid">
          <Link href="/shop?category=mobile" className="category-link">
            <div className="category-card mobile">
              <img src="/image/mobile.jpeg" alt="Mobile" />
              <h3>Mobile</h3>
            </div>
          </Link>
          <Link href="/shop?category=computer" className="category-link">
            <div className="category-card computer">
              <img src="/image/computer.jpg" alt="Computer/Laptop" />
              <h3>Computer / Laptop</h3>
            </div>
          </Link>
          <Link href="/shop?category=electronic" className="category-link">
            <div className="category-card electronic">
              <img src="/image/pnter.jpeg" alt="Electronic Device" />
              <h3>Electronic Device</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Search */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Vouchers */}
      <section className="voucher-section">
        <h2 className="section-title">Latest Voucher</h2>
        <div className="voucher-grid">
          {filteredVouchers.slice(0, visibleVouchers).map((voucher) => (
            <div key={voucher.id} className={`voucher-card ${voucher.isNew ? "new" : ""}`}>
              <img src={voucher.image} alt={voucher.name} />
              <h4>{voucher.name}</h4>
              <p>{voucher.price.toLocaleString()}.00 Points</p>
              <button className="add-to-cart" onClick={() => handleAddToCart(voucher)}>Add to Cart</button>
              <button className="redeem-btn" onClick={() => openRedeemModal(voucher)}>Redeem</button>
              <Link href={`/product/${voucher.id}`} className="view-details">View Details</Link>
            </div>
          ))}
        </div>
        {visibleVouchers < filteredVouchers.length && (
          <button className="show-more" onClick={handleShowMore}>Show More</button>
        )}
      </section>

      {/* Terms & Conditions Modal */}
      {showTermsModal && selectedVoucher && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Redemption Terms and Policies</h3>
            <ul className="tnc-list">
              <li><b>Points Deduction:</b> {selectedVoucher.price} points will be deducted from your balance.</li>
              <li><b>Non-Refundable:</b> Points will not be returned once redemption is completed.</li>
              <li><b>Product Availability:</b> Subject to availability.</li>
              <li><b>Expiration:</b> Points must be valid and not expired.</li>
              <li><b>One-Time Use:</b> Each voucher is redeemable once.</li>
            </ul>
            <label className="checkbox-label">
              <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
              I agree to the redemption terms and policies.
            </label>
            <div className="modal-buttons">
              <button className="accept-btn" onClick={handleAcceptTerms}>Accept</button>
              <button className="close-btn" onClick={() => setShowTermsModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && selectedVoucher && (
        <div className="modal-overlay">
          <div className="modal-content success">
            <div className="success-icon">✔</div>
            <h2>Successfully Redeemed</h2>
            <p>Your Points Balance: {userPoints.toLocaleString()}</p>
            <p>Apply the voucher code in the cart to deduct points.</p>
            <button className="download-btn" onClick={handleDownloadVoucher}>Download Voucher</button>
            <button className="close-btn" onClick={() => setShowSuccessModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
