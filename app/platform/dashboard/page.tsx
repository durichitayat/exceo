"use client";

import React, { useState } from "react";
import {
  Mail,
  Send,
  HelpCircle,
  Users,
  Clock,
  Calendar,
  Phone,
  FileText,
  ChevronDown,
} from "lucide-react";
import Button from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Dialog, Transition, Listbox } from "@headlessui/react";
import Badge from "@/components/ui/badge";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";

export default function ExecutiveAssistantDashboard() {
  const [isFollowUpDialogOpen, setIsFollowUpDialogOpen] = useState(false);
  const [selectedFollowUpTime, setSelectedFollowUpTime] = useState("1 day");

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Executive Assistant Dashboard
        </h1>

        {/* Drafts Section */}
        <Card>
          <CardHeader>
            <CardTitle>Drafts Pending Approval</CardTitle>
            <CardDescription>
              Review and approve these draft responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <DraftItem
                subject="Re: Q3 Financial Review"
                recipient="Board of Directors"
                preview="I've reviewed the Q3 financials and have the following observations..."
              />
              <DraftItem
                subject="New Product Launch Strategy"
                recipient="Marketing Team"
                preview="Based on our recent market analysis, I suggest we adjust our launch timeline..."
              />
              <DraftItem
                subject="Annual Shareholder Meeting Agenda"
                recipient="Investor Relations"
                preview="For this year's annual shareholder meeting, I propose the following agenda items..."
              />
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="secondary">View All Drafts</Button>
          </CardFooter>
        </Card>

        {/* Queries Section */}
        <Card>
          <CardHeader>
            <CardTitle>Queries Requiring Your Input</CardTitle>
            <CardDescription>
              Provide information to complete these draft responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <QueryItem
                subject="Re: Partnership Proposal from TechCorp"
                query="What is our budget allocation for new partnerships this quarter?"
              />
              <QueryItem
                subject="Employee Retention Strategy"
                query="Should we prioritize remote work options or in-office perks in our new policy?"
              />
              <QueryItem
                subject="Re: Press Inquiry about New Product"
                query="Are we ready to disclose any features of our upcoming product launch?"
              />
            </ul>
          </CardContent>
        </Card>

        {/* Delegation Section */}
        <Card>
          <CardHeader>
            <CardTitle>Matters for Delegation</CardTitle>
            <CardDescription>
              Confirm the team member to handle these tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <DelegationItem
                task="Prepare detailed analysis of competitor's new product"
                suggestedTeamMember="Alice Johnson (Market Research)"
                onConfirm={() => setIsFollowUpDialogOpen(true)}
              />
              <DelegationItem
                task="Draft press release for Q3 earnings"
                suggestedTeamMember="Bob Smith (PR Department)"
                onConfirm={() => setIsFollowUpDialogOpen(true)}
              />
              <DelegationItem
                task="Coordinate logistics for upcoming leadership retreat"
                suggestedTeamMember="Carol White (Executive Admin)"
                onConfirm={() => setIsFollowUpDialogOpen(true)}
              />
            </ul>
          </CardContent>
        </Card>

        {/* Quick Actions Section */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used actions to manage your day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickActionButton
                icon={<Mail />}
                text="Compose Email"
                action={() => {}}
              />
              <QuickActionButton
                icon={<Calendar />}
                text="Schedule Meeting"
                action={() => {}}
              />
              <QuickActionButton
                icon={<Phone />}
                text="Start Call"
                action={() => {}}
              />
              <QuickActionButton
                icon={<FileText />}
                text="Create Document"
                action={() => {}}
              />
            </div>
          </CardContent>
        </Card>

        {/* Follow-up Dialog */}
        <Transition
          appear
          show={isFollowUpDialogOpen}
          as={React.Fragment}
        >
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsFollowUpDialogOpen(false)}
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
                      Set Follow-up Reminder
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Choose when you'd like to be reminded to follow up on
                        this task if there's no conclusion.
                      </p>
                    </div>
                    <div className="mt-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="followup"
                          className="text-right"
                        >
                          Follow-up in
                        </Label>
                        <Listbox
                          value={selectedFollowUpTime}
                          onChange={setSelectedFollowUpTime}
                        >
                          <div className="relative col-span-3">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:border-indigo-500 sm:text-sm">
                              <span className="block truncate">
                                {selectedFollowUpTime}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDown
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={React.Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                <Listbox.Option
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? "bg-amber-100 text-amber-900"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value="1 day"
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        1 day
                                      </span>
                                    </>
                                  )}
                                </Listbox.Option>
                                <Listbox.Option
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? "bg-amber-100 text-amber-900"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value="3 days"
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        3 days
                                      </span>
                                    </>
                                  )}
                                </Listbox.Option>
                                <Listbox.Option
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? "bg-amber-100 text-amber-900"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value="1 week"
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        1 week
                                      </span>
                                    </>
                                  )}
                                </Listbox.Option>
                                <Listbox.Option
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? "bg-amber-100 text-amber-900"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value="2 weeks"
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        2 weeks
                                      </span>
                                    </>
                                  )}
                                </Listbox.Option>
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button
                        type="submit"
                        onClick={() => setIsFollowUpDialogOpen(false)}
                      >
                        Set Reminder
                      </Button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}

interface DraftItemProps {
  subject: string;
  recipient: string;
  preview: string;
}

function DraftItem({ subject, recipient, preview }: DraftItemProps) {
  return (
    <li className="flex items-center justify-between space-x-4 bg-white p-4 rounded-lg shadow">
      <div>
        <h3 className="font-semibold text-lg">{subject}</h3>
        <p className="text-sm text-gray-500">To: {recipient}</p>
        <p className="text-sm text-gray-700 mt-1">{preview}</p>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="primary"
        >
          Approve
        </Button>
      </div>
    </li>
  );
}

interface QueryItemProps {
  subject: string;
  query: string;
}

function QueryItem({ subject, query }: QueryItemProps) {
  return (
    <li className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold text-lg">{subject}</h3>
      <p className="text-sm text-gray-700 mt-1">{query}</p>
      <div className="mt-2">
        <Button size="sm">Provide Input</Button>
      </div>
    </li>
  );
}

interface DelegationItemProps {
  task: string;
  suggestedTeamMember: string;
  onConfirm: () => void;
}

function DelegationItem({
  task,
  suggestedTeamMember,
  onConfirm,
}: DelegationItemProps) {
  return (
    <li className="flex items-center justify-between space-x-4 bg-white p-4 rounded-lg shadow">
      <div>
        <h3 className="font-semibold text-lg">{task}</h3>
        <p className="text-sm text-gray-500">
          Suggested: {suggestedTeamMember}
        </p>
      </div>
      <div className="flex space-x-2">
        <Button
          size="sm"
          onClick={onConfirm}
        >
          Confirm
        </Button>
        <Button
          size="sm"
          variant="outline"
        >
          Change
        </Button>
      </div>
    </li>
  );
}

function QuickActionButton({
  icon,
  text,
  action,
}: {
  icon: React.ReactElement;
  text: string;
  action: () => void;
}) {
  return (
    <Button
      variant="outline"
      className="h-auto py-4 flex flex-col items-center justify-center space-y-2"
      onClick={action}
    >
      {React.cloneElement(icon, { className: "h-6 w-6" })}
      <span>{text}</span>
    </Button>
  );
}
