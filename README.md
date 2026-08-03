# PierresVives — site GitHub Pages

Site officiel : https://pierresvives.com/

## Identité
- Marque : PierresVives
- Téléphone : +33 6 10 29 76 33
- E-mail : stephanie@pierresvives.com
- Réservation directe : moteur KE-Booking intégré
- Domaine personnalisé GitHub Pages : pierresvives.com

## Publication
Déposer tout le contenu de ce dossier à la racine du dépôt GitHub Pages.
Le fichier `CNAME` doit contenir uniquement `pierresvives.com`.

## Réservation
- Le bouton principal ouvre la page interne `#/booking`.
- Le moteur KE-Booking est intégré dans la page de réservation.
- Le widget compact est également présent sur l’accueil et la page Contact.
- Les hébergements du Logis disposant d’un identifiant KE-Booking ouvrent leur fiche directe.
- En français, le widget utilise `/fr/`; pour les autres langues du site, il utilise `/en/`.


## Correction de la page Réserver

Le moteur iFrame lourd a été retiré de la page `#/booking`.
La page utilise désormais :
- le widget compact KE-Booking ;
- un bouton de secours vers la centrale de réservation externe ;
- des liens directs vers les hébergements ;
- des cartes vers les trois établissements ;
- les coordonnées directes PierresVives.

Le paramètre de version ajouté aux fichiers CSS et JavaScript évite que le navigateur conserve l’ancienne page en cache.
