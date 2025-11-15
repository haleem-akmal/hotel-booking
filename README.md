
# 🏨 Full-Stack Hotel Booking Platform

This is a complete full-stack hotel booking application built with Nest.js (Backend) and React (Frontend). The project was developed incrementally, following a mentor-guided, step-by-step methodology, with detailed explanations and testing for each feature.

This platform allows users to register, verify their email, search for available hotels based on dates, and book their stay.

---

## ✨ Features Completed

### Backend (Nest.js)

* **Authentication & Authorization:**
    * `POST /auth/register`: Secure user registration with `bcrypt` password hashing.
    * `POST /auth/login`: User login validation, returning a `user` object and a `JWT`.
    * `JWT`: JSON Web Token generation for authenticated users.
    * `AuthGuard`: Protected routes using `passport-jwt` strategy (e.g., `/auth/profile`, `/bookings`).
* **Email Verification:**
    * Uses `@nestjs-modules/mailer` to send a verification link upon registration.
    * `GET /auth/verify-email`: Verifies the token and updates the `isEmailVerified` flag.
    * Login is restricted only to verified users.
* **Hotels Module (CRUD):**
    * `GET /hotels` & `GET /hotels/:id`: Public endpoints to list all hotels and get details for a single hotel.
    * `POST /hotels`: Protected route for creating a new hotel.
    * `PATCH /hotels/:id`: Protected route for updating an existing hotel.
    * `DELETE /hotels/:id`: Protected route for deleting a hotel.
* **File Uploads (Images):**
    * Handles `multipart/form-data` using `Multer` to save images to an `uploads/` folder.
    * `ServeStaticModule`: Serves the `uploads/` folder publicly at the `/uploads` URL path.
    * Saves full `http://...` URLs to the database.
* **Advanced Search Logic:**
    * `GET /hotels/search`: A dedicated public endpoint to find available hotels.
    * It accepts `checkIn` and `checkOut` dates.
    * Queries the `Bookings` collection to find conflicting bookings.
    * Uses a `$nin` (Not In) query to return only hotels that are **not** booked for the selected dates.
    * Dynamically calculates and returns `numberOfNights` and `totalPrice` for each available hotel based on the search dates.
* **Bookings Module:**
    * `POST /bookings`: Protected route that:
        1.  Gets `userId` from the `AuthGuard`.
        2.  Gets `pricePerNight` from the `HotelsService`.
        3.  Calculates the `totalPrice` on the backend.
        4.  Creates the new booking.
    * `GET /bookings`: Protected route that returns **only the logged-in user's** bookings.
    * `populate('hotel')`: Automatically populates the `hotel` details (name, images) for each booking.
    * **Email Receipt:** Sends a booking confirmation receipt (`booking-receipt.hbs`) via email after a successful booking.

### Frontend (React + Vite)

* **Build & Styling:**
    * Project setup using `Vite` (React + TypeScript).
    * Styled with `Tailwind CSS` (using `@tailwindcss/vite` plugin and a professional, modern UI).
* **Routing:**
    * `react-router-dom`: Handles all page navigation.
    * `Layout`: A shared layout component (`<Outlet />`) that includes the `Header` and `Footer`.
    * `ProtectedPage`: A "Frontend Guard" component that checks `isLoggedIn` state and redirects to `/login` if the user is not authenticated.
* **State Management:**
    * **Global State (Context API):** `AppContext` manages global `isLoggedIn` status, `token`, and the `user` object.
    * **Persistence:** Login state (token + user data) is persisted in `localStorage` to survive page refreshes.
    * **Server State (React Query):** Uses `@tanstack/react-query` for all data fetching.
        * `useQuery`: Fetches data for `GET /bookings`, `GET /hotels/:id`, and `GET /hotels/search`. Manages all `isLoading`, `isError`, and `data` states.
        * `useMutation`: Handles data mutations for `POST /bookings`.
        * `QueryClientProvider`: Manages the global cache in `main.tsx`.
* **API & Notifications:**
    * `axios`: A centralized `apiClient.ts` instance is created with a `baseURL`.
    * **Axios Interceptor**: Automatically attaches the `Authorization: Bearer <token>` header from `localStorage` to **all** outgoing requests.
    * `react-hot-toast`: Provides clean, professional success and error notifications (toasts) across the entire app.
