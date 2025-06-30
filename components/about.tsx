"use client";

import React, { useEffect, useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { getAbout } from "@/lib/api";
import { useLanguage } from "@/context/language-context";

export default function About() {
  const { ref } = useSectionInView("About");
  const [aboutHtml, setAboutHtml] = useState<string>("");
  const { language } = useLanguage();

  useEffect(() => {
    async function fetchAbout() {
      const data = await getAbout();
      setAboutHtml(data.info);
    }
    fetchAbout();
  }, []);

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>
        {language === "ru"
          ? "Обо мне"
          : language === "uz"
          ? "Men haqimda"
          : "About me"}
      </SectionHeading>
      <div dangerouslySetInnerHTML={{ __html: aboutHtml }} />
    </motion.section>
  );
}