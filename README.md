# Medorium-Roster

What better way to keep track of our Evo Online membership than an entire website.

## Contribution Guidelines

All changes and features should be done through a feature branch.
You have to create a new branch, commit the changes on that branch,
then make a Pull Request when finished and ask for code review.

## Project overview

### `api` - REST API for authentication and fetching data of users and their characters

#### Tech Stack

- TypeScript
- Express
- MongoDB (mongoose ODM)
- Vitest

### `frontend` - React app that renders the data

#### Tech Stack

- TypeScript
- Redux toolkit
- CSS
- Tailwind CSS
- Vitest

## Installation guide

```bash
# Clone the project
git clone git@github.com:LatridellActiveX/Medorium-Roster.git

# then go into the Medorium-Roster directory
cd Medorium-Roster
```

### Installing dependencies

```bash
npm install
```

### Running the project in development mode

```bash
npm run frontend
npm run api
```
