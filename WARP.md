# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is **mystic-bytes** - a Jekyll-powered portfolio and resume website showcasing Jennifer Picado's professional experience as an AI Integration Specialist. The site uses GitHub Pages for hosting and demonstrates expertise in front-end development, AI integration, and technical leadership with a focus on New Zealand immigration portfolio presentation.

**Current Status**: Fully functional Jekyll website with comprehensive resume data structure and responsive design.

## Quick Start

### Prerequisites
- Ruby 3.0+
- Bundler gem
- Git

### Initial Setup
```bash
# Clone and setup
git clone https://github.com/forestbloomglitch/mystic-bytes.git
cd mystic-bytes

# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve

# View site
open http://localhost:4000
```

### GitHub Pages Deployment
```bash
# Site automatically deploys on push to main branch
git add .
git commit -m "Update resume content"
git push origin main

# Visit live site
open https://yourusername.github.io/mystic-bytes
```

## Architecture Overview

### Tech Stack
- **Jekyll 4.x** - Static site generator with GitHub Pages integration
- **GitHub Pages** - Automatic deployment and hosting
- **Sass/SCSS** - CSS preprocessing for responsive design
- **HTML5 & CSS3** - Modern web standards with accessibility features
- **Docker** - Optional containerized development environment

### Jekyll Site Structure

#### Core Files
- **_config.yml** - Site configuration, resume settings, and theme options
- **index.html** - Main page using resume layout
- **Gemfile** - Ruby dependency management for GitHub Pages

