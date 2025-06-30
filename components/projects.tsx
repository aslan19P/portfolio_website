"use client";

import React, { useEffect, useState } from "react";
import SectionHeading from "./section-heading";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import { getProjects } from "@/lib/api";
import { useLanguage } from "@/context/language-context";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);
  const { language } = useLanguage();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getProjects();
      setProjects(data);
    }
    fetchData();
  }, []);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>
        {language === "ru"
          ? "Мои проекты"
          : language === "uz"
          ? "Loyihalarim"
          : "My projects"}
      </SectionHeading>
      <div>
        {projects.map((project, index) => (
          <React.Fragment key={index}>
            <Project
              title={project.name}
              description={project.content}
              tags={project.skills.map((s: any) => s.name)}
              imageUrl={project.image}
            />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
