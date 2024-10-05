"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { ArrowRight, CheckCircle, Clock, Mail, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function LandingPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a
          className="flex items-center justify-center"
          href="#"
        >
          <Mail className="h-6 w-6" />
          <span className="sr-only">ExCEO.ai</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#pricing"
          >
            Pricing
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#contact"
          >
            Contact
          </a>
        </nav>
      </header>
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 mx-auto max-w-screen-lg">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex flex-col space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  ExCEO.ai - Your AI-Powered Email Assistant
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Streamline your email management. Save up to 60% of your time
                  with AI-driven prioritization, summarization, and automated
                  responses.
                </p>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input
                      className="max-w-lg flex-1"
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
        {/* FEATURES SECTION */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 mx-auto max-w-screen-lg"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Clock className="h-12 w-12 mb-4 text-blue-500" />
                <h3 className="text-lg font-bold">Email Prioritization</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  AI-driven sorting based on urgency and impact
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Mail className="h-12 w-12 mb-4 text-blue-500" />
                <h3 className="text-lg font-bold">Automated Responses</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Generate personalized draft replies for routine inquiries
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="h-12 w-12 mb-4 text-blue-500" />
                <h3 className="text-lg font-bold">Thread Summarization</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Real-time summaries of lengthy email chains
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 mx-auto max-w-screen-lg"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Pricing Plans
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
              <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 justify-between border border-gray-200">
                <div>
                  <h3 className="text-2xl font-bold text-center">Executive</h3>
                  <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
                    <span className="text-4xl font-bold">$99</span>/ month
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                      Email Prioritization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                      Automated Responses
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                      Thread Summarization
                    </li>
                  </ul>
                </div>
                <Button className="mt-6">Get Started</Button>
              </div>
              <div className="flex flex-col p-6 bg-blue-600 shadow-lg rounded-lg dark:bg-blue-600 justify-between border border-blue-600">
                <div>
                  <h3 className="text-2xl font-bold text-center text-white">
                    Enterprise
                  </h3>
                  <div className="mt-4 text-center text-gray-100">
                    <span className="text-4xl font-bold">Custom</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-white">
                    <li className="flex items-center">
                      <CheckCircle className="text-white mr-2 h-4 w-4" />
                      All Executive Features
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-white mr-2 h-4 w-4" />
                      Advanced Analytics
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-white mr-2 h-4 w-4" />
                      Custom Integrations
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-white mr-2 h-4 w-4" />
                      Dedicated Support
                    </li>
                  </ul>
                </div>
                <Button className="mt-6 bg-white text-blue-600 hover:bg-gray-100">
                  Contact Sales
                </Button>
              </div>
              <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 justify-between border border-gray-200">
                <div>
                  <h3 className="text-2xl font-bold text-center">Team</h3>
                  <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
                    <span className="text-4xl font-bold">$499</span>/ month
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                      Up to 10 Users
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                      Team Analytics
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                      Priority Support
                    </li>
                  </ul>
                </div>
                <Button className="mt-6">Get Started</Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 mx-auto max-w-screen-lg"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Transform Your Email Management?
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join the ranks of executives who have revolutionized their
                  productivity with ExCEO.ai.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col space-y-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    color="bg-primary hover:bg-primary-dark"
                    className="w-full"
                  >
                    Request a Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 ExCEO.ai. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a
            className="text-xs hover:underline underline-offset-4"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-xs hover:underline underline-offset-4"
            href="#"
          >
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}
