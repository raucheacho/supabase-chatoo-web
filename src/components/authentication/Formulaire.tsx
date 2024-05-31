"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpFormSchema, LoginFormSchema } from "@/schemas";
import { useAction } from "next-safe-action/hooks";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { login } from "@/actions/login";
import { signup } from "@/actions/signup";
import { toast } from "sonner";

type SignUpFormType = z.infer<typeof SignUpFormSchema>;
type LoginFormType = z.infer<typeof LoginFormSchema>;

type PropsType = {
  role: "connexion" | "inscription";
};

function Formulaire({ role }: PropsType) {
  const isInscription = role === "inscription";
  const action = isInscription ? signup : login;
  const FormSchema = isInscription ? SignUpFormSchema : LoginFormSchema;

  const form = useForm<SignUpFormType | LoginFormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(isInscription && { pseudo: "" }),
    },
  });

  const { execute, status, result } = useAction(action, {
    onSuccess: (data) => {
      if (data.message) {
        console.log(data.message);
        toast.error(data.message);
      } else {
        toast.success("Connexion réussie");
      }
    },
    onExecute(data) {
      console.log("connection en cours");
    },
    onError(error) {
      if (error.serverError) {
        console.log("probleme avec le server");
        toast("probleme avec le server");
      }
    },
  });

  async function onSubmit(data: SignUpFormType | LoginFormType) {
    execute(data as any);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {isInscription && (
          <FormField
            control={form.control}
            name="pseudo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pseudo</FormLabel>
                <FormControl>
                  <Input placeholder="Votre pseudo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse email</FormLabel>
              <FormControl>
                <Input placeholder="moi@moi.toi" {...field} />
              </FormControl>
              <FormDescription>
                Utilisez une adresse email valide.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="secret" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {status === "executing" && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isInscription ? "Inscription" : "Connexion"}
        </Button>
      </form>
    </Form>
  );
}

export default Formulaire;
