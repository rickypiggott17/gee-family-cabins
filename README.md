# Gee Family Cabins Website

A beautiful, family-friendly cabin rental booking website built with Next.js 14, featuring:

- **Stunning Hero Section** with mountain landscape photography
- **Interactive Calendar Booking** with date range selection
- **Mock Payment Processing** (ready for real payment integration)
- **Responsive Design** that works on all devices
- **Family-Focused Content** and user experience

## Features

### 🏔️ Hero Section
- Full-screen mountain landscape background
- Welcoming family-oriented messaging  
- Smooth scroll navigation to booking

### 📅 Smart Calendar
- Visual date range selection
- Shows booked dates (currently mock data)
- Calculates nights and total cost automatically
- Rate: $100 per night

### 💳 Payment Form
- Complete guest information collection
- Mock credit card processing (secure and safe)
- Form validation and user feedback
- Special requests section

### ✨ Additional Features
- About section highlighting family ownership
- Contact information section
- Booking confirmation page
- Professional styling with custom colors

## Getting Started

### Prerequisites
- Node.js 18 or later
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3001](http://localhost:3001)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
gee-family-cabins/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles with Tailwind
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Main homepage
│   └── components/
│       ├── BookingCalendar.tsx  # Interactive calendar
│       └── PaymentForm.tsx      # Payment processing form
├── public/
│   └── images/
│       └── mountain-hero.jpg    # Hero background image
└── package.json
```

## Customization

### Colors
The website uses a mountain-themed color palette defined in `tailwind.config.js`:
- `mountain-blue`: #4A90A4
- `sunset-orange`: #E67E22  
- `warm-gold`: #F39C12
- `forest-green`: #27AE60
- `snow-white`: #FDFEFE
- `stone-gray`: #95A5A6

### Images  
Replace images in `public/images/` with your own:
- `mountain-hero.jpg` - Main hero background (recommended: 1920x1080 or larger)

### Content
Edit the main content in `src/app/page.tsx`:
- Hero section text
- About section content
- Contact information
- Pricing (currently $100/night)

## Payment Integration

Currently uses **mock payment processing**. To connect real payments:

1. Choose a payment provider (Stripe, PayPal, Square, etc.)
2. Update the `PaymentForm` component
3. Add server-side payment processing
4. Remove the demo mode warnings

## Booking Management

The calendar currently shows mock booked dates. To connect real availability:

1. Add a backend database
2. Create booking management API
3. Update the `BookingCalendar` component to fetch real data
4. Add booking confirmation emails

## Support

This is a complete, professional website ready for:
- ✅ Immediate family use
- ✅ Professional presentation  
- ✅ Mobile and desktop viewing
- ✅ Easy customization
- 🔄 Payment integration (when ready)
- 🔄 Real booking management (when ready)

Built with ❤️ for the Gee Family by the Ag Open Technologies team.