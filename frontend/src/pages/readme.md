The ui folder is for components that will be used across multiple files (e.g. input, formBase, characters);
We can store pages and their components here like so:

src
  pages
    aboutUs
      index.tsx (about us page)
      contacts (component for this page)
        index.tsx
        contact.tsx
      map.tsx
      