# me-api-playground-frontend

This project is a [Next.js](https://nextjs.org) application bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It serves as a frontend playground for interacting with a backend API.

## Architecture

The project is built using Next.js, leveraging the App Router for its routing and component structure.

-   **Framework:** Next.js (v14.0.0)
-   **Frontend Components:** Located in the `app/components/` directory, including `Navbar`, `ProfileCard`, `ProjectCard`, and `SearchBar`.
-   **API Interaction:** All API calls are managed through the `lib/api.js` module, which handles requests to a backend API.
-   **Styling:** Uses a combination of CSS Modules (`app/page.module.css`) and global styles (`app/globals.css`), with Tailwind CSS (`tailwind.config.js`, `postcss.config.js`) for utility-first styling.
-   **Configuration:** The backend API URL is configurable via the `NEXT_PUBLIC_API_URL` environment variable.

## Setup

### Local Development

1.  **Prerequisites:** Ensure you have Node.js and npm (or yarn) installed.
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Set Environment Variables:** Create a `.env` file in the root directory and add the following line, replacing the URL with your backend API endpoint:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:4000 # Example URL
    ```
4.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000`.

### Production Build

1.  **Build the Application:**
    ```bash
    npm run build
    ```
2.  **Start the Production Server:**
    ```bash
    npm start
    ```
    The application will be accessible at `http://localhost:3000`.

## Schema

This frontend application interacts with a backend API. The specific data structures (schemas) are defined by the backend. Key API endpoints exposed by `lib/api.js` include:

-   `GET /profile/get`: Retrieves user profile information.
-   `PUT /profile/update`: Updates user profile information. Requires an `Authorization` token.
-   `GET /projects`: Retrieves a list of projects. May accept query parameters for filtering.
-   `GET /skills/top`: Retrieves a list of top skills.
-   `GET /search`: Performs a search query.

Data is primarily exchanged in JSON format. The base URL for these API endpoints is configured via the `NEXT_PUBLIC_API_URL` environment variable.

## Limitations

-   **Backend Dependency:** The functionality of this frontend application is heavily dependent on the availability and correct operation of its backend API.
-   **Schema Definition:** No explicit database or API schema is defined within this frontend project. Data structures are dictated by the backend.
-   **Error Handling:** While basic error handling is implemented in `lib/api.js`, specific error messages and their handling within the UI may vary.
-   **UI/UX:** Detailed UI/UX specifications or limitations are not explicitly documented here.

## Resume

You can find my resume here: [ Cline's Resume](https://drive.google.com/file/d/1BMi31Xo2WUWjfuzL1hni18EMi0ktLbr4/view?usp=sharing)

