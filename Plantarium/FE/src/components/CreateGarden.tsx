import { Fieldset, Legend, Field, Input, Button, Label } from "@headlessui/react";
//import { useState } from "react";

function CreateGarden(){
    //werte in state speichern
    //onsubmit auf button macht fetch aufruf mit daten aus state
    //daten werden als JSON gesendet
    //

    return(
    <> 
    <div className="flex flex-col items-center justify-center">
        <Fieldset className="space-y-7 pt-10 pb-15 shadow-lg/20 bg-mint text-white p-5 rounded-xl w-[40vw]">
            <Legend className="text-2xl mx-auto w-1/2 font-semibold">Create your Garden</Legend>
            <Field>
                <Label className="block text-left w-4/5 mx-auto">What' s your name?</Label>
                <Input className="mt-2 p-2 block text-gray-700 rounded-xl bg-white w-4/5 mx-auto" name="name" />
            </Field>

            <Field>
                <Label className="block text-left w-4/5 mx-auto">Where is your garden?</Label>
                <Input className="mt-2 p-2 block text-gray-700 rounded-xl bg-white w-4/5 mx-auto" placeholder="51.276753100751336, 12.403793364644738" name="name" />
            </Field>

            <Field>
                 <Label className="block text-left w-4/5 mx-auto">Height of your garden(m)</Label>
                <Input className="mt-2 p-2 block text-gray-700 rounded-xl bg-white w-4/5 mx-auto" placeholder="11,7" name="name" />
            </Field>

            <Field>
                 <Label className="block text-left w-4/5 mx-auto">Width of your garden (m)</Label>
                <Input className="mt-2 p-2 block text-gray-700 rounded-xl bg-white w-4/5 mx-auto" placeholder="5,5" name="name" />
            </Field>

            <Button className="p-2 mt-12 w-1/3 block text-mint rounded-xl font-semibold bg-white mx-auto">
                Speichern und weiter
            </Button>
        </Fieldset>
        </div>
    </>
    );
}

export default CreateGarden