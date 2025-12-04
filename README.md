# AccountHub Admin Dashboard

A modern, responsive admin dashboard for the accounting services marketplace platform with bilingual support (English/Arabic) and RTL layout.

## Features

- 🌍 **Bilingual Support**: Full English and Arabic localization with RTL layout
- 🌙 **Dark/Light Theme**: Toggle between themes with persistence
- 📱 **Responsive Design**: Mobile-first approach with breakpoints for all devices
- 📊 **Interactive Charts**: Revenue trends and service distribution visualizations
- ⚡ **Real-time Updates**: Mock API with loading states and error handling
- ♿ **Accessible**: ARIA attributes and keyboard navigation support
- 🎨 **Modern UI**: Clean design with smooth animations and micro-interactions

## Tech Stack

- **React 18** with functional components and hooks
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling with RTL support
- **react-i18next** for internationalization
- **Recharts** for data visualization
- **Headless UI** for accessible components
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

### Language Switching

- Click the language switcher in the top navbar
- Choose between English and العربية (Arabic)
- The layout automatically switches to RTL for Arabic

### Theme Toggle

- Click the sun/moon icon in the navbar to toggle between light and dark themes
- Theme preference is automatically saved

### Dashboard Features

- **Stats Cards**: View key metrics with trend indicators
- **Revenue Chart**: Interactive line chart with date range selection
- **Service Distribution**: Pie chart showing service breakdown
- **Recent Activity**: Real-time activity feed
- **Pending Approvals**: Manage firm approvals and transaction disputes

## API Integration

The dashboard uses mock APIs that simulate real backend responses:

- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/activity-recent` - Recent activity feed
- `GET /api/admin/pending-items` - Pending approvals
- `POST /api/admin/firms/:id/approve` - Approve firm
- `POST /api/admin/transactions/:id/resolve` - Resolve transaction

To integrate with real APIs, update the service files in `src/services/mockApi/`.

## Testing

Run the test suite:

```bash
npm test
```

The project includes tests for:
- Component rendering
- Language switching functionality
- Chart data integration
- Redux actions and state updates
- Responsive layout behavior

## Project Structure

```
src/
├── components/
│   ├── Dashboard/          # Dashboard-specific components
│   └── Layout/             # Layout components (Navbar, Sidebar)
├── features/               # Redux slices
├── pages/                  # Page components
├── services/               # API services
├── i18n/                   # Internationalization
└── store/                  # Redux store configuration
```

## Customization

### Colors

The design system uses these primary colors:
- Primary: `#0B61FF` (Blue)
- Accent: `#00A86B` (Green)
- Neutral: `#F7FAFC` (Light Gray)

Update colors in `tailwind.config.js` to match your brand.

### Fonts

- **English**: Inter font family
- **Arabic**: Cairo font family

Fonts are loaded from Google Fonts in `index.html`.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.
