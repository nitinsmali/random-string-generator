# Random String Generator

A responsive React app that generates strong random strings with user-controlled length and character options. Built with React functional components and Hooks (`useState`, `useCallback`, `useEffect`).

## Live Demo

#### https://randomstring-generator.vercel.app/


## Features

- Length control via slider and numeric input (1-100)
- Select uppercase, lowercase, numbers, and special characters
- Auto-regeneration when options change
- Copy generated string to clipboard
- Regenerate instantly with a button
- Strong password strength indicator
- Recent generated string history stored locally
- Export generated strings to a text file
- Light / dark theme toggle with persistent preference

## Project structure

- `src/App.jsx` - layout and theme state
- `src/components/StringGenerator.jsx` - app state and main logic
- `src/components/Controls.jsx` - inputs for length and character selection
- `src/components/Output.jsx` - generated string display and actions
- `src/components/ThemeToggle.jsx` - theme switch button
- `src/utils/random.js` - reusable random string utility
- `src/utils/strength.js` - simple strength estimator

## Local development

```bash
npm install
npm start
```

Then open `http://localhost:3000` in your browser.

## Build for production

```bash
npm run build
```

The optimized production files will be created in the `build/` folder.

## Deployment preparation

- The app uses Create React App, so it is ready for many static hosts such as Vercel, Netlify, GitHub Pages, or any CDN-backed hosting.
- Run `npm run build` to produce deployable assets.
- Ensure the host serves `index.html` for client-side routing if you extend the app.

## Notes

- Clipboard access requires a secure context (`https` or `localhost`).
- Theme and history are persisted locally using `localStorage`.
- Invalid input is validated and user feedback is shown when necessary.

