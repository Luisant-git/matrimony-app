# Matrimony Finder

A modern matrimony/matchmaking web application built with React and JavaScript.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and intuitive user interface with Tailwind CSS
- **API Integration**: Real-time data from backend server
- **Authentication**: JWT-based login/logout with encrypted token storage
- **Profile Management**: View detailed profiles with photos and information from database
- **User Registration**: Register new users with form validation
- **Search & Filter**: Advanced search functionality to find compatible matches
- **Multiple Pages**: Home, About, Contact, Login, and Profile pages
- **Interactive Components**: Testimonials, FAQ, featured profiles carousel with real data

## Tech Stack

- **Frontend**: React 19.2.0, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Heroicons (SVG)
- **Authentication**: JWT with CryptoJS encryption
- **API Integration**: RESTful API calls
- **Backend**: NestJS (separate server)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd matrimony-finder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
matrimony-finder/
├── components/           # React components
│   ├── AboutUsPage.jsx
│   ├── ContactPage.jsx
│   ├── CtaSection.jsx
│   ├── Faq.jsx
│   ├── FeaturedProfiles.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── ProfilePage.jsx
│   ├── RegistrationForm.jsx
│   ├── SearchSection.jsx
│   └── Testimonials.jsx
├── context/             # React contexts
│   └── AuthContext.jsx  # Authentication context
├── utils/               # Utility functions
│   ├── api.js           # API calls
│   └── auth.js          # Authentication utilities
├── App.jsx              # Main App component
├── index.jsx            # Entry point
├── index.html           # HTML template
├── index.css            # Global styles
├── .env                 # Environment variables
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Components Overview

- **Header**: Navigation bar with responsive mobile menu
- **Hero**: Landing section with registration form
- **FeaturedProfiles**: Interactive carousel of featured profiles
- **SearchSection**: Profile search with filters
- **Testimonials**: Customer testimonials section
- **FAQ**: Frequently asked questions with accordion
- **Footer**: Site footer with links and contact info
- **LoginPage**: User authentication page
- **ProfilePage**: Detailed profile view
- **AboutUsPage**: Company information
- **ContactPage**: Contact form and information

## Customization

### Colors

The application uses a custom color palette defined in Tailwind config:
- Primary: #F2526E (Pink/Red)
- Primary Dark: #C73652
- Primary Light: #FDE8EB
- Secondary: #4A4A4A (Dark Gray)

### Fonts

Uses Poppins font family from Google Fonts for a modern, clean look.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team.