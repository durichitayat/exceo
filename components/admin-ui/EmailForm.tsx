"use client";

import { useTransition } from "react";
import { addEmail } from "@/app/actions/email";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function EmailForm() {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="flex flex-col space-y-4"
      action={(formData) =>
        startTransition(async () => {
          await addEmail(formData);
        })
      }
    >
      <Input
        type="text"
        name="subject"
        placeholder="Subject"
        required
      />
      <Input
        type="text"
        name="sender"
        placeholder="Sender"
        required
      />
      <Input
        name="body"
        placeholder="Email body"
        required
      />
      <Button
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add Email"}
      </Button>
    </form>
  );
}
