# Pawsome | Pet Care Tips & Heartwarming Stories

### [Live URL](https://pawsome-client.vercel.app) | [Base URL (Server)](https://pawsome-server.vercel.app)

### [Backend Repository](https://github.com/saifscripts/pawsome-server)

## Introduction

Pawsome is a comprehensive platform designed to provide pet owners with valuable resources, expert advice, and a community-driven space to better care for their pets. This project aims to bridge the gap between pet owners and essential pet care information, fostering a community where users can access premium content, share experiences, and find guidance on a range of topics, from health and nutrition to training and daily care.

## Project Description

The Pawsome platform offers users access to a mix of free and premium content, including detailed guides, tips, and personalized advice tailored to various types of pets. Users can choose between different subscription plans to unlock premium content and gain exclusive insights from pet care experts.

## Features

- Designed a mobile-friendly UI that achieves mobile usability across various devices and screen sizes.
- Secured 100% of access with RBAC, JWT managing 'admin' and 'user' roles.
- Ensured 100% data integrity via frontend and backend validation using Mongoose and form validation.
- Integrated a rich text editor, enabling users to create, edit, and share engaging pet care tips and stories, complete with image attachments for better engagement.
- Implemented payment integration with AAMARPAY, allowing users to access premium content and enabling authors to monetize exclusive insights.
- Developed an advanced search and filtering system that allows users to easily find relevant content, with results sorted by upvote count for improved relevance.
- Enabled users to upvote, downvote, and comment on posts, fostering community engagement and interaction among pet owners.
- Created a real-time news feed showcasing the latest pet care tips and stories, with an infinite scroll feature for seamless content discovery.
- Implemented a following system that allows users to follow other pet owners, enhancing personalized content delivery from followed accounts.
- Designed an admin dashboard for content and user management, allowing admins to control posts, monitor payment history, and manage user interactions efficiently.

## Technology Stack

- Next.js, TypeScript, Tanstack Query, Tailwind CSS, NextUI

## Prerequisites

- Node.js and npm/yarn installed.
- Any Web browser to view the application

## Installation Guideline

Follow this step-by-step guide to run the server on your local machine.

### 0. Prerequisites

- Node.js and npm/yarn installed.
- Any Web browser to view the application.

### 1. Clone the Repository

First, clone the repository to your machine using the following command:

```
git clone https://github.com/saifscripts/pawsome-client
```

### 2. Change Directory

Next, navigate to the project directory with this command:

```
cd pawsome-client
```

### 3. Install Dependencies

Before running the app, you need to install all dependencies. You can do this using either Yarn or npm.

#### Using Yarn

```

yarn install

```

#### Using npm

```

npm install

```

### 4. Add a Configuration File

To run the app, create a `.env` file in the root folder with the following properties (I have included a few demo values here for testing):

```
NEXT_PUBLIC_BASE_URL=http://localhost:5000/api/v1
```

### 5. Run the App

Now, you're ready to run the app. Use one of the following commands to start the server.

#### Using Yarn

```
yarn dev
```

#### Using npm

```
npm run dev
```

That's it! The application should now be running locally.

## Usage

### User Guide:

- Create an account or log in to access the platform
- Browse through heartwarming pet stories and expert care tips
- Filter posts by categories like grooming, nutrition, health etc.
- Like and comment on posts to engage with the community
- Share your own pet stories and experiences
- Save your favorite posts to read later
- Follow other pet lovers to stay updated with their content
- Access your personalized feed based on your interests
- Get notifications for new posts from accounts you follow
- Update your profile and preferences anytime

### Content Creator Guide:

- Manage all user-submitted content (publish, unpublish, review)
- Monitor and moderate user comments and interactions
- Delete or block users who violate community guidelines
- Grant or revoke admin privileges to other users
- Access admin dashboard for content management
