import { PrismaClient } from '@prisma/client';
import app from './app.js';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

const prisma = new PrismaClient();

async function fetchUser() {
  const user = await prisma.users.findUnique({
    where: { id: 1 },
  });
  console.log(user);
}

fetchUser();
