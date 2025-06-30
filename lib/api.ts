export async function getHomeData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/portfolio/home/`, {
      headers: {
      "Content-Type": "application/json",
      "Accept-Language": localStorage.getItem("language") || "ru"
    }
  });
  return res.json();
}

export async function getAbout() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/portfolio/about/`, {
      headers: {
      "Content-Type": "application/json",
      "Accept-Language": localStorage.getItem("language") || "ru"
    }
  });
  return res.json();
}

export async function getProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/portfolio/projects/`, {
      headers: {
      "Content-Type": "application/json",
      "Accept-Language": localStorage.getItem("language") || "ru"
    }
  });
  return res.json();
}

export async function getExperiences() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/portfolio/experience/`, {
      headers: {
      "Content-Type": "application/json",
      "Accept-Language": localStorage.getItem("language") || "ru"
    }
  });
  return res.json();
}

export async function getSkills() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/portfolio/skills/`, {
      headers: {
      "Content-Type": "application/json",
      "Accept-Language": localStorage.getItem("language") || "ru"
    }
  });
  return res.json();
}

export async function getCV(): Promise<Blob> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/portfolio/cv/`, {
    headers: {
      "Accept-Language": localStorage.getItem("language") || "ru"
    }
  });

  if (!res.ok) {
    throw new Error("Ошибка при загрузке резюме");
  }

  return res.blob();
}

export async function sendContactForm(data: {
  sender_email: string;
  sender_message: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/portfolio/contact/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Ошибка при отправке сообщения");
  }

  return res.json();
}