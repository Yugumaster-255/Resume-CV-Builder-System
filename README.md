# M-SHAURI AI Resume Builder

A modern, fully frontend-based Resume Builder web application that allows users to create, preview, and download ATS-friendly CVs with offline AI assistance. Built with HTML, CSS, and JavaScript only - no backend required!

## 🚀 Features

### ✨ Core Functionality
- **Modern UI/UX**: Elegant, responsive design with smooth animations
- **Real-time Preview**: Live resume preview with instant updates
- **PDF Export**: Download your resume as a professional PDF
- **Data Persistence**: All data saved in LocalStorage (works offline)
- **Import/Export**: Save and load your resume data as JSON files

### 🤖 Offline AI Assistant
- **Smart Suggestions**: AI-powered text suggestions for all resume sections
- **Context-Aware**: Suggestions based on your input and field type
- **Tanzanian Context**: Pre-filled with Tanzanian cities, nationalities, and local context
- **No Internet Required**: Works completely offline using rule-based AI logic

### 🎨 Multiple Templates
- **Modern Template**: Colorful, creative layout with icons and gradients
- **Classic Template**: Clean, formal, ATS-friendly design
- **Instant Switching**: Toggle between templates with one click

### 🌙 Theme Support
- **Light/Dark Mode**: Toggle between light and dark themes
- **Persistent Settings**: Your preferences are saved automatically

## 📁 Project Structure

```
AI-Resume-Builder/
├── index.html                 # Main application file
├── assets/
│   ├── css/
│   │   └── style.css         # Main stylesheet with animations
│   └── js/
│       ├── main.js           # Core application logic
│       ├── ai-helper.js      # Offline AI assistant
│       └── pdf-generator.js  # PDF generation functionality
├── templates/
│   ├── modern.html           # Modern resume template
│   └── classic.html          # Classic resume template
└── README.md                 # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox, Grid, and animations
- **Vanilla JavaScript**: No frameworks, pure JavaScript
- **html2pdf.js**: Client-side PDF generation
- **Font Awesome**: Icons for better UX
- **Google Fonts**: Inter font family for modern typography

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or backend required!

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start building your resume!

### For GitHub Pages Deployment
1. Upload all files to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Your resume builder will be live at `https://yourusername.github.io/repository-name`

## 📝 How to Use

### 1. Personal Details
- Fill in your basic information
- Use the AI Suggest button for career objectives
- All fields auto-save as you type

### 2. Education & Experience
- Add multiple entries using "Add Another" buttons
- Use AI suggestions for descriptions
- Remove entries with the X button (appears on hover)

### 3. Skills & Certifications
- List your technical and soft skills
- Add professional certifications
- AI helps suggest relevant skills

### 4. Preview & Download
- Click "Preview Resume" to see your resume
- Switch between Modern and Classic templates
- Download as PDF with one click

### 5. Save & Load
- Export your data as JSON file
- Import previously saved data
- All data persists in browser storage

## 🤖 AI Assistant Features

The offline AI assistant provides intelligent suggestions for:

- **Career Objectives**: Based on job titles and keywords
- **Skills**: Technical and soft skills suggestions
- **Experience Descriptions**: Professional, impactful descriptions
- **Education Descriptions**: Academic achievements and coursework
- **Hobbies**: Relevant personal interests

### AI Suggestion Examples

**Input**: "teacher"  
**AI Suggestion**: "Dedicated and passionate teacher with experience in improving student engagement and performance. Committed to fostering a positive learning environment and helping students achieve their academic goals."

**Input**: "developer"  
**AI Suggestion**: "Innovative software developer with expertise in modern technologies and a passion for creating efficient, scalable solutions. Committed to continuous learning and delivering high-quality software products."

## 🎨 Customization

### Adding New AI Suggestions
Edit `assets/js/ai-helper.js` to add new suggestion patterns:

```javascript
this.suggestions.objective['your-keyword'] = 'Your suggestion text...';
```

### Styling Customization
Modify `assets/css/style.css` to change colors, fonts, or layouts:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
}
```

### Adding New Resume Sections
1. Add HTML structure in `index.html`
2. Add corresponding JavaScript logic in `main.js`
3. Update PDF generation in `pdf-generator.js`

## 🌍 Tanzanian Context

The application includes Tanzanian-specific features:

- **Cities**: Dar es Salaam, Arusha, Dodoma, Mwanza, etc.
- **Nationalities**: Tanzanian, Kenyan, Ugandan, Rwandan
- **Local Context**: AI suggestions tailored for East African job market
- **Language Support**: Swahili and English language suggestions

## 📱 Responsive Design

- **Desktop**: Full sidebar navigation and multi-column layouts
- **Tablet**: Optimized for touch interaction
- **Mobile**: Stacked layout with touch-friendly buttons
- **Print**: Optimized for PDF generation and printing

## 🔧 Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions:

1. Check the browser console for errors
2. Ensure you're using a modern browser
3. Try clearing browser cache and reloading
4. Make sure JavaScript is enabled

## 🎯 Future Enhancements

- [ ] Additional resume templates
- [ ] Cover letter generator
- [ ] Resume analytics and scoring
- [ ] More AI suggestion patterns
- [ ] Multi-language support
- [ ] Resume sharing features
- [ ] Advanced PDF customization options

---

**Built with ❤️ for the Tanzanian and East African job market**

*M-SHAURI AI Resume Builder - Your professional resume, powered by AI*
