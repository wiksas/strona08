// Pytania z zakresu CSS. Pole c to indeks poprawnej odpowiedzi w tablicy a.
(function () {
  const POS = 'Lab 5: CSS - pozycjonowanie (PDF)';
  const LAB3 = 'Lab 3: CSS od zmiennych do responsywnego interfejsu';
  const SCOPE = 'Lista zagadnień do opanowania';

  window.WDPAI_QUESTIONS.push(
    // ---------- Pozycjonowanie ----------
    {
      id: 'poz-01', t: 'poz',
      q: 'Względem czego liczone jest położenie elementu z `position: absolute`?',
      a: [
        'Względem najbliższego przodka, który ma position inne niż static',
        'Zawsze względem okna przeglądarki, niezależnie od przodków',
        'Względem swojego normalnego miejsca w przepływie dokumentu',
        'Względem poprzedzającego go elementu rodzeństwa'
      ],
      c: 0,
      why: 'Blokiem obejmującym jest najbliższy przodek pozycjonowany (relative, absolute, fixed lub sticky). Dopiero gdy takiego nie ma, element ustawia się względem początkowego bloku obejmującego, czyli w praktyce strony.',
      src: POS
    },
    {
      id: 'poz-02', t: 'poz',
      q: 'Co zrobi przeglądarka z poniższym elementem?',
      code: `.box {
  position: relative;
  top: 20px;
  left: 20px;
}`,
      a: [
        'Przesunie go o 20px w górę i w lewo względem okna',
        'Przesunie go o 20px w dół i w prawo względem jego normalnego położenia, a pierwotne miejsce zostanie zarezerwowane',
        'Wyjmie go z przepływu, więc kolejne elementy zajmą jego miejsce',
        'Zignoruje top i left, bo działają one tylko z position: absolute'
      ],
      c: 1,
      why: 'Pozycjonowanie relatywne przesuwa element względem jego położenia spoczynkowego. top: 20px odsuwa go od górnej krawędzi tego miejsca (czyli w dół), left: 20px w prawo. Element nadal zajmuje swoje pierwotne miejsce w układzie.',
      src: POS
    },
    {
      id: 'poz-03', t: 'poz',
      q: 'Jaka jest domyślna wartość właściwości `position`?',
      a: ['relative', 'static', 'absolute', 'initial-flow'],
      c: 1,
      why: 'Domyślnie każdy element ma position: static, czyli zwykłe ułożenie w przepływie dokumentu. Materiały opisują static jako sposób na przywrócenie normalnego pozycjonowania.',
      src: POS
    },
    {
      id: 'poz-04', t: 'poz',
      q: 'Element ma `position: static; top: 50px;`. Co się stanie?',
      a: [
        'Element przesunie się o 50px w dół',
        'Element przesunie się o 50px, ale tylko po przewinięciu strony',
        'Właściwość top zostanie zignorowana',
        'Przeglądarka potraktuje element jak relative'
      ],
      c: 2,
      why: 'Właściwości top, right, bottom i left działają tylko na elementy pozycjonowane. Dla static nie mają żadnego efektu.',
      src: POS
    },
    {
      id: 'poz-05', t: 'poz',
      q: 'Czym `position: fixed` różni się od `position: absolute`?',
      a: [
        'fixed liczy położenie względem okna przeglądarki i element nie przesuwa się podczas przewijania',
        'fixed pozostawia element w przepływie, a absolute go z niego usuwa',
        'fixed działa tylko wewnątrz rodzica z position: relative',
        'fixed nie obsługuje właściwości z-index'
      ],
      c: 0,
      why: 'Według materiałów pozycjonowanie ustalone działa jak absolutne, ale pozycja jest zawsze liczona względem krawędzi okna, a element stoi w miejscu podczas przewijania strony.',
      src: POS
    },
    {
      id: 'poz-06', t: 'poz',
      q: 'Element z `position: absolute; width: 200px;` ma jednocześnie `left: 10px` i `right: 10px`. Która wartość zadecyduje o położeniu (tekst od lewej do prawej)?',
      a: [
        'right, bo jest zapisane później',
        'Żadna, przeglądarka wyśrodkuje element',
        'left, bo left ma pierwszeństwo przed right',
        'Obie, element rozciągnie się mimo width: 200px'
      ],
      c: 2,
      why: 'Materiały: „Parametr left ma pierwszeństwo przed right, zaś top ma pierwszeństwo przed bottom.” Przy ustalonej szerokości nie da się spełnić obu, więc right jest ignorowane.',
      src: POS
    },
    {
      id: 'poz-07', t: 'poz',
      q: 'Element ma `position: fixed; height: 60px; top: 0; bottom: 0;`. Gdzie się znajdzie?',
      a: [
        'Przy dolnej krawędzi okna, bo bottom wygrywa',
        'Przy górnej krawędzi okna, bo top ma pierwszeństwo przed bottom',
        'Rozciągnie się na całą wysokość okna',
        'Nie pojawi się, bo wartości są sprzeczne'
      ],
      c: 1,
      why: 'Przy ustalonej wysokości top i bottom są sprzeczne. Zgodnie z regułą z materiałów top ma pierwszeństwo przed bottom.',
      src: POS
    },
    {
      id: 'poz-08', t: 'poz',
      q: 'Co się stanie, jeśli elementowi z `position: absolute` nadasz `left: -40px`?',
      a: [
        'Przeglądarka zamieni wartość na 0',
        'Element przesunie się o 40px w prawo',
        'Deklaracja jest błędna i zostanie pominięta',
        'Element może częściowo wyjść poza lewą krawędź bloku obejmującego lub strony'
      ],
      c: 3,
      why: 'Ujemne wartości są dozwolone. Materiały: element znajdzie się częściowo lub całkowicie poza obrębem strony albo wyjdzie poza krawędzie bloku obejmującego.',
      src: POS
    },
    {
      id: 'poz-09', t: 'poz',
      q: 'Etykieta `.badge` ma `position: absolute; top: 0; right: 0;`, ale ląduje w rogu całej strony zamiast w rogu karty `.card`. Jak to naprawić?',
      a: [
        'Dodać .card { position: relative; }',
        'Dodać .badge { z-index: 10; }',
        'Dodać .card { display: flex; }',
        'Zmienić .badge na position: static'
      ],
      c: 0,
      why: 'Absolutny element szuka najbliższego pozycjonowanego przodka. Gdy karta dostanie position: relative (bez przesunięć), staje się blokiem obejmującym etykiety, a sama zostaje w miejscu.',
      src: POS
    },
    {
      id: 'poz-10', t: 'poz',
      q: 'Dlaczego `z-index: 999` nie zmienia kolejności nakładania zwykłego bloku z `position: static`?',
      a: [
        'Bo maksymalna wartość z-index to 100',
        'Bo z-index działa tylko dla elementów z display: inline',
        'Bo z-index nie działa na elementy niepozycjonowane (wyjątkiem są dzieci kontenera flex i grid)',
        'Bo z-index trzeba podawać w pikselach'
      ],
      c: 2,
      why: 'z-index ustala kolejność na osi Z dla elementów pozycjonowanych oraz elementów flex i grid. Dla statycznego bloku w normalnym przepływie nie ma znaczenia.',
      src: POS
    },
    {
      id: 'poz-11', t: 'poz',
      q: 'Rodzic A ma `position: relative; z-index: 1`, a jego dziecko `z-index: 9999`. Element B (rodzeństwo A) ma `position: relative; z-index: 2`. Kto będzie na wierzchu, gdy dziecko A i B się nałożą?',
      a: [
        'Dziecko A, bo 9999 > 2',
        'B, bo dziecko A rywalizuje tylko wewnątrz kontekstu nakładania rodzica A, który ma z-index 1',
        'Ten, który jest później w kodzie HTML',
        'Przeglądarka wyświetli oba półprzezroczyste'
      ],
      c: 1,
      why: 'Pozycjonowany element z z-index tworzy kontekst nakładania (stacking context). Dzieci porównują się tylko między sobą, a cały kontekst A jest porównywany z B jako z-index 1 kontra 2.',
      src: POS
    },
    {
      id: 'poz-12', t: 'poz',
      q: 'Jak zachowuje się element z `position: sticky; top: 0;`?',
      a: [
        'Od początku jest przyklejony do góry okna jak fixed',
        'Zachowuje się jak absolute względem body',
        'Jest w normalnym przepływie, a gdy przewijanie dojdzie do progu top: 0, przykleja się, ale tylko w obrębie swojego rodzica',
        'Przykleja się do najbliższego elementu z position: relative'
      ],
      c: 2,
      why: 'sticky to połączenie relative i fixed: element zajmuje swoje miejsce w przepływie, a po przekroczeniu progu (np. top: 0) zostaje przyklejony, dopóki jego rodzic jest widoczny.',
      src: SCOPE
    },
    {
      id: 'poz-13', t: 'poz',
      q: 'Nagłówek tabeli ma `position: sticky`, ale wcale się nie przykleja. Co jest najczęstszą przyczyną?',
      a: [
        'Nie podano progu: top, bottom, left ani right',
        'Element ma ustawiony kolor tła',
        'Strona ma mniej niż 100 elementów',
        'Brakuje display: block na elemencie html'
      ],
      c: 0,
      why: 'Bez progu przeglądarka nie wie, przy której krawędzi ma przykleić element, więc zachowuje się on jak relative. Drugą częstą przyczyną jest przodek z overflow: hidden.',
      src: SCOPE
    },
    {
      id: 'poz-14', t: 'poz',
      q: 'W przykładzie z materiałów div `.absolute` (top: 20px; left: 120px) stoi w kodzie przed `#yellow` (bez pozycjonowania). Co dzieje się z `#yellow`?',
      a: [
        'Zostaje przesunięty o 20px w dół razem z .absolute',
        'Znika pod .absolute i nie da się go zobaczyć',
        'Zajmuje miejsce, które zająłby .absolute, bo element absolutny wypada z normalnego przepływu',
        'Dziedziczy left: 120px'
      ],
      c: 2,
      why: 'Element absolutny nie rezerwuje miejsca w układzie. Kolejne elementy w przepływie przesuwają się tak, jakby go nie było.',
      src: POS
    },
    {
      id: 'poz-15', t: 'poz',
      q: 'Jaki jest skrót dla `top: 0; right: 0; bottom: 0; left: 0;`?',
      a: ['position: full', 'inset: 0', 'margin: 0 auto', 'place-items: 0'],
      c: 1,
      why: 'inset to właściwość skrótowa dla top, right, bottom i left. inset: 0 na elemencie absolutnym rozciąga go na cały blok obejmujący, co jest typowe dla nakładek.',
      src: SCOPE
    },
    {
      id: 'poz-16', t: 'poz',
      q: 'Element z `position: fixed` przestał trzymać się okna i przewija się razem z kontenerem. Najbardziej prawdopodobna przyczyna?',
      a: [
        'Kontener ma ustawione padding',
        'Któryś przodek ma właściwość transform (albo filter), co tworzy nowy blok obejmujący',
        'Element ma za mały z-index',
        'Przeglądarka nie wspiera fixed na ekranach dotykowych'
      ],
      c: 1,
      why: 'Przodek z transform, filter lub perspective staje się blokiem obejmującym także dla elementów fixed. Wtedy fixed zachowuje się podobnie do absolute względem tego przodka.',
      src: SCOPE
    },
    {
      id: 'poz-17', t: 'poz',
      q: 'Co dzieje się z treścią obok elementu przesuniętego przez `position: relative`?',
      a: [
        'Przesuwa się razem z nim',
        'Zostaje na swoim miejscu, a przesunięty element może ją przykryć',
        'Zostaje automatycznie odsunięta, żeby nic się nie nakładało',
        'Zostaje ukryta'
      ],
      c: 1,
      why: 'Materiały: jeśli w miejscu docelowym znajdowało się coś innego (tekst, grafika), zostanie to przykryte przez pozycjonowany element. Sąsiedzi nie reagują na przesunięcie.',
      src: POS
    },

    // ---------- Nakładki na zdjęcia ----------
    {
      id: 'ov-01', t: 'overlay',
      q: 'Chcesz umieścić etykietę „Nowość” w lewym górnym rogu zdjęcia produktu. Który zestaw reguł jest poprawny?',
      a: [
        '.photo { position: absolute; } .badge { position: relative; top: 8px; }',
        '.photo { position: relative; } .badge { position: absolute; top: 8px; left: 8px; }',
        '.photo { display: flex; } .badge { z-index: 10; }',
        '.photo { position: fixed; } .badge { position: fixed; top: 8px; left: 8px; }'
      ],
      c: 1,
      why: 'Wzorzec nakładki: kontener zdjęcia dostaje position: relative (staje się blokiem obejmującym), a etykieta position: absolute z przesunięciami od jego krawędzi.',
      src: SCOPE
    },
    {
      id: 'ov-02', t: 'overlay',
      q: 'Dlaczego do przyciemniającej nakładki z białym tekstem lepiej użyć `background: rgb(0 0 0 / 60%)` niż `opacity: 0.6`?',
      a: [
        'opacity nie działa na elementach absolutnych',
        'rgb() z kanałem alfa jest szybsze w renderowaniu',
        'opacity robi półprzezroczysty cały element razem z tekstem, a kolor z alfą dotyczy tylko tła',
        'opacity działa tylko w trybie ciemnym'
      ],
      c: 2,
      why: 'opacity dotyczy elementu i wszystkich jego dzieci, więc tekst też stałby się przezroczysty. Przezroczystość w kolorze tła przyciemnia tylko tło.',
      src: SCOPE
    },
    {
      id: 'ov-03', t: 'overlay',
      q: 'Nakładka zbudowana na `.card::after` nie pojawia się na ekranie. Czego najczęściej brakuje?',
      a: [
        'Właściwości content, np. content: ""',
        'Atrybutu alt na pseudoelemencie',
        'Właściwości display: none',
        'Selektora :hover'
      ],
      c: 0,
      why: 'Pseudoelementy ::before i ::after są generowane tylko wtedy, gdy mają ustawioną właściwość content. Dla pustej warstwy wystarczy content: "".',
      src: SCOPE
    },
    {
      id: 'ov-04', t: 'overlay',
      q: 'Podpis na zdjęciu ma się pokazywać po najechaniu myszką. Które rozwiązanie działa także dla osób używających klawiatury?',
      a: [
        '.caption:active { opacity: 1; }',
        '.photo:hover .caption { display: block; } i nic więcej',
        '.photo:hover .caption, .photo:focus-within .caption { opacity: 1; }',
        '@media print { .caption { opacity: 1; } }'
      ],
      c: 2,
      why: ':focus-within dopasowuje kontener, gdy fokus jest na którymś jego potomku (np. linku w karcie). Sam :hover jest niedostępny z klawiatury i na wielu ekranach dotykowych.',
      src: SCOPE
    },
    {
      id: 'ov-05', t: 'overlay',
      q: 'Przezroczysta nakładka leży nad zdjęciem z linkiem i blokuje kliknięcia. Która właściwość przepuści kliknięcia do elementu pod spodem?',
      a: ['pointer-events: none', 'visibility: hidden', 'z-index: -1 na linku', 'cursor: pointer'],
      c: 0,
      why: 'pointer-events: none sprawia, że element nie reaguje na zdarzenia myszy, a kliknięcie trafia do tego, co jest pod nim. Nakładka nadal jest widoczna.',
      src: SCOPE
    },
    {
      id: 'ov-06', t: 'overlay',
      q: 'Co robi `object-fit: cover` na obrazku o stałej wysokości w karcie?',
      a: [
        'Rozciąga obrazek do wymiarów kontenera, zniekształcając proporcje',
        'Wypełnia cały obszar z zachowaniem proporcji i przycina to, co wystaje',
        'Zmniejsza obrazek tak, żeby był cały widoczny, zostawiając puste pasy',
        'Ukrywa obrazek, jeśli jest większy od kontenera'
      ],
      c: 1,
      why: 'cover zachowuje proporcje i wypełnia cały obszar, przycinając nadmiar. contain pokazałby cały obraz z pustymi pasami, a fill zniekształciłby proporcje.',
      src: SCOPE
    },
    {
      id: 'ov-07', t: 'overlay',
      q: 'Pod zdjęciem w karcie widać kilka pikseli przerwy, przez co nakładka nie pokrywa dołu obrazka. Typowa przyczyna i poprawka?',
      a: [
        'Zdjęcie ma za małą rozdzielczość, trzeba podmienić plik',
        'Domyślny margin na img, trzeba dodać margin: 0',
        'img jest elementem inline i rezerwuje miejsce na linię tekstu, pomaga display: block',
        'Brakuje z-index na nakładce'
      ],
      c: 2,
      why: 'Obrazek jest domyślnie inline i siada na linii bazowej tekstu, zostawiając miejsce na „ogonki” liter. display: block (lub vertical-align: middle) usuwa przerwę.',
      src: SCOPE
    },
    {
      id: 'ov-08', t: 'overlay',
      q: 'Komunikat „Zapisano zmiany” ma pojawić się w rogu ekranu. Które rozwiązanie spełnia wymagania wizualne i dostępności?',
      a: [
        'position: fixed w rogu oraz role="status" (aria-live), żeby czytnik ekranu go odczytał',
        'position: static i duża czcionka',
        'alert() z JavaScriptu na każde zapisanie',
        'Obrazek PNG z napisem, wstawiony przez background-image'
      ],
      c: 0,
      why: 'fixed trzyma komunikat w rogu niezależnie od przewijania, a region aria-live (role="status") sprawia, że technologie asystujące ogłoszą zmianę treści.',
      src: SCOPE
    },
    {
      id: 'ov-09', t: 'overlay',
      q: 'Biały tekst leży bezpośrednio na zdjęciu, które ma jasne i ciemne fragmenty. Jak zapewnić czytelność zgodną z WCAG?',
      a: [
        'Dodać text-transform: uppercase',
        'Pod tekstem dać przyciemniającą warstwę lub gradient i sprawdzić kontrast w najjaśniejszym miejscu',
        'Zmniejszyć tekst, żeby mniej zasłaniał zdjęcie',
        'Wystarczy, że kontrast jest dobry w jednym punkcie'
      ],
      c: 1,
      why: 'Kontrast trzeba zapewnić na całym obszarze, przez który przechodzi tekst. Przyciemnienie pod tekstem stabilizuje tło. Dla zwykłego tekstu wymagane jest co najmniej 4.5:1.',
      src: SCOPE
    },
    {
      id: 'ov-10', t: 'overlay',
      q: 'Ukośna wstęga „Promocja” wystaje poza zaokrągloną kartę. Co przytnie ją do krawędzi karty?',
      a: [
        'overflow: hidden na karcie',
        'clip: auto na wstędze',
        'display: inline-block na karcie',
        'z-index: 0 na wstędze'
      ],
      c: 0,
      why: 'overflow: hidden na kontenerze (który ma position: relative) obcina wszystko, co wystaje poza jego obszar, także z zachowaniem border-radius.',
      src: SCOPE
    },
    {
      id: 'ov-11', t: 'overlay',
      q: 'Zdjęcie produktu jest treścią strony, a etykieta „-20%” ma być na nim widoczna. Jak to zbudować?',
      a: [
        'Wkleić etykietę na stałe do pliku zdjęcia w programie graficznym',
        'Ustawić zdjęcie jako background-image sekcji, bez tekstu w HTML',
        '<img> z opisowym alt oraz etykieta jako tekst HTML nałożony przez pozycjonowanie',
        'Wpisać tekst etykiety w atrybut title obrazka'
      ],
      c: 2,
      why: 'Treściowe zdjęcie powinno być elementem <img> z alt. Etykieta jako tekst w HTML jest czytelna dla czytników ekranu, wyszukiwarek i łatwa do zmiany w CSS.',
      src: SCOPE
    },

    // ---------- Elementy pływające ----------
    {
      id: 'fl-01', t: 'floating',
      q: 'Okrągły przycisk „Dodaj” ma być zawsze widoczny w prawym dolnym rogu ekranu, także podczas przewijania. Którą regułę wybierzesz?',
      a: [
        'position: absolute; right: 1rem; bottom: 1rem;',
        'position: fixed; right: 1rem; bottom: 1rem;',
        'float: right; margin-bottom: 1rem;',
        'position: relative; right: 1rem; bottom: 1rem;'
      ],
      c: 1,
      why: 'fixed liczy położenie względem okna i nie przewija się z treścią. absolute przewijałby się razem ze stroną.',
      src: POS
    },
    {
      id: 'fl-02', t: 'floating',
      q: 'W layoucie z materiałów `#header` ma `position: fixed; height: 50px;`. Po co pusty element `#inlineheader` o wysokości 50px?',
      a: [
        'Rezerwuje miejsce, które nagłówek zwolnił, wychodząc z przepływu, żeby treść nie chowała się pod nim',
        'Jest wymagany przez przeglądarkę dla każdego elementu fixed',
        'Służy jako cień pod nagłówkiem',
        'Przechowuje tytuł strony dla wyszukiwarek'
      ],
      c: 0,
      why: 'Element fixed nie zajmuje miejsca w układzie, więc pierwsza sekcja wjechałaby pod nagłówek. Odstęp o tej samej wysokości (albo padding-top na body) przesuwa treść w dół.',
      src: POS
    },
    {
      id: 'fl-03', t: 'floating',
      q: 'Dlaczego w tym samym layoucie nagłówek fixed ma `z-index: 999`?',
      a: [
        'Żeby był wyświetlany nad przewijaną pod nim treścią',
        'Żeby ładował się jako pierwszy',
        'Żeby miał 999 pikseli wysokości',
        'Bo bez tego position: fixed nie działa'
      ],
      c: 0,
      why: 'Treść przewija się pod nagłówkiem. Wysoki z-index gwarantuje, że pozycjonowane elementy treści (np. section z position: relative) nie przykryją nagłówka.',
      src: POS
    },
    {
      id: 'fl-04', t: 'floating',
      q: 'W menu z materiałów `li` mają `float: left`, a `ul` ma `overflow: hidden`. Do czego służy overflow: hidden na liście?',
      a: [
        'Ukrywa elementy menu, które się nie mieszczą',
        'Sprawia, że ul obejmuje pływające elementy li, dzięki czemu ma wysokość i widać jego tło',
        'Wyłącza przewijanie strony',
        'Usuwa kropki listy'
      ],
      c: 1,
      why: 'Rodzic zawierający tylko elementy float ma wysokość 0. overflow inny niż visible tworzy nowy kontekst formatowania, więc ul „zamyka” w sobie floaty i tło #333 staje się widoczne.',
      src: POS
    },
    {
      id: 'fl-05', t: 'floating',
      q: 'Po co w layoucie z materiałów stopka ma `clear: both`?',
      a: [
        'Żeby wyczyścić jej kolor tła',
        'Żeby usunąć marginesy',
        'Żeby ułożyła się pod pływającymi elementami (nav z float: left), a nie obok nich',
        'Żeby była zawsze na dole okna'
      ],
      c: 2,
      why: 'clear: both każe elementowi zejść poniżej wszystkich wcześniejszych floatów z lewej i prawej strony.',
      src: POS
    },
    {
      id: 'fl-06', t: 'floating',
      q: 'Menu ma stać w normalnym miejscu pod banerem, a gdy dojedziesz do niego przewijaniem, ma zostać przyklejone do góry ekranu. Co wybierzesz?',
      a: ['position: fixed; top: 0;', 'position: sticky; top: 0;', 'position: absolute; top: 0;', 'float: top;'],
      c: 1,
      why: 'sticky trzyma element w przepływie do momentu osiągnięcia progu, a potem go przykleja. fixed od razu wyjąłby menu z przepływu i trzymał w górze okna.',
      src: SCOPE
    },
    {
      id: 'fl-07', t: 'floating',
      q: 'Dlaczego w nawigacji z materiałów linki mają `li a { display: block; padding: 14px 16px; }`?',
      a: [
        'Żeby cały obszar z paddingiem był klikalny i link przyjął pionowy padding',
        'Żeby linki ułożyły się jeden pod drugim',
        'Żeby usunąć podkreślenie',
        'Bo bez tego linki nie reagują na :hover'
      ],
      c: 0,
      why: 'Element inline nie rozpycha linii pionowym paddingiem. Jako block link wypełnia cały kafelek menu, więc trafienie w niego jest łatwiejsze.',
      src: POS
    },
    {
      id: 'fl-08', t: 'floating',
      q: 'Co oznacza selektor `li a:hover:not(.active)`?',
      a: [
        'Link najechany myszką, który nie ma klasy active',
        'Link z klasą active, gdy nie jest najechany',
        'Wszystkie linki oprócz pierwszego',
        'Elementy li bez linków'
      ],
      c: 0,
      why: ':not(.active) wyklucza element z klasą active. Dzięki temu aktywna pozycja menu zachowuje swój kolor po najechaniu.',
      src: POS
    },
    {
      id: 'fl-09', t: 'floating',
      q: 'W Lab 5 przełącznik motywu ma `position: fixed; top: 1rem; right: 1rem`. Co zalecają materiały, gdy przeniesiesz go do istniejącej nawigacji?',
      a: [
        'Zwiększyć z-index do 9999',
        'Usunąć position: fixed, top i right, a położenie kontrolować układem nawigacji',
        'Zmienić fixed na absolute',
        'Zostawić bez zmian'
      ],
      c: 1,
      why: 'Pływający przycisk ma sens, gdy nie ma nawigacji. W nawigacji jego miejsce wyznacza layout (np. flex), a fixed powodowałby nakładanie się na inne elementy.',
      src: 'Lab 5: Theme data'
    },
    {
      id: 'fl-10', t: 'floating',
      q: 'Dlaczego przełącznik motywu z Lab 5 ma wymiary 44px × 44px?',
      a: [
        'To minimalny wygodny rozmiar celu dotykowego',
        'Taki jest rozmiar ikony Font Awesome',
        'Mniejsze elementy fixed są ignorowane przez przeglądarkę',
        'Wymaga tego border-radius: 50%'
      ],
      c: 0,
      why: 'Około 44 px to przyjęte minimum dla celów dotykowych, żeby przycisk dało się trafić palcem.',
      src: 'Lab 5: Theme data'
    },
    {
      id: 'fl-11', t: 'floating',
      q: 'Po kliknięciu linku do `#kontakt` nagłówek fixed zasłania tytuł sekcji. Która właściwość to rozwiązuje?',
      a: [
        'scroll-padding-top na elemencie html',
        'overflow: scroll na body',
        'position: sticky na sekcji',
        'z-index: -1 na nagłówku'
      ],
      c: 0,
      why: 'scroll-padding-top (np. równe wysokości nagłówka) mówi przeglądarce, ile miejsca zostawić u góry przy przewijaniu do kotwicy.',
      src: SCOPE
    },

    // ---------- Flexbox ----------
    {
      id: 'fx-01', t: 'flex',
      q: 'Co się dzieje z dziećmi elementu po ustawieniu mu `display: flex`?',
      a: [
        'Stają się elementami flex i domyślnie układają się w rzędzie',
        'Układają się jeden pod drugim',
        'Dostają position: absolute',
        'Zostają rozciągnięte na całą szerokość ekranu'
      ],
      c: 0,
      why: 'Domyślnie flex-direction: row, więc elementy flex stoją obok siebie wzdłuż osi poziomej.',
      src: LAB3
    },
    {
      id: 'fx-02', t: 'flex',
      q: 'Wzdłuż której osi działa `justify-content`, a wzdłuż której `align-items`?',
      a: [
        'justify-content zawsze poziomo, align-items zawsze pionowo',
        'justify-content wzdłuż osi głównej, align-items wzdłuż osi poprzecznej',
        'Obie wzdłuż osi głównej',
        'justify-content wzdłuż osi poprzecznej, align-items wzdłuż głównej'
      ],
      c: 1,
      why: 'Osie zależą od flex-direction. Przy row główna jest pozioma, przy column pionowa. justify-content zawsze dotyczy głównej, align-items poprzecznej.',
      src: LAB3
    },
    {
      id: 'fx-03', t: 'flex',
      q: 'Kontener ma `display: flex; flex-direction: column; height: 100vh;`. Która właściwość wyśrodkuje dzieci w pionie?',
      a: ['align-items: center', 'justify-content: center', 'vertical-align: middle', 'text-align: center'],
      c: 1,
      why: 'Przy flex-direction: column oś główna jest pionowa, więc pionowe wyśrodkowanie robi justify-content. align-items: center wyśrodkowałoby w poziomie.',
      src: LAB3
    },
    {
      id: 'fx-04', t: 'flex',
      q: 'Która kombinacja wyśrodkuje jeden element w kontenerze w obu osiach?',
      a: [
        'display: flex; justify-content: center; align-items: center;',
        'display: flex; text-align: center;',
        'display: block; margin: center;',
        'display: flex; flex-wrap: center;'
      ],
      c: 0,
      why: 'justify-content centruje na osi głównej, align-items na poprzecznej. Razem dają środek kontenera.',
      src: LAB3
    },
    {
      id: 'fx-05', t: 'flex',
      q: 'Masz 8 kart w kontenerze flex. Zamiast się ściskać, mają przechodzić do kolejnego wiersza. Co dodasz?',
      a: ['flex-direction: column', 'flex-wrap: wrap', 'overflow: auto', 'align-content: stretch'],
      c: 1,
      why: 'Domyślnie flex-wrap: nowrap, więc wszystkie elementy są w jednej linii i się kurczą. wrap pozwala przenieść je do następnej.',
      src: LAB3
    },
    {
      id: 'fx-06', t: 'flex',
      q: 'Jaka jest zaleta `gap: 1rem` w kontenerze flex w porównaniu z marginesami na kartach?',
      a: [
        'Odstęp jest tylko między elementami, bez dodatkowego miejsca przy krawędziach kontenera',
        'gap działa także na elementach poza kontenerem',
        'gap automatycznie zmienia kolejność elementów',
        'gap ustawia też padding kart'
      ],
      c: 0,
      why: 'gap dodaje odstęp wyłącznie między elementami (w rzędach i kolumnach). Margines na każdej karcie dodałby też miejsce na brzegach i trzeba by go kompensować.',
      src: LAB3
    },
    {
      id: 'fx-07', t: 'flex',
      q: 'Co oznacza `flex: 1 1 250px` na karcie?',
      a: [
        'Karta ma stałe 250px i nigdy się nie zmienia',
        'flex-grow: 1, flex-shrink: 1, flex-basis: 250px: startuje od 250px, może rosnąć i się kurczyć',
        'Karta zajmie 1/250 szerokości',
        'Margines 1px, padding 1px, szerokość 250px'
      ],
      c: 1,
      why: 'Skrót flex to kolejno flex-grow, flex-shrink, flex-basis. Z flex-wrap: wrap daje to responsywną siatkę kart bez media queries.',
      src: SCOPE
    },
    {
      id: 'fx-08', t: 'flex',
      q: 'Karty w jednym rzędzie flex mają różną ilość tekstu, a mimo to są równej wysokości. Dlaczego?',
      a: [
        'Bo domyślnie align-items: stretch rozciąga elementy na wysokość linii',
        'Bo przeglądarka przycina dłuższy tekst',
        'Bo flex zawsze ustawia height: 100px',
        'To przypadek, trzeba ustawić wysokość ręcznie'
      ],
      c: 0,
      why: 'Domyślna wartość align-items to stretch, więc elementy w tej samej linii wyrównują się do najwyższego.',
      src: SCOPE
    },
    {
      id: 'fx-09', t: 'flex',
      q: 'W kartach o równej wysokości przycisk „Szczegóły” ma zawsze stać przy dolnej krawędzi karty. Jak to zrobić?',
      a: [
        'Karta: display: flex; flex-direction: column; przycisk: margin-top: auto',
        'Przycisk: position: fixed; bottom: 0',
        'Karta: text-align: bottom',
        'Przycisk: float: bottom'
      ],
      c: 0,
      why: 'W kolumnowym flexie margin-top: auto zabiera całe wolne miejsce nad przyciskiem i dosuwa go do dołu karty.',
      src: SCOPE
    },
    {
      id: 'fx-10', t: 'flex',
      q: 'Co daje `justify-content: space-between`?',
      a: [
        'Równe odstępy także przed pierwszym i za ostatnim elementem',
        'Pierwszy i ostatni element przy krawędziach, a wolne miejsce równo między elementami',
        'Wszystkie elementy zbite w środku',
        'Elementy w odwrotnej kolejności'
      ],
      c: 1,
      why: 'space-between nie zostawia miejsca na brzegach. space-around i space-evenly dodają odstęp również przy krawędziach.',
      src: LAB3
    },
    {
      id: 'fx-11', t: 'flex',
      q: 'Właściwość `order: -1` na trzeciej karcie...',
      a: [
        'zmienia kolejność wizualną (karta będzie pierwsza), ale nie zmienia kolejności w HTML ani kolejności tabulacji',
        'usuwa kartę z układu',
        'przenosi kartę na koniec w HTML',
        'działa tylko z position: absolute'
      ],
      c: 0,
      why: 'order zmienia tylko kolejność wyświetlania elementów flex. Czytniki ekranu i klawisz Tab nadal idą według kodu, więc nie należy tym zmieniać sensu treści.',
      src: SCOPE
    },
    {
      id: 'fx-12', t: 'flex',
      q: 'Kontener ma `align-items: flex-start`, a jeden element ma być wyśrodkowany w osi poprzecznej. Co ustawisz na tym elemencie?',
      a: ['justify-self: center', 'align-self: center', 'order: center', 'margin: 0'],
      c: 1,
      why: 'align-self nadpisuje align-items dla pojedynczego elementu flex.',
      src: SCOPE
    },
    {
      id: 'fx-13', t: 'flex',
      q: 'Element A ma `flex-grow: 2`, element B `flex-grow: 1`. Jak podzielą wolne miejsce w kontenerze?',
      a: [
        'A zajmie całe wolne miejsce',
        'Po równo',
        'W proporcji 2:1, A dostanie dwie części wolnego miejsca, B jedną',
        'A będzie dokładnie dwa razy szerszy od B, niezależnie od treści'
      ],
      c: 2,
      why: 'flex-grow dzieli wolne miejsce (to, co zostaje po flex-basis). Końcowa szerokość A nie musi być dwukrotnością B, bo każdy startuje od swojej bazy.',
      src: SCOPE
    },
    {
      id: 'fx-14', t: 'flex',
      q: 'Długi adres URL w elemencie flex rozpycha go i psuje układ kart na telefonie. Co pomoże?',
      a: [
        'min-width: 0 na elemencie flex oraz overflow-wrap: anywhere na tekście',
        'flex-wrap: nowrap na kontenerze',
        'display: inline na elemencie',
        'z-index: 1 na tekście'
      ],
      c: 0,
      why: 'Elementy flex mają domyślnie min-width: auto, czyli nie skurczą się poniżej najdłuższego słowa. min-width: 0 pozwala im się zwęzić, a overflow-wrap łamie długi ciąg.',
      src: SCOPE
    },
    {
      id: 'fx-15', t: 'flex',
      q: 'Kiedy według Lab 3 lepiej sięgnąć po Flexbox, a kiedy po Grid?',
      a: [
        'Flexbox do jednego kierunku (rząd przycisków, menu), Grid gdy kontrolujesz jednocześnie wiersze i kolumny',
        'Flexbox tylko na telefonach, Grid tylko na komputerach',
        'Flexbox do tekstu, Grid do obrazków',
        'Nie ma różnicy, Grid to nowsza nazwa Flexboxa'
      ],
      c: 0,
      why: 'Lab 3: Flexbox jest wygodny dla jednego kierunku, Grid sprawdza się, gdy kontrolujesz jednocześnie wiersze i kolumny.',
      src: LAB3
    },
    {
      id: 'fx-16', t: 'flex',
      q: 'Jakie trzy pytania radzi zadać sobie Lab 3, gdy utkniesz w Flexbox Froggy?',
      a: [
        'Kto jest kontenerem, jaki jest główny kierunek i gdzie powinny trafić elementy',
        'Jaki jest kolor, rozmiar i czcionka',
        'Ile jest elementów, jaka jest ich szerokość i jaki jest margines',
        'Czy jest JavaScript, czy jest jQuery i czy jest Bootstrap'
      ],
      c: 0,
      why: 'Materiał podsumowuje myślenie o Flexboxie trzema pytaniami: kontener, kierunek główny, docelowe położenie elementów.',
      src: LAB3
    },

    // ---------- Grid ----------
    {
      id: 'gr-01', t: 'grid',
      q: 'Co tworzy `grid-template-columns: repeat(4, 1fr);`?',
      a: [
        '4 wiersze o równej wysokości',
        '4 kolumny, każda zajmuje równą część wolnej szerokości',
        '1 kolumnę o szerokości 4fr',
        '4 kolumny po 1px'
      ],
      c: 1,
      why: 'repeat(4, 1fr) to skrót od 1fr 1fr 1fr 1fr. Jednostka fr oznacza część wolnego miejsca w kontenerze grid.',
      src: POS
    },
    {
      id: 'gr-02', t: 'grid',
      q: 'Element ma `grid-column: 1 / 3;`. Ile kolumn zajmie?',
      a: ['3 kolumny', '2 kolumny (od linii 1 do linii 3)', '1 kolumnę', 'Całą szerokość siatki'],
      c: 1,
      why: 'Liczby oznaczają linie siatki, a nie kolumny. Od linii 1 do linii 3 mieszczą się kolumny 1 i 2.',
      src: POS
    },
    {
      id: 'gr-03', t: 'grid',
      q: 'Dlaczego materiały zalecają w gridzie jednostkę `fr` zamiast procentów?',
      a: [
        'Bo procenty nie działają w gridzie',
        'Bo fr dzieli miejsce, które zostaje po odstępach, więc unika problemów z marginesami i gap',
        'Bo fr jest szybsze dla przeglądarki',
        'Bo fr automatycznie dodaje media queries'
      ],
      c: 1,
      why: 'Komentarz w materiałach: zaleca się fraction (fr), żeby uniknąć problemów z margin i padding. Cztery kolumny po 25% plus gap przepełniłyby kontener.',
      src: POS
    },
    {
      id: 'gr-04', t: 'grid',
      q: 'Co robi `grid-auto-rows: minmax(100px, auto);`?',
      a: [
        'Każdy automatycznie tworzony wiersz ma co najmniej 100px i rośnie, jeśli treść tego wymaga',
        'Każdy wiersz ma dokładnie 100px',
        'Tworzy 100 wierszy',
        'Ustawia maksymalną wysokość wiersza na 100px'
      ],
      c: 0,
      why: 'minmax(min, max) określa zakres. auto jako maksimum pozwala wierszowi urosnąć do wysokości treści.',
      src: POS
    },
    {
      id: 'gr-05', t: 'grid',
      q: 'Co daje `grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));` z Lab 3?',
      a: [
        'Zawsze 16 kolumn',
        'Tyle kolumn, ile zmieści się przy minimum 16rem każda, rozciągniętych na całą szerokość, bez media queries',
        'Jedną kolumnę o szerokości 16rem',
        'Kolumny, które ukrywają się na telefonie'
      ],
      c: 1,
      why: 'auto-fit tworzy tyle kolumn, ile się mieści. Gdy ekran jest wąski, karty same spadają do mniejszej liczby kolumn.',
      src: LAB3
    },
    {
      id: 'gr-06', t: 'grid',
      q: 'Czym CSS Grid różni się od Flexboxa według materiałów z Lab 5?',
      a: [
        'Grid jest systemem dwuwymiarowym (wiersze i kolumny), Flexbox ogranicza się do wierszy albo kolumn',
        'Grid działa tylko w Chrome',
        'Grid nie obsługuje odstępów',
        'Grid służy tylko do tabel z danymi'
      ],
      c: 0,
      why: 'Materiały: Grid wprowadza system dwuwymiarowy, w przeciwieństwie do flexboxa, który ogranicza się do systemu wierszy lub kolumn.',
      src: POS
    },
    {
      id: 'gr-07', t: 'grid',
      q: 'Które zapisy są równoważne `grid-gap: 1em;` w nowym CSS?',
      a: ['gap: 1em;', 'margin: 1em;', 'grid-padding: 1em;', 'spacing: 1em;'],
      c: 0,
      why: 'grid-gap to starsza nazwa. Obecnie używa się gap (oraz row-gap i column-gap), które działa też we Flexboxie.',
      src: POS
    },

    // ---------- Responsywność ----------
    {
      id: 'rw-01', t: 'rwd',
      q: 'Piszesz CSS w podejściu mobile first. Jakiej postaci media query użyjesz do rozszerzenia układu na większe ekrany?',
      a: [
        '@media (max-width: 48rem) { ... }',
        '@media (min-width: 48rem) { ... }',
        '@media mobile { ... }',
        '@media (device: desktop) { ... }'
      ],
      c: 1,
      why: 'Mobile first: style bazowe są dla małego ekranu, a min-width dodaje zmiany, gdy pojawia się więcej miejsca. Przykład z Lab 3 to @media (min-width: 48rem).',
      src: LAB3
    },
    {
      id: 'rw-02', t: 'rwd',
      q: 'Co się stanie, jeśli zapomnisz o `<meta name="viewport" content="width=device-width, initial-scale=1">`?',
      a: [
        'Nic, media queries działają tak samo',
        'Telefon wyrenderuje stronę jak dla szerokiego ekranu (ok. 980px) i pomniejszy ją, a media queries dla małych ekranów nie zadziałają',
        'Strona nie załaduje się na telefonie',
        'Zniknie favicona'
      ],
      c: 1,
      why: 'Bez tego meta przeglądarka mobilna używa wirtualnej szerokości około 980px. Wtedy warunek np. max-width: 600px nigdy nie jest spełniony.',
      src: 'Lab 2: MVC, widoki HTML'
    },
    {
      id: 'rw-03', t: 'rwd',
      q: 'Kiedy zadziała reguła `@media (max-width: 600px) { ... }`?',
      a: [
        'Gdy szerokość obszaru widoku wynosi 600px lub mniej',
        'Gdy szerokość jest większa niż 600px',
        'Tylko na telefonach, niezależnie od szerokości',
        'Tylko podczas drukowania'
      ],
      c: 0,
      why: 'max-width oznacza „co najwyżej”. Warunek jest spełniony od 0 do 600px włącznie.',
      src: SCOPE
    },
    {
      id: 'rw-04', t: 'rwd',
      q: 'Co oznacza `font-size: clamp(2rem, 6vw, 4.5rem);`?',
      a: [
        'Rozmiar zawsze równy 6vw',
        'Rozmiar preferowany 6vw, ale nie mniej niż 2rem i nie więcej niż 4.5rem',
        'Średnia z trzech wartości',
        'Rozmiar 2rem na telefonie i 4.5rem na komputerze, bez stanów pośrednich'
      ],
      c: 1,
      why: 'clamp(MIN, PREFEROWANA, MAX). Nagłówek płynnie rośnie z szerokością okna, ale w ustalonych granicach.',
      src: LAB3
    },
    {
      id: 'rw-05', t: 'rwd',
      q: 'Co robi `width: min(100% - 2rem, 72rem); margin-inline: auto;` z Lab 3?',
      a: [
        'Ustawia stałą szerokość 72rem',
        'Kontener ma maksymalnie 72rem, a na wąskim ekranie zostawia po 1rem marginesu z każdej strony, wyśrodkowany',
        'Kontener ma 100% szerokości plus 2rem',
        'Ukrywa kontener poniżej 72rem'
      ],
      c: 1,
      why: 'min() wybiera mniejszą wartość. Na dużym ekranie wygrywa 72rem, na małym 100% - 2rem. margin-inline: auto centruje w poziomie.',
      src: LAB3
    },
    {
      id: 'rw-06', t: 'rwd',
      q: 'Dlaczego w responsywnym CSS zaleca się jednostkę `rem` zamiast `px` dla czcionek i odstępów?',
      a: [
        'rem jest liczony względem rozmiaru czcionki elementu html, więc szanuje ustawienia użytkownika',
        'rem zawsze równa się 10px',
        'rem działa tylko w media queries',
        'px nie działa na telefonach'
      ],
      c: 0,
      why: 'Jeśli użytkownik powiększy domyślną czcionkę w przeglądarce, wartości w rem przeskalują się razem z nią.',
      src: LAB3
    },
    {
      id: 'rw-07', t: 'rwd',
      q: 'Jak Lab 3 definiuje responsywność?',
      a: [
        'Jako pomniejszanie całej strony do szerokości telefonu',
        'Jako świadomą zmianę układu, a nie pomniejszenie strony',
        'Jako ukrycie połowy treści na telefonie',
        'Jako osobną wersję strony pod adresem m.'
      ],
      c: 1,
      why: 'Cytat z Lab 3: „Responsywność nie oznacza pomniejszenia strony, lecz świadomą zmianę układu.”',
      src: LAB3
    },
    {
      id: 'rw-08', t: 'rwd',
      q: 'Jakie szerokości ekranu Lab 3 każe co najmniej przetestować w DevTools?',
      a: ['320, 640 i 1280 px', '360, 768 i 1440 px', '480, 1024 i 1920 px', 'Tylko 1920 px'],
      c: 1,
      why: 'Lab 3: włącz pasek urządzeń i przetestuj co najmniej szerokości 360 px, 768 px i 1440 px.',
      src: LAB3
    },
    {
      id: 'rw-09', t: 'rwd',
      q: 'W mobile first masz reguły `@media (min-width: 48rem)` i `@media (min-width: 64rem)`. W jakiej kolejności je zapisać?',
      a: [
        'Od większej do mniejszej, bo większy ekran jest ważniejszy',
        'Od mniejszej do większej, bo przy tej samej specyficzności wygrywa reguła zapisana później',
        'Kolejność nie ma znaczenia',
        'Obie muszą być w osobnych plikach'
      ],
      c: 1,
      why: 'Przy szerokości 70rem oba warunki są spełnione. Kaskada wybiera późniejszą regułę, więc szerszy breakpoint musi być na końcu.',
      src: SCOPE
    },
    {
      id: 'rw-10', t: 'rwd',
      q: 'Jak sprawić, żeby obrazek nigdy nie wychodził poza swój kontener na wąskim ekranie?',
      a: [
        'img { max-width: 100%; height: auto; }',
        'img { width: 1000px; }',
        'img { position: fixed; }',
        'img { overflow: hidden; }'
      ],
      c: 0,
      why: 'max-width: 100% ogranicza szerokość do kontenera, a height: auto zachowuje proporcje.',
      src: SCOPE
    },
    {
      id: 'rw-11', t: 'rwd',
      q: 'Do czego służy `@media (prefers-reduced-motion: reduce)`?',
      a: [
        'Do wykrycia wolnego internetu',
        'Do ograniczenia lub wyłączenia animacji u osób, które ustawiły w systemie redukcję ruchu',
        'Do zmniejszenia rozmiaru czcionek',
        'Do wyłączenia JavaScriptu'
      ],
      c: 1,
      why: 'To preferencja systemowa. Lab 5 przypomina, że użytkownik z prefers-reduced-motion nie powinien dostawać zbędnych animacji.',
      src: 'Lab 5: Theme data'
    },
    {
      id: 'rw-12', t: 'rwd',
      q: 'Który zapis łączy dwa warunki: tylko ekrany i szerokość od 48rem do 64rem?',
      a: [
        '@media screen and (min-width: 48rem) and (max-width: 64rem)',
        '@media screen, 48rem-64rem',
        '@media (width: 48rem to 64rem) screen',
        '@media screen or (min-width: 48rem)'
      ],
      c: 0,
      why: 'Warunki łączy się słowem and. Przecinek oznaczałby „lub” (dowolny z warunków).',
      src: SCOPE
    },
    {
      id: 'rw-13', t: 'rwd',
      q: 'Jak zastosować efekty :hover tylko na urządzeniach, które mają kursor?',
      a: [
        '@media (hover: hover) { ... }',
        '@media (mouse: true) { ... }',
        '@media screen and (cursor) { ... }',
        'Nie da się tego wykryć w CSS'
      ],
      c: 0,
      why: 'Media feature hover sprawdza, czy główne urządzenie wskazujące potrafi najeżdżać na elementy. Na dotyku efekt hover potrafi „zawisnąć” po tapnięciu.',
      src: SCOPE
    },
    {
      id: 'rw-14', t: 'rwd',
      q: 'Które wyrażenie wykryje, że telefon jest obrócony poziomo?',
      a: ['@media (orientation: landscape)', '@media (rotate: 90deg)', '@media (direction: horizontal)', '@media landscape-only'],
      c: 0,
      why: 'orientation: landscape jest spełnione, gdy szerokość obszaru widoku jest większa niż wysokość.',
      src: SCOPE
    },

    // ---------- Druk ----------
    {
      id: 'pr-01', t: 'print',
      q: 'Jak ukryć nawigację i przyciski na wydruku, nie zmieniając wyglądu na ekranie?',
      a: [
        '@media print { nav, .btn { display: none; } }',
        '@media screen { nav, .btn { display: none; } }',
        'nav, .btn { visibility: print; }',
        '@print { nav { hidden: true; } }'
      ],
      c: 0,
      why: 'Reguły w bloku @media print działają tylko przy drukowaniu i w podglądzie wydruku.',
      src: SCOPE
    },
    {
      id: 'pr-02', t: 'print',
      q: 'Jak podłączyć osobny arkusz stylów używany tylko do druku?',
      a: [
        '<link rel="stylesheet" href="print.css" media="print">',
        '<link rel="print" href="print.css">',
        '<style src="print.css" type="print">',
        '<script src="print.css" media="print">'
      ],
      c: 0,
      why: 'Atrybut media na elemencie link ogranicza arkusz do wskazanego medium.',
      src: SCOPE
    },
    {
      id: 'pr-03', t: 'print',
      q: 'Na papierze nie da się kliknąć linku. Jak dopisać adres po tekście linku tylko na wydruku?',
      a: [
        '@media print { a[href]::after { content: " (" attr(href) ")"; } }',
        '@media print { a { href: visible; } }',
        '@media print { a::before { url: attr(href); } }',
        '@media print { a { text-decoration: url; } }'
      ],
      c: 0,
      why: 'Funkcja attr() w content wstawia wartość atrybutu. Selektor a[href] wybiera tylko linki z adresem.',
      src: SCOPE
    },
    {
      id: 'pr-04', t: 'print',
      q: 'Karta produktu rozcina się na dwie strony wydruku. Co temu zapobiegnie?',
      a: [
        '.card { break-inside: avoid; }',
        '.card { overflow: hidden; }',
        '.card { page: none; }',
        '.card { position: fixed; }'
      ],
      c: 0,
      why: 'break-inside: avoid (starszy zapis page-break-inside: avoid) prosi przeglądarkę, żeby nie łamała strony w środku elementu.',
      src: SCOPE
    },
    {
      id: 'pr-05', t: 'print',
      q: 'Każda sekcja raportu ma zaczynać się na nowej stronie wydruku. Co ustawisz?',
      a: [
        'section { break-before: page; }',
        'section { margin-top: 100vh; }',
        'section { display: page; }',
        'section { page-new: true; }'
      ],
      c: 0,
      why: 'break-before: page (starszy zapis page-break-before: always) wymusza podział strony przed elementem.',
      src: SCOPE
    },
    {
      id: 'pr-06', t: 'print',
      q: 'Do czego służy reguła `@page { size: A4; margin: 2cm; }`?',
      a: [
        'Ustawia format i marginesy drukowanej strony',
        'Tworzy nową podstronę w aplikacji',
        'Ustawia szerokość strony na ekranie',
        'Dodaje numerację stron w HTML'
      ],
      c: 0,
      why: '@page opisuje pole strony wydruku: jej rozmiar i marginesy.',
      src: SCOPE
    },
    {
      id: 'pr-07', t: 'print',
      q: 'Kolorowe tło etykiety nie drukuje się, choć na ekranie jest widoczne. Dlaczego i co z tym zrobić?',
      a: [
        'Przeglądarki domyślnie pomijają tła przy druku, można poprosić o nie przez print-color-adjust: exact',
        'Tła nigdy nie da się wydrukować',
        'Trzeba zamienić tło na obrazek PNG',
        'Wystarczy dodać !important do background'
      ],
      c: 0,
      why: 'Żeby oszczędzać tusz, przeglądarki domyślnie nie drukują teł. print-color-adjust: exact (w starszych Chrome z prefiksem -webkit-) wymusza zachowanie kolorów, a użytkownik i tak może to wyłączyć.',
      src: SCOPE
    },
    {
      id: 'pr-08', t: 'print',
      q: 'Strona ma nagłówek `position: fixed`. Co warto z nim zrobić w @media print?',
      a: [
        'Ukryć go albo ustawić position: static, bo inaczej może powtarzać się lub zasłaniać treść na stronach wydruku',
        'Nic, fixed nie ma wpływu na druk',
        'Zwiększyć mu z-index',
        'Zmienić go na position: sticky'
      ],
      c: 0,
      why: 'Elementy fixed na wydruku potrafią pojawić się na każdej stronie i przykryć tekst. Najprościej ukryć je lub przywrócić do przepływu.',
      src: SCOPE
    },
    {
      id: 'pr-09', t: 'print',
      q: 'Masz motyw oparty na zmiennych CSS. Jak najprościej wymusić czarny tekst na białym tle na wydruku, także w trybie ciemnym?',
      a: [
        'W @media print nadpisać tokeny, np. :root, html[data-theme="dark"] { --color-bg: #fff; --color-text: #000; }',
        'Usunąć atrybut data-theme w HTML na stałe',
        'Dodać filter: invert(1) do body',
        'Nie da się, druk zawsze wygląda jak ekran'
      ],
      c: 0,
      why: 'Komponenty korzystają z tokenów, więc wystarczy zmienić wartości zmiennych w kontekście druku. To ten sam mechanizm, którego Lab 5 używa do motywów.',
      src: 'Lab 5: Theme data + lista zagadnień'
    },
    {
      id: 'pr-10', t: 'print',
      q: 'Jak w Chrome DevTools sprawdzić style @media print bez drukowania?',
      a: [
        'Panel Rendering, opcja „Emulate CSS media type: print”',
        'Panel Network, opcja „Offline”',
        'Panel Console, polecenie print.css',
        'Nie da się, trzeba drukować na papierze'
      ],
      c: 0,
      why: 'W panelu Rendering (More tools → Rendering) można przełączyć emulowany typ mediów na print. Można też użyć podglądu wydruku (Ctrl+P).',
      src: SCOPE
    },
    {
      id: 'pr-11', t: 'print',
      q: 'Które jednostki są typowe i przewidywalne w arkuszu do druku?',
      a: ['pt, cm, mm', 'vw, vh', 'fr', 'dpi'],
      c: 0,
      why: 'Na papierze liczy się fizyczny rozmiar, więc stosuje się jednostki bezwzględne: punkty dla czcionek, cm i mm dla marginesów.',
      src: SCOPE
    },
    {
      id: 'pr-12', t: 'print',
      q: 'Które polecenie JavaScript otwiera okno drukowania strony?',
      a: ['window.print()', 'document.print()', 'console.print()', 'navigator.printPage()'],
      c: 0,
      why: 'window.print() otwiera systemowe okno drukowania. Zastosowane zostaną reguły z @media print.',
      src: SCOPE
    },

    // ---------- Podstawy CSS (Lab 3) ----------
    {
      id: 'cs-01', t: 'css',
      q: 'Jak zdefiniować i użyć zmiennej CSS dla koloru marki?',
      a: [
        ':root { --color-brand: #635bff; } a { color: var(--color-brand); }',
        ':root { $color-brand: #635bff; } a { color: $color-brand; }',
        'var color-brand = #635bff; a { color: color-brand; }',
        ':root { @color-brand: #635bff; } a { color: @color-brand; }'
      ],
      c: 0,
      why: 'Własne właściwości CSS zaczynają się od dwóch myślników, a odczytuje się je funkcją var(). $ i @ to składnia preprocesorów Sass i Less.',
      src: LAB3
    },
    {
      id: 'cs-02', t: 'css',
      q: 'Którą nazwę zmiennej poleca Lab 3?',
      a: ['--purple', '--color-brand', '--kolor1', '--x'],
      c: 1,
      why: 'Zmienne nazywamy według roli, nie wyglądu. Ta sama rola może mieć inną wartość w jasnym i ciemnym motywie, a --purple w ciemnym motywie mogłoby być zielone.',
      src: LAB3
    },
    {
      id: 'cs-03', t: 'css',
      q: 'Trzy reguły ustawiają kolor tego samego linku. Która wygra?',
      code: `#nav a     { color: red; }
.menu a    { color: green; }
a          { color: blue; }`,
      a: ['blue, bo jest ostatnia', 'green, bo klasa jest najczęstsza', 'red, bo selektor z identyfikatorem ma najwyższą specyficzność', 'Żadna, kolory się wymieszają'],
      c: 2,
      why: 'Specyficzność: identyfikator > klasa/atrybut/pseudoklasa > element. Kolejność decyduje dopiero przy równej specyficzności.',
      src: LAB3
    },
    {
      id: 'cs-04', t: 'css',
      q: 'Czym różni się `.menu > li` od `.menu li`?',
      a: [
        '.menu > li wybiera tylko bezpośrednie dzieci, .menu li także głębiej zagnieżdżone',
        'Niczym, to dwa zapisy tego samego',
        '.menu > li wybiera rodzica elementu li',
        '.menu li działa tylko dla pierwszego li'
      ],
      c: 0,
      why: '> to kombinator dziecka (bezpośredni potomek). Spacja to kombinator potomka na dowolnej głębokości.',
      src: LAB3
    },
    {
      id: 'cs-05', t: 'css',
      q: 'Element ma `width: 200px; padding: 20px; border: 5px solid;` i domyślne `box-sizing: content-box`. Ile wynosi jego całkowita szerokość (bez marginesu)?',
      a: ['200px', '225px', '250px', '240px'],
      c: 2,
      why: '200 + 2 × 20 (padding) + 2 × 5 (border) = 250px. Przy box-sizing: border-box byłoby to dokładnie 200px.',
      src: LAB3
    },
    {
      id: 'cs-06', t: 'css',
      q: 'Po co Lab 3 dodaje na początku arkusza `*, *::before, *::after { box-sizing: border-box; }`?',
      a: [
        'Żeby deklarowana szerokość obejmowała także padding i border',
        'Żeby usunąć wszystkie marginesy',
        'Żeby każdy element miał obramowanie',
        'Żeby wyłączyć pseudoelementy'
      ],
      c: 0,
      why: 'border-box sprawia, że width to szerokość razem z paddingiem i obramowaniem, co ułatwia liczenie układu.',
      src: LAB3
    },
    {
      id: 'cs-07', t: 'css',
      q: 'Jaka jest kolejność warstw box modelu od środka na zewnątrz?',
      a: ['content, padding, border, margin', 'content, margin, border, padding', 'padding, content, border, margin', 'margin, border, padding, content'],
      c: 0,
      why: 'Treść, wewnętrzny odstęp padding, obramowanie border i zewnętrzny odstęp margin.',
      src: LAB3
    },
    {
      id: 'cs-08', t: 'css',
      q: 'Co Lab 3 mówi o usuwaniu obramowania fokusu (`outline`)?',
      a: [
        'Należy je zawsze usuwać, bo wygląda brzydko',
        'Nie usuwaj go bez czytelnego zamiennika, np. stylu dla :focus-visible',
        'Wystarczy zmienić kolor kursora',
        'Fokus jest potrzebny tylko w formularzach'
      ],
      c: 1,
      why: 'Użytkownik klawiatury musi wiedzieć, który element jest aktywny. Lab 3 pokazuje outline dla button:focus-visible i a:focus-visible.',
      src: LAB3
    },
    {
      id: 'cs-09', t: 'css',
      q: 'Który selektor wybierze tylko pola formularza typu e-mail?',
      a: ['input.email', 'input[type="email"]', 'input:email', '#input-email'],
      c: 1,
      why: 'Selektor atrybutu [type="email"] dopasowuje elementy z pasującą wartością atrybutu.',
      src: LAB3
    },
    {
      id: 'cs-10', t: 'css',
      q: 'Czym jest `p::first-letter`?',
      a: ['Pseudoklasą stanu', 'Pseudoelementem, który wybiera część elementu (pierwszą literę)', 'Selektorem atrybutu', 'Selektorem identyfikatora'],
      c: 1,
      why: 'Pseudoelementy (dwa dwukropki) wybierają część elementu lub element dekoracyjny. Pseudoklasy (jeden dwukropek, np. :hover) opisują stan.',
      src: LAB3
    },
    {
      id: 'cs-11', t: 'css',
      q: 'Gdzie Lab 3 każe trzymać style projektu?',
      a: [
        'W zewnętrznym arkuszu, np. public/css/style.css, podłączonym w <head> przez <link rel="stylesheet">',
        'W atrybutach style każdego elementu',
        'W znaczniku <style> na końcu body',
        'W pliku index.php między znacznikami PHP'
      ],
      c: 0,
      why: 'Zewnętrzny arkusz jest współdzielony przez widoki i łatwiejszy w utrzymaniu. Styl inline zostaw do naprawdę wyjątkowych przypadków.',
      src: LAB3
    },
    {
      id: 'cs-12', t: 'css',
      q: 'Gdzie w DevTools sprawdzisz ostateczne (wyliczone) wartości i box model elementu?',
      a: ['W zakładce Computed', 'W zakładce Network', 'W zakładce Application', 'W zakładce Sources'],
      c: 0,
      why: 'Lab 3: w panelu Styles zmieniasz wartości na żywo, a w Computed sprawdzasz ostateczne wartości oraz box model.',
      src: LAB3
    },
    {
      id: 'cs-13', t: 'css',
      q: 'Co według Lab 3 decyduje, która z dwóch konkurujących reguł zostanie zastosowana?',
      a: ['Kaskada, specyficzność i kolejność', 'Tylko kolejność w pliku', 'Długość selektora w znakach', 'Data utworzenia pliku CSS'],
      c: 0,
      why: 'Praktyczna zasada z Lab 3: styluj klasami, unikaj długich selektorów i !important, bo o wyniku decydują kaskada, specyficzność i kolejność.',
      src: LAB3
    },

    // ---------- Motyw i WCAG (Lab 5) ----------
    {
      id: 'th-01', t: 'theme',
      q: 'Jak w Lab 5 zrealizowano tryb ciemny?',
      a: [
        'Osobny plik dark.css z kopią wszystkich selektorów',
        'Atrybut data-theme na <html> wybiera zestaw tokenów (zmiennych CSS), a komponenty używają var()',
        'filter: invert(1) na całej stronie',
        'Dwa osobne widoki PHP dla każdego motywu'
      ],
      c: 1,
      why: 'Theme data: komponent mówi „użyj koloru powierzchni”, a motyw dostarcza konkretną wartość. html[data-theme="dark"] nadpisuje tokeny.',
      src: 'Lab 5: Theme data'
    },
    {
      id: 'th-02', t: 'theme',
      q: 'Jaki jest priorytet źródeł przy wyborze motywu w Lab 5?',
      a: [
        'Zawsze ustawienie systemowe prefers-color-scheme',
        'Zapisany w localStorage wybór użytkownika, a gdy go brak, prefers-color-scheme',
        'Zawsze jasny motyw, chyba że jest noc',
        'Losowy wybór przy każdym wejściu'
      ],
      c: 1,
      why: 'Świadoma decyzja użytkownika jest ważniejsza niż ustawienie systemowe. Bez zapisu strona korzysta z preferencji systemu.',
      src: 'Lab 5: Theme data'
    },
    {
      id: 'th-03', t: 'theme',
      q: 'Jasny ekran miga przez chwilę przed ciemnym motywem. Jak to naprawić według Lab 5?',
      a: [
        'Dodać transition do wszystkich właściwości',
        'Umieścić mały skrypt ustawiający data-theme w <head> przed arkuszami CSS, bez defer',
        'Przenieść skrypt na koniec body',
        'Dodać atrybut async do arkusza CSS'
      ],
      c: 1,
      why: 'To FOUC (Flash of Unstyled Content). Skrypt anty-FOUC musi ustawić atrybut zanim przeglądarka zacznie renderować stronę.',
      src: 'Lab 5: Theme data'
    },
    {
      id: 'th-04', t: 'theme',
      q: 'Do czego służy właściwość `color-scheme: dark`?',
      a: [
        'Automatycznie zmienia wszystkie kolory strony na ciemne',
        'Informuje przeglądarkę, jaki wariant natywnych kontrolek, pasków przewijania i pól formularzy zastosować',
        'Wyłącza tryb jasny w systemie',
        'Zapisuje motyw w localStorage'
      ],
      c: 1,
      why: 'Lab 5: color-scheme nie zastępuje własnych stylów, ale pomaga zachować spójność elementów rysowanych przez przeglądarkę.',
      src: 'Lab 5: Theme data'
    },
    {
      id: 'th-05', t: 'theme',
      q: 'Dlaczego przełącznik motywu w Lab 5 jest elementem `<button>`, a nie klikalnym `<span>`?',
      a: [
        'Bo span nie może mieć ikony',
        'Bo button ma obsługę klawiatury i semantykę działania bez dodatkowego JavaScriptu',
        'Bo span nie obsługuje kolorów',
        'Bo button jest szybciej renderowany'
      ],
      c: 1,
      why: 'Przycisk dostaje fokus, reaguje na Enter i Spację i jest ogłaszany jako przycisk przez czytniki ekranu.',
      src: 'Lab 5: Theme data'
    },
    {
      id: 'th-06', t: 'theme',
      q: 'Jak w Lab 5 przekazano znaczenie przełącznika czytnikom ekranu?',
      a: [
        'Tylko przez ikonę księżyca',
        'Przez aktualizowane aria-label i aria-pressed, a ikona ma aria-hidden="true"',
        'Przez atrybut title na <html>',
        'Przez kolor przycisku'
      ],
      c: 1,
      why: 'Ikona jest dekoracyjna. aria-label mówi, co zrobi przycisk („Włącz ciemny motyw”), a aria-pressed informuje o stanie.',
      src: 'Lab 5: Theme data'
    },
    {
      id: 'th-07', t: 'theme',
      q: 'Kliknięcie ustawia ciemny motyw, ale zmiana motywu w systemie go nadpisuje. Gdzie jest błąd?',
      a: [
        'Handler zdarzenia change z matchMedia nie kończy pracy, gdy istnieje zapisany wybór użytkownika',
        'Brakuje color-scheme w CSS',
        'localStorage nie działa w trybie ciemnym',
        'Ikona ma złą klasę'
      ],
      c: 0,
      why: 'Lab 5: handler matchMedia musi wyjść (return), gdy getSavedTheme() !== null. Inaczej preferencja systemu wygrywa z decyzją użytkownika.',
      src: 'Lab 5: Theme data'
    },
    {
      id: 'th-08', t: 'theme',
      q: 'Jakie minimalne kontrasty tekstu wymaga WCAG na poziomie AA?',
      a: ['2:1 dla każdego tekstu', '4.5:1 dla zwykłego tekstu i 3:1 dla dużego', '7:1 dla zwykłego i 4.5:1 dla dużego', '10:1 dla każdego tekstu'],
      c: 1,
      why: 'Poziom AA: 4.5:1 dla zwykłego tekstu, 3:1 dla dużego (od ok. 24px lub 18.66px pogrubionego). 7:1 to poziom AAA.',
      src: 'Lab 5: WCAG'
    },
    {
      id: 'th-09', t: 'theme',
      q: 'Formularz oznacza błędne pole wyłącznie czerwoną ramką. Co jest nie tak z punktu widzenia WCAG?',
      a: [
        'Nic, czerwony jest uniwersalnym znakiem błędu',
        'Nie wolno przekazywać błędu samym kolorem, potrzebny jest też tekst komunikatu lub ikona',
        'Ramka powinna być zielona',
        'Błąd powinien być pokazany tylko w konsoli'
      ],
      c: 1,
      why: 'Lab 5: nie używaj samego koloru do przekazywania błędu lub stanu aktywnego. Osoby z zaburzeniami widzenia barw mogą go nie zauważyć.',
      src: 'Lab 5: Theme data'
    },
    {
      id: 'th-10', t: 'theme',
      q: 'Dlaczego w Lab 5 cień (--shadow-soft) też jest tokenem motywu?',
      a: [
        'Bo cień widoczny na białym tle może być zbyt słaby w ciemnym motywie',
        'Bo cienie nie działają bez zmiennych',
        'Bo tak jest szybciej',
        'Bo cień musi mieć kolor marki'
      ],
      c: 0,
      why: 'Na ciemnym tle potrzebny jest mocniejszy, ciemniejszy cień (w przykładzie rgb(0 0 0 / 32%) zamiast 12%).',
      src: 'Lab 5: Theme data'
    },
    {
      id: 'th-11', t: 'theme',
      q: 'Po co dostęp do localStorage w Lab 5 jest objęty `try/catch`?',
      a: [
        'Bo localStorage może być niedostępny (zablokowany przez ustawienia przeglądarki) i rzucić wyjątek',
        'Bo localStorage działa tylko w trybie ciemnym',
        'Bo try/catch przyspiesza odczyt',
        'Bo bez try/catch nie da się zapisać tekstu'
      ],
      c: 0,
      why: 'Gdy zapis się nie uda, motyw nadal działa w bieżącym dokumencie, a skrypt nie przerywa pracy.',
      src: 'Lab 5: Theme data'
    },
    {
      id: 'th-12', t: 'theme',
      q: 'Po włączeniu ciemnego motywu część strony nadal jest jasna. Co jest najczęstszą przyczyną?',
      a: [
        'W arkuszu zostały sztywne kolory (hex, rgb(), white, black) zamiast zmiennych',
        'Przeglądarka nie obsługuje ciemnego motywu',
        'Za mały z-index',
        'Brak meta viewport'
      ],
      c: 0,
      why: 'Lab 5: wyszukaj w arkuszach wartości hex, rgb(), white i black i zamień je na tokeny.',
      src: 'Lab 5: Theme data'
    },
    {
      id: 'th-13', t: 'theme',
      q: 'Jak według Lab 5 wrócić do motywu systemowego po wcześniejszym kliknięciu przełącznika?',
      a: [
        'localStorage.removeItem(\'theme\') i odświeżenie strony',
        'Wyczyścić pamięć podręczną CSS',
        'Usunąć atrybut lang',
        'Kliknąć przełącznik trzy razy'
      ],
      c: 0,
      why: 'Po usunięciu zapisu skrypt w <head> ponownie użyje prefers-color-scheme. W rozbudowanym UI można dać trzy opcje: jasny, ciemny, systemowy.',
      src: 'Lab 5: Theme data'
    },
    {
      id: 'th-14', t: 'theme',
      q: 'Do czego służy operator `?.` w `themeToggle?.addEventListener(...)`?',
      a: [
        'Bezpiecznie pomija wywołanie, gdy przycisku nie ma na danym widoku (wartość null)',
        'Sprawdza, czy przycisk jest widoczny',
        'Dodaje nasłuchiwanie tylko raz',
        'Zamienia przycisk na link'
      ],
      c: 0,
      why: 'Optional chaining zwraca undefined zamiast rzucać błąd, gdy lewa strona to null lub undefined. Wspólny skrypt działa wtedy na każdym widoku.',
      src: 'Lab 5: Theme data'
    }
  );
})();
