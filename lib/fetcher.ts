export default async function fetcher(url: string, data?: any) {
  const res = await fetch(`${window.location.origin}/api${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();

  if (res.status > 399 && res.status < 200) {
    throw new Error(json);
  }

  return json;
}
