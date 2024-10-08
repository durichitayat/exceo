import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Header from "@/components/ui/header";
import Hero from "@/components/ui/hero";
import { ArrowRight, CheckCircle, Clock, Mail } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* HERO SECTION */}
        <Hero />
        {/* FEATURES SECTION */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-200 dark:bg-gray-900"
        >
          <div className="px-4 md:px-6 mx-auto grid max-w-screen-2xl">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                Key Features
              </h2>
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-20 items-center">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-6 w-6 text-blue-500" />
                      <h3 className="text-2xl font-bold">
                        Email Prioritization
                      </h3>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      ExCEO.ai uses advanced AI algorithms to analyze and
                      prioritize your emails based on urgency, sender
                      importance, and content relevance. This feature ensures
                      that you focus on the most critical communications first,
                      significantly reducing the time spent on email triage.
                    </p>
                    <ul className="list-disc list-inside text-gray-500 dark:text-gray-400">
                      <li>Automatic sorting of emails into priority levels</li>
                      <li>Customizable prioritization criteria</li>
                      <li>Real-time updates as new emails arrive</li>
                    </ul>
                  </div>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src="/800x600.png"
                      height={300}
                      width={400}
                      alt="Thread Summarization Demo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-20 items-center">
                  <div className="order-2 md:order-1 relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src="/800x600.png"
                      height={300}
                      width={400}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="order-1 md:order-2 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-6 w-6 text-blue-500" />
                      <h3 className="text-2xl font-bold">
                        Automated Responses
                      </h3>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      {`Leverage the power of AI to generate context-aware,
                    personalized responses to routine inquiries. This feature
                    saves valuable time by drafting replies that maintain your
                    communication style and adhere to your company's guidelines.`}
                    </p>
                    <ul className="list-disc list-inside text-gray-500 dark:text-gray-400">
                      <li>AI-generated draft responses for quick review</li>
                      <li>
                        Personalization based on email history and context
                      </li>
                      <li>
                        Integration with your calendar for scheduling
                        suggestions
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-20 items-center">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-6 w-6 text-blue-500" />
                      <h3 className="text-2xl font-bold">
                        Thread Summarization
                      </h3>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      {`ExCEO.ai's thread summarization feature condenses lengthy
                    email chains into concise, actionable summaries. This allows
                    you to quickly grasp the key points of complex discussions
                    without reading through every message.`}
                    </p>
                    <ul className="list-disc list-inside text-gray-500 dark:text-gray-400">
                      <li>Intelligent extraction of main discussion points</li>
                      <li>Highlight of action items and decisions</li>
                      <li>Customizable summary length and detail level</li>
                    </ul>
                  </div>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src="/800x600.png"
                      height={300}
                      width={400}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* PRICING SECTION */}
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 mx-auto max-w-screen-2xl"
        >
          <div className="px-4 md:px-6 grid max-w-screen-xl mx-20">
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
                <Button color="hover:bg-neutral bg-neutral-dark">
                  Get Started
                </Button>
              </div>
              <div className="flex flex-col p-6 bg-blue-600 shadow-lg rounded-lg dark:bg-blue-600 justify-between border border-blue-600">
                <div className="pt-2 pb-8">
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
                <Button>Contact Sales</Button>
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
                <Button color="hover:bg-neutral bg-neutral-dark">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-200 dark:bg-gray-900 "
        >
          <div className="container px-4 md:px-6 mx-auto max-w-screen-lg">
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
              <div className="w-full max-w-xl space-y-2">
                <form className="flex flex-row space-x-2">
                  <Input
                    className="max-w-lg flex-1 border border-primary-light"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    color="bg-primary hover:bg-primary-dark"
                    className="w-auto"
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
