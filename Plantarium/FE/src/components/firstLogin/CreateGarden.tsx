import { Fieldset, Legend, Field, Input, Button, Label } from "@headlessui/react";
import { useState } from "react";
import { IGarden } from "../../interfaces/interfaces";

function CreateGarden(){
    const [garden, setGarden] = useState<IGarden>({
        name: "",
        location: "",
        height: "",
        width: ""});

//Aktualisiert den Zustand (garden) bei jeder Änderung in einem Eingabefeld        
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGarden({
      ...garden,
      [e.target.name]: e.target.value, //
    });
  };

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //verhindert neuladen

    const res = await fetch("http://localhost:3001/users/me/garden", { //PUT request an diese route
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", //JWT token mitschicken
      body: JSON.stringify({ //Nutzerdaten werden in JSON umgewandelt
        name: garden.name,
        location: garden.location,
        height: Number(garden.height),
        width: Number(garden.width),
      }),
    });
    
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Fehler beim Speichern");
    } else {
      alert("Garten gespeichert!");
    }
  };

    return(
    <> 
    <div className="flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit}>
        <Fieldset className="space-y-7 pt-10 pb-15 shadow-lg/20 bg-mint text-white p-5 rounded-xl w-[40vw]">
            <Legend className="text-2xl mx-auto w-1/2 font-semibold">Create your Garden</Legend>
            <Field>
                <Label className="block text-left w-4/5 mx-auto">What' s your name?</Label>
                <Input  name="name" value={garden.name} onChange={handleChange} className="mt-2 p-2 block text-gray-700 rounded-xl bg-white w-4/5 mx-auto" />
            </Field>

            <Field>
                <Label className="block text-left w-4/5 mx-auto">Where is your garden?</Label>
                <Input  name="location" value={garden.location} onChange={handleChange} className="mt-2 p-2 block text-gray-700 rounded-xl bg-white w-4/5 mx-auto" placeholder="51.276753100751336, 12.403793364644738" />
            </Field>

            <Field>
                 <Label className="block text-left w-4/5 mx-auto">Height of your garden(m)</Label>
                <Input  name="height" value={garden.height} onChange={handleChange} className="mt-2 p-2 block text-gray-700 rounded-xl bg-white w-4/5 mx-auto" placeholder="11,7" />
            </Field>

            <Field>
                 <Label className="block text-left w-4/5 mx-auto">Width of your garden (m)</Label>
                <Input  name="width" value={garden.width} onChange={handleChange} className="mt-2 p-2 block text-gray-700 rounded-xl bg-white w-4/5 mx-auto" placeholder="5,5" />
            </Field>

            <Button type="submit" className="p-2 mt-12 w-1/3 block text-mint rounded-xl font-semibold bg-white mx-auto">
                Speichern und weiter
            </Button>
        </Fieldset>
        </form>
        </div>
    </>
    );
}


export default CreateGarden;