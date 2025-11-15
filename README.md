
# 🏨 Hotel Booking (Full-Stack) Project

This is a complete full-stack hotel booking website built using Nest.js (Backend) and React (Frontend).

This project was built step-by-step under the guidance of a senior developer (mentor), with every feature incrementally explained and tested.

## ✨ Features Completed

### Backend (Nest.js)
* **Authentication:**
    * `POST /auth/register`: User registration with secure `bcrypt` password hashing.
    * `POST /auth/login`: Email & password validation.
    * `JWT`: Issues JSON Web Tokens (JWT) on successful login.
    * `AuthGuard`: Protected routes (`/auth/profile`) using the `passport-jwt` strategy.
* **Email Verification:**
    * Uses `@nestjs-modules/mailer` to send a verification link upon registration.
    * `GET /auth/verify-email`: Verifies the token and sets `isEmailVerified` to `true`.
    * Login is restricted to verified users only.
* **Hotels Module (CRUD):**
    * `GET /hotels` & `GET /hotels/:id`: Publicly list all hotels or a single hotel.
    * `POST /hotels`: Create a new hotel (Protected - Authenticated users only).
    * `PATCH /hotels/:id`: Update an existing hotel (Protected).
    * `DELETE /hotels/:id`: Delete a hotel (Protected).
* **File Uploads (Image Handling):**
    * `Multer`: Handles `multipart/form-data` to save uploaded images to the `uploads/` folder.
    * `ServeStaticModule`: Serves the `uploads/` folder publicly at the `/uploads/` URL.
    * Saves full `http://...` URLs to the database.
* **Search Logic:**
    * `GET /hotels/search`: Finds available hotels based on `checkIn` and `checkOut` dates by excluding already booked hotels (using MongoDB `$nin` query).
    * Calculates `numberOfNights` and `totalPrice` on the backend and sends it with the response.
* **Bookings Module:**
    * `POST /bookings`: Creates a booking by getting `userId` from `AuthGuard` and calculating `totalPrice` from `HotelsService` (Protected).
    * `GET /bookings`: Finds all bookings **for the currently logged-in user only** using `populate('hotel')` to include hotel details (Protected).
    * **Email Receipt:** Sends a booking confirmation receipt email using a `booking-receipt.hbs` template upon successful booking.

### Frontend (React + Vite)
* **Build & Styling:**
    * `Vite` (React + TypeScript) project setup.
    * `Tailwind CSS` (JIT Engine, `@tailwindcss/vite` plugin).
* **Routing:**
    * `react-router-dom`: `BrowserRouter`, `Routes`, `Route`.
    * `Layout`: Common layout with `<Header />` and `<Footer />` (using `<Outlet />`).
    * `ProtectedPage`: A "Frontend Guard" component that redirects to `/login` if `isLoggedIn` is `false`.
* **State Management:**
    * **Global State:** `React Context API` (`AppContext`) to share `isLoggedIn`, `token`, and `user` object across the app. Persists login state to `localStorage`.
    * **Server State:** `react-query` (`@tanstack/react-query`) is used for:
        * `useQuery`: Fetching and caching data for `GET /bookings`, `GET /hotels`, `GET /hotels/:id` with automatic `isLoading`, `isError`, `data` states.
        * `useMutation`: Handling data-mutating actions like `POST /bookings`.
        * `QueryClientProvider`: Setup in `main.tsx` for app-wide cache.
* **API Calls & Notifications:**
    * `axios`: A centralized `apiClient.ts` instance with a `baseURL`.
    * **Axios Interceptor**: **Automatically** attaches the `Authorization: Bearer <token>` header to all requests by reading the token from `localStorage`.
    * `react-hot-toast`: Global toast notifications setup in `App.tsx` for success/error messages.
* **Pages & Components:**
    * `RegisterPage`: Modern UI with `toast` notifications for success/errors.
    * `LoginPage`: Saves `access_token` and `user` object to `AppContext` on success.
    * `Header`: Conditionally renders "Sign In" or "Welcome [Name] / Sign Out" based on `isLoggedIn` state.
    * `HomePage`: Features a `SearchBar`. Dynamically changes the `queryKey` based on search dates to refetch hotels using `useQuery` and displays `totalPrice`.
    * `HotelDetailsPage`: Reads `:hotelId` (`useParams`) and `?checkIn` dates (`useSearchParams`) from the URL.
    * `BookingForm`: Dynamically calculates `totalPrice` in real-time using `useEffect` as dates change. Uses `useMutation` to submit the booking.
    * `MyBookingsPage`: Uses `useQuery` and `ProtectedPage` to display a user's own bookings (with populated hotel data).
    * `VerifyEmailPage`: Reads the `token` from the URL and uses `useQuery` to call the backend verification API.

---

## 💻 Getting Started

To run this project, you will need two terminals running simultaneously: one for the **Backend** (Nest.js) and one for the **Frontend** (React).

### 1. Backend (Port 3000)

1.  Navigate to the `backend` folder from the root:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` root. (Use the `env.example.backend` template below).
4.  Start the server in development mode:
    ```bash
    npm run start:dev
    ```

### 2. Frontend (Port 5173)

1.  In a **new terminal**, navigate to the `frontend` folder from the root:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `frontend` root. (Use the `env.example.frontend` template below).
4.  Start the Vite development server:
    ```bash
    npm run dev
    ```
5.  Open your browser and go to `http://localhost:5173`.

---

## 🔑 .env (Environment Variables) Templates

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
MAIL_FROM="Your App Name <your-email@gmail.com>"

# Frontend URL (CORS & Email Links)
FRONTEND_URL=http://localhost:5173
````

#### `env.example.frontend`

(Create as `.env` in the `frontend/` folder)

```ini
# Vite requires the 'VITE_' prefix
VITE_API_BASE_URL=http://localhost:3000
```
