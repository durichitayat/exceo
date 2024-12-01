"use client";

import React from "react";
import { ArrowUpDown, MoreHorizontal, Mail, Calendar } from "lucide-react";
import Button from "@/components/ui/button";
import { Listbox, Dialog, Transition, Menu } from "@headlessui/react";
import Avatar from "@/components/ui/avatar";
// import { useState } from "react";

export default function DelegatedItems() {
  // TODO: Implement state management on Email Thread Dialog
  const isEmailThreadDialogOpen = false;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Delegated Emails
          </h2>

          {/* Filters and Actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <Listbox defaultValue="all">
                <div className="relative">
                  <Listbox.Button className="w-[180px]">
                    <span>Filter by status</span>
                  </Listbox.Button>
                  <Transition>
                    <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg">
                      <Listbox.Option value="all">All Statuses</Listbox.Option>
                      <Listbox.Option value="pending">Pending</Listbox.Option>
                      <Listbox.Option value="in-progress">
                        In Progress
                      </Listbox.Option>
                      <Listbox.Option value="completed">
                        Completed
                      </Listbox.Option>
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
              <Listbox defaultValue="all">
                <div className="relative">
                  <Listbox.Button className="w-[180px]">
                    <span>Filter by assignee</span>
                  </Listbox.Button>
                  <Transition>
                    <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg">
                      <Listbox.Option value="all">All Assignees</Listbox.Option>
                      <Listbox.Option value="alice">
                        Alice Johnson
                      </Listbox.Option>
                      <Listbox.Option value="bob">Bob Smith</Listbox.Option>
                      <Listbox.Option value="carol">Carol White</Listbox.Option>
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <Button variant="outline-secondary">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>

          {/* Delegated Items Table */}
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {delegatedItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {item.subject}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar
                        src={item.assignee.avatar}
                        alt={item.assignee.name}
                        className="mr-2 h-8 w-8 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {item.assignee.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {item.dueDate}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Menu
                      as="div"
                      className="relative inline-block text-left"
                    >
                      <Menu.Button
                        as={Button}
                        variant="outline"
                        className="h-8 w-8 p-0"
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Menu.Button>
                      <Transition>
                        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } block w-full text-left px-4 py-2 text-sm`}
                              >
                                View Email Thread
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } block w-full text-left px-4 py-2 text-sm`}
                              >
                                Edit Delegation
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } block w-full text-left px-4 py-2 text-sm`}
                              >
                                Send Reminder
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } block w-full text-left px-4 py-2 text-sm`}
                              >
                                Mark as Completed
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-6">
            <Button variant="outline-primary">Load More</Button>
          </div>
        </div>
      </main>

      {/* Email Thread Dialog */}
      <Transition
        appear
        show={isEmailThreadDialogOpen}
        as={React.Fragment}
      >
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            /* setIsEmailThreadDialogOpen(false); */
          }}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Email Thread: Q3 Report Review
                  </Dialog.Title>
                  <div className="mt-4 space-y-4">
                    <EmailThreadItem
                      sender="John Doe"
                      recipient="Alice Johnson"
                      timestamp="2023-09-10 09:00 AM"
                      content="Alice, please review the attached Q3 report and provide your insights by EOD Friday. Let me know if you need any clarification."
                    />
                    <EmailThreadItem
                      sender="Alice Johnson"
                      recipient="John Doe"
                      timestamp="2023-09-10 10:30 AM"
                      content="Received, John. I'll start reviewing it right away and will get back to you with my analysis by Friday. I'll let you know if I have any questions."
                    />
                    <EmailThreadItem
                      sender="Alice Johnson"
                      recipient="John Doe"
                      timestamp="2023-09-12 03:45 PM"
                      content="John, I've completed my initial review. There are a few points I'd like to discuss. Can we schedule a quick call tomorrow?"
                    />
                    <div className="flex justify-end mt-4">
                      <Button>Reply</Button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

interface EmailThreadItemProps {
  sender: string;
  recipient: string;
  timestamp: string;
  content: string;
}

function EmailThreadItem({
  sender,
  recipient,
  timestamp,
  content,
}: EmailThreadItemProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-semibold">
            {sender} → {recipient}
          </p>
          <p className="text-sm text-gray-500">{timestamp}</p>
        </div>
      </div>
      <p className="text-sm">{content}</p>
    </div>
  );
}

const delegatedItems = [
  {
    id: 1,
    subject: "Q3 Report Review",
    assignee: {
      name: "Alice Johnson",
      avatar:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    dueDate: "2023-09-15",
    status: "In Progress",
  },
  {
    id: 2,
    subject: "Client Meeting Preparation",
    assignee: {
      name: "Bob Smith",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    dueDate: "2023-09-20",
    status: "Pending",
  },
  {
    id: 3,
    subject: "Budget Approval",
    assignee: {
      name: "Carol White",
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    dueDate: "2023-09-18",
    status: "Completed",
  },
  {
    id: 4,
    subject: "Team Performance Review",
    assignee: {
      name: "David Brown",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    dueDate: "2023-09-25",
    status: "In Progress",
  },
  {
    id: 5,
    subject: "New Product Launch Strategy",
    assignee: {
      name: "Eva Green",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    dueDate: "2023-09-30",
    status: "Pending",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
