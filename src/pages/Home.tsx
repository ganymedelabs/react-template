import React from "react";
import Image from "../components/Image.tsx";

export default function Home(): React.JSX.Element {
    return (
        <div className="relative flex h-screen items-center justify-center font-sans">
            <div className="absolute h-80 w-80 bg-secondary blur-[10rem]" />
            <div className="z-10">
                <Image
                    className="ml-auto mr-auto block h-48 w-48 animate-spin-infinite"
                    src={`${process.env.PUBLIC_URL}/images/logo.png`}
                    alt="Ganemede Labs Logo"
                />
                <h1 className="text-center">React Template</h1>
                <p className="text-center text-lg">
                    Created by <a href="https://github.com/ganemedelabs">Ganemede Labs</a>
                </p>
                <p className="text-center text-sm">
                    <a href="https://github.com/ganemedelabs/react-template">View on GitHub</a>
                </p>
            </div>
        </div>
    );
}
