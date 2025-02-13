<!DOCTYPE html>
<body>
  <header>
    <h1>Appointment Booking System</h1>
  </header>
  <section>
    <h2>Project Description</h2>
    <p>
      This is a full-stack Appointment Booking System built with <strong>React.js</strong>, <strong>Node.js</strong>, and <strong>MySQL</strong>. 
      The system allows users to view available time slots, book appointments, view their booked appointments, and cancel appointments. 
      Optional features like user authentication and an admin panel are also implemented.
    </p>
  </section>
  <section>
    <h2>Objectives</h2>
    <p>
      The goal of this project is to build a simple Appointment Booking System where users can:
    </p>
    <ul>
      <li>View available time slots for appointments.</li>
      <li>Book an appointment by selecting a date, time slot, and providing user details.</li>
      <li>View their booked appointments.</li>
      <li>Edit and Cancel an appointment.</li>
    </ul>
  </section>
  <section>
    <h2>Technologies Used</h2>
    <h3>Frontend:</h3>
    <ul>
      <li><strong>React.js</strong>: JavaScript library for building user interfaces.</li>
      <li><strong>React Router</strong>: For navigation between pages.</li>
      <li><strong>Axios</strong>: For making HTTP requests to the backend.</li>
      <li><strong>Material-UI</strong>: For responsive and modern UI components.</li>
      <li><strong>SweetAlert2</strong>: For user-friendly alerts and notifications.</li>
    </ul>
  </section>
  <section>
    <h3>Backend:</h3>
    <ul>
      <li><strong>Node.js</strong>: JavaScript runtime for server-side development.</li>
      <li><strong>Express</strong>: Web framework for Node.js.</li>
      <li><strong>MySQL</strong>: Relational database for storing appointment and user data.</li>
      <li><strong>Cors</strong>: Middleware for handling cross-origin requests.</li>
      <li><strong>Dotenv</strong>: For managing environment variables.</li>
      <li><strong>Body-parser</strong>: For parsing incoming request bodies.</li>
      <li><strong>Nodemon</strong>: Automatically restarts the server during development.</li>
    </ul>
  </section>
  <section>
    <h2>Project Setup</h2>

<h3>Frontend (React.js)</h3>
<ol>
  <li>Create a React app called <code>frontend</code>
    <pre><code>npx create-react-app frontend</code></pre>
  </li>
  <li>Navigate to the frontend directory
    <pre><code>cd frontend</code></pre>
  </li>
  <li>Start the React development server
    <pre><code>npm start</code></pre>
  </li>
  <li>Install required dependencies
    <pre><code>npm install react-router-dom axios @mui/icons-material @mui/material @emotion/react @emotion/styled sweetalert2</code></pre>
  </li>
</ol>
</section>
<section>
<h3>Backend (Node.js + Express + MySQL)</h3>
<ol>
  <li>Create a folder called <code>server</code> for the backend.
  </li>
  <li>Navigate to the server directory
    <pre><code>cd server</code></pre>
  </li>
  <li>Initialize the Node.js project
    <pre><code>npm init -y</code></pre>
  </li>
  <li>Install required dependencies
    <pre><code>npm install express mysql2 cors dotenv body-parser nodemon</code></pre>
  </li>
  <li>Create the database in MySQL and configure the database connection.</li>
  <li>Create a <code>.env</code> file to store environment variables such as database credentials.</li>
  <li>Start the server using <code>nodemon</code>:
    <pre><code>nodemon server</code></pre>
  </li>
</ol>
   
  </section>
  <section>
    <h2>Future Enhancements</h2>
    <ul>
      <li><strong>Authentication</strong>: Implement JWT-based authentication for secure user sessions.</li>
      <li><strong>Admin Panel</strong>: Add an admin dashboard to view all appointments.</li>
      <li><strong>Search and Filter</strong>: Allow users to search for specific dates or filter available slots.</li>
    </ul>
  </section>
</body>
</html>
