-- Créer la table messages 
create table public.messages (
    id uuid default gen_random_uuid() not null,
    content text,
    is_edit boolean default false not null,
    send_by uuid not null default auth.uid()::uuid,
    created_at timestamptz default now() not null,
    primary key (id),
    foreign key (send_by) references public.users(id) on delete cascade
);

-- Activer la fonctionalité real time sur la table
alter publication supabase_realtime add table messages;

-- Creer les policies de sécurité
-- activer les policies
alter table "messages" enable row level security;

-- peuvent lire : les users authentifiés
create policy select_messages_policy on public.messages
for select
to authenticated
using (true);

-- peuvent insérer : les users authentifiés et qui sont 
-- auteurs du message créée à l'instant
create policy insert_messages_policy
on public.messages
for insert
to authenticated
with check (send_by = auth.uid()::uuid and created_at = now());

-- peuvent supprimer : les users authentifiés et qui sont 
-- auteurs du message créée
create policy delete_messages_policy
on public.messages
for delete
to authenticated
using (send_by = auth.uid()::uuid);

-- peuvent mettre à jour : les users authentifiés et qui sont 
-- auteurs du message créée
create policy update_messages_policy
on public.messages
for update
to authenticated
using (send_by = auth.uid()::uuid)
with check (send_by = auth.uid()::uuid);

--NB:
-- La clause "using" spécifie une condition pour autoriser une opération, tandis que la clause "with check" garantit que la ligne mise à jour respecte les contraintes de la politique. Bien que la clause "using" soit souvent suffisante, inclure la clause "with check" ajoute une sécurité supplémentaire en vérifiant la mise à jour par rapport aux contraintes de la politique avant de l'appliquer.