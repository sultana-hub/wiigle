🐶 Wiggle Wag Pet Shop

Wiggle Wag Pet Shop is a full-stack pet eCommerce platform where users can adopt pets, book vet appointments, shop pet products, add reviews, and track orders — all in one place.
Built with React.js, Redux Toolkit, MUI, and Supabase/Appwrite for a modern and scalable user experience.

🚀 Live Demo

🔗 View Live Project[https://wiggle-wag.vercel.app/]


🧩 Features
🛒 For Users

Browse, search, and filter pets and pet products

Add items to Cart and Wishlist

Place orders with free payment gateway integration

Track order status (Delivered / In Progress / Cancelled)

Submit and view product reviews

Adopt pets by submitting an application form

Book vet appointments with available time slots

Responsive UI with MUI and Tailwind CSS

🧑‍💼 For Admin

Dashboard with summary cards for:

Pet Adoption Applications

Vet Appointments

Orders

Approve / Reject adoption applications

Manage products, users, and reviews

View and manage all orders in one page

🛠️ Tech Stack
Category	Technologies
Frontend	React.js, React Query, MUI
Backend	
Database	 Appwrite
Authentication	Appwrite Auth +jwt
Storage	Appwrite Storage / Supabase Bucket
Payment	Stripe (Test Mode)
Form Handling	React Controlled Form
Hosting	Vercel (Frontend) 

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/sultana-hub/wiigle.git
cd wigglewag-pet-shop

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env file in the root directory and add:

REACT_APP_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1

REACT_APP_APPWRITE_PROJECT_ID=Your Project Id    

REACT_APP_APPWRITE_DATABASE_ID=Your Database Id

REACT_APP_APPWRITE_STORAGE_ID=Your Storage ID

REACT_APP_APPWRITE_PET_IMAGE_STORAGE_ID=Your Storage Id

REACT_APP_APPWRITE_PET_BUCKET_IMAGE_ID=Your Bucket Id

REACT_APP_APPWRITE_PET_COLLECTION_ID=Your Collection Id

REACT_APP_APPWRITE_PRODUCTS_COLLECTION_ID=Your Id

REACT_APP_APPWRITE_PRODUCTS_IMAGES_STORAGE_ID=Your Storage

REACT_APP_APPWRITE_CART_COLLECTION_ID=Your Id

REACT_APP_APPWRITE_PET_DETAILS_COLLECTION_ID=Your Id

REACT_APP_APPWRITE_ADOPTION_COLLECTION_ID=Your Id

REACT_APP_APPWRITE_VET_COLLECTION_ID=Your Id

REACT_APP_APPWRITE_ORDERS_COLLECTION_ID=Your Id

REACT_APP_APPWRITE_REVIEW_COLLECTION_ID=Your Id


REACT_APP_APPWRITE_API_KEY= your appwrite api key

4️⃣ Run the Development Server
npm start


App runs locally at 👉 http://localhost:3000


🧠 Key Functionalities Explained
Feature	Description
Pet Adoption Form	Stores user-submitted data in Appwrite collection
Vet Appointment	Uses uncontrolled form + React Query for submission
Add to Cart / Wishlist	Managed via React Query and Appwrite backend
Admin Panel	Displays data in cards with Manage button for details
Image Uploads	Stored in Appwrite Storage and linked via URLs
Payment Flow	Stripe test mode with redirect to order status page
🔐 Authentication Flow

User registration and login handled via Appwrite Authentication


🧑‍💻 Author

👩‍💻 Parveen Sultana
Full Stack Developer (MERN + Appwrite )
📧 Email: [psultana6@gmail.com]

🌐 Portfolio: https://sultana-portfolio.vercel.app/

🌐 Backend Portfolio:https://portfolio-yh4z.onrender.com

💼 LinkedIn: https://www.linkedin.com/in/parveen-sultana-84671b6a/

⭐ Contributing

Contributions are welcome!
If you’d like to improve Wiggle Wag, please:

Fork the repository

Create your feature branch (git checkout -b feature-name)

Commit your changes (git commit -m "Added feature-name")

Push to the branch (git push origin feature-name)

Open a Pull Request 🚀
