export const loginFamily = async (code: string, password: string) => {
  const res = await fetch("http://localhost:8090/api/collections/fffamilies/auth-with-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identity: code,
      password: password,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json(); // Contains token, record, etc.
};
