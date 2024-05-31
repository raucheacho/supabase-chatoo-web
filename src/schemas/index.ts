import { z } from "zod";
export const LoginFormSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse mail valide.",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au minimum 6 caractères.",
  }),
});

export const SignUpFormSchema = z.object({
  pseudo: z.string().min(2, {
    message: "Le pseudo doit contenir au minimum 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse mail valide.",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au minimum 6 caractères.",
  }),
});

export const MessageSchema = z.object({
  textMessage: z.string().min(1),
});

export const LogoutSchema = z.object({});