#### Content Architecture
- **_data/** - YAML files containing structured resume content
- **_layouts/** - HTML templates (resume.html)
- **_includes/** - Reusable HTML partials (icons, links, etc.)
- **_sass/** - Modular SCSS styling system

#### Static Assets
- **css/** - Compiled stylesheets
- **images/** - Profile avatar and screenshots
- **_assets/** - Source design files and icons

## Development Commands

### Local Development
```bash
# Install dependencies
bundle install

# Start development server with live reload
bundle exec jekyll serve --livereload

# Build site for production
bundle exec jekyll build

# Serve on custom port
bundle exec jekyll serve --port 4001
```

### Content Management
```bash
# Edit resume configuration
vim _config.yml

# Update experience data
vim _data/experience.yml

# Add new projects
vim _data/projects.yml

# Modify skills
vim _data/skills.yml
```

### Docker Development (Optional)
```bash
# Build Docker container
docker build -t mystic-bytes .

# Run containerized development
docker run -p 4000:4000 -v $(pwd):/site mystic-bytes

# Development with live reload
docker run -p 4000:4000 -p 35729:35729 -v $(pwd):/site mystic-bytes \
  bundle exec jekyll serve --host 0.0.0.0 --livereload
```

### GitHub Pages Testing
```bash
# Test GitHub Pages compatibility locally
bundle exec jekyll serve --config _config.yml,_config_github.yml

# Validate GitHub Pages gems
bundle exec github-pages health-check
```

## Content Structure

### Resume Data Organization

#### Personal Information (_config.yml)
```yaml
resume_name: "Jennifer Picado"
resume_title: "AI Integration Specialist"
resume_contact_email: "support@terminaldrift.digital"
resume_looking_for_work: "yes"
```

#### Experience (_data/experience.yml)
```yaml
- company: "DigitalSpellCraft LLC"
  position: "Front-End WebDev | IT Specialist"
  summary: >
    Detailed description of role and achievements
```

#### Projects (_data/projects.yml)
```yaml
- project: "Girls Who Code - Code at Home"
  role: "Organizer"
  duration: "2012 - Present"
  url: "https://girlswhocode.com/get-involved"
  description: "Project description..."
```

#### Skills (_data/skills.yml)
```yaml
- name: "Front-End Development & UI/UX Optimization"
  description: "Skill description and technologies..."
```

### Theme Customization

#### Section Controls (_config.yml)
```yaml
# Enable/disable resume sections
resume_section_experience: true
resume_section_projects: true
resume_section_skills: true
resume_section_recognition: true
resume_section_links: true
resume_section_associations: true
resume_section_interests: true
```

#### Social Links
```yaml
resume_social_links:
  alive_shoes_url: "https://www.aliveshoes.com/brand/terminaldrift"
  foratravel_partners_url: "https://www.foratravel.com/partners/jennifer-picado"
```

## Styling Architecture

### SCSS Organization
```
_sass/
├── _base.scss          # Base styles and typography
├── _layout.scss        # Layout and grid system
├── _mixins.scss        # Reusable SCSS mixins
├── _normalize.scss     # CSS reset and normalization
├── _resume.scss        # Resume-specific styles
└── _variables.scss     # Design tokens and variables
```

### Responsive Design
- **Mobile-first** approach with progressive enhancement
- **Print-friendly** styles for PDF generation
- **High contrast** support for accessibility
- **Flexible grid** system for various screen sizes

### Key Design Features
- Clean, professional typography hierarchy
- Optimized for both screen and print
- Accessible color contrast ratios
- Icon system for social links and contact info

## Deployment & Hosting

### GitHub Pages Configuration
- **Automatic deployment** on push to main branch
- **Custom domain** support via CNAME file
- **HTTPS** enabled by default
- **Jekyll builds** handled by GitHub Pages

### Domain Setup
```bash
# Add custom domain
echo "yourdomain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push origin main
```

### Performance Optimization
- **Sass compression** enabled in production
- **Asset minification** through Jekyll pipeline
- **Image optimization** for web delivery
- **CDN** benefits through GitHub Pages

## Content Management Workflow

### Adding New Experience
1. **Edit** `_data/experience.yml`
2. **Add** new company entry with position and summary
3. **Test** locally with `bundle exec jekyll serve`
4. **Deploy** by pushing to main branch

### Adding Projects
1. **Update** `_data/projects.yml`
2. **Include** project name, role, duration, URL, and description
3. **Preview** changes locally
4. **Commit** and push to deploy

### Updating Skills
1. **Modify** `_data/skills.yml`
2. **Organize** skills into categories with descriptions
3. **Validate** formatting and content
4. **Deploy** changes

## Troubleshooting

### Common Jekyll Issues

#### Build Failures
```bash
# Check Jekyll version compatibility
bundle exec jekyll --version

# Clear Jekyll cache
bundle exec jekyll clean

# Rebuild with verbose output
bundle exec jekyll build --verbose
```

#### GitHub Pages Compatibility
```bash
# Check GitHub Pages gem versions
bundle exec github-pages versions

# Update to compatible versions
bundle update github-pages
```

#### Local Development Issues
```bash
# Fix bundle issues
bundle update
bundle install

# Check Ruby version
ruby --version  # Should be 3.0+

# Fix permission issues (macOS)
sudo gem install bundler
```

### Content Issues

#### YAML Formatting
- Ensure proper indentation (2 spaces)
- Quote strings with special characters
- Use `>` for multi-line descriptions
- Validate YAML syntax online if needed

#### Image Problems
```bash
# Optimize images
# Resize avatar to 200x200px for best performance
# Use JPG for photos, PNG for icons/graphics
# Keep images under 100KB when possible
```

## SEO & Analytics

### Metadata Optimization
- **Title tags** generated from _config.yml
- **Meta descriptions** from site description
- **Open Graph** tags for social sharing
- **Schema.org** markup for professional profile

### Performance Monitoring
- **Google PageSpeed Insights** for performance metrics
- **GitHub Pages** analytics through repository insights
- **Custom analytics** can be added via _includes/head.html

## Future Enhancement Ideas

### Content Improvements
- **Blog section** for technical articles and insights
- **Portfolio gallery** showcasing project screenshots
- **Testimonials** section for professional recommendations
- **Contact form** integration (via Formspree or Netlify)

### Technical Enhancements
- **Progressive Web App** (PWA) features
- **Advanced animations** with CSS or JavaScript
- **Multi-language** support for international positioning
- **CMS integration** (Forestry, Netlify CMS) for non-technical editing

### New Zealand Focus Features
- **Visa status** indicator and immigration timeline
- **Location preferences** and regional information
- **Cultural alignment** section highlighting NZ values
- **Work authorization** status and availability

---

**Note**: This portfolio site effectively demonstrates technical capabilities while maintaining professional presentation suitable for New Zealand immigration and employment applications.