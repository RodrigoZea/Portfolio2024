// src/routes/Contact/contact.jsx
import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { send } from "@emailjs/browser";
import CharacterContact from "../../CharacterContact";

function calculateScale(width, isMobile) {
  const minW = isMobile ? 360 : 768;
  const maxW = 1440;
  const minS = isMobile ? 0.6 : 0.8;
  const maxS = isMobile ? 1.2 : 1.6;
  let ratio = (width - minW) / (maxW - minW);
  ratio = Math.max(0, Math.min(1, ratio));
  return minS + (maxS - minS) * ratio;
}

export default function Contact() {
  const { t } = useTranslation();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    isMobile: window.innerWidth < 768,
  });
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [status, setStatus] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const onResize = () =>
      setDimensions({
        width: window.innerWidth,
        isMobile: window.innerWidth < 768,
      });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scalingFactor = calculateScale(
    dimensions.width,
    dimensions.isMobile
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email!");
      return;
    }
    setEmailError("");
    setStatus("Sending...");
    send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      { from_email: email, subject, message },
      "YOUR_PUBLIC_KEY"
    )
      .then(() => setStatus("Message sent!"))
      .catch(() => setStatus("Failed to send. Try again later."));
    setEmail("");
    setSubject("");
    setMessage("");
  };

  const links = (
    <div className="flex justify-center gap-4">
      <a
        href="https://www.linkedin.com/in/rodrigo-zea/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-yellow-200 hover:text-yellow-300 text-xl"
      >
        LinkedIn
      </a>
      <a
        href="https://github.com/RodrigoZea"
        target="_blank"
        rel="noopener noreferrer"
        className="text-yellow-200 hover:text-yellow-300 text-xl"
      >
        GitHub
      </a>
      <a
        href="mailto:zearodrigo37@gmail.com"
        className="text-yellow-200 hover:text-yellow-300 text-xl"
      >
        Email
      </a>
    </div>
  );

  return (
    <div className="relative w-full h-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Suspense fallback={null}>
          <group
            scale={scalingFactor}
            position={[1, -1.2, 0]}
            rotation={[0, -Math.PI / 6, 0]}
          >
            <CharacterContact />
          </group>
        </Suspense>
      </Canvas>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={
          dimensions.isMobile
            ? "absolute inset-0 flex items-center justify-center pointer-events-auto px-8"
            : "absolute inset-y-0 right-[50vw] flex items-center pointer-events-auto px-8"
        }
      >
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="p-8 rounded-lg w-full max-w-md space-y-4 bg-opacity-80"
        >
          <h1 className="text-4xl font-bold text-yellow-200 text-center">
            {t("contact.title")}
          </h1>

          <div>
            <label htmlFor="email" className="block text-yellow-200 mb-1">
              {t("contact.form.email")}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                const val = e.target.value;
                setEmail(val);
                setEmailError(
                  val === "" || emailRegex.test(val)
                    ? ""
                    : "Please enter a valid email!"
                );
              }}
              required
              className="w-full px-3 py-2 bg-white bg-opacity-20 text-white rounded focus:outline-none"
            />
            {emailError && (
              <p className="text-red-400 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label htmlFor="subject" className="block text-yellow-200 mb-1">
              {t("contact.form.subject")}
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full px-3 py-2 bg-white bg-opacity-20 text-white rounded focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-yellow-200 mb-1">
              {t("contact.form.message")}
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              required
              className="w-full px-3 py-2 bg-white bg-opacity-20 text-white rounded focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-200 text-black py-2 rounded hover:bg-yellow-300 transition"
          >
            {t("contact.form.send")}
          </button>

          {status && <p className="text-white text-center">{status}</p>}

          {links}
        </motion.form>
      </motion.div>
    </div>
  );
}
