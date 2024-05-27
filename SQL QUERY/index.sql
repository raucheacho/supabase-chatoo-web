-- Créer la table users 
CREATE TABLE public.users (
    id uuid not null references auth.users on delete cascade,
    display_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
     primary key (id)
);

-- Fonction pour inserer nouveau users après login
create function public.fn_add_user_on_signup()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.users (id, display_name, avatar_url)
  values (
    new.id, 
    new.raw_user_meta_data ->> 'user_name', 
    new.raw_user_meta_data ->> 'avatar_url'
    );
  return new;
end;
$$;

-- Activez le triger pour la fonction
create trigger trigger_add_user_on_signup
  after insert on auth.users
  for each row execute function public.fn_add_user_on_signup();



