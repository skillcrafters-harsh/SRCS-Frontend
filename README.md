# Smart Roll Cutting System (SRCS)

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://srcs.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 🎯 What is SRCS?

Smart Roll Cutting System (SRCS) is an advanced web application that optimizes roll cutting patterns to minimize material waste and maximize efficiency in manufacturing processes. It provides intelligent cutting solutions for various industries including paper, textile, metal, and plastic manufacturing.

## 🚀 What Does It Do?

SRCS solves the **Roll Cutting Problem** by:
- **Minimizing Material Waste**: Reduces waste by up to 30% through optimized cutting patterns
- **Maximizing Efficiency**: Calculates the most efficient cutting strategies
- **Reducing Costs**: Saves money through better material utilization
- **Dual Optimization**: Offers strategies to minimize waste OR minimize cutter changes
- **Real-time Calculations**: Provides instant optimization results with visual cutting plans

## 🔧 How Does It Work?

### Input Methods
1. **Manual Input**: Enter roll specifications directly through an intuitive form
2. **Excel Upload**: Upload spreadsheets with bulk roll cutting requirements

### Optimization Process
1. **Data Analysis**: Analyzes material dimensions and requirements
2. **Algorithm Processing**: Applies advanced optimization algorithms
3. **Pattern Generation**: Creates efficient cutting patterns
4. **Results Visualization**: Displays cutting plans with charts and tables

### Output
- **Cutting Plans**: Detailed roll-by-roll cutting instructions
- **Performance Metrics**: Efficiency percentages, waste calculations, cost savings
- **Visual Charts**: Pie charts and bar graphs for easy understanding
- **Export Options**: Download results for production use

## 📱 Site Structure & Pages

### 🏠 Homepage (`/`)
- **Hero Section**: Introduction to SRCS with key benefits
- **Problem Showcase**: Visual representation of cutting challenges
- **Solution Overview**: How SRCS solves manufacturing problems
- **Quick Navigation**: Direct access to main features

### ⚡ Run Page (`/run`)
**Main Application Interface** - The core functionality page with three tabs:

#### 📝 Manual Input Tab
- **Roll Specifications Form**: Enter cutting requirements manually
- **Optional Fields**: Configure DIA, BF, GSM, Quality, Quantity fields
- **Dynamic Calculations**: Auto-calculate quantities based on dimensions
- **Validation**: Real-time form validation and error handling

#### 📊 Excel Upload Tab
- **File Upload Zone**: Drag-and-drop or browse Excel files
- **Data Preview**: Live preview of uploaded data
- **Format Validation**: Ensures correct Excel format
- **Bulk Processing**: Handle multiple roll specifications at once

#### 📈 Results Tab
- **Optimization Results**: Detailed cutting plans and metrics
- **Visual Charts**: Pie charts showing efficiency and waste
- **Performance Analytics**: Cost savings and utilization percentages
- **Export Options**: Download results in various formats

### 📚 Example Page (`/example`)
- **Sample Data**: Pre-filled examples for testing
- **Use Cases**: Different industry scenarios
- **Best Practices**: Tips for optimal results
- **Tutorial Content**: Step-by-step guidance

### 📖 API Documentation (`/api-docs`)
- **API Overview**: Complete API documentation
- **Endpoints**: Detailed endpoint descriptions
- **Request/Response**: Sample payloads and responses
- **Authentication**: API key and security information

### 🔧 API Reference (`/api-reference`)
- **Technical Specifications**: Detailed API reference
- **Code Examples**: Implementation examples in multiple languages
- **Error Handling**: Error codes and troubleshooting
- **Rate Limits**: Usage limits and guidelines

## 🛠️ Technical Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + Custom Components
- **Icons**: Heroicons + Lucide React
- **Charts**: Recharts for data visualization
- **File Processing**: XLSX for Excel handling
- **Notifications**: Sonner for toast messages

### Features
- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme switching capability
- **Loading Animations**: YouTube-style loading with roll cutting animations
- **Form Validation**: Real-time validation with error handling
- **State Management**: React hooks for local state
- **SEO Optimized**: Meta tags, sitemap, robots.txt

### Performance
- **Static Generation**: Pre-rendered pages for fast loading
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic code splitting
- **Bundle Analysis**: Optimized bundle sizes

## 🎨 Key Features

### 🔄 Dual Optimization Strategies
1. **Minimize Waste**: Focus on reducing material waste
2. **Minimize Cutter Changes**: Reduce production time and tool wear

### 📊 Visual Analytics
- **Pie Charts**: Waste vs. utilized material visualization
- **Bar Charts**: Roll-by-roll efficiency comparison
- **Progress Indicators**: Real-time optimization progress
- **Color-coded Results**: Easy-to-understand visual feedback

### 💾 Data Persistence
- **Local Storage**: Saves form data to prevent loss
- **Session Management**: Maintains state across page refreshes
- **Export Functionality**: Download results for offline use

### 🎯 User Experience
- **Intuitive Interface**: Clean, professional design
- **Loading Animations**: Engaging roll cutting animations during processing
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Accessibility**: WCAG compliant design
- **Error Handling**: Graceful error messages and recovery

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/srcs-frontend.git

# Navigate to project directory
cd srcs-frontend

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev
```

### Environment Variables
```bash
NEXT_PUBLIC_API_BASE_URL=http://your-api-url:8000
```

## 📈 SEO & Performance

### SEO Features
- **Meta Tags**: Comprehensive meta descriptions and keywords
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Schema markup for search engines
- **Sitemap**: Dynamic sitemap generation
- **Robots.txt**: Search engine crawling instructions

### Performance Metrics
- **Core Web Vitals**: Optimized for Google's performance metrics
- **Lighthouse Score**: 90+ performance score
- **Bundle Size**: Optimized for fast loading
- **Image Optimization**: WebP format with lazy loading

## 🔗 Live Demo

Visit the live application: **[https://srcs.vercel.app/](https://srcs.vercel.app/)**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for the manufacturing industry**