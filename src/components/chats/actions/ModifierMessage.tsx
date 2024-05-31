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
import { Input } from "@/components/ui/input";
import { useAppState } from "@/lib/store/appState";
import { messagesState } from "@/lib/store/messagesState";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { MessagesWithUsers } from "@/lib/types/collections";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function ModifierMessage() {
  const { startUpdate, setStartUpdate, selectedMessage, setSelectedMessage } =
    useAppState();
  const { updateMessage } = messagesState();
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedMessage) {
      setCurrentMessage(selectedMessage.content as string);
    }
  }, [selectedMessage]);

  async function onSubmit() {
    const supabase = supabaseBrowser();
    console.log(currentMessage);
    setIsLoading(true);
    const { data, error } = await supabase
      .from("messages")
      .update({ content: currentMessage, is_edit: true })
      .eq("id", selectedMessage?.id as string)
      .select()
      .single();
    if (error) {
      console.log(error.message);
      toast.error("Une erreur est survenue pendant la modification");
    }
    if (data) {
      updateMessage(data as MessagesWithUsers);
      toast.success("Votre message a bien été modifié");
      setStartUpdate();
      setSelectedMessage(null);
    }
    setIsLoading(false);
  }

  return (
    <AlertDialog open={startUpdate}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Modifier le message</AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              onChange={(e) => setCurrentMessage(e.target.value)}
              value={currentMessage}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setStartUpdate();
              setSelectedMessage(null);
            }}
          >
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Modifier
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
