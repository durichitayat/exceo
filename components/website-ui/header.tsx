"use client";

import React, { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  MenuItems,
  MenuItem,
  MenuButton,
  Transition,
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ShieldCheckIcon,
  PuzzlePieceIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/ui/button";
import { Mail, User, Settings, HelpCircleIcon } from "lucide-react";
import { getBaseUrl } from "@/lib/getBase";

const baseUrl = getBaseUrl();

// Remove top-level icons from the navigation array
const navigation = [
  {
    name: "Product",
    items: [
      {
        name: "Features",
        href: "/features",
        description: "Explore our powerful email management tools",
        icon: PuzzlePieceIcon,
      },
      {
        name: "Integrations",
        href: "/integrations",
        description: "Connect with your favorite tools and services",
        icon: UsersIcon,
      },
      {
        name: "Security",
        href: "/security",
        description: "Learn about our robust security measures",
        icon: ShieldCheckIcon,
      },
    ],
  },
  {
    name: "Pricing",
    href: "/pricing", // Add href to make it a direct link
  },
  {
    name: "Resources",
    href: "/resources",
  },
  {
    name: "Company",
    href: "/company",
  },
];

// Add callsToAction to the "Product" navigation
const callsToAction = [
  {
    name: "Watch Demo",
    href: "/watch-demo",
    description: "See ExCEO.ai in action",
    // icon: PlayCircleIcon,
  },
  {
    name: "Contact Sales",
    href: "/contact-sales",
    description: "Get in touch with our sales team",
    // icon: PhoneIcon,
  },
];

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would typically come from your auth state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Add state for mobile menu

  const handleLogin = () => {
    // Implement your login logic here
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              href={"http://" + baseUrl + "/"}
              className="flex-shrink-0 flex items-center  cursor-pointer"
            >
              <div className="flex h-16 shrink-0 items-center">
                <Image
                  alt="ExCEO Logo"
                  src="/logo.webp"
                  className="h-8 w-auto"
                  width={32}
                  height={32}
                />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                ExCEO.ai
              </span>
            </Link>
            <PopoverGroup className="hidden lg:ml-6 lg:flex lg:space-x-8">
              {navigation.map((item) =>
                item.href ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="inline-flex items-center px-1 pt-1 text-sm font-semibold text-gray-500 hover:text-gray-700"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <Popover
                    key={item.name}
                    className="relative"
                  >
                    <>
                      <PopoverButton className="inline-flex items-center px-1 pt-1 text-sm font-semibold text-gray-500 hover:text-gray-700">
                        {item.name}
                        <ChevronDownIcon
                          className="ml-1 h-4 w-4"
                          aria-hidden="true"
                        />
                      </PopoverButton>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <PopoverPanel className="absolute mt-5 w-screen max-w-md transform px-4 sm:px-0">
                          <div className="overflow-hidden bg-white shadow-xl ring-1 ring-black ring-opacity-5 border">
                            <div className="text-sm  my-4">
                              {item.items?.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="group relative flex gap-x-4 p-4 hover:bg-primary hover:text-white"
                                >
                                  {subItem.icon && (
                                    <subItem.icon
                                      className="h-6 w-6 "
                                      aria-hidden="true"
                                    />
                                  )}
                                  <div>
                                    <p className="font-semibold">
                                      {subItem.name}
                                      <span className="absolute inset-0" />
                                    </p>
                                    <p className="mt-1 ">
                                      {subItem.description}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            {item.name === "Product" && (
                              <div className="border-t border-gray-300 grid grid-cols-2 divide-x divide-gray-300 text-sm">
                                {callsToAction.map((cta) => (
                                  <Link
                                    key={cta.name}
                                    href={cta.href}
                                    className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-primary hover:text-white py-5"
                                  >
                                    {/* Optional: add icons if available */}
                                    {cta.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </PopoverPanel>
                      </Transition>
                    </>
                  </Popover>
                )
              )}
            </PopoverGroup>
          </div>
          <div className="flex items-center font-bold gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  href={`http://platform.${baseUrl}/`}
                  className="text-sm font-bold text-primary hover:text-primary-dark"
                >
                  Go to Dashboard
                </Link>

                {/* Separator */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                />

                {/* Profile dropdown */}
                <Menu
                  as="div"
                  className="relative inline-block text-left"
                >
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-8 rounded-full bg-gray-50"
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        aria-hidden="true"
                        className="ml-4 text-sm/6 font-semibold text-gray-900"
                      >
                        Tom Cook
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-2 size-5 text-gray-400"
                      />
                    </span>
                  </MenuButton>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg border  text-sm font-medium">
                      <div className="py-1">
                        <MenuItem>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={`${
                                active ? "bg-primary text-white" : ""
                              } flex items-center px-4 py-2`}
                            >
                              <User className="mr-2 h-4 w-4" />
                              Profile
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <Link
                              href="/settings"
                              className={`${
                                active ? "bg-primary text-white" : ""
                              } flex items-center px-4 py-2`}
                            >
                              <Settings className="mr-2 h-4 w-4" />
                              Settings
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <Link
                              href="/help"
                              className={`${
                                active ? "bg-primary text-white" : ""
                              } flex items-center px-4 py-2`}
                            >
                              <HelpCircleIcon className="mr-2 h-4 w-4" />
                              Help
                            </Link>
                          )}
                        </MenuItem>
                        <div className="border-t border-gray-300"></div>
                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${
                                active ? "bg-primary text-white" : ""
                              } flex items-center w-full px-4 py-2 text-gray-700`}
                            >
                              Log out
                            </button>
                          )}
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Transition>
                </Menu>
              </>
            ) : (
              <>
                <Link
                  onClick={handleLogin}
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  href=""
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
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-mr-2 flex items-center justify-center p-2 text-gray-700"
            >
              <Bars3Icon
                className="h-6 w-6"
                aria-hidden="true"
              />
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
        </nav>
      </div>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <DialogPanel className="fixed inset-0 overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="-m-1.5 p-1.5 flex items-center"
            >
              <Mail className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                ExCEO.ai
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-mr-2 flex items-center justify-center p-2 text-gray-700"
            >
              <XMarkIcon
                className="h-6 w-6"
                aria-hidden="true"
              />
              <span className="sr-only">Close main menu</span>
            </button>
          </div>
          <div className="mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <nav className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Disclosure
                    key={item.name}
                    as="div"
                    className="-mx-3"
                  >
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 px-3 text-base font-semibold text-gray-900 hover:bg-gray-50">
                          {item.name}
                          <ChevronDownIcon
                            className={`h-5 w-5 ${open ? "rotate-180" : ""}`}
                            aria-hidden="true"
                          />
                        </DisclosureButton>
                        <DisclosurePanel className="mt-2 space-y-2">
                          {item.items?.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </nav>
              <div className="py-6">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="-mx-3 block w-full rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50 text-left"
                  >
                    Log out
                  </button>
                ) : (
                  <Link
                    onClick={handleLogin}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    href=""
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}
