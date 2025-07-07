# Création quizz perso

Premièrement, vous devez éditer les questions, et leurs choixd de réponses dans src/data/gameData.ts

- Chaque `id` doivent être uniques. 
- Chaque thème, doit avoir des `level` uniques, mais il peut y avoir plusieurs `level` identiques, tant qu'ils sont dans des thèmes différents.
- La `correctAnswer` doit être `0`, `1`, `2` ou `3`, selon la réponse `A`, `B`, `C` et `D`, respectivement.

Si vous souhaitez changer les thèmes, il faut éditer ce bloc de code dans le fichier `src/components/GameGrid.tsx` : 

```ts
const themes = [
  'Pays du monde', 'Cuisine', 'Pixar', 'Bande dessinée', 'Science', 'Vériété française', 'La Réunion'
];
```