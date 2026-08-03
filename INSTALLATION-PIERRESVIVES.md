# Raccordement de pierresvives.com à GitHub Pages

## Architecture retenue

- Site : dépôt GitHub `ILoveAlsace/site`
- Adresse GitHub actuelle : `https://ilovealsace.github.io/site/`
- Adresse canonique finale : `https://pierresvives.com/`
- Variante `www` : `https://www.pierresvives.com/`, redirigée automatiquement par GitHub vers le domaine canonique
- DNS : BookMyName (`nsa.bookmyname.com`, `nsb.bookmyname.com`, `nsc.bookmyname.com`)

## 1. Importer cette version dans GitHub

Déposer à la racine du dépôt tous les fichiers de cette archive, notamment :

- `CNAME`
- `index.html`
- `404.html`
- `robots.txt`
- `sitemap.xml`
- `.nojekyll`
- le dossier `assets`

Le fichier `CNAME` doit contenir uniquement :

```text
pierresvives.com
```

## 2. Déclarer le domaine dans GitHub

Dans le dépôt :

1. `Settings`
2. `Pages`
3. Vérifier que la publication utilise `main` et `/ (root)`
4. Dans `Custom domain`, saisir `pierresvives.com`
5. Cliquer sur `Save`

Il est préférable de faire cette déclaration avant la modification DNS.

## 3. Vérifier le domaine dans le compte GitHub

Cette étape est recommandée contre les prises de contrôle de sous-domaines :

1. Ouvrir les paramètres du compte ou de l’organisation GitHub `ILoveAlsace`
2. Ouvrir `Pages`
3. Choisir `Add a domain`
4. Saisir `pierresvives.com`
5. GitHub fournit un nom TXT du type `_github-pages-challenge-ILoveAlsace` et une valeur unique
6. Ajouter ce TXT chez BookMyName
7. Revenir dans GitHub et terminer la vérification

Conserver le TXT après validation.

## 4. Configurer les DNS dans BookMyName

Ne pas modifier les serveurs de noms : ils sont déjà corrects.

Ouvrir :

`GÉRER` → `Personnaliser le contenu de vos DNS` → `pierresvives.com` → `INTERFACE UTILISATEURS AVERTIS`

Créer les enregistrements indiqués dans `DNS-BOOKMYNAME.txt`.

Avant de les créer :

- supprimer les anciens `A` et `AAAA` du domaine racine `@` ;
- supprimer les anciens `A`, `AAAA` ou `CNAME` de `www` ;
- conserver les `MX` et les `TXT` de messagerie ;
- conserver les jetons de validation utiles ;
- ne pas utiliser la redirection web BookMyName.

## 5. Attendre et vérifier

La propagation peut être rapide, mais elle peut durer jusqu’à 24 heures.

Les vérifications attendues sont :

```text
pierresvives.com       A       185.199.108.153
pierresvives.com       A       185.199.109.153
pierresvives.com       A       185.199.110.153
pierresvives.com       A       185.199.111.153
www.pierresvives.com   CNAME   ilovealsace.github.io
```

Les quatre adresses IPv6 doivent également être présentes si elles ont été ajoutées.

## 6. Activer HTTPS

Dans `GitHub → Settings → Pages` :

1. attendre que `DNS check successful` apparaisse ;
2. attendre la délivrance du certificat ;
3. cocher `Enforce HTTPS`.

En présence d’enregistrements `CAA`, au moins l’un d’eux doit autoriser `letsencrypt.org`.

## 7. Vérifier les fichiers publics

Après mise en service, ouvrir :

- `https://pierresvives.com/`
- `https://www.pierresvives.com/`
- `https://pierresvives.com/robots.txt`
- `https://pierresvives.com/sitemap.xml`

Le `www` doit rediriger vers `https://pierresvives.com/`.

## 8. Ajouter le site à Google Search Console

1. Ajouter une propriété de type `Domaine`
2. Saisir `pierresvives.com`
3. Google fournit un enregistrement TXT `google-site-verification=...`
4. Ajouter ce TXT chez BookMyName, au nom `@`
5. Valider la propriété dans Search Console
6. Ouvrir `Sitemaps`
7. Envoyer `sitemap.xml`
8. Ouvrir `Inspection de l’URL`
9. Inspecter `https://pierresvives.com/`
10. Cliquer sur `Demander une indexation`

Conserver le TXT Google après validation.

## 9. Limite actuelle du sitemap

Le site utilise une navigation JavaScript avec des URL contenant `#/...`. Les fragments après `#` ne sont pas des pages Web autonomes pour les moteurs de recherche. Le sitemap référence donc correctement la page canonique et ses images, mais pas les écrans internes comme des URL séparées.

Pour un référencement plus détaillé de chaque établissement, il faudra créer ultérieurement de vraies pages HTML avec des URL telles que :

- `/logis-du-haut-koenigsbourg/`
- `/domaine-du-haut-koenigsbourg/`
- `/chateau-lacour/`

## 10. Ne pas résilier un ancien service trop tôt

Si des e-mails ou un ancien hébergement utilisent encore le domaine, attendre que le site, HTTPS et les e-mails aient été testés avant toute suppression de service.
