"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import { getHomeData, getCV } from "@/lib/api";
import { useLanguage } from "@/context/language-context";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  const [homeData, setHomeData] = useState<{photo: string, name: string; who_am_i: string; focus: string } | null>(null);

  const { language } = useLanguage();

  useEffect(() => {
    async function fetchData() {
      const data = await getHomeData();
      setHomeData(data);
    }
    fetchData();
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
          {homeData?.photo && (
            <Image
              src={homeData.photo}
              alt={homeData.name}
              width={192}
              height={192}
              quality={95}
              priority
              className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
            />
          )}
          </motion.div>

          <motion.span
            className="absolute bottom-0 right-0 text-4xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}
          >
            👋
          </motion.span>
        </div>
      </div>

      <motion.h1
        className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {homeData ? (
          <>
            {language === "ru" ? (
              <>
                <span className="font-bold">Привет, я {homeData.name}.</span> Я{" "}
                <span className="font-bold">{homeData.who_am_i}</span>. Мой фокус —{" "}
                <span className="underline">{homeData.focus}</span>.
              </>
            ) : language === "uz" ? (
              <>
                <span className="font-bold">Salom, men {homeData.name}.</span> Men{" "}
                <span className="font-bold">{homeData.who_am_i}</span>. Mening yo‘nalishim —{" "}
                <span className="underline">{homeData.focus}</span>.
              </>
            ) : (
              <>
                <span className="font-bold">Hi, I'm {homeData.name}.</span> I'm a{" "}
                <span className="font-bold">{homeData.who_am_i}</span>. My focus is{" "}
                <span className="underline">{homeData.focus}</span>.
              </>
            )}
          </>
        ) : (
          "Загрузка..."
        )}
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <Link
          href="#contact"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          {language === "ru"
            ? "Связаться"
            : language === "uz"
            ? "Bogʻlanish"
            : "Contact me here"}{" "}
          <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
        </Link>

        <button
          onClick={async () => {
            try {
              const blob = await getCV();
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "CV.pdf";
              document.body.appendChild(link);
              link.click();
              link.remove();
              window.URL.revokeObjectURL(url);
            } catch (error) {
              console.error("Ошибка при загрузке резюме", error);
            }
          }}
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
        >
          {language === "ru"
            ? "Скачать резюме"
            : language === "uz"
            ? "Rezumeni yuklab olish"
            : "Download CV"}{" "}
          <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
        </button>

        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://github.com/aslan19P"
          target="_blank"
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  );
}
