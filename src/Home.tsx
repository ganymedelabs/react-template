import React from "react";
import Image from "./components/Image.tsx";

/* eslint-disable prettier/prettier */

export default function Home(): React.JSX.Element {
    return (
        <div className="relative flex h-screen items-center justify-center font-sans">
            <div className="bg-secondary absolute h-80 w-80 blur-[10rem]" />
            <div className="z-10">
                <Image
                    className="animate-spin-infinite ml-auto mr-auto block h-48 w-48"
                    src={`${process.env.PUBLIC_URL}/images/logo.png`}
                    alt="Discontinued Labs Logo"
                />
                <h1 className="text-center">React Template</h1>
            </div>
        </div>
    );
}
