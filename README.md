# PlaceBooking.com

Welcome to PlaceBooking.com, a platform where users can register, login, create their own accommodations to rent out, or book places for vacation. This application allows users to showcase their properties, upload photos using Cloudinary, and enjoy various features for a seamless booking experience.

## Features

- **User Authentication:**
  - Users can register and log in securely.
  - Authentication is handled using JWT tokens.

- **Accommodation Management:**
  - Users can create and manage their accommodations.
  - Accommodations include details like title, address, photos, description, price, perks, extra information, check-in/out times, and maximum guests.

- **Image Upload:**
  - Users can upload accommodation photos using file upload or by providing a direct image link.
  - Cloudinary is used to host and manage images.

- **Accommodation Listing:**
  - Users can view all available accommodations on the platform.
  - Details such as title, address, photos, and pricing are displayed.

- **Booking System:**
  - Users can book accommodations for their desired dates.
  - Booking details include check-in/out dates, the number of guests, name, phone, and price.

- **User Profile:**
  - Users can view and update their profiles.
  - Profile information includes name and email.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MongoDB installed and running.
- Cloudinary account for image hosting.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/PlaceBooking.com.git
    ```

2. Navigate to the project directory:

    ```bash
    cd PlaceBooking.com
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the project root and add the following:

    ```env
    MONGO_URL=your_mongodb_connection_string
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

    Replace the placeholders with your MongoDB connection string and Cloudinary credentials.

5. Run the application:

    ```bash
    npm start
    ```

    The application will be available at http://localhost:4000.

## Usage

1. Register a new account or log in if you already have one.
2. Explore available accommodations or create your own.
3. Upload accommodation photos using file upload or link.
4. Book accommodations for your vacation.

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

This project is licensed under the [MIT License](LICENSE).