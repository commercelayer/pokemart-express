# PokéMart Express

PokéMart Express is an ecommerce demo project showcasing how to build a headless commerce solution using Commerce Layer, integrating it with a public API (PokéAPI). This project separates product content data from commerce logic, providing a CMS-agnostic approach, and demonstrates how easy it is to integrate Commerce Layer’s components to unlock a creative and flexible user experience.

## Goals

- Separate product content data from commerce logic in an actual site.
- CMS-agnostic architecture.
- Showcase the straightforward integration of Commerce Layer (using React components, utilities, etc.).
- Enhance the user experience beyond just cart management.
- Build a flexible, iterative ecommerce platform.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Recipe

We are building a website selling Pokémons using a public API (PokéAPI) to source product content, with Commerce Layer handling the ecommerce functionalities.

- **Difficulty level**: Medium
- **Cooking time**: 60 minutes
- **Cost**: Free

### Ingredients

For this project, we are using the following tech stack:

- **Commerce Layer**: A headless commerce platform to manage product, cart, and orders.
- **Next.js**: A React framework for building static and dynamic websites, with server-side rendering.
- **Vercel**: A platform for hosting and deploying Next.js projects seamlessly.
- **PokéAPI**: An open API for Pokémon data to populate the content.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
