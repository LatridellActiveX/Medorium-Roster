# Medorium-Roster

What better way to keep track of our Eve Online membership than an entire website.

## Contribution Guidelines

All changes and features should be done through a feature branch.
You have to create a new branch, commit the changes on that branch,
then make a Pull Request when finished and ask for code review.
Make sure the tests pass and make sure the feature works by testing manually.

## Project overview

### `api` - REST API with authentication and CRUD for users and their characters

#### Tech Stack

- TypeScript
- Express
- MongoDB (mongoose ODM)
- Vitest

### `frontend` - React app that renders the data

#### Tech Stack

- TypeScript
- React
- Redux toolkit
- TanStack Query
- Tailwind CSS
- Vitest
- Cypress

## Installation guide

```bash
# Clone the project
git clone git@github.com:LatridellActiveX/Medorium-Roster.git

# then go into the Medorium-Roster directory
cd Medorium-Roster
```

## Create .env file and generate a secret

`NOTE: you don't have to generate a key in development`

```bash
# go into api directory
cd api

# copy .env.example -> .env
  # on windows:
copy .env.example .env
  # on linux:
cp .env.example .env
```

### Installing dependencies and running the project in dev mode

```bash
# after cd'ing into frontend/ and api/ directories individually
npm install
npm run dev
```
