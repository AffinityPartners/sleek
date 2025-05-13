# Sleek - Modern Web Application

A modern web application built with Next.js, TypeScript, Tailwind CSS, and React.

## Features

- Next.js App Router
- TypeScript support
- Tailwind CSS with PostCSS and autoprefixer
- Headless UI components
- Framer Motion animations
- Responsive design
- Accessible UI components

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/sleek.git
cd sleek
```

2. Install the dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
sleek/
├── public/               # Static assets
│   └── images/           # Store your images here
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── Button.tsx    # Button component
│   │   └── Modal.tsx     # Modal component
│   └── lib/              # Utility functions and shared code
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── next.config.js        # Next.js configuration
└── tsconfig.json         # TypeScript configuration
```

## Using Images

To use images in your application:

1. Place your image files in the `public/images/` directory
2. Reference them in your components like this:

```jsx
<img src="/images/your-image.jpg" alt="Description" />
```

Next.js will automatically handle the serving of these static assets.

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Headless UI](https://headlessui.dev/) - Unstyled, accessible UI components
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React

## License

This project is licensed under the MIT License - see the LICENSE file for details. 