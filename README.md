# Simple Leads Management Website

## Overview
This project is a Simple Leads Management Website designed to help users manage their leads efficiently. It provides functionalities for logging in, viewing leads, and filtering them based on various criteria.

## Features
- User authentication using Firebase
- View and manage leads
- Filter leads by status and search by name or phone number
- Display statistics for today's calls and visits

## File Structure
- **public/**: Contains static files such as HTML and images.
  - `index.html`: The main HTML file for the application.
  - `logo-2.jpg`: An image used in the application.
  - `manifest.json`: Metadata for the web application.
  - `robots.txt`: Instructions for web crawlers.

- **src/**: Contains the source code for the application.
  - `App.css`: Styles for the main application.
  - `App.jsx`: The main application component.
  - `index.js`: Entry point for the React application.
  - **components/**: Contains reusable components.
    - `DailyPopup.jsx`: Component for daily pop-up notifications.
    - `FollowUp.jsx`: Component for follow-up actions.
    - `LeadsTable.jsx`: Displays the table of leads and their details.
  - **firebase/**: Contains Firebase configuration and authentication logic.
    - `firebase.jsx`: Firebase setup and authentication methods.
  - **pages/**: Contains different pages of the application.
    - `addlead.jsx`: Page for adding new leads.
    - `followups.jsx`: Page for managing follow-ups.
    - `home.jsx`: Home page of the application.
    - `LeadInfo.jsx`: Page for viewing detailed information about a lead.
    - `login.jsx`: Login page for user authentication.

## Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the development server.

## Usage
- Navigate to the login page to authenticate.
- After logging in, you can view and manage leads on the home page.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.
