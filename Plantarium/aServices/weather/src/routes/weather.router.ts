import axios from "axios";
import { Router } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../../../shared/prismaClient";

const weatherRouter = Router();

weatherRouter.get("/me/garden/weather", async (req, res) => {
  console.log("Authorization Header:", req.headers["authorization"]);

  
  const authHeader = req.headers["authorization"];
if (!authHeader) return res.status(401).json({ error: "Nicht eingeloggt" });

const token = authHeader.split(" ")[1];
if (!token) return res.status(401).json({ error: "Token fehlt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    const user = await prisma.users.findUnique({
      where: { id: decoded.id },
    });
    
    let latitude = 51.34;
    let longitude = 12.37; //default ist quasi Leiptig
    if (user?.location) {
      const parts = user.location.split(",").map(Number);
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        latitude = parts[0];
        longitude = parts[1];
      }
    }

    const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude,
        longitude,
        daily: "precipitation_sum",
        past_days: 60, 
         forecast_days: 1,  
        timezone: "Europe/Berlin"
      },
    });

    const data = response.data;
    const dates: string[] = data.daily?.time ?? [];
   const precipitation: number[] = data.daily?.precipitation_sum ?? [];

    const today = new Date().toISOString().split("T")[0];

let lastRainDay: { date: string; precipitation: number } | null = null;
for (let i = dates.length - 1; i >= 0; i--) {
  if (precipitation[i] > 0.01) {
    lastRainDay = { date: dates[i], precipitation: precipitation[i] };
    break;
  }
}

    let last5DaysSum = 0;
    const todayIndex = dates.findIndex((d) => d === today);
    if (todayIndex !== -1) {
      const start = Math.max(0, todayIndex - 4);
      const recent5 = precipitation.slice(start, todayIndex + 1);
      last5DaysSum = recent5.reduce((a, b) => a + b, 0);
    }

    console.log("Dates:", dates);
console.log("Precipitation:", precipitation);

    res.json({
      location: { latitude, longitude },
      lastRainDay,
        last5DaysSum
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Abrufen der Wetterdaten" });
  }
});

export default weatherRouter;
