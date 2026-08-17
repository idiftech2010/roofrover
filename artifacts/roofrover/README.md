# RoofRover — Premium Real Estate Platform

**Find Your Perfect Pad — Search, Tour, and Own Modern Properties**

RoofRover is a modern, luxury real estate platform that transforms how people discover, explore, and purchase properties. We combine immersive virtual tours, verified listings, intelligent market insights, and seamless agent connections to make property discovery effortless.

---

## 🏠 About RoofRover

RoofRover revolutionizes the real estate experience by putting power in buyers' hands. Whether you're searching for your first home, upgrading to a luxury estate, or investing in rental properties, RoofRover connects you with curated listings, trusted agents, and immersive digital experiences — all in one place.

### Our Mission
Make property discovery effortless: accurate listings, immersive tours, and seamless bookings so users can find their perfect pad.

### Our Vision
Be the leading modern real-estate platform for buyers, sellers, and agents — trusted for transparency, service, and beautiful homes.

### Our Values
- **Integrity** — Verified properties and honest pricing
- **Innovation** — Cutting-edge virtual tours and market analytics  
- **Inclusion** — Accessible experiences for all users

---

## ✨ Key Features

### 📱 Virtual 3D Tours
Immersive property walkthroughs with interactive floor plans so buyers can explore every detail from home or on-the-go.

### 🏘️ Verified Listings
Every property is verified for accuracy, legal ownership, amenities, and market value — no surprises at viewing time.

### 📅 Instant Booking
Schedule viewings and tours with real-time availability. Confirm with a single tap and receive instant notifications.

### 💰 Smart Price Estimator
Get AI-powered market valuations using our proprietary algorithm that analyzes comparable properties, location trends, and market data.

### 🗺️ Advanced Property Discovery
Filter by location, price, property type, amenities, and investment potential. Save favorites and compare listings side-by-side.

### 👥 Expert Agent Network
Connect directly with verified agents who understand your market and can provide personalized guidance.

### 📊 Market Insights Dashboard
Stay informed with up-to-date market trends, neighborhood analytics, price trends, and investment opportunity highlights.

---

## 🎯 Pages & Sections

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Hero carousel, service highlights, featured properties, and CTA |
| Browse Homes | `/browse-homes` | Property listing directory with filters and search |
| Gallery | `/gallery` | Filterable image gallery with lightbox viewer |
| Virtual Tours | `/virtual-tours` | 3D interactive property tours |
| Services | `/services` | Service offerings overview |
| Case Studies | `/case-studies` | Success stories and client testimonials |
| About | `/about` | Company mission, team, and values |
| Careers | `/careers` | Career opportunities at RoofRover |
| Contact | `/contact` | Inquiry form and customer support |
| Saved Pads | `/saved-pads` | User's saved and favorited listings |
| Team Member | `/team/:id` | Individual team member profile |
| Not Found | `/*` | 404 error page |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI component framework |
| **Vite 7** | Lightning-fast build tool and dev server |
| **TypeScript** | Type-safe JavaScript development |
| **Tailwind CSS v4** | Utility-first styling framework |
| **Wouter** | Lightweight client-side routing |
| **Framer Motion** | Smooth animations and transitions |
| **Embla Carousel** | High-performance carousel component |
| **Recharts** | Data visualization and charts |
| **Lucide React** | Beautiful, consistent icon library |
| **React Icons** | Additional icon sets (Font Awesome 6) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ or latest LTS
- **npm** 9+ or your preferred package manager

### Installation

1. Navigate to the project directory:
   ```bash
   cd artifacts/roofrover
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

### Build for Production
```bash
npm run build
```

The optimized production build will be created in the `dist/` directory, ready for deployment.

---

## 🎨 Brand Identity

| Element | Value | Usage |
|---------|-------|-------|
| **Primary Blue** | `#123366` | Headers, navigation, CTAs |
| **Secondary Blue** | `#2D77C2` | Hover effects, accent borders |
| **Gold Accent** | `#D4AF37` | Premium highlights, icons |
| **Background** | `#F0F3F7` | Page backgrounds |
| **Dark Text** | `#2D3E4A` | Primary text |
| **Light Accent** | `#FBF9F5` | Card and section backgrounds |

**Typography:**
- **Headlines:** Serif font (elegant, premium)
- **Body Text:** Sans-serif (clean, readable)
- **UI Elements:** Consistent sizing and spacing

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation header
│   ├── Footer.tsx      # Footer section
│   ├── ChatWidget.tsx  # Floating chat support
│   └── ui/             # Shadcn UI components (buttons, cards, modals, etc.)
├── pages/              # Page components (one per route)
│   ├── Home.tsx
│   ├── BrowseHomes.tsx
│   ├── Gallery.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   ├── use-mobile.tsx  # Mobile device detection
│   └── use-toast.ts    # Toast notifications
├── lib/                # Utility functions and services
│   ├── localCMS.ts     # CMS data management
│   └── utils.ts        # Helper functions
├── assets/             # Images, fonts, and static files
├── App.tsx             # Root application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

---

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
# Deployment Base Path (if not using root domain)
BASE_URL=/

# API Endpoint (for backend integration)
VITE_API_BASE_URL=https://api.roofrover.com

# Chat Widget Configuration
VITE_CHAT_ENABLED=true
```

### Port & Base Path
- **Default Port:** `5173`
- **Default Base Path:** `/`

Both can be configured in `vite.config.ts`.

---

## 📊 Data Management

### Local CMS System
RoofRover includes a built-in local CMS (`src/lib/localCMS.ts`) for managing:
- Page content (headings, descriptions, CTAs)
- Carousel slides and featured properties
- Team member profiles
- Service offerings
- Case studies and testimonials
- Gallery images and media

Data is stored in browser localStorage and can be exported/imported as JSON.

---

## 🔒 Security & Privacy

- **HTTPS Only:** All production connections encrypted
- **Data Verification:** Property listings verified before publication
- **User Privacy:** No third-party data sharing
- **GDPR Compliant:** Transparent data handling and user consent

---

## ♿ Accessibility

RoofRover is built with accessibility in mind:
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance (WCAG 2.1 AA)
- Mobile-responsive design
- Screen reader compatibility

---

## 📈 Performance

- **Fast Load Times:** Optimized assets, lazy loading, and code splitting
- **Mobile-First:** Responsive design for all device sizes
- **SEO Optimized:** Meta tags, structured data, and semantic markup
- **Lighthouse Ready:** Performance audits and core web vitals optimization

---

## 🤝 Support & Contact

- **Email:** info@roofrover.com
- **Phone:** +234 812 519 1913
- **Social:** Follow [@RoofRover](https://instagram.com/roofrover) on Instagram

---

## 📝 License

© 2026 RoofRover. All rights reserved.

---

## 🙌 Credits

Built with ❤️ by the RoofRover team using cutting-edge web technologies and a passion for transforming real estate.

**Leadership:**
- **Idris Olanrewaju** — MD/CEO
- **Sumayyah Ibraheem** — Head of Property Verification
- **Layla Ahmed** — Head of Agent Training
- **Yaasir Ibraheem** — Head of Market Insights

---

**Last Updated:** August 2026  
**Version:** 1.0.0  
