-- Créer la table users 
create table public.users (
    id uuid not null references auth.users on delete cascade,
    display_name text,
    avatar_url text,
    created_at timestamptz default now(),
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

-- activer les policies
alter table "users" enable row level security;

-- peuvent lire : les users authentifiés
create policy select_users_policy on public.users
for select
to authenticated
using (true);

