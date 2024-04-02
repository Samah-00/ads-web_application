## Simple Yad2-like Website

### Goal
The goal of this project is to develop a simple Yad2-like website where users can post new ads and view existing ones. An admin user will have the authority to edit and approve ads.

### Models
The project includes an Ad model with fields for title, description, price, phone number, and email. Additionally, there is a User model with login and password fields. The app will be initialized with two sample users: admin (password: admin) and admin2 (password: admin2).

### Landing Page
- The landing page displays all approved ads, sorted by most recent.
- It features links/buttons for accessing the admin area and posting a new ad.
- Includes a search form to filter ads based on specific keywords.

### Post New Ad Page
- Provides a form for users to post new ads.
- Includes a link to return to the landing page.
- After successful submission, users receive a confirmation message.
- Ads will not be visible until approved by an admin.
- Utilizes cookies to remember users for future submissions.

### Login Page
- Users can input credentials to access the admin page.
- Incorrect credentials prompt relevant error messages.
- Implemented as an EJS page.

### Admin Page
- Exclusive access for admin users.
- Features a logout button and displays all ads for management.
- Implemented as an SPA page with REST API support.

### Implementation Details
- Utilizes middleware and MVC architecture with Express.
- Implements validation both client-side and server-side.
- REST API follows established guidelines for consistency and security.