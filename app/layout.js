import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import { UserProvider } from "../context/UserContext"; // Import UserProvider

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <UserProvider>
          <CartProvider>
            <Header />
            <main style={{ flexGrow: 1 }}>{children}</main>
            <Footer />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}