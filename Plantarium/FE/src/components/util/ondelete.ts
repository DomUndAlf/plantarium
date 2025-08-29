async function handleDelete(
  endpoint: string,
  setState: React.Dispatch<React.SetStateAction<any[]>>,
  id: number
) {
  const confirmed = confirm("Wirklich löschen?");
  if (!confirmed) return;

  try {
    const res = await fetch(`http://localhost:3001/${endpoint}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Fehler beim Löschen");
      return;
    }

    setState((prev) => prev.filter((item) => item.id !== id));
  } catch (err) {
    console.error(err);
    alert("Netzwerkfehler beim Löschen");
  }
}
export default handleDelete;