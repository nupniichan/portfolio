# Portfolio Website

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Build & Deploy](https://img.shields.io/github/actions/workflow/status/nupniichan/portfolio/nextjs.yml?style=for-the-badge&label=Build)

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. This portfolio features a beautiful design with dark/light theme support, internationalization (i18n), and smooth animations.

## Features

- **Modern Design**: Clean and professional UI with smooth animations
- **Theme Support**: Dark and light mode toggle
- **Internationalization**: Support for English and Vietnamese languages
- **Responsive**: Fully responsive design that works on all devices
- **Fast Performance**: Built with Next.js for optimal performance
- **Multiple Pages**: Home, About Me, Skills, Projects, Journey, and Contact pages
- **Audio Player**: Background music player feature
- **Animations**: Smooth scroll animations and interactive elements

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: Noto Sans (Google Fonts)

## What's New - Development Progress

This portfolio is a completely rewrite from the previous HTML/CSS/JavaScript version [here](https://github.com/nupniichan/portfolio-old), now built with morden framework using Next.js, TypeScript, and Tailwind CSS.

## Prerequisites

Before you begin, make sure you have the following installed on your computer:

- **Node.js** (version 18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun** (package manager)

You can check if Node.js is installed by running:
```bash
node --version
```

## Getting Started

### Option 1: Fork the Repository (Recommended for using as your portfolio)

1. **Fork this repository** to your GitHub account by clicking the "Fork" button at the top right of this page.
 
2. **Clone your forked repository** to your local machine:
```bash
git clone https://github.com/nupniichan/portfolio.git
cd portfolio
```

3. **Create a new branch** for your development:
```bash
git checkout -b develop
```

4. **Install dependencies**:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

5. **Start the development server**:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see your portfolio.

### Option 2: Clone and Create New Branch

1. **Clone the repository**:
```bash
git clone https://github.com/nupniichan/portfolio.git
cd portfolio
```

2. **Create a new branch** for your development (important: do not work directly on main/master branch):
```bash
git checkout -b develop
# or use your preferred branch name
git checkout -b my-awesome-feature
```

3. **Install dependencies**:
```bash
npm install
```

4. **Start the development server**:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization Guide

### 1. Personal Information

#### Update Home Page Content
Edit the translation files to change your personal information:

- **English**: `app/locales/en.json`
- **Vietnamese**: `app/locales/vi.json`

Update the following sections e.g:
```json
{
  "home": {
    "greeting": "Hi, I'm nup",
    "status": "Active"
  }
}
```

#### Change Avatar Image
Replace the avatar image at:
```
public/Images/Avatar/
```

Update the image path in `app/page.tsx`:
```typescript
src={withBasePath("/Images/Avatar/YourAvatar.png")}
```

#### Update Social Links
Edit `app/components/SocialLinks.tsx` to add or modify your social media links.

### 2. About Me Page

Edit the "About me" section in the locale files:
- `app/locales/en.json` → `pages.about` section
- `app/locales/vi.json` → `pages.about` section

### 3. Skills Page

Modify your skills in:
- `app/skills/page.tsx` - Update the skills data structure
- `app/locales/en.json` → `pages.skills` section
- `app/locales/vi.json` → `pages.skills` section

### 4. Projects Page

Update your projects in:
- `app/projects/page.tsx` - Modify the projects array
- `app/locales/en.json` → `pages.projects` section
- `app/locales/vi.json` → `pages.projects` section

### 5. Journey Page

Customize your education and work experience in:
- `app/journey/page.tsx` - Update the journey timeline data
- `app/locales/en.json` → `pages.journey` section
- `app/locales/vi.json` → `pages.journey` section

### 6. Contact Page

Modify contact information in:
- `app/contact/page.tsx`
- `app/locales/en.json` → `pages.contact` section
- `app/locales/vi.json` → `pages.contact` section

### 7. Site Metadata

Update site title and description in `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: "Your Name",
  description: "Your Name - Your Title",
};
```

### 8. Navigation

Modify navigation items in `app/config/navigation.ts`:
```typescript
export const NAV_ITEMS: readonly NavigationItem[] = [
  { href: "/", key: "home" },
  { href: "/about-me", key: "about" },
  // Add or remove navigation items here
];
```

### 9. Colors and Styling

The project uses Tailwind CSS. You can customize colors and styles by:
- Editing `app/globals.css` for global styles
- Modifying Tailwind classes directly in components
- Updating color values in component files

### 10. Background Music

Replace the background music file:
```
public/Musics/CLANNAD  The palm of a tiny hand.mp3 ( But im gonna change the music in the future but im not any plan to change the **Musics/** folder yet )
```

Update the path in `app/components/ClientAudioPlayer.tsx` if needed.

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

The static files will be generated in the `out` directory. You can deploy this folder to any static hosting service.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy your site

### Deploy to Other Platforms

Since this project uses static export (`output: "export"`), you can deploy the `out` folder to:
- **GitHub Pages**: Just push the code to your main brach and it will be there nothing more to do
- **Any static hosting service**: Upload the `out` folder contents

## Project Structure

```
portfolio/
├── app/
│   ├── about-me/          # About me page
│   ├── components/        # Reusable components
│   ├── config/           # Configuration files
│   ├── contact/          # Contact page
│   ├── hooks/            # Custom React hooks
│   ├── journey/          # Journey/Experience page
│   ├── locales/          # Translation files (i18n)
│   ├── projects/         # Projects page
│   ├── skills/           # Skills page
│   ├── utils/            # Utility functions
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── public/               # Static assets
│   ├── Images/          # Images (Avatar, Background, etc.)
│   └── Musics/          # Audio files
├── out/                  # Production build output
└── package.json         # Dependencies
```

## Important Notes

### Development Workflow

**Always create a new branch** before making changes:
- If you forked: Work on your fork and create branches as needed
- If you cloned: Create a new branch (e.g., `develop` or `feature/customization`) before making any changes

**Never work directly on the main/master branch** unless you want to host on your own page.

### License

Please check the MIT license file [here](https://github.com/nupniichan/portfolio/blob/main/LICENSE)

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, you can change it:
```bash
npm run dev -- -p 3001
```

### Build Errors
If you encounter build errors:
1. Delete `node_modules` folder
2. Delete `package-lock.json` (or `yarn.lock`)
3. Run `npm install` again
4. Try building again

### Image Not Showing
- Make sure images are in the `public/Images/` directory
- Check that image paths use `withBasePath()` helper function
- Verify image file names match exactly (case-sensitive)

## Contributing

If you want to contribute improvements to this portfolio kindly follow those steps below:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to your branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## Support

If you have questions or need help:
- Open an issue on GitHub
- Check the Next.js documentation: [https://nextjs.org/docs](https://nextjs.org/docs)
- Review the Tailwind CSS documentation: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons from [Lucide](https://lucide.dev)

---

Thanks for visiting my repository, your attention is my pleasure ⸜(｡˃ ᵕ ˂ )⸝♡
