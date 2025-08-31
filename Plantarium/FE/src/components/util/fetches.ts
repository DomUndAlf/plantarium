// src/api.ts
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";
const AUTH_URL = import.meta.env.VITE_AUTH_URL || "http://localhost:3001";

const defaultOptions: RequestInit = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};

// ---------------- USER ----------------
export async function fetchUser() {
  const res = await fetch(`${AUTH_URL}/users/me`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("User nicht eingeloggt");
  return res.json();
}

// ---------------- BEDS ----------------
export async function getBeds() {
  const res = await fetch(`${API_URL}/me/garden/beds`, defaultOptions);
  if (!res.ok) throw new Error("Fehler beim Laden der Beete");
  return res.json();
}

export async function createBed(bedData: {
  x_position: number;
  y_position: number;
  width: number;
  height: number;
}) {
  const res = await fetch(`${API_URL}/me/garden/beds`, {
    ...defaultOptions,
    method: "POST",
    body: JSON.stringify(bedData),
  });
  if (!res.ok) throw new Error("Fehler beim Erstellen des Beets");
  return res.json();
}

export async function updateBed(bedId: number, bedData: Partial<{
  x_position: number;
  y_position: number;
  width: number;
  height: number;
}>) {
  const res = await fetch(`${API_URL}/me/garden/beds/${bedId}`, {
    ...defaultOptions,
    method: "PUT",
    body: JSON.stringify(bedData),
  });
  if (!res.ok) throw new Error("Fehler beim Aktualisieren des Beets");
  return res.json();
}

export async function deleteBed(bedId: number) {
  const res = await fetch(`${API_URL}/me/garden/beds/${bedId}`, {
    ...defaultOptions,
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Fehler beim Löschen des Beets");
  return res.json();
}

// ---------------- BED PLANTS ----------------
export async function getPlantsInBed(bedId: number) {
  const res = await fetch(`${API_URL}/me/garden/beds/${bedId}/plants`, defaultOptions);
  if (!res.ok) throw new Error("Fehler beim Laden der Beetpflanzen");
  return res.json();
}

export async function createPlantInBed(bedId: number, plantData: any) {
  const res = await fetch(`${API_URL}/me/garden/beds/${bedId}/plants`, {
    ...defaultOptions,
    method: "POST",
    body: JSON.stringify(plantData),
  });
  if (!res.ok) throw new Error("Fehler beim Anlegen der Pflanze");
  return res.json();
}

export async function deletePlantInBed(bedId: number, plantId: number) {
  const res = await fetch(`${API_URL}/me/garden/beds/${bedId}/plants/${plantId}`, {
    ...defaultOptions,
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Fehler beim Löschen der Pflanze");
  return res.json();
}

// ---------------- INDIVIDUAL PLANTS ----------------
export async function getIndividualPlants() {
  const res = await fetch(`${API_URL}/me/garden/individual-plants`, defaultOptions);
  if (!res.ok) throw new Error("Fehler beim Laden der Einzelpflanzen");
  return res.json();
}

// ---------------- SURFACES ----------------
export async function getSurfaces() {
  const res = await fetch(`${API_URL}/me/garden/surfaces`, defaultOptions);
  if (!res.ok) throw new Error("Fehler beim Laden der Flächen");
  return res.json();
}
