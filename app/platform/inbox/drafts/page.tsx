"use client";

import React, { useState } from "react";
import {
  Mail,
  Edit,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
} from "lucide-react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Badge from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Listbox, Dialog, Transition } from "@headlessui/react";

export default function DraftsInbox() {
  const [drafts, setDrafts] = useState([
    {
      id: 1,
      subject: "Q3 Financial Review",
      recipient: "Board of Directors",
      preview:
        "I've reviewed the Q3 financials and have the following observations...",
      status: "pending",
    },
    {
      id: 2,
      subject: "New Product Launch Strategy",
      recipient: "Marketing Team",
      preview:
        "Based on our recent market analysis, I suggest we adjust our launch timeline...",
      status: "pending",
    },
    {
      id: 3,
      subject: "Annual Shareholder Meeting Agenda",
      recipient: "Investor Relations",
      preview:
        "For this year's annual shareholder meeting, I propose the following agenda items...",
      status: "pending",
    },
    {
      id: 4,
      subject: "Employee Retention Initiative",
      recipient: "HR Department",
      preview:
        "To address our recent turnover rates, I recommend implementing the following strategies...",
      status: "pending",
    },
    {
      id: 5,
      subject: "Strategic Partnership Proposal",
      recipient: "Executive Team",
      preview:
        "I've identified a potential strategic partnership that could significantly benefit our growth plans...",
      status: "pending",
    },
  ]);

  const [selectedDraft, setSelectedDraft] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleApprove = (id) => {
    setDrafts(
      drafts.map((draft) =>
        draft.id === id ? { ...draft, status: "approved" } : draft
      )
    );
  };

  const handleReject = (id) => {
    setDrafts(
      drafts.map((draft) =>
        draft.id === id ? { ...draft, status: "rejected" } : draft
      )
    );
  };

  const handleEdit = (draft) => {
    setSelectedDraft(draft);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Drafts Inbox</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filters and Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="Search drafts..."
                className="flex-grow"
                startIcon={<Search className="h-5 w-5 text-gray-400" />}
              />
              <Listbox>
                <div className="relative">
                  <Listbox.Button className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </Listbox.Button>
                  <Transition>
                    <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg">
                      <Listbox.Option value="all">All Statuses</Listbox.Option>
                      <Listbox.Option value="pending">Pending</Listbox.Option>
                      <Listbox.Option value="approved">Approved</Listbox.Option>
                      <Listbox.Option value="rejected">Rejected</Listbox.Option>
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
              <Button variant="outline">
                <Filter className="h-5 w-5 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Draft Emails</CardTitle>
            <CardDescription>
              Review and manage AI-generated draft emails
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {drafts.map((draft) => (
                <DraftItem
                  key={draft.id}
                  draft={draft}
                  onApprove={() => handleApprove(draft.id)}
                  onReject={() => handleReject(draft.id)}
                  onEdit={() => handleEdit(draft)}
                />
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Load More</Button>
          </CardFooter>
        </Card>

        <EditDraftDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          draft={selectedDraft}
        />
      </div>
    </div>
  );
}

function DraftItem({ draft, onApprove, onReject, onEdit }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Mail className="h-6 w-6 text-gray-400" />
          <div>
            <h3 className="font-semibold text-lg">{draft.subject}</h3>
            <p className="text-sm text-gray-500">To: {draft.recipient}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant={
              draft.status === "approved"
                ? "success"
                : draft.status === "rejected"
                ? "danger"
                : "warning"
            }
          >
            {draft.status.charAt(0).toUpperCase() + draft.status.slice(1)}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4">
          <p className="text-sm text-gray-700 mb-4">{draft.preview}</p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onReject}
            >
              <X className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button
              size="sm"
              onClick={onApprove}
            >
              <Check className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </div>
        </div>
      )}
    </li>
  );
}

function EditDraftDialog({ isOpen, onClose, draft }) {
  const [editedDraft, setEditedDraft] = useState(draft);

  React.useEffect(() => {
    setEditedDraft(draft);
  }, [draft]);

  const handleSave = () => {
    // Here you would typically send the edited draft back to your backend
    console.log("Saving edited draft:", editedDraft);
    onClose();
  };

  if (!draft) return null;

  return (
    <Transition
      appear
      show={isOpen}
      as={React.Fragment}
    >
      <Dialog
        as="div"
        className="relative z-10"
        onClose={onClose}
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
                  Edit Draft Email
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Make changes to the AI-generated draft email. Click save
                    when you're done.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label
                        htmlFor="subject"
                        className="text-right font-medium"
                      >
                        Subject
                      </label>
                      <Input
                        id="subject"
                        value={editedDraft?.subject || ""}
                        onChange={(e) =>
                          setEditedDraft({
                            ...editedDraft,
                            subject: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label
                        htmlFor="recipient"
                        className="text-right font-medium"
                      >
                        Recipient
                      </label>
                      <Input
                        id="recipient"
                        value={editedDraft?.recipient || ""}
                        onChange={(e) =>
                          setEditedDraft({
                            ...editedDraft,
                            recipient: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label
                        htmlFor="content"
                        className="text-right font-medium"
                      >
                        Content
                      </label>
                      <textarea
                        id="content"
                        value={editedDraft?.preview || ""}
                        onChange={(e) =>
                          setEditedDraft({
                            ...editedDraft,
                            preview: e.target.value,
                          })
                        }
                        className="col-span-3 h-32 p-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    type="submit"
                    onClick={handleSave}
                  >
                    Save changes
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
