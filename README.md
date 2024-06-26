# Passport Authentication with Google OAuth2

This project demonstrates how to implement Multi-Factor Authentication speakeasy and qrcode. It allows users to authenticate with MFA for more security.

## Installation

1. Clone this repository to your local machine.
2. Install project dependencies with `npm install` in server paste.

## Running the Project

Start the server with `npm run dev`.

## Features

- Authentication
- Multi-Factor Authentication (MFA)

## Technologies Used

- **Backend**: Node.js, Express, swagger, speakeasy, qrcode with Javascript
- **Database**: PostgreSQL with Docker-compose

## How to Use

1. **Installation**:
   - Clone the repository:

     ```bash
     git clone "https://github.com/Colledev/user-auth-mfa.git"
     ```

   - Navigate to the project directory:

     ```bash
     cd user-auth-mfa
     ```

   - Install server-side dependencies (backend):

     ```bash
     npm install
     ```

2. **Configuration**:
   - Create a `.env` file in the `server` folder with necessary environment variables, such as database connection and SECRET_KEY.

3. **Execution**:
   - Start the server (backend):

     ```bash
     npm run dev
     ```

4. **Access**:
- Open the app in your browser using the address provided after starting the client (`http://localhost:3000`).
- For better visualization, it is recommended to use the route `/api-docs/#/` (to use Swagger).
- After creating a user, you can activate MFA by copying and pasting the JSON `qrCode` in the browser.
- Using a mobile authenticator application, scan the QR code to verify the MFA.


## Sreenshot

![image](https://github.com/Colledev/user-auth-mfa/assets/112740912/86a4fdd8-3c6c-4da8-a20e-7fbc2b64be53)

## License

MIT License.
