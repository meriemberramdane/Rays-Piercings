# Rays Piercings — Site web

Site vitrine premium pour le studio de piercing **Rays Piercing** (Oran, Algérie). Construit en React + TypeScript + Tailwind CSS + Framer Motion.

## Lancer le projet en local

```bash
npm install
npm run dev
```

Le site est accessible sur `http://localhost:5173`.

## Construire pour la production

```bash
npm run build
npm run preview   # pour vérifier le résultat final
```

## Ajouter les vraies photos

Pour l'instant, toutes les images (piercings, boutique) affichent un **placeholder élégant** avec le nom de l'élément, en attendant les vraies photos. Pour les remplacer :

1. Placez vos images dans `public/images/` (ex : `public/images/septum-1.jpg`).
2. Dans les fichiers de données suivants, ajoutez le champ `image` à l'élément concerné :
   - `src/data/piercings.ts` → champ `image: "/images/septum-1.jpg"`
   - `src/data/products.ts` → champ `image: "/images/anneau-saturne.jpg"`

Dès qu'un champ `image`/`src` est renseigné, la vraie photo remplace automatiquement le placeholder — aucun autre changement de code n'est nécessaire.

> **Note** : une fois Supabase configuré (section suivante), il est plus simple de gérer piercings, produits et photos directement depuis l'espace `/admin` du site plutôt qu'en éditant ces fichiers à la main.

## Espace admin (gestion des piercings et de la boutique)

Le site dispose d'un espace d'administration accessible sur **`/admin`** (ex : `https://tonsite.com/admin`), protégé par un simple mot de passe. Depuis cet espace, tu peux ajouter, modifier et supprimer les piercings et les produits de la boutique, avec upload direct des photos — sans toucher au code.

Les réservations de rendez-vous restent gérées uniquement par WhatsApp/e-mail comme avant ; elles ne passent pas par l'espace admin.

### Étape 1 — Créer le projet Supabase

1. Va sur [supabase.com](https://supabase.com), connecte-toi à ton compte existant.
2. Crée un nouveau projet (ou réutilise un projet existant), donne-lui un nom comme `rays-piercing`.
3. Une fois le projet créé, va dans **SQL Editor** (menu de gauche) → **New query**.
4. Ouvre le fichier `supabase/schema.sql` fourni dans ce projet, copie tout son contenu, colle-le dans l'éditeur SQL de Supabase, puis clique sur **Run**.
   - Ce script crée automatiquement : la table `piercings`, la table `products`, les règles de sécurité (RLS) qui autorisent la lecture publique du catalogue et l'écriture pour la gestion admin, ainsi qu'un bucket de stockage `rays-piercing-media` pour les photos.
5. Si tout s'exécute sans erreur, c'est terminé côté Supabase.

### Étape 2 — Récupérer les clés et configurer le projet

1. Dans Supabase, va dans **Project Settings** (icône d'engrenage) → **API Keys**.
2. Récupère deux informations :
   - L'**URL du projet** (ex : `https://xxxxxxxxxxxx.supabase.co`)
   - La **clé publique côté client** : selon la version de ton dashboard, elle s'appelle soit **"Publishable key"** (commence par `sb_publishable_...`), soit **"anon public"** (ancien format). Prends celle-là — jamais la clé `service_role` / `secret`, qui ne doit jamais être utilisée dans le code du site.
3. Dans le projet, copie le fichier `.env.example` en `.env` (à la racine, à côté de `package.json`) :
   ```bash
   cp .env.example .env
   ```
4. Remplis le fichier `.env` :
   ```bash
   VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=ta_clé_publique_ici
   VITE_ADMIN_PASSWORD=choisis_un_mot_de_passe_fort
   ```
   `VITE_ADMIN_PASSWORD` est le mot de passe qui protège l'accès à `/admin` — choisis-en un que tu es seule à connaître.
5. Relance le serveur (`npm run dev`) ou redéploie sur Vercel (voir plus bas pour ajouter ces mêmes variables sur Vercel).

### Étape 3 — Utiliser l'espace admin

1. Va sur `/admin` (ex : `http://localhost:5173/admin` en local, ou `https://tonsite.com/admin` une fois déployé).
2. Entre le mot de passe défini dans `VITE_ADMIN_PASSWORD`.
3. Deux onglets sont disponibles :
   - **Piercings** : ajouter/modifier/supprimer les piercings affichés dans la section "Nos Piercings" du site (nom, zone, description, cicatrisation, niveau de douleur, photo).
   - **Boutique** : ajouter/modifier/supprimer les produits affichés dans la section "Boutique" (nom, catégorie, prix, matière, description, photo).
4. Pour chaque photo, clique sur "Choisir une photo" : le fichier est envoyé directement vers Supabase Storage et la photo apparaît immédiatement sur le site public.

### Comportement important à connaître

- **Tant que Supabase n'est pas configuré** (`.env` absent ou incomplet), le site public continue d'afficher les données codées en dur dans `src/data/piercings.ts` et `src/data/products.ts`, exactement comme avant. Rien ne casse.
- **Dès que Supabase est configuré et que tu as ajouté au moins un piercing ou un produit depuis l'admin**, le site public bascule automatiquement sur les données de Supabase pour cette catégorie. S'il n'y a encore aucune donnée dans une table, le site continue d'afficher les données codées en dur pour cette catégorie en attendant.
- La connexion à `/admin` se fait avec un mot de passe unique (pas de compte utilisateur individuel). La session reste active tant que l'onglet du navigateur n'est pas fermé.

## Contact configuré

- **Téléphone / WhatsApp** : +213 559 03 00 84
- **Email de réception des commandes et réservations** : meriemberramdane98@gmail.com

Quand un client remplit le formulaire de réservation ou de commande et clique sur "Envoyer", **deux choses se passent en même temps** :
1. WhatsApp s'ouvre côté client avec le message prérempli (le client choisit d'envoyer ou non).
2. Un e-mail de notification est envoyé automatiquement et silencieusement à `meriemberramdane98@gmail.com`, sans rien afficher au client — c'est purement pour que tu sois notifiée des nouvelles demandes.

Cette notification automatique utilise **EmailJS** (gratuit jusqu'à 200 e-mails/mois). Tant que le compte n'est pas configuré (voir ci-dessous), seul WhatsApp fonctionne — rien ne casse, l'e-mail automatique est juste ignoré silencieusement.

### Configurer EmailJS (5 minutes, gratuit)

1. Va sur [emailjs.com](https://www.emailjs.com) et crée un compte gratuit.
2. Dans le tableau de bord, va dans **Email Services** → **Add New Service** → choisis **Gmail** → connecte le compte `meriemberramdane98@gmail.com`. Note l'identifiant généré (**Service ID**, ex: `service_abc1234`).
3. Va dans **Email Templates** → **Create New Template**. Configure :
   - **To Email** : `{{to_email}}`
   - **Subject** : `Nouvelle demande — {{request_type}}`
   - **Content** (corps du message), par exemple :
     ```
     Nouvelle demande reçue sur le site Rays Piercing.

     Type : {{request_type}}
     Nom du client : {{from_name}}
     Téléphone : {{from_phone}}

     Détails :
     {{message}}
     ```
   - Sauvegarde et note l'identifiant du template (**Template ID**, ex: `template_xyz5678`).
4. Va dans **Account** → **General**, copie ta **Public Key** (ex: `AbCdEfGhIjKlMnOp`).
5. Ouvre le fichier `src/data/emailjs.config.ts` dans le projet et colle les 3 valeurs :
   ```ts
   export const EMAILJS_CONFIG = {
     serviceId: "service_abc1234",
     templateId: "template_xyz5678",
     publicKey: "AbCdEfGhIjKlMnOp",
   };
   ```
6. Relance `npm run build` (ou redéploie sur Vercel). C'est tout : chaque réservation ou commande déclenchera désormais une notification automatique sur ta boîte mail.

## Déploiement sur Vercel

```bash
npm install -g vercel
vercel
```

Ou directement depuis l'interface Vercel : importer le dépôt Git, framework détecté automatiquement (Vite), commande de build `npm run build`, dossier de sortie `dist`.

**Si Supabase et/ou EmailJS sont configurés**, ajoute les variables d'environnement correspondantes dans Vercel : **Project Settings → Environment Variables** :
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ADMIN_PASSWORD`

Le fichier `vercel.json` fourni dans le projet configure déjà la redirection nécessaire pour que `/admin` fonctionne correctement après un rechargement de page (sans lui, Vercel renverrait une erreur 404 sur cette route).

## Structure du projet

```
src/
  components/   -> composants réutilisables (Navbar, Modal, RingMark, ImagePlaceholder...)
  sections/     -> une section = un fichier (Hero, Piercings, Shop, Booking, Faq...)
  data/         -> contenu éditable (piercings, produits, FAQ, témoignages, contact)
  hooks/        -> hooks utilitaires (scroll reveal, spotlight souris, données Supabase + fallback)
  lib/          -> client Supabase, types, fonctions CRUD et upload d'images
  admin/        -> espace d'administration (/admin) : login, dashboard, pages Piercings/Boutique
supabase/
  schema.sql    -> script SQL à exécuter une fois dans Supabase (tables, sécurité, storage)
```

Pour modifier un texte, un prix ou une description **sans Supabase configuré**, il suffit d'éditer les fichiers dans `src/data/`. **Avec Supabase configuré**, ces modifications se font depuis `/admin`.
