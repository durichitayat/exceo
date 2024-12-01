import React from "react";
import {
  Search,
  Bell,
  ChevronDown,
  ArrowUpDown,
  MoreHorizontal,
  Mail,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DelegatedItems() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-blue-600">ExCEO.ai</h1>
          <div className="flex-1 mx-4">
            <Input
              type="search"
              placeholder="Search delegated emails..."
              className="max-w-md"
            />
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="@user"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Delegated Emails
          </h2>

          {/* Filters and Actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assignees</SelectItem>
                  <SelectItem value="alice">Alice Johnson</SelectItem>
                  <SelectItem value="bob">Bob Smith</SelectItem>
                  <SelectItem value="carol">Carol White</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>

          {/* Delegated Items Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Subject</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {delegatedItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-gray-400" />
                      {item.subject}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage
                          src={`/placeholder.svg?height=32&width=32&text=${item.assignee.charAt(
                            0
                          )}`}
                        />
                        <AvatarFallback>
                          {item.assignee.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {item.assignee}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                      {item.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Email Thread</DropdownMenuItem>
                        <DropdownMenuItem>Edit Delegation</DropdownMenuItem>
                        <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* Email Thread Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="link"
            className="hidden"
          >
            Open Email Thread
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Email Thread: Q3 Report Review</DialogTitle>
            <DialogDescription>Delegated to Alice Johnson</DialogDescription>
          </DialogHeader>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EmailThreadItem({ sender, recipient, timestamp, content }) {
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
    assignee: "Alice Johnson",
    dueDate: "2023-09-15",
    status: "In Progress",
  },
  {
    id: 2,
    subject: "Client Meeting Preparation",
    assignee: "Bob Smith",
    dueDate: "2023-09-20",
    status: "Pending",
  },
  {
    id: 3,
    subject: "Budget Approval",
    assignee: "Carol White",
    dueDate: "2023-09-18",
    status: "Completed",
  },
  {
    id: 4,
    subject: "Team Performance Review",
    assignee: "David Brown",
    dueDate: "2023-09-25",
    status: "In Progress",
  },
  {
    id: 5,
    subject: "New Product Launch Strategy",
    assignee: "Eve Green",
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
