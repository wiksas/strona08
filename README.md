# strona08: test ABCD z WDPAI

Test jednokrotnego wyboru z laboratoriów 1-6 przedmiotu WDPAI (Projektowanie aplikacji internetowych, materiały: https://ii.pk.edu.pl/~awidlak/subject/16).

## Uruchomienie

Otwórz `index.html` w przeglądarce (dwuklik wystarczy, nie trzeba serwera ani internetu).

## Co jest w środku

- `js/data/topics.js`: lista działów.
- `js/data/q-css.js`: pozycjonowanie, nakładki, elementy pływające, Flexbox, Grid, Media Queries, `@media print`, podstawy CSS, motywy i WCAG.
- `js/data/q-php.js`: PHP (podstawy, obiektowość, dobre praktyki), formularze, HTTP, walidacja, wyjątki, Xdebug.
- `js/data/q-tools.js`: MVC i Composer, Docker, Git, vibe coding.
- `js/app.js`: logika testu (losowanie, tryb nauki i egzaminu, karta odpowiedzi, wynik, zapis przerwanego testu w `localStorage`).
- `js/theme.js` i skrypt w `<head>`: motyw jasny/ciemny jak w Lab 5.
- `css/style.css`: style ekranu i druku.

## Dodawanie pytań

Dopisz obiekt do odpowiedniego pliku w `js/data`:

```js
{
  id: 'poz-18',            // unikalny
  t: 'poz',                // id działu z topics.js
  q: 'Treść, `kod w linii` w odwrotnych apostrofach',
  code: `opcjonalny blok kodu`,
  a: ['A', 'B', 'C', 'D'], // dokładnie 4 odpowiedzi, kolejność i tak jest losowana
  c: 0,                    // indeks poprawnej odpowiedzi
  why: 'Wyjaśnienie pokazywane po odpowiedzi',
  src: 'Skąd pochodzi pytanie'
}
```

Błędny wpis (zły dział, inna liczba odpowiedzi, powtórzone id) zatrzyma stronę z komunikatem, które pytanie trzeba poprawić.
