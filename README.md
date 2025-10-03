# DrugReactor - Medication Interaction Checker

A modern web application for checking drug interactions and getting personalized supplement guidance.

## Features

- 🔍 **Instant Drug Search** - Search by brand name or generic name
- ⚠️ **Interaction Checking** - Real-time drug interaction analysis
- 💊 **Supplement Recommendations** - Personalized supplement guidance
- 📱 **Responsive Design** - Works on all devices
- 🚀 **Fast & Modern** - Built with Next.js and TypeScript

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: TailwindCSS, shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

- **Netlify**: Connect GitHub repo, build command: `npm run build`
- **Railway**: Connect GitHub repo, auto-detects Next.js
- **Heroku**: Add buildpack for Node.js

## API Endpoints

- `POST /api/interactions` - Check drug interactions
- `GET /api/normalize` - Normalize drug names
- `GET /api/sources` - Get data sources

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Disclaimer

This application is for educational purposes only. Always consult with healthcare professionals before making medical decisions.