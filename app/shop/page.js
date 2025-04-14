"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import "./Shop.css";

export default function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Add state for search
  const productsPerPage = 8;
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";

  const allProducts = Array.from({ length: 32 }, (_, index) => ({
    id: index + 1,
    name: index % 4 === 0 ? "Lenovo 27\" Monitor" : index % 4 === 1 ? "Surface Laptop Go 2" : index % 4 === 2 ? "Surface Laptop 4" : "Surface Laptop Studio",
    price: index % 4 === 0 ? 2500 : index % 4 === 1 ? 2500 : index % 4 === 2 ? 7000 : 8890,
    image: index % 4 === 0 ? "/image/lenovo.jpeg" : index % 4 === 1 ? "/image/lenovo2.jpeg" : index % 4 === 2 ? "/image/Surface4.jpg" : "/image/Surface5.png",
    isNew: index % 4 === 3,
    category: "computer",
  }));

  const additionalProducts = [
    { id: 33, name: "Samsung Galaxy S23", price: 5000, image: "/image/mobile.jpeg", category: "mobile" },
    { id: 34, name: "iPhone 14", price: 6000, image: "/image/mobile.jpeg", category: "mobile" },
    { id: 35, name: "Printer", price: 2000, image: "/image/pnter.jpeg", category: "electronic" },
    { id: 36, name: "Smart Speaker", price: 1500, image: "/image/pnter.jpeg", category: "electronic" },
  ];

  const products = [...allProducts, ...additionalProducts];

  // Filter by category
  const categoryFiltered = category === "all"
    ? products
    : products.filter((product) => product.category === category);

  // Filter by search term
  const searchFiltered = categoryFiltered.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProducts = searchFiltered.length;

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = searchFiltered.slice(startIndex, startIndex + productsPerPage);
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const displayCategory =
    category === "all"
      ? "All Products"
      : category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="shop-container">
      {/* Category Header */}
      <div className="category-header">
        <nav className="breadcrumb">
          <Link href="/home">Home</Link> &gt; <span>{displayCategory}</span>
        </nav>
        <h1 className="category-title">{displayCategory}</h1>
      </div>

      {/*Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder={`Search in ${displayCategory.toLowerCase()}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-left">
          <button className="filter-btn">Filter</button>
          <span className="result-count">
            Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, totalProducts)} of {totalProducts} results
          </span>
        </div>
        <div className="filter-right">
          <label htmlFor="show">Show</label>
          <select id="show" className="sort-select">
            <option value="16">16</option>
            <option value="32">32</option>
            <option value="48">48</option>
          </select>
          <label htmlFor="sort-by">Sort by</label>
          <select id="sort-by" className="sort-select">
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {currentProducts.map((product) => (
          <div key={product.id} className={`product-card ${product.isNew ? "new" : ""}`}>
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <p>{product.price.toLocaleString()}.00 Points</p>
            <Link href={`/product/${product.id}`} className="view-details">
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button className="page-btn" onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
