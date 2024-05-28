"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "./ui/input";
import { SendHorizonal } from "lucide-react";

const FormSchema = z.object({
  textMessage: z.string(),
});

export function Send() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      textMessage: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full relative">
        <FormField
          control={form.control}
          name="textMessage"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Message..."
                  className="h-14 rounded-md shadow-sm dark:shadow-primary"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className="absolute top-1/2 p-2.5 text-secondary transform -translate-y-1/2 right-2"
          type="submit"
          variant={"default"}
        >
          <SendHorizonal className="-rotate-45" />
        </Button>
      </form>
    </Form>
  );
}
