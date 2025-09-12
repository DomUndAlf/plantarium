
import { Button } from "@headlessui/react";
import fontLogo from "/assets/font.png";

export default function Welcome() {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_AUTH_URL}/gitlab`; //DEPL: tatsächliche BE Adresse
  };

  return (
<div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-4">
      <p className="text-lg text-mint font-medium">Willkommen bei deiner Gartenapp</p>
    <h1> PLANTARIUM </h1>
      <Button
        className="bg-mint font-medium rounded-xl w-40 mt-7 p-2 text-white"
        onClick={handleLogin}
      >
        Login mit Gitlab
      </Button>
    </div>
  );
}
