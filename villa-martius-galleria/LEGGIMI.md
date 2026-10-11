# Galleria di Villa Martius · stile «Album»

Pagina pronta per il sito https://fladynance.github.io/villa-martius/

## Cosa c'è nel pacchetto

```
galleria.html                  → sostituisce il file galleria.html del sito
assets/img/galleria/           → 60 foto segnaposto (matrimoni-01.jpg … casa-15.jpg)
```

La pagina usa i file che il sito ha già: `assets/css/style.css`, `assets/js/main.js`
e `assets/img/logo.png`. Non bisogna cambiare nient'altro.

## Come metterla online (da iPad, su github.com)

1. Apri il repository `fladynance/villa-martius`.
2. **Pagina**: apri `galleria.html` → tocca la matita (Edit) → seleziona tutto,
   cancella e incolla il contenuto del nuovo `galleria.html` → *Commit changes*.
3. **Cartella delle foto**: entra in `assets/img` → *Add file* → *Create new file* →
   scrivi come nome `galleria/leggimi.txt`, una parola qualsiasi nel testo → *Commit*.
   Così nasce la cartella `assets/img/galleria`.
4. **Foto**: entra in `assets/img/galleria` → *Add file* → *Upload files* →
   scegli le 60 foto del pacchetto → *Commit changes*.
5. Dopo un paio di minuti la pagina è online.

## Come cambiare le foto

- **Il modo più semplice**: carica la tua foto in `assets/img/galleria` con lo stesso
  nome del segnaposto (es. `matrimoni-01.jpg`). GitHub la sostituisce.
- **Didascalie**: in `galleria.html` cerca `var GALLERIE`. Ogni foto è una riga:
  ```js
  { file: 'assets/img/galleria/matrimoni-01.jpg', momento: 'La cerimonia', titolo: 'Il gazebo pronto per il sì' },
  ```
  `momento` è la riga piccola, `titolo` la didascalia in corsivo.
- **Aggiungere una foto**: copia una riga, cambia nome del file e testi.
- **Togliere una foto**: cancella la sua riga.
- **Foto per pagina**: `var FOTO_PER_PAGINA = 6;` (consigliato 6).
- Formato consigliato delle foto: orizzontale 4:3, lato lungo circa 1600 px, JPG.

## Link diretti a una galleria

Si può aprire subito una galleria, per esempio dalla pagina Matrimoni:

- `galleria.html#matrimoni`
- `galleria.html#eventi`
- `galleria.html#riti`
- `galleria.html#casa`
