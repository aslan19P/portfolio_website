"use client";

import React, { useEffect, useState } from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { getExperiences } from "@/lib/api";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { useLanguage } from "@/context/language-context";

export default function Experience() {
  const { ref } = useSectionInView("Experience");
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [experiencesData, setExperiencesData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const data = await getExperiences();
      setExperiencesData(data);
    }
    fetchExperiences();
  }, []);

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>
        {language === "ru"
          ? "Мой опыт"
          : language === "uz"
          ? "Tajriba"
          : "My experience"}
      </SectionHeading>
      <VerticalTimeline lineColor="">
        {experiencesData.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              contentStyle={{
                background:
                  theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                textAlign: "left",
                padding: "1.3rem 2rem",
              }}
              contentArrowStyle={{
                borderRight:
                  theme === "light"
                    ? "0.4rem solid #9ca3af"
                    : "0.4rem solid rgba(255, 255, 255, 0.5)",
              }}
              date={item.time}
              icon={
                <img
                  src={item.icon}
                  alt="experience"
                  className="rounded-full w-full h-full object-cover"
                />
              }
              iconStyle={{
                background:
                  theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
                fontSize: "1.5rem",
              }}
            >
              <h3 className="font-semibold capitalize">{item.main_info}</h3>
              <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
                {item.next_info}
              </p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