* **Key Pages & Components:**
    * `RegisterPage`: Modern UI with `toast` notifications for success/error.
    * `LoginPage`: Logs in the user and calls `saveLoginData` to store the `token` and `user` object in the global context.
    * `Header`: A dynamic component that shows "Sign In" or "Welcome, [User Name] / Sign Out" based on the `isLoggedIn` state from `AppContext`.
    * `HomePage`:
        * Features a `SearchBar` component.
        * Passes search dates to `useQuery`'s `queryKey` to trigger automatic refetches.
        * Displays hotel cards with dynamically calculated `totalPrice` and `numberOfNights` from the backend.
    * `HotelDetailsPage`:
        * Reads `:hotelId` from `useParams` and `?checkIn` dates from `useSearchParams`.
        * Passes this data as `props` to the `BookingForm`.
    * `BookingForm`:
        * Dynamically calculates `totalPrice` in real-time as dates are changed using `useEffect`.
        * Uses `useMutation` to handle the booking submission, providing `isLoading` state and `toast` notifications.
    * `MyBookingsPage`: Uses `useQuery` and `ProtectedPage` to display a list of the user's bookings with populated hotel details.
    * `VerifyEmailPage`: A dedicated route (`/auth/verify-email`) that reads the `token` from the URL and uses `useQuery` to call the backend verification API.

---

## 🚀 What's Next (Future Enhancements)

This project has a strong foundation. Here are the next steps to make it a production-ready application:

* **User Profile Management:**
    * Create a `User Dashboard` (protected route).
    * Allow users to update their `firstName`, `lastName`, and `password`.
    * Allow users to upload a `profileImage` (similar to hotel image uploads).
* **Hotel Details Page:**
    * Show a full image carousel/gallery for all `imageUrls`.
    * Add a "Reviews & Ratings" section.
    * Integrate a map (e.g., Google Maps API) to show the hotel's location.
* **Reviews & Ratings:**
    * Allow users who have completed a booking to leave a star rating and a review for a hotel.
    * Update the `Hotel` schema to store an array of reviews and a calculated average `starRating`.
* **Admin Dashboard (Protected Role-Based Guard):**
    * Create a new "admin" role in the `User` schema.
    * Create an Admin Guard in Nest.js.
    * Build an admin-only frontend section to:
        * View/Manage all hotels (CRUD).
        * View/Manage all users.
        * View all bookings in the system.
* **Payment Gateway:**
    * Integrate **Stripe** (or PayPal) into the `BookingForm`.
    * Create a `POST /bookings/payment-intent` endpoint on the backend to create a Stripe payment.
    * Confirm the booking only *after* the payment is successful.
* **Deployment:**
    * **Backend (Nest.js):** Deploy to a service like **Render**, **Vercel**, or **AWS**.
    * **Frontend (React):** Deploy to **Vercel** or **Netlify**.

---

## 💻 Getting Started

You will need two terminals to run both the backend and frontend servers.

### 1. Backend (Nest.js Server @ Port 3000)

1.  Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2.  Install all required dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend/` root. (Use the `env.example.backend` template below).
4.  Start the development server:
    ```bash
    npm run start:dev
    ```

### 2. Frontend (React Server @ Port 5173)

1.  In a **new terminal**, navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
2.  Install all required dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `frontend/` root. (Use the `env.example.frontend` template below).
4.  Start the Vite development server:
    ```bash
    npm run dev
    ```
5.  Open your browser and go to `http://localhost:5173`.

---

## 🔑 Environment Variables (.env)

#### `env.example.backend`
(Create as `.env` in the `backend/` folder)
```ini
# MongoDB Connection
MONGO_URI=mongodb+srv://<YourUsername>:<YourPassword>@cluster0.xxxxx.mongodb.net/hotel-booking?retryWrites=true&w=majority

# JWT Secrets
JWT_SECRET=SOME_VERY_STRONG_AND_RANDOM_SECRET_KEY
JWT_EXPIRES_IN=1d

# Email Verification JWT Secrets
JWT_VERIFICATION_SECRET=ANOTHER_RANDOM_SECRET_FOR_EMAIL
JWT_VERIFICATION_EXPIRES_IN=10m

# Mailer Config (Gmail App Password)
MAIL_HOST=smtp.gmail.com
MAIL_USER=your-email@gmail.com
MAIL_PASS=your_16_digit_app_password
MAIL_FROM="HotelBooking.com <your-email@gmail.com>"

# Frontend URL (CORS & Email Links)
FRONTEND_URL=http://localhost:5173
````

#### `env.example.frontend`

(Create as `.env` in the `frontend/` folder)

```ini
# Vite requires the 'VITE_' prefix
VITE_API_BASE_URL=http://localhost:3000
```
