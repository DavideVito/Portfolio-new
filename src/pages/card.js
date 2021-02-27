import React from "react"
import Layout from "../components/layout"

import { useFirestore, useFirestoreDocDataOnce, StorageImage, useStorage } from "reactfire";

import { useParams } from "react-router-dom";

export default function Card() {

    let { id } = useParams();

    let lingua = navigator.language.split("-")[0]


    const ref = useFirestore().collection("Cards").doc(id);

    let data = useFirestoreDocDataOnce(ref)
    const imgRef = useStorage().ref(data.data?.fotoGrossa || "giphy.gif").fullPath;

    if (data.status === "loading") {
        return ""
    }
    let competenza = data.data;






    return <Layout><div className="container px-5 pt-12 mx-auto">
        <div className="flex flex-wrap -m-4">
            {competenza.titolo}
            {imgRef && <StorageImage
                alt="ecommerce"
                className="block object-cover object-center w-full h-full full-image"
                storagePath={imgRef ?? ""}
            />}
            {competenza[lingua].sottotilo}

        </div>
    </div></Layout>


}