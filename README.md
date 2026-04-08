# Resume Portfolio

A one-page, animated resume portfolio built with Next.js 16, React 19, and TypeScript.

The site includes:
- SyntaxCV-inspired dark visual style
- Scroll-reactive text reveal effects
- Full-screen profile image that transitions to a side panel while scrolling
- Resume download endpoint (`/api/resume`)
- Mobile-responsive sections for about, experience, skills, education, languages, and contact

## Tech Stack

- Next.js `16.2.2`
- React `19.2.4`
- TypeScript
- Tailwind CSS v4 + custom CSS animations

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev    # Start development server
npm run build  # Production build
npm run start  # Run production server
npm run lint   # Lint project
```

## Project Structure

```text
app/
  api/resume/route.ts   # Serves downloadable PDF resume
  globals.css           # Main styling and animation system
  layout.tsx            # Root layout
  page.tsx              # Portfolio content and UI structure
public/
  profile.jpg           # Profile image used in hero/side visual
  Showri-Konda-Resume.pdf
```

## Customization

### Update Resume Content
Edit section data and text in:
- `app/page.tsx`

### Change Profile Photo
Replace:
- `public/profile.jpg`

Keep the same file name, or update `--syntax-photo-url` in `app/globals.css`.

### Change Downloaded PDF
Replace:
- `public/Showri-Konda-Resume.pdf`

The download link points to `/api/resume`, implemented in:
- `app/api/resume/route.ts`

## Deploy

### Vercel (Recommended)
1. Push this repo to GitHub.
2. Import the repository in Vercel.
3. Deploy with default Next.js settings.

### Manual
```bash
npm install
npm run build
npm run start
```

## License

This project is licensed under the MIT License. See `LICENSE`.
