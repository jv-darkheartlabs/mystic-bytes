# Mystic Bytes - Cyberpunk Tech Portfolio

A Jekyll-powered developer portfolio with a dark cyberpunk aesthetic inspired by modern tech interfaces. Features a terminal-inspired design with neon accents, card-based layouts, and accessibility-first principles.

## 🎨 Design Features

### Color Palette
- **Background**: Deep navy/black (`#0a0e27`)
- **Accent Colors**:
  - Purple gradient (`#a78bfa` → `#7c3aed`)
  - Cyan highlights (`#22d3ee`)
  - Orange accents (`#fb923c`)
  - Green status badges (`#10b981`)

### Typography
- **Display Font**: Space Mono (monospace headers)
- **Body Font**: Inter (clean, readable)
- **Code Font**: Fira Code (with ligatures)

### Key Design Elements
- Card-based layouts with hover effects
- Gradient borders and text
- Status badges for skills/certifications
- Smooth animations and transitions
- Glowing accent effects
- Responsive grid layouts

## 🚀 Quick Start

### Prerequisites
- Ruby 3.x
- Bundler
- Jekyll

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mystic-bytes.git
cd mystic-bytes

# Install dependencies
bundle install

# Build the site
bundle exec jekyll build

# Serve locally
bundle exec jekyll serve
```

Visit `http://localhost:4000` to view your site.

## 📁 Project Structure

```
mystic-bytes/
├── _config.yml           # Site configuration
├── _data/                # Content data files
│   ├── experience.yml    # Work experience
│   ├── skills.yml        # Technical skills
│   ├── projects.yml      # Portfolio projects
│   ├── interests.yml     # Personal interests
│   ├── associations.yml  # Professional associations
│   ├── recognitions.yml  # Awards & recognition
│   └── links.yml         # Additional links
├── _includes/            # Reusable components
│   ├── head.html         # HTML head with fonts
│   └── icon-links.html   # Social media icons
├── _layouts/             # Page templates
│   └── resume.html       # Main resume layout
├── _sass/                # Stylesheets
│   ├── _variables.scss   # Color/spacing variables
│   ├── _base.scss        # Base styles
│   ├── _mixins.scss      # Reusable mixins
│   ├── _layout.scss      # Layout utilities
│   └── _resume.scss      # Resume-specific styles
├── css/
│   └── main.scss         # Main stylesheet entry
├── images/               # Images & assets
└── index.html            # Homepage
```

## ✏️ Customization

### 1. Update Your Information

Edit `_config.yml`:

```yaml
resume_name: "Your Name"
resume_title: "Your Title"
resume_contact_email: "your.email@example.com"
resume_header_intro: "<p>Your introduction here...</p>"
```

### 2. Add Your Experience

Edit `_data/experience.yml`:

```yaml
- company: Company Name
  position: Your Position
  duration: 2020 - Present
  summary: >
    Description of your role and achievements.
```

### 3. Update Skills

Edit `_data/skills.yml`:

```yaml
- skill: "Skill Category Name"
  description: "Description of your skills in this area."
```

### 4. Add Projects

Edit `_data/projects.yml`:

```yaml
- project: Project Name
  role: Your Role
  duration: 2024 - Present
  url: "https://project-url.com"
  description: Project description.
```

### 5. Customize Colors

Edit `_sass/_variables.scss` to change the color scheme:

```scss
$purple-primary: #a78bfa;  // Change primary purple
$cyan-primary: #22d3ee;     // Change cyan accent
$bg-primary: #0a0e27;       // Change background
```

### 6. Add Your Avatar

Replace `images/avatar.jpg` with your photo (recommended: 400x400px, square).

## 🎯 Features

### Accessibility
- Semantic HTML5
- ARIA labels
- Keyboard navigation support
- Focus indicators
- Skip to content link
- Screen reader friendly

### Performance
- Optimized CSS with SCSS
- Google Fonts preconnect
- Minimal JavaScript
- Fast page load times

### SEO
- Semantic markup
- Schema.org structured data
- Open Graph tags
- Twitter Card support
- Sitemap generation

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Flexible grid layouts
- Touch-friendly interactions

## 🔧 Advanced Customization

### Adding New Sections

1. Create a data file in `_data/` (e.g., `certifications.yml`)
2. Enable the section in `_config.yml`:
   ```yaml
   resume_section_certifications: true
   ```
3. Add the section to `_layouts/resume.html`:
   ```html
   {% if site.resume_section_certifications %}
   <section class="content-section">
     <header class="section-header">
       <h2>🏅 Certifications</h2>
     </header>
     {% for cert in site.data.certifications %}
       <!-- Your markup here -->
     {% endfor %}
   </section>
   {% endif %}
   ```

### Custom Badges

Add status badges to any section:

```html
<span class="badge">YOUR_TEXT</span>
<span class="badge badge-blue">BLUE_BADGE</span>
<span class="badge badge-orange">ORANGE_BADGE</span>
<span class="badge badge-purple">PURPLE_BADGE</span>
```

### Hover Effects

Apply hover effects to cards:

```scss
.your-card {
  @include card-interactive;
}
```

## 📱 Social Links

Update social links in `_config.yml`:

```yaml
resume_social_links:
  resume_github_url: "https://github.com/username"
  resume_linkedin_url: "https://linkedin.com/in/username"
  resume_twitter_url: "https://twitter.com/username"
```

## 🚢 Deployment

### GitHub Pages

1. Push to GitHub
2. Go to Settings → Pages
3. Select source: `main` branch
4. Your site will be live at `https://username.github.io/mystic-bytes`

### Custom Domain

Add a `CNAME` file with your domain:
```
yourdomain.com
```

Update DNS records:
```
Type: CNAME
Host: www
Value: username.github.io
```

### Other Platforms

- **Netlify**: Connect your repo and deploy
- **Vercel**: Import your GitHub repository
- **AWS Amplify**: Connect and configure

## 🎨 Design Inspiration

This theme draws inspiration from:
- Cyberpunk 2077 UI
- Terminal/CLI aesthetics
- GitHub's dark theme
- VS Code's interface
- Modern tech portfolios

## 📄 License

MIT License - feel free to use this theme for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Share your customizations

## 🙏 Credits

- Built with [Jekyll](https://jekyllrb.com/)
- Fonts: [Google Fonts](https://fonts.google.com/)
- Icons: Inline SVGs
- Inspired by modern tech interfaces

## 📞 Support

For questions or issues:
1. Check the [Wiki](../../wiki) for detailed guides
2. Open an [Issue](../../issues)
3. Fork and customize!

---

**Made with 💜 by Jennifer Picado**

*Creating technology that feels alive — where luminous interfaces meet thoughtful engineering.*
