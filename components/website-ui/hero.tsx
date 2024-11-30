"use client";
import Image from "next/image";
import React, { useState } from "react";
import Input from "./input";
import Button from "./button";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 mx-auto grid max-w-screen-2xl">
        <div className="container px-4 md:px-6 place-self-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                ExCEO.ai - Your AI-Powered Email Assistant
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Streamline your email management. Save up to 60% of your time
                with AI-driven prioritization, summarization, and automated
                responses.
              </p>
              <div className="w-full max-w-md space-y-2">
                <form className="flex space-x-4">
                  <Input
                    className="max-w-lg flex-1 border border-primary-light"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button color="bg-primary hover:bg-primary-dark">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Start your free trial. No credit card required.
                </p>
              </div>
            </div>
            <div
              className="relative aspect-video cursor-pointer"
              onClick={() => setIsVideoOpen(true)}
            >
              <Image
                src="/placeholder.gif"
                width={600}
                height={400}
                alt="ExCEO.ai Demo"
                className="w-full h-full object-cover rounded-lg"
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                <Play className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {isVideoOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setIsVideoOpen(false)}
        >
          <div className="bg-white p-4 rounded-lg max-w-4xl w-full aspect-video">
            <video
              controls
              className="w-full h-full"
            >
              <source
                src="/path-to-your-video.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  );
}
