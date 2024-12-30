"use client"

import React from "react";
import Image from "next/image";

const Loading = () => {
    return (
        <div className="loading-screen">
            <Image src="/logo.png" width={50} height={50} className="spinner" alt="Loading..." />
            <style jsx>{`
                .loading-screen {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgba(255, 255, 255, 1);
                    z-index: 9999;
                }
                .spinner {
                    animation: spin 2s linear infinite;
                }
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    50% {
                        transform: rotate(360deg);
                    }
                    100% {
                        transform: rotate(0deg);
                    }
                }
                `}</style>
        </div>
    );
};

export default Loading;