"use client";

import React, { useRef } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendContactForm } from "@/lib/api";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import { useLanguage } from "@/context/language-context";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const { language } = useLanguage();

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>
        {language === "ru"
          ? "Связаться со мной"
          : language === "uz"
          ? "Bog‘lanish"
          : "Contact me"}
      </SectionHeading>

      <p className="text-gray-700 -mt-6 dark:text-white/80">
        {language === "ru" ? (
          <>
            Свяжитесь со мной напрямую по{" "}
            <a className="underline" href="mailto:matackubovaslan@gmail.com">
              matackubovaslan@gmail.com
            </a>{" "}
            или через форму ниже.
          </>
        ) : language === "uz" ? (
          <>
            Menga to‘g‘ridan-to‘g‘ri quyidagi manzil orqali murojaat qiling:{" "}
            <a className="underline" href="mailto:matackubovaslan@gmail.com">
              matackubovaslan@gmail.com
            </a>{" "}
            yoki quyidagi forma orqali xabar yuboring.
          </>
        ) : (
          <>
            Please contact me directly at{" "}
            <a className="underline" href="mailto:matackubovaslan@gmail.com">
              matackubovaslan@gmail.com
            </a>{" "}
            or through this form.
          </>
        )}
      </p>

      <form
        className="mt-10 flex flex-col dark:text-black"
        action={async (formData) => {
          const formJson = {
            sender_email: formData.get("senderEmail") as string,
            sender_message: formData.get("message") as string,
          };

          try {
            const res = await sendContactForm(formJson);
            toast.success(res.message || "Сообщение успешно отправлено!");
            if (emailRef.current) emailRef.current.value = "";
            if (messageRef.current) messageRef.current.value = "";
          } catch (error: any) {
            toast.error("Ошибка при отправке сообщения");
          }
        }}
      >
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder={
            language === "ru"
              ? "Ваш email"
              : language === "uz"
              ? "Email manzilingiz"
              : "Your email"
          }
          ref={emailRef}
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="message"
          placeholder={
            language === "ru"
              ? "Ваше сообщение"
              : language === "uz"
              ? "Xabaringiz"
              : "Your message"
          }
          required
          maxLength={5000}
          ref={messageRef}
        />
        <SubmitBtn />
      </form>
    </motion.section>
  );
}
