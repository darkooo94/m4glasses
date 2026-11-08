# m4glasses — E-Commerce Website

![m4glasses Banner](https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80)

**m4glasses** is a multi-page e-commerce website built purely with standard web technologies (**HTML5**, **Tailwind CSS CDN**, and **Vanilla JavaScript**). Designed specifically for zero-config deployment on **GitHub Pages**.

---

---

## 📁 Project Structure & Page Routes

```text
├── index.html       # Landing page with hero banner & featured frames
├── shop.html        # Product catalog with search, category filtering & sorting
├── product.html     # Dynamic product detail page with feature specs
├── cart.html        # Interactive shopping bag with quantity controls & totals
├── checkout.html    # Multi-step checkout form with simulated payment
├── about.html       # Technology & brand background page
├── style.css        # Global custom scrollbars and layout styles
└── script.js        # Shared catalog data, cart logic & UI handlers
```

---

## ✨ Features

- **Multi-Page Navigation**: Clean HTML page separation for individual URLs.
- **Dynamic Product Catalog**: Filter frames by category (*Sunglasses, Optical, Blue Light, Active Sport*), search keywords, or sort by price/rating.
- **Persistent Cart State**: Uses `localStorage` so items in your bag remain intact while navigating across pages or refreshing.
- **Checkout & Order Form**: Form validation for customer shipping information and mock payment options.
- **Responsive Layout**: Mobile-first design styled using Tailwind CSS and Lucide icons.

