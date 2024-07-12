"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { useAppState } from "@/lib/store/appState";
import { messagesState } from "@/lib/store/messagesState";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export function SupprimerMessage() {
  const { startDelete, setStartDelete, selectedMessage, setSelectedMessage } =
    useAppState();
  const [isLoading, setIsLoading] = useState(false);
  const { removeMessage } = messagesState();

  const handleRemove = async () => {
    const supabase = supabaseBrowser();
    setIsLoading(true);
    const { data, error } = await supabase
      .from("messages")
      .delete()
      .eq("id", selectedMessage?.id as string)
      .select()
      .single();
    if (error) {
      console.log(error.message);
      toast.error("Une erreur est survenue pendant la modification");
    }
    if (data) {
      toast.success("Votre message a bien été supprimé");
      //removeMessage(data.id);
      setStartDelete();
      setSelectedMessage(null);
    }
    setIsLoading(false);
  };
  const supabase = supabaseBrowser();
  useEffect(() => {
    const subscription = supabase
      .channel("delete-messages")
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          console.log("old", payload.old.id);
          if (payload.old.id) {
            removeMessage(payload.old.id);
            console.log(selectedMessage);
          }
          console.log(selectedMessage);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, removeMessage, selectedMessage]);
  return (
    <AlertDialog open={startDelete}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Voulez-vous supprimer ce messsage?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-forground">
            {selectedMessage?.content}
          </AlertDialogDescription>
          <Separator className="my-2" />
          <AlertDialogDescription className="text-destructive">
            Les messages supprimer ne seront pas restaurés
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setStartDelete()}>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleRemove()}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
