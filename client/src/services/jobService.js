const API = `${import.meta.env.VITE_API_URL}/jobs`;

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getJobs() {
  const res = await fetch(API, {
    headers: getAuthHeaders(),
  });

  return await res.json();
}

export async function deleteJob(id) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return await res.json();
}

export async function updateJob(id, data) {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function updateStatus(id, status) {
  const res = await fetch(`${API}/${id}/status`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      status,
    }),
  });

  return await res.json();
}