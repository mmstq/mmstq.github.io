# Mohd Mustak - Portfolio Website (React)

A modern, responsive portfolio website built with React.js showcasing the work and skills of Mohd Mustak, a Flutter Engineer & Full Stack Developer.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean and professional design with smooth animations
- **Interactive Skills Section**: Colorful skill icons with hover effects
- **Project Portfolio**: Showcase of recent work with modal popups
- **Contact Integration**: Direct links to Gmail, WhatsApp, and social media
- **Smooth Navigation**: Single-page application with smooth scrolling
- **Performance Optimized**: Fast loading with optimized assets

## 🛠️ Technologies Used

- **React.js** - Frontend framework
- **Font Awesome** - Icons library
- **CSS3** - Styling and animations
- **HTML5** - Semantic markup
- **JavaScript ES6+** - Modern JavaScript features

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mmstq/mmstq.github.io.git
   cd mmstq.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the website

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

This will create a `build` folder with optimized files ready for deployment.

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header
│   ├── Intro.js           # Hero section
│   ├── About.js           # About section with skills
│   ├── Works.js           # Portfolio and testimonials
│   ├── Contact.js         # Contact information
│   ├── Footer.js          # Footer component
│   └── Preloader.js       # Loading screen
├── styles/
│   ├── css/
│   │   ├── vendor.css     # Third-party styles
│   │   └── styles.css     # Main stylesheet
│   └── react-additions.css # React-specific styles
├── assets/
│   └── images/            # Image assets
├── App.js                 # Main app component
└── index.js              # Entry point
```

## 🎨 Customization

### Skills Section
To update the skills icons, modify the arrays in `src/components/About.js`:

```javascript
const languageSkills = [
  { icon: faDart, color: '#00B4AB', name: 'Dart' },
  // Add more skills...
];
```

### Contact Information
Update contact details in `src/components/Contact.js`:

```javascript
<a href="mailto:your-email@gmail.com">
<a href="https://wa.me/your-phone-number">
```

### Portfolio Projects
Add or modify projects in `src/components/Works.js`:

```javascript
const projects = [
  {
    id: 1,
    title: "Project Name",
    category: "Category",
    image: "/path/to/image",
    // ... other properties
  }
];
```

## 🚀 Deployment

### GitHub Pages
1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/repository-name",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Netlify
1. Build the project: `npm run build`
2. Drag and drop the `build` folder to Netlify
3. Or connect your GitHub repository for automatic deployments

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 📱 Features Overview

### Header Navigation
- Responsive mobile menu
- Smooth scrolling to sections
- Active section highlighting

### Skills Section
- Interactive skill icons with tooltips
- Organized by categories (Languages, Frameworks, Others)
- Hover animations and color coding

### Portfolio
- Project showcase with modal popups
- External project links
- Testimonials from industry leaders

### Contact
- Direct Gmail and WhatsApp integration
- Social media links
- Professional contact form styling

## 🔧 Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

### Code Style
- Use functional components with hooks
- Follow React best practices
- Maintain consistent naming conventions
- Comment complex logic

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Mohd Mustak**
- LinkedIn: [mohd-mustak-2b4100187](https://linkedin.com/in/mohdmustak)
- GitHub: [mmstq](https://github.com/mmstq)
- Email: mohdmushtak59@gmail.com

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/mmstq/mmstq.github.io/issues).

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

**Note**: This is a React conversion of the original HTML/CSS portfolio. The design maintains the same visual appeal while adding the benefits of a modern React application. 