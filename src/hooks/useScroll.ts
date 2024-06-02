import { MessagesWithUsers } from "@/lib/types/collections";
import { useEffect, useRef, useState } from "react";

const useScroll = (messages: MessagesWithUsers[]) => {
  // Référence à l'élément de conteneur de défilement
  const scrollRef = useRef<HTMLDivElement>(null);

  // État pour savoir si l'utilisateur a fait défiler manuellement
  const [scrolledByUser, setScrolledByUser] = useState(false);

  // État pour compter le nombre de notifications de nouveaux messages
  const [notification, setNotification] = useState(0);

  /**
   * Gère l'ajout de nouvelles notifications de messages.
   */
  const handleNewMessage = () => {
    if (scrollRef.current) {
      const atBottom =
        scrollRef.current.scrollHeight - scrollRef.current.scrollTop ===
        scrollRef.current.clientHeight;
      if (atBottom) {
        // Si on est en bas, on réinitialise les notifications
        setNotification(0);
      } else {
        // Sinon, on augmente le nombre de notifications
        setNotification((prev) => prev + 1);
      }
    }
  };

  // Effet pour gérer les nouveaux messages
  useEffect(() => {
    if (scrolledByUser) {
      handleNewMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]); // Dépend des messages et de l'état de défilement de l'utilisateur

  // Effet pour faire défiler automatiquement vers le bas lorsqu'il y a de nouveaux messages
  useEffect(() => {
    if (!scrolledByUser && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, scrolledByUser]); // Dépend des messages et de l'état de défilement de l'utilisateur

  // Effet pour ajouter et nettoyer l'événement de défilement
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const atBottom =
          scrollRef.current.scrollHeight - scrollRef.current.scrollTop ===
          scrollRef.current.clientHeight;
        setScrolledByUser(!atBottom);
        if (atBottom) {
          setNotification(0);
        }
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []); // Exécute une seule fois lors du montage et nettoyage lors du démontage

  /**
   * Fait défiler la vue jusqu'en bas.
   */
  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    setNotification(0);
  };

  // Retourne les références et états liés au défilement, ainsi que les fonctions associées
  return { scrollRef, scrolledByUser, notification, scrollDown };
};

export default useScroll; // Exportation du hook personnalisé
