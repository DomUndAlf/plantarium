import axios from "axios";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const weatherRouter = Router();

weatherRouter.get("/me/garden/weather", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

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
        hourly: "precipitation_sum",
        past_days: 30, 
        timezone: "Europe/Berlin"
      },
    });

    const data = response.data;
    const dates: string[] = data.daily?.time ?? [];
    const precipitation = data.hourly?.precipitation ?? [];

    let lastRainDay: { date: string; precipitation: number } | null = null;
    for (let i = dates.length - 1; i >= 0; i--) {
      if (precipitation[i] > 0) {
        lastRainDay = { date: dates[i], precipitation: precipitation[i] };
        break;
      }
    }

    res.json({
      location: { latitude, longitude },
      lastRainDay
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Abrufen der Wetterdaten" });
  }
});

export default weatherRouter;
