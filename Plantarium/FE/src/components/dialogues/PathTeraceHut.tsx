import { Input } from "@headlessui/react";
import { IStructure } from "../../interfaces/interfaces";

type Props = {
  struct: IStructure;
  setStruct: (value: IStructure) => void;
  type: string;
};

function PathTeraceHut({ struct, setStruct }: Props) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStruct({
            ...struct,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <p className="mt-3 font-semibold "> Width (m): </p>
                <Input className="mt-2 w-full font-light p-2 border-1 rounded-xl border-darkMint/20" name="width" value={struct.width} onChange={handleChange}></Input>
                <p className="mt-3 font-semibold "> Height (m): </p>
                <Input className="mt-2 w-full font-light p-2 border-1 rounded-xl border-darkMint/20" name="height" value={struct.height} onChange={handleChange}></Input>
            </form>
        </>
    )
}

export default PathTeraceHut;