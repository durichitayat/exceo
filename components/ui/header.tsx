"use client";

import React, { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { Mail, ChevronDown, User, Settings } from "lucide-react";
import Button from "@/components/ui/button";

const navigation = [
  {
    name: "Product",
    items: [
      {
        name: "Features",
        href: "/features",
        description: "Explore our powerful email management tools",
      },
      {
        name: "Integrations",
        href: "/integrations",
        description: "Connect with your favorite tools and services",
      },
      {
        name: "Security",
        href: "/security",
        description: "Learn about our robust security measures",
      },
    ],
  },
  {
    name: "Reviews",
    items: [
      {
        name: "Customer Stories",
        href: "/customer-stories",
        description: "Read success stories from our happy customers",
      },
      {
        name: "Testimonials",
        href: "/testimonials",
        description: "See what executives are saying about ExCEO.ai",
      },
      {
        name: "Case Studies",
        href: "/case-studies",
        description: "Dive deep into how ExCEO.ai has transformed businesses",
      },
      {
        name: "Awards",
        href: "/awards",
        description: "Check out the recognition we received",
      },
    ],
  },
  {
    name: "Pricing",
    items: [
      {
        name: "Individual",
        href: "/pricing#individual",
        description: "Perfect for solo executives and entrepreneurs",
      },
      {
        name: "Team",
        href: "/pricing#team",
        description: "Ideal for small to medium-sized teams",
      },
      {
        name: "Enterprise",
        href: "/pricing#enterprise",
        description: "Custom solutions for large organizations",
      },
    ],
  },
  {
    name: "Resources",
    items: [
      {
        name: "Blog",
        href: "/blog",
        description: "Stay updated with the latest in email management and AI",
      },
      {
        name: "Guides",
        href: "/guides",
        description: "In-depth tutorials and best practices",
      },
      {
        name: "Webinars",
        href: "/webinars",
        description: "Watch our educational webinars and product demos",
      },
    ],
  },
  {
    name: "Company",
    items: [
      {
        name: "About Us",
        href: "/about",
        description:
          "Learn about our mission, values, and the team behind ExCEO.ai",
      },
      {
        name: "Our Team",
        href: "/team",
        description: "Meet the experts behind ExCEO.ai",
      },
      {
        name: "Careers",
        href: "/careers",
        description: "Join our team and shape the future of email management",
      },
      {
        name: "Press",
        href: "/press",
        description: "Latest news and media resources",
      },
    ],
  },
];

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would typically come from your auth state

  const handleLogin = () => {
    // Implement your login logic here
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    setIsLoggedIn(false);
  };

  return (
    <header className=" font-medium">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex-shrink-0 flex items-center"
            >
              <Mail className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                ExCEO.ai
              </span>
            </Link>
            <nav className="hidden lg:ml-6 lg:flex lg:space-x-8">
              {navigation.map((item) => (
                <Menu
                  as="div"
                  className="relative"
                  key={item.name}
                >
                  {({ open }) => (
                    <>
                      <MenuButton className="inline-flex items-center px-1 pt-1 text-sm font-semibold text-gray-500 hover:text-gray-700">
                        {item.name}
                        <ChevronDown
                          className="ml-1 h-4 w-4"
                          aria-hidden="true"
                        />
                      </MenuButton>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <MenuItems
                          static
                          className="absolute left-0 z-10 mt-3 w-[600px] max-w-md transform px-2 sm:px-0 lg:max-w-3xl"
                        >
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                              {item.items.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="-m-3 flex items-start rounded-lg p-3 hover:ring-4 ring-secondary-light border border-transparent hover:border-secondary"
                                >
                                  <div className="ml-4">
                                    <p className="text-sm font-bold text-gray-900">
                                      {subItem.name}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {subItem.description}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </MenuItems>
                      </Transition>
                    </>
                  )}
                </Menu>
              ))}
            </nav>
          </div>
          <div className="flex items-center font-bold">
            {isLoggedIn ? (
              <>
                <Menu
                  as="div"
                  className="relative inline-block text-left"
                >
                  <MenuButton className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                    <Image
                      src="/placeholder-user.jpg"
                      alt="User"
                    />
                  </MenuButton>
                  <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <MenuItem>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`${
                              active ? "bg-gray-100" : ""
                            } flex items-center px-4 py-2 text-sm text-gray-700`}
                          >
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`${
                              active ? "bg-gray-100" : ""
                            } flex items-center px-4 py-2 text-sm text-gray-700`}
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                          </a>
                        )}
                      </MenuItem>
                      <div className="border-t border-gray-100"></div>
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active ? "bg-gray-100" : ""
                            } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                          >
                            Log out
                          </button>
                        )}
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              </>
            ) : (
              <>
                <Link
                  onClick={handleLogin}
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  href={""}
                >
                  Log in
                </Link>
                <Button
                  color="bg-black hover:bg-gray-900"
                  className="ml-4 text-sm font-medium"
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
