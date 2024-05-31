"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { messagesState } from "@/lib/store/messagesState";
import { MessagesWithUsers } from "@/lib/types/collections";
import { MessageSchema } from "@/schemas";

export function Send() {
  const supabase = supabaseBrowser();
  const { addMessage } = messagesState();

  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      textMessage: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof MessageSchema>) {
    const { data, error } = await supabase
      .from("messages")
      .insert({ content: formData.textMessage })
      .select("*, users(*)")
      .single();
    if (error) toast.error(error.message);
    if (data) {
      addMessage(data as MessagesWithUsers);
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-full relative mt-5"
      >
        <FormField
          control={form.control}
          name="textMessage"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  autoComplete="false"
                  placeholder="Message..."
                  className="h-14 rounded-md shadow-sm "
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className="absolute top-1/2 p-2 text-secondary transform -translate-y-1/2 right-2"
          type="submit"
          variant={"default"}
        >
          <SendHorizonal className="-rotate-45" />
        </Button>
      </form>
    </Form>
  );
}
