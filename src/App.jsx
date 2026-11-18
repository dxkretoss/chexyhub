import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from './components/common/CustomToast';
import { RootLayout } from './layouts/RootLayout';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Men } from './pages/Men';
import { Women } from './pages/Women';
import { Kids } from './pages/Kids';
import { FamilyCollection } from './pages/FamilyCollection';
import { ProductDetails } from './pages/ProductDetails';
import { Wishlist } from './pages/Wishlist';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';

// Auth & Account
import { Login } from './pages/Authentication/Login';
import { Register } from './pages/Authentication/Register';
import { ForgotPassword } from './pages/Authentication/ForgotPassword';
import { Account } from './pages/Account';
import { Orders } from './pages/Account/Orders';
import { Addresses } from './pages/Account/Addresses';
import { OrderTracking } from './pages/Account/OrderTracking';

// Info & Policies
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { ShippingPolicy } from './pages/Policies/ShippingPolicy';
import { ReturnPolicy } from './pages/Policies/ReturnPolicy';
import { PrivacyPolicy } from './pages/Policies/PrivacyPolicy';
import { TermsAndConditions } from './pages/Policies/TermsAndConditions';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* Main Browsing Routes */}
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="men" element={<Men />} />
          <Route path="women" element={<Women />} />
          <Route path="kids" element={<Kids />} />
          <Route path="family-collection" element={<FamilyCollection />} />
          <Route path="product/:slug" element={<ProductDetails />} />

          {/* Commerce Routes */}
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />

          {/* Authentication Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />

          {/* Customer Account Routes */}
          <Route path="account" element={<Account />} />
          <Route path="account/orders" element={<Orders />} />
          <Route path="account/addresses" element={<Addresses />} />
          <Route path="order-tracking" element={<OrderTracking />} />

          {/* Information & Policies */}
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="shipping-policy" element={<ShippingPolicy />} />
          <Route path="return-policy" element={<ReturnPolicy />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
