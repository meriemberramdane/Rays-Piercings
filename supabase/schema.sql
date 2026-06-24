-- ============================================================
-- Rays Piercings — Script d'initialisation Supabase
-- À copier-coller dans Supabase > SQL Editor > New query > Run
-- ============================================================

-- Table des piercings (catalogue "Nos Piercings")
create table if not exists public.piercings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  zone text not null,
  description text not null default '',
  healing text not null default '',
  pain smallint not null default 1 check (pain between 1 and 5),
  image_url text,
  position int not null default 0,
  created_at timestamptz not null default now()
);

-- Table des produits (boutique)
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  price numeric not null default 0,
  material text not null default '',
  description text not null default '',
  image_url text,
  position int not null default 0,
  created_at timestamptz not null default now()
);

-- Active la sécurité au niveau des lignes (obligatoire avant d'écrire des règles)
alter table public.piercings enable row level security;
alter table public.products enable row level security;

-- Lecture publique : tout le monde peut voir les piercings et produits
-- (nécessaire pour que le site public affiche le catalogue sans connexion)
drop policy if exists "Lecture publique piercings" on public.piercings;
create policy "Lecture publique piercings"
  on public.piercings for select
  using (true);

drop policy if exists "Lecture publique products" on public.products;
create policy "Lecture publique products"
  on public.products for select
  using (true);

-- Écriture (ajout/modification/suppression) : autorisée pour la clé publique.
-- Le formulaire admin est protégé par mot de passe côté interface, et la clé
-- "anon" utilisée ici n'a aucun droit d'administration sur le projet Supabase
-- lui-même (uniquement sur ces deux tables). C'est un choix volontairement
-- simple, cohérent avec "un seul mot de passe admin" plutôt qu'un vrai compte
-- utilisateur Supabase Auth.
drop policy if exists "Écriture piercings" on public.piercings;
create policy "Écriture piercings"
  on public.piercings for all
  using (true)
  with check (true);

drop policy if exists "Écriture products" on public.products;
create policy "Écriture products"
  on public.products for all
  using (true)
  with check (true);

-- ============================================================
-- Storage : bucket public pour les photos de piercings et produits
-- ============================================================
insert into storage.buckets (id, name, public)
values ('rays-piercing-media', 'rays-piercing-media', true)
on conflict (id) do nothing;

drop policy if exists "Lecture publique storage" on storage.objects;
create policy "Lecture publique storage"
  on storage.objects for select
  using (bucket_id = 'rays-piercing-media');

drop policy if exists "Upload storage" on storage.objects;
create policy "Upload storage"
  on storage.objects for insert
  with check (bucket_id = 'rays-piercing-media');

drop policy if exists "Suppression storage" on storage.objects;
create policy "Suppression storage"
  on storage.objects for delete
  using (bucket_id = 'rays-piercing-media');

drop policy if exists "Mise a jour storage" on storage.objects;
create policy "Mise a jour storage"
  on storage.objects for update
  using (bucket_id = 'rays-piercing-media');
