export default function Welcome() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google'; //DEPL: tatsächliche BE Adresse
  };

  return (
    <>
     <p>Willkommen!</p>
      <img src="/assets/font.png"/>
      <button onClick={handleLogin}>
        Log in with Google
      </button>
</>
  );
}
