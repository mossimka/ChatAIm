export async function createChat(id: string, name: string, icon:string, role: string) {
  const res = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
      icon,
      role,
      messages: [],
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create chat");
  }

  return res.json();
}
