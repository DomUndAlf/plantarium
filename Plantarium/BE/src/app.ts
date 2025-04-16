import express from 'express';
import { PrismaClient } from '@prisma/client';

// Initialize the Express application
const app = express();
const prisma = new PrismaClient();

// Define the port number for the server to listen on
const port = 3000;

// Define a route for the root URL ('/') and specify the response
app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello, Worlkgkghkhgd!'); // Send 'Hello, World!' as the response
});

// Start the server and have it listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log a message to the console indicating the server is running
});

export default app;

//middleware
//routen definieren