import { Button } from "@headlessui/react";
import { BedsContext } from "../../contexts";
import { useContext } from "react";
import { IBed } from "../../interfaces/interfaces";

function PlantDetails() {

  const { beds, setBeds } = useContext(BedsContext) as { beds: IBed[]; setBeds: (updater: IBed[] | ((prev: IBed[]) => IBed[])) => void; };

  async function deletePlantInBed(bedId: number, plantId: number) {
    
    const confirmed = confirm("Are you sure you want to delete this plant?");
    if (!confirmed) return;

    const res = await fetch(`${import.meta.env.VITE_BEDS_URL}/me/garden/beds/${bedId}/plants/${plantId}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    setBeds((prev) => {
      const bed = prev.find((b) => b.id === bedId);
      if (!bed) return prev;

      bed.bed_plants = bed.bed_plants.filter((p: { plants: { id: number; }; }) => p.plants.id !== plantId);
      return [...prev];
    });

    if (!res.ok) throw new Error("Fehler beim Löschen der Pflanze  cause: " + res.statusText);
    return res.json();
  }

  return (
    <>
      {beds.length !== 0 &&
        <h2 className="pl-8">Bed plants</h2>
      }
      {beds.map((i) => {
        const bp = i.bed_plants[0];
        if (!bp) return null;

        return (
          <div key={i.id} className="flex items-center flex-col">
            <div className="w-90 p-5 bg-white/80 text-black rounded-xl mb-3">
              <p className="font-semibold mb-3"> {bp.plants?.name}</p>
              <p className="font-normal"> needs watering: {bp.plants?.watered ? "No" : "Yes"} </p>
              <p className="font-normal"> planted on: {new Date(bp.planting_date).toLocaleDateString()} </p>
              <p className="font-normal">edible: {bp.plants?.edible ? "yes" : "no"}</p>
              <p className="font-normal">location in garden: Bed {i.id}</p>
              <div className="flex justify-center">
                <Button onClick={() => deletePlantInBed(i.id, bp.plant_id)} className="m-3 p-2 pl-3 pr-3 w-30 rounded-xl text-white bg-mint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150">
                  delete
                </Button>
              </div>

            </div>
          </div>
        );
      })}
    </>
  );
}

export default PlantDetails;