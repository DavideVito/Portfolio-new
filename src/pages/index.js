import React from "react";

import Layout from "../components/layout";
import { useFirestore, useFirestoreCollectionData, StorageImage, useStorage } from "reactfire"
import { motion } from "framer-motion";

let lingua = navigator.language.split("-")[0]

const content = (isFirstMount) => ({
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: isFirstMount ? 2.8 : 0 },
  },
});

const title = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const products = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export default function IndexPage({ isFirstMount }) {







  const competenze = useFirestore()
    .collection("Cards")
    .where("visibile", "==", true)

  const data = useFirestoreCollectionData(competenze)



  if (!data.hasEmitted) {
    return ""
  }
  console.log(data.data)




  return (
    <Layout>
      <motion.section exit={{ opacity: 0 }}>
        {isFirstMount && <InitialTransition />}

        <motion.div
          initial="initial"
          animate="animate"
          variants={content(isFirstMount)}
          className="space-y-12"
        >
          <motion.h1
            variants={title}
            className="text-6xl font-black text-center"
          >
            Take a look 🤗
          </motion.h1>

          <motion.section
            variants={products}
            className="text-gray-700 body-font"
          >
            <div className="container px-5 pt-12 mx-auto">
              <div className="flex flex-wrap -m-4">
                {data.data.map((competenza, index) => (
                  <Product key={index} {...competenza} />
                ))}
              </div>
            </div>
          </motion.section>
        </motion.div>
      </motion.section>
    </Layout>
  );
}

const Product = (competenza) => {




  const ref = useStorage().ref(competenza.fotoGrossa).fullPath;


  let testo = competenza.tipo === "competenze" ? lingua === "en" ? "Skill" : "Competenza" : lingua === "en" ? "Project" : "Progetto"











  return (<div className="w-full p-4 lg:w-1/4 md:w-1/2">
    <a href={`card/${competenza["NO_ID_FIELD"]}`} className="relative block h-48 overflow-hidden rounded">
      {ref && <StorageImage
        alt="ecommerce"
        className="block object-cover object-center w-full h-full"
        storagePath={ref ?? ""}
      />}
    </a>
    <div className="mt-4">
      <h3 className="mb-1 text-xs tracking-widest text-gray-500 title-font">

      </h3>
      <h2 className="text-lg font-medium text-gray-900 title-font">{competenza.titolo} </h2>
      <p className="mt-1 italic">{testo}</p>
    </div>
  </div>)
};

const blackBox = {
  initial: {
    height: "100%",
    bottom: 0,
  },
  animate: {
    height: 0,
    transition: {
      when: "afterChildren",
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const textContainer = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 0.3,
      when: "afterChildren",
    },
  },
};

const text = {
  initial: {
    y: 40,
  },
  animate: {
    y: 80,
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const InitialTransition = () => {
  // Scroll user to top to avoid showing the footer
  React.useState(() => {
    typeof windows !== "undefined" && window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="absolute z-50 flex items-center justify-center w-full bg-black"
      initial="initial"
      animate="animate"
      variants={blackBox}
      onAnimationStart={() => document.body.classList.add("overflow-hidden")}
      onAnimationComplete={() =>
        document.body.classList.remove("overflow-hidden")
      }
    >
      <motion.svg variants={textContainer} className="absolute z-50 flex">
        <pattern
          id="pattern"
          patternUnits="userSpaceOnUse"
          width={750}
          height={800}
          className="text-white"
        >
          <rect className="w-full h-full fill-current" />
          <motion.rect
            variants={text}
            className="w-full h-full text-gray-600 fill-current"
          />
        </pattern>
        <text
          className="text-4xl font-bold"
          textAnchor="middle"
          x="40%"
          y="40%"
          style={{ fill: "url(#pattern)" }}
        >
          loading ⏳
        </text>
      </motion.svg>
    </motion.div>
  );
};
