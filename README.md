# 🚗 Moto-Select - Car Marketplace Platform

### Demo

🌐 https://moto-select.netlify.app/

---

## Project Description

Moto-Select is a modern full-stack car marketplace application that allows users to browse, create, edit, and manage vehicle advertisements. The platform provides detailed vehicle specifications, image galleries, location support, user authentication, and a vehicle feature management system.

The application was built using React, Vite, PostgreSQL, Drizzle ORM, Clerk Authentication, and Firebase Storage.

---

## Features

🟢 **User Authentication**
Secure registration and login powered by Clerk.

🟢 **Create Vehicle Listings**
Users can publish vehicle advertisements with detailed specifications and pricing information.

🟢 **Edit & Delete Listings**
Full advertisement management directly from the user profile dashboard.

🟢 **Vehicle Feature System**
Assign multiple vehicle features such as ABS, Bluetooth, Android Auto, Touchscreen Display, Air Conditioning, and many others.

🟢 **Image Upload & Gallery**
Upload multiple images for each vehicle and display them in a responsive gallery.

🟢 **Advanced Vehicle Specifications**
Store detailed information including:

* Brand
* Model
* Year
* Mileage
* Fuel Type
* Transmission
* Drive Type
* Engine Size
* Horsepower
* VIN Number
* Vehicle Condition

🟢 **Location Integration**
Vehicle listings include geographical coordinates and map integration.

🟢 **Financial Calculator**
Built-in financing calculator for estimating vehicle payments.

🟢 **User Profile Dashboard**
Manage personal listings and account information.

🟢 **Responsive Design**
Fully responsive interface optimized for desktop, tablet, and mobile devices.

---

## Database Features

The application uses a relational PostgreSQL database hosted on Neon.

Main entities:

* Users
* Vehicle Listings
* Vehicle Images
* Vehicle Features
* Listing Features (many-to-many relationship)

Implemented relationships:

* One User → Many Listings
* One Listing → Many Images
* Many Listings ↔ Many Features

---

## Languages and Tools Used in This Project

<p align="left">
  <img src="https://skillicons.dev/icons?i=html,css,js,react,vite,tailwind,firebase,postgresql,git,github,vscode" />
</p>

Additional Technologies:

* Clerk Authentication
* Drizzle ORM
* Neon Database
* Geoapify API
* Sendbird Chat API
* shadcn/ui

---

## Installation

```bash
git clone https://github.com/Plichciu/Moto-Select.git

cd Moto-Select

npm install

npm run dev
```

---

## Environment Variables

Create a `.env.local` file in the root directory and add:

```env
VITE_CLERK_PUBLISHABLE_KEY=

VITE_DRIZZLE_DATABASE_URL=

VITE_FIREBASE_API_KEY=

VITE_GEOAPIFY_KEY=

VITE_SENDBIRD_APP_ID=

VITE_SENDBIRD_API_TOKEN=
```

---

## Build for Production

```bash
npm run build
```

---

## Author

**Michał Lipa**

GitHub: https://github.com/Plichciu
