# I Love Alsace — site GitHub Pages

Site statique multilingue, sans outil de compilation, conçu pour GitHub Pages.

## Contenu

- Accueil moderne avec menu progressif et trois adresses.
- Pages dédiées au Logis du Haut-Koenigsbourg, au Domaine du Haut-Koenigsbourg et à Château Lacour.
- Sous-navigation légère : les hébergements apparaissent sous forme de cartes et s’ouvrent dans une fenêtre de détail.
- Français, anglais, allemand, espagnol et italien.
- Liens directs vers les trois pages Booking.com.
- Responsive, navigation clavier, métadonnées sociales, `robots.txt` et page `404.html`.

## Publier sur GitHub Pages

1. Créer un dépôt GitHub, par exemple `ilovealsace`.
2. Déposer à la racine tous les fichiers et dossiers de cette archive.
3. Ouvrir **Settings → Pages**.
4. Dans **Build and deployment**, choisir **Deploy from a branch**.
5. Sélectionner la branche `main` et le dossier `/ (root)`.
6. Le site sera publié à une adresse du type `https://UTILISATEUR.github.io/ilovealsace/`.

## Domaine futur

Lorsque `ilovealsace.com` sera acheté :

1. Ajouter le domaine dans **Settings → Pages → Custom domain**.
2. Configurer les DNS chez le registrar selon les valeurs affichées par GitHub.
3. Activer **Enforce HTTPS** après validation DNS.
4. GitHub créera normalement le fichier `CNAME`. Sinon, ajouter à la racine un fichier `CNAME` contenant uniquement `ilovealsace.com`.

## Points à valider avant publication publique

- Remplacer l’adresse e-mail et le téléphone provisoires de la page Contact.
- Compléter les mentions légales : société, forme juridique, siège, SIREN/SIRET, responsable de publication.
- Confirmer l’inventaire exact : les sources publiques consultées affichent 16 unités au Logis, 4 catégories de chambres au Domaine et 4 appartements à Château Lacour, alors qu’un descriptif de Château Lacour évoque 6 appartements.
- Vérifier capacités, couchages et noms dans l’extranet Booking.
- Remplacer les textes reformulés par les textes propriétaires définitifs si une reprise strictement identique est souhaitée.
- Remplacer ou compléter les photos par les fichiers originaux haute définition détenus par l’hébergeur. Les photos incluses ici sont une sélection de travail issue des pages publiques.

## Modifier les contenus

- Textes, traductions, hébergements et liens : `assets/js/data.js`
- Structure et comportement : `assets/js/app.js`
- Design : `assets/css/styles.css`
- Photos : `assets/images/`
