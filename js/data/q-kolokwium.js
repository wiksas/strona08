// Dodatkowe pytania pod kolokwium "GIT, DOCKER, HTML, CSS, FIGMA": konfiguracja Dockera, Xdebug, Git, HTML, Figma.
(function () {
  const DOCKER = 'Lab 1: Konfiguracja Dockera';
  const TASKS = 'Lab 1: Zadania (docker-compose z bazą, Mailpit, pgAdmin, Ollama)';
  const GIT = 'Lab 1: Git';
  const XDEBUG = 'Lab 6: XDEBUG (link z zajęć)';
  const HTML = 'Lab 2: semantyczny widok HTML + wiedza ogólna';
  const FIGMA = 'Lab 2: prototyp (Figma, Stitch) + wiedza ogólna';

  window.WDPAI_QUESTIONS.push(
    // ---------- Docker: konfiguracja ----------
    {
      id: 'dk-09', t: 'env',
      q: 'Pod jakim adresem otworzysz aplikację z Lab 1, gdy usługa server ma `ports: - "8080:80"`?',
      a: ['http://localhost:8080', 'http://localhost:80', 'http://localhost:9000', 'http://php:8080'],
      c: 0,
      why: 'Lewa liczba to port komputera (8080), prawa to port w kontenerze (80, na nim słucha Nginx).',
      src: DOCKER
    },
    {
      id: 'dk-10', t: 'env',
      q: 'Na którym porcie PHP-FPM nasłuchuje wewnątrz sieci Dockera (fastcgi_pass w nginx.conf)?',
      a: ['9000', '8080', '80', '5432'],
      c: 0,
      why: 'fastcgi_pass php:9000. Port 9000 nie jest wystawiony na komputer, służy tylko Nginxowi.',
      src: DOCKER
    },
    {
      id: 'dk-11', t: 'env',
      q: 'Co oznacza `"${APP_PORT:-8080}:80"` w docker-compose z zadania 1?',
      a: [
        'Port komputera bierzemy ze zmiennej APP_PORT, a gdy jej nie ma, używamy 8080',
        'Port 8080 zostanie odjęty od APP_PORT',
        'Kontener nasłuchuje na porcie APP_PORT minus 80',
        'Zmienna APP_PORT jest obowiązkowa, bez niej compose nie wystartuje'
      ],
      c: 0,
      why: 'Składnia ${ZMIENNA:-domyślna} podstawia wartość z pliku .env lub środowiska, a w razie braku wartość domyślną.',
      src: TASKS
    },
    {
      id: 'dk-12', t: 'env',
      q: 'Baza w zadaniu 1 ma `"${POSTGRES_PORT:-5433}:5432"`. Na jakim porcie PostgreSQL działa w kontenerze, a na jakim połączysz się z komputera?',
      a: [
        'W kontenerze 5432, z komputera 5433',
        'W kontenerze 5433, z komputera 5432',
        'Oba 5432',
        'Oba 5433'
      ],
      c: 0,
      why: 'Format HOST:KONTENER. 5433 na komputerze omija konflikt z lokalnie zainstalowanym PostgreSQL na 5432.',
      src: TASKS
    },
    {
      id: 'dk-13', t: 'env',
      q: 'Kontener PHP łączy się z bazą z tego samego compose. Jaki host i port wpisać w DSN PDO?',
      a: ['host=db;port=5432', 'host=localhost;port=5433', 'host=127.0.0.1;port=5433', 'host=pgadmin;port=80'],
      c: 0,
      why: 'Wewnątrz sieci Dockera kontenery widzą się po nazwie usługi (db) i porcie wewnętrznym (5432). localhost w kontenerze PHP to sam kontener PHP.',
      src: TASKS
    },
    {
      id: 'dk-14', t: 'env',
      q: 'Pod jakim adresem otworzysz pgAdmin z zadania 1 (`"${PGADMIN_PORT:-5050}:80"`)?',
      a: ['http://localhost:5050', 'http://localhost:80', 'http://localhost:5432', 'http://localhost:8025'],
      c: 0,
      why: 'Domyślnie port 5050 komputera wskazuje port 80 kontenera pgAdmin. 8025 to Mailpit, 5432 to baza.',
      src: TASKS
    },
    {
      id: 'dk-15', t: 'env',
      q: 'Do czego w projekcie służy usługa Mailpit (port 8025)?',
      a: [
        'Przechwytuje maile wysyłane przez aplikację i pokazuje je w przeglądarce, nic nie trafia do prawdziwych skrzynek',
        'Jest bazą danych na wiadomości',
        'Wysyła newsletter do użytkowników',
        'Zastępuje Nginx'
      ],
      c: 0,
      why: 'Mailpit to testowy serwer SMTP z panelem WWW. Pozwala sprawdzić np. mail rejestracyjny bez wysyłania go naprawdę.',
      src: TASKS
    },
    {
      id: 'dk-16', t: 'env',
      q: 'Na jakim porcie domyślnie działa API Ollamy z zadania 1?',
      a: ['11434', '8025', '5050', '9003'],
      c: 0,
      why: 'W compose: ports "11434:11434". To lokalne API modeli językowych.',
      src: TASKS
    },
    {
      id: 'dk-17', t: 'env',
      q: 'Do czego służy wolumen `- ./docker/db:/docker-entrypoint-initdb.d` w usłudze bazy?',
      a: [
        'Skrypty .sql z tego katalogu wykonają się przy pierwszym uruchomieniu pustej bazy',
        'Tam zapisywane są logi Nginx',
        'To katalog z kodem PHP',
        'To kopia zapasowa tworzona przy każdym restarcie'
      ],
      c: 0,
      why: 'Obraz PostgreSQL uruchamia pliki z /docker-entrypoint-initdb.d tylko przy inicjalizacji nowej bazy, np. tworząc tabele.',
      src: TASKS
    },
    {
      id: 'dk-18', t: 'env',
      q: 'Czym różni się obraz (image) od kontenera?',
      a: [
        'Obraz to szablon (zbudowany z Dockerfile), kontener to uruchomiona instancja obrazu',
        'To synonimy',
        'Kontener to plik Dockerfile, obraz to docker-compose.yaml',
        'Obraz działa tylko na Linuksie, kontener na Windowsie'
      ],
      c: 0,
      why: 'Z jednego obrazu można uruchomić wiele kontenerów. docker compose build buduje obrazy, up tworzy i startuje kontenery.',
      src: DOCKER
    },
    {
      id: 'dk-19', t: 'env',
      q: 'Co robi instrukcja `FROM php:8.3-fpm-alpine` w Dockerfile?',
      a: [
        'Wskazuje obraz bazowy: PHP 8.3 w wersji FPM na lekkim systemie Alpine',
        'Instaluje PHP na komputerze gospodarza',
        'Uruchamia kontener z nazwą php',
        'Kopiuje projekt do katalogu 8.3'
      ],
      c: 0,
      why: 'Każdy Dockerfile zaczyna się od FROM. Kolejne instrukcje (WORKDIR, COPY, RUN) budują warstwy na tym obrazie.',
      src: DOCKER
    },
    {
      id: 'dk-20', t: 'env',
      q: 'Zmieniłeś Dockerfile PHP (dodałeś rozszerzenie pdo_pgsql). Co trzeba zrobić, żeby zmiana zadziałała?',
      a: [
        'Przebudować obraz: docker compose up --build -d (albo docker compose build)',
        'Wystarczy odświeżyć stronę',
        'Wystarczy docker compose ps',
        'Wystarczy git commit'
      ],
      c: 0,
      why: 'Dockerfile jest czytany podczas budowania obrazu. Bez --build działa stary obraz. Gdy cache przeszkadza, jest docker compose build --no-cache.',
      src: TASKS
    },
    {
      id: 'dk-21', t: 'env',
      q: 'Które polecenie sprawdzi składnię docker-compose.yaml i pokaże wynikową konfigurację bez uruchamiania kontenerów?',
      a: ['docker compose config', 'docker compose ps', 'docker compose up', 'docker compose logs'],
      c: 0,
      why: 'Lab 1 każe najpierw wykonać docker compose config, a dopiero potem up --build -d.',
      src: DOCKER
    },
    {
      id: 'dk-22', t: 'env',
      q: 'Jak sprawdzić wersję PHP wewnątrz działającego kontenera php?',
      a: ['docker compose exec php php -v', 'php -v na komputerze', 'docker compose logs php -v', 'docker php version'],
      c: 0,
      why: 'exec uruchamia polecenie w działającym kontenerze usługi. Na komputerze może nie być PHP albo być inna wersja.',
      src: DOCKER
    },
    {
      id: 'dk-23', t: 'env',
      q: 'Po co w nginx.conf jest blok `location ~ /\\. { deny all; }`?',
      a: [
        'Blokuje dostęp z przeglądarki do plików ukrytych, np. .env czy .git',
        'Blokuje wszystkie pliki PHP',
        'Wyłącza kropki w adresach URL',
        'Przekierowuje na HTTPS'
      ],
      c: 0,
      why: 'Pliki zaczynające się od kropki często zawierają sekrety lub konfigurację i nie powinny być serwowane.',
      src: DOCKER
    },
    {
      id: 'dk-24', t: 'env',
      q: 'Co oznacza w compose `networks: - pg-network` przypisane kilku usługom?',
      a: [
        'Usługi są w jednej prywatnej sieci i mogą łączyć się po nazwach usług',
        'Usługi współdzielą ten sam system plików',
        'Usługi mają ten sam port',
        'Usługi są dostępne z internetu'
      ],
      c: 0,
      why: 'Sieć Dockera daje wewnętrzny DNS: php widzi db, server widzi php.',
      src: TASKS
    },
    {
      id: 'dk-25', t: 'env',
      q: 'Czym różni się `docker compose stop` od `docker compose down`?',
      a: [
        'stop tylko zatrzymuje kontenery, down zatrzymuje je i usuwa razem z siecią',
        'down tylko pauzuje, stop usuwa obrazy',
        'Nie ma różnicy',
        'stop usuwa wolumeny z danymi bazy'
      ],
      c: 0,
      why: 'Nazwane wolumeny (np. z danymi bazy) zostają po down, chyba że dodasz -v.',
      src: DOCKER
    },

    // ---------- Xdebug w Dockerze ----------
    {
      id: 'xd-01', t: 'env',
      q: 'Co oznacza `xdebug.start_with_request=yes`?',
      a: [
        'Xdebug próbuje rozpocząć sesję debugowania przy każdym żądaniu',
        'Xdebug startuje tylko przy pierwszym żądaniu po restarcie',
        'Xdebug wyłącza się po pierwszym żądaniu',
        'Każde żądanie jest zapisywane do pliku'
      ],
      c: 0,
      why: 'Dzięki temu nie trzeba dodawać parametru ani rozszerzenia w przeglądarce. IDE musi tylko nasłuchiwać.',
      src: XDEBUG
    },
    {
      id: 'xd-02', t: 'env',
      q: 'Co włącza `xdebug.mode=develop,debug`?',
      a: [
        'develop: czytelniejsze komunikaty błędów, debug: debugowanie krokowe',
        'Tryb produkcyjny i cache',
        'Profilowanie i pokrycie testami',
        'Tylko logowanie do pliku'
      ],
      c: 0,
      why: 'mode decyduje, które funkcje Xdebug są aktywne. Do breakpointów potrzebny jest debug.',
      src: XDEBUG
    },
    {
      id: 'xd-03', t: 'env',
      q: 'Breakpoint w IDE nie zatrzymuje kodu. Którą funkcję PHP wywołać, żeby zobaczyć, czy Step Debugger jest włączony i co mówi log diagnostyczny?',
      a: ['xdebug_info()', 'phpinfo_debug()', 'var_dump(xdebug)', 'debug_print_backtrace()'],
      c: 0,
      why: 'xdebug_info() pokazuje stan Xdebug i wpisy [Step Debug]. Można też ustawić xdebug.log=/tmp/xdebug.log.',
      src: XDEBUG
    },
    {
      id: 'xd-04', t: 'env',
      q: 'Jak w artykule z zajęć dostarczono plik xdebug.ini do kontenera PHP?',
      a: [
        'Przez wolumen w docker-compose montujący plik do /usr/local/etc/php/conf.d/',
        'Wpisując ustawienia w nginx.conf',
        'Przez composer.json',
        'Wklejając je do index.php'
      ],
      c: 0,
      why: 'Pliki .ini w conf.d są automatycznie wczytywane przez PHP. Po zmianie trzeba zrestartować lub przebudować kontener php.',
      src: XDEBUG
    },
    {
      id: 'xd-05', t: 'env',
      q: 'Dlaczego Xdebug 3 łączy się domyślnie na port 9003, a nie 9000?',
      a: [
        'Bo port 9000 zwykle zajmuje PHP-FPM',
        'Bo 9000 jest zarezerwowany dla MySQL',
        'Bo przeglądarki blokują 9000',
        'Bo 9003 jest szyfrowany'
      ],
      c: 0,
      why: 'Xdebug 2 używał 9000 i kolidował z PHP-FPM. W Xdebug 3 domyślny client_port to 9003, na nim nasłuchuje IDE.',
      src: XDEBUG
    },

    // ---------- Git: dodatkowe ----------
    {
      id: 'gt-10', t: 'env',
      q: 'Jaka jest kolejność polecenia, żeby zapisać zmianę w pliku na GitHubie?',
      a: [
        'git add plik → git commit -m "..." → git push',
        'git push → git add → git commit',
        'git commit → git add → git pull',
        'git init → git push → git add'
      ],
      c: 0,
      why: 'add dodaje do poczekalni, commit zapisuje lokalnie, push wysyła na zdalne repozytorium.',
      src: GIT
    },
    {
      id: 'gt-11', t: 'env',
      q: 'Które polecenie tworzy nowy branch i od razu się na niego przełącza?',
      a: ['git switch -c feature/login', 'git branch -d feature/login', 'git merge feature/login', 'git push feature/login'],
      c: 0,
      why: 'switch -c (albo starsze checkout -b) tworzy i przełącza. branch -d usuwa branch.',
      src: GIT
    },
    {
      id: 'gt-12', t: 'env',
      q: 'Co robi `git remote add origin https://github.com/...`?',
      a: [
        'Dodaje zdalne repozytorium pod nazwą origin',
        'Klonuje repozytorium',
        'Wysyła kod na GitHub',
        'Tworzy repozytorium na GitHubie'
      ],
      c: 0,
      why: 'origin to zwyczajowa nazwa zdalnego repozytorium. git remote -v pokazuje skonfigurowane adresy.',
      src: GIT
    },
    {
      id: 'gt-13', t: 'env',
      q: 'Czym różni się `git clone` od `git pull`?',
      a: [
        'clone pobiera całe repozytorium pierwszy raz, pull pobiera i scala nowe zmiany do istniejącej kopii',
        'clone wysyła zmiany, pull je pobiera',
        'To synonimy',
        'pull tworzy nowe repozytorium'
      ],
      c: 0,
      why: 'clone robi się raz. Potem zmiany innych osób ściąga się przez pull (w Lab 1 z --ff-only).',
      src: GIT
    },
    {
      id: 'gt-14', t: 'env',
      q: 'Podczas rebase pojawił się konflikt. Jak bezpiecznie wrócić do stanu sprzed operacji?',
      a: ['git rebase --abort', 'git push --force', 'git reset --hard origin/main zawsze', 'Usunąć folder .git'],
      c: 0,
      why: 'Po poprawieniu pliku robi się git add i git rebase --continue, a --abort przywraca stan sprzed rebase.',
      src: GIT
    },
    {
      id: 'gt-15', t: 'env',
      q: 'Jak skonfigurować autora commitów dla wszystkich repozytoriów na komputerze?',
      a: [
        'git config --global user.name "Imię Nazwisko" i git config --global user.email "adres"',
        'git author --set "Imię"',
        'git init --user "Imię"',
        'Dopisać imię w README'
      ],
      c: 0,
      why: 'Każdy commit przechowuje autora. Adres powinien być powiązany z kontem GitHub.',
      src: GIT
    },
    {
      id: 'gt-16', t: 'env',
      q: 'Który plik powinien być w .gitignore według Lab 1?',
      a: ['.env', 'README.md', 'docker-compose.yaml', 'index.php'],
      c: 0,
      why: 'Lab 1 wymienia m.in. .env, .idea/, .vscode/, vendor/, node_modules/, docker/data/. Hasła i tokeny nie trafiają do repozytorium.',
      src: GIT
    },
    {
      id: 'gt-17', t: 'env',
      q: 'Co pokazuje `git log --oneline`?',
      a: ['Skróconą historię commitów, po jednym w linii', 'Zmiany w plikach', 'Listę branchy zdalnych', 'Pliki w .gitignore'],
      c: 0,
      why: 'Lab 1 używa git log --oneline --decorate, żeby zobaczyć commity i wskaźniki branchy.',
      src: GIT
    },

    // ---------- HTML ----------
    {
      id: 'hm-01', t: 'html',
      q: 'Który element oznacza główną, unikalną treść strony?',
      a: ['<main>', '<section>', '<div id="main">', '<body>'],
      c: 0,
      why: 'Na stronie powinien być jeden widoczny <main>. Lab 2 każe wybierać elementy według znaczenia: header, nav, main, section, article, footer.',
      src: HTML
    },
    {
      id: 'hm-02', t: 'html',
      q: 'Kiedy użyć `<article>` zamiast `<section>`?',
      a: [
        'Gdy treść ma sens samodzielnie, np. karta projektu, wpis, komentarz',
        'Zawsze, gdy treść ma nagłówek',
        'Tylko dla artykułów prasowych powyżej 1000 słów',
        'Nigdy, article jest przestarzały'
      ],
      c: 0,
      why: 'article to samodzielna, niezależna treść. section grupuje tematycznie część dokumentu.',
      src: HTML
    },
    {
      id: 'hm-03', t: 'html',
      q: 'Po co w widokach z Lab 2 jest `<html lang="pl">`?',
      a: [
        'Informuje przeglądarkę i czytniki ekranu o języku treści (wymowa, dzielenie wyrazów, tłumaczenie)',
        'Ustawia polską klawiaturę',
        'Włącza polskie znaki w PHP',
        'Jest wymagany przez Dockera'
      ],
      c: 0,
      why: 'Atrybut lang wpływa na dostępność i działanie narzędzi językowych. Kodowanie znaków ustawia <meta charset="UTF-8">.',
      src: HTML
    },
    {
      id: 'hm-04', t: 'html',
      q: 'Jak poprawnie powiązać etykietę z polem formularza?',
      a: [
        '<label for="email">E-mail</label> <input id="email" name="email">',
        '<label name="email">E-mail</label> <input name="email">',
        '<span>E-mail</span> <input placeholder="E-mail">',
        '<input label="E-mail">'
      ],
      c: 0,
      why: 'for wskazuje id pola. Kliknięcie etykiety ustawia fokus, a czytnik ekranu odczytuje nazwę pola. placeholder nie zastępuje etykiety.',
      src: HTML
    },
    {
      id: 'hm-05', t: 'html',
      q: 'Do czego służy atrybut `alt` w `<img>`?',
      a: [
        'Do tekstu zastępczego opisującego obraz, gdy go nie widać lub dla czytnika ekranu',
        'Do podpowiedzi po najechaniu myszą',
        'Do ustawienia rozmiaru',
        'Do wskazania obrazka zapasowego'
      ],
      c: 0,
      why: 'Obraz dekoracyjny dostaje alt="". Dymek po najechaniu to atrybut title.',
      src: HTML
    },
    {
      id: 'hm-06', t: 'html',
      q: 'Ile nagłówków `<h1>` zaleca się na stronie i jak układać kolejne?',
      a: [
        'Jeden h1, a dalej h2, h3 bez przeskakiwania poziomów',
        'Dowolnie wiele h1, poziomy nie mają znaczenia',
        'Tylko h3, bo jest średniej wielkości',
        'Nagłówki wybiera się według rozmiaru czcionki'
      ],
      c: 0,
      why: 'Nagłówki tworzą konspekt dokumentu. Wygląd ustala się w CSS, nie wybierając poziom nagłówka.',
      src: HTML
    },
    {
      id: 'hm-07', t: 'html',
      q: 'Czym różni się `<a href>` od `<button>`?',
      a: [
        'Link prowadzi do innego adresu, przycisk wykonuje akcję (np. wysyła formularz, przełącza motyw)',
        'Nie ma różnicy poza wyglądem',
        'button działa tylko w formularzach z method="get"',
        'a nie obsługuje klawiatury'
      ],
      c: 0,
      why: 'Wybór elementu według znaczenia daje poprawną obsługę klawiatury i semantykę dla czytników ekranu.',
      src: HTML
    },
    {
      id: 'hm-08', t: 'html',
      q: 'Jaki typ ma domyślnie `<button>` umieszczony wewnątrz `<form>`?',
      a: ['submit', 'button', 'reset', 'none'],
      c: 0,
      why: 'Dlatego przycisk, który nie ma wysyłać formularza (np. przełącznik motywu), dostaje type="button".',
      src: HTML
    },
    {
      id: 'hm-09', t: 'html',
      q: 'Które pole formularza da na telefonie klawiaturę z @ i wstępnie sprawdzi format adresu?',
      a: ['<input type="email">', '<input type="text" mail>', '<input type="at">', '<textarea type="email">'],
      c: 0,
      why: 'Typy pól (email, tel, number, date) dają lepszą klawiaturę i podstawową walidację, ale serwer i tak musi sprawdzić dane.',
      src: HTML
    },
    {
      id: 'hm-10', t: 'html',
      q: 'Gdzie umieszcza się `<link rel="stylesheet">` i `<meta charset>`?',
      a: ['W <head>', 'Na końcu <body>', 'W <footer>', 'W <main>'],
      c: 0,
      why: 'head zawiera metadane: kodowanie, viewport, tytuł, arkusze stylów. Widoczna treść jest w body.',
      src: HTML
    },
    {
      id: 'hm-11', t: 'html',
      q: 'Który element zawiera menu nawigacyjne strony?',
      a: ['<nav>', '<menu-bar>', '<navigation>', '<aside>'],
      c: 0,
      why: 'nav oznacza główne bloki linków nawigacyjnych. Lista linków w środku to zwykle <ul><li><a>, jak w materiałach z Lab 5.',
      src: HTML
    },
    {
      id: 'hm-12', t: 'html',
      q: 'Co oznacza `<!doctype html>` na początku dokumentu?',
      a: [
        'Przeglądarka renderuje stronę w trybie standardów HTML5',
        'To komentarz dla programisty',
        'Wczytuje bibliotekę HTML',
        'Ustawia kodowanie UTF-8'
      ],
      c: 0,
      why: 'Bez doctype przeglądarka może wejść w tryb quirks i inaczej liczyć np. box model.',
      src: HTML
    },

    // ---------- Figma ----------
    {
      id: 'fg-01', t: 'figma',
      q: 'Ile widoków prototypu wymaga zadanie z Lab 2?',
      a: [
        'Minimum 5 widoków mobilnych i 5 webowych, zapisanych w PDF',
        'Jeden widok strony głównej',
        '3 widoki dowolnego typu',
        '10 widoków tylko mobilnych'
      ],
      c: 0,
      why: 'Lab 2, zadanie 1: prototyp aplikacji, min. 5 widoków mobilnych i 5 webowych, zgłoszony w PDF.',
      src: 'Lab 2: Zadania'
    },
    {
      id: 'fg-02', t: 'figma',
      q: 'Która funkcja Figmy działa najbardziej jak Flexbox w CSS?',
      a: ['Auto layout', 'Constraints', 'Prototype', 'Comments'],
      c: 0,
      why: 'Auto layout układa elementy w rzędzie lub kolumnie z odstępem (gap), paddingiem i wyrównaniem, tak jak flex-direction, gap i align-items.',
      src: FIGMA
    },
    {
      id: 'fg-03', t: 'figma',
      q: 'Czym jest komponent (component) i instancja w Figmie?',
      a: [
        'Komponent to wzorzec elementu (np. przycisk), instancje to jego kopie aktualizowane po zmianie wzorca',
        'Komponent to cały plik, instancja to strona',
        'To synonimy warstwy i grupy',
        'Instancja to eksport do PNG'
      ],
      c: 0,
      why: 'Zmiana komponentu głównego zmienia wszystkie instancje. To odpowiednik klasy CSS używanej w wielu miejscach.',
      src: FIGMA
    },
    {
      id: 'fg-04', t: 'figma',
      q: 'Do czego w Figmie służy tryb Prototype?',
      a: [
        'Do łączenia ekranów interakcjami (np. kliknięcie przycisku przechodzi do innego widoku) i podglądu przepływu',
        'Do pisania kodu PHP',
        'Do eksportu bazy danych',
        'Do zmiany kolorów na ciemne'
      ],
      c: 0,
      why: 'Prototyp pokazuje, jak użytkownik przechodzi między widokami, zanim powstanie kod.',
      src: FIGMA
    },
    {
      id: 'fg-05', t: 'figma',
      q: 'Jak programista odczyta z projektu w Figmie odstępy, kolory i wartości CSS?',
      a: [
        'Przez panel Inspect / Dev Mode, który pokazuje wymiary, kolory i fragmenty CSS',
        'Tylko mierząc linijką na ekranie',
        'Eksportując projekt do Worda',
        'Nie da się, trzeba zgadywać'
      ],
      c: 0,
      why: 'Lab 3 każe odwzorować z Figmy typografię, kolory, odstępy i obramowania, najlepiej zapisując je jako zmienne CSS.',
      src: FIGMA + ' + Lab 3'
    },
    {
      id: 'fg-06', t: 'figma',
      q: 'Czym w Figmie jest Frame?',
      a: [
        'Kontenerem o określonym rozmiarze, np. ekranem telefonu lub sekcją, który może mieć auto layout',
        'Zwykłą linią',
        'Filtrem rozmycia',
        'Plikiem z czcionką'
      ],
      c: 0,
      why: 'Frame to odpowiednik kontenera (div, section). Gotowe presety mają rozmiary ekranów telefonów i desktopu.',
      src: FIGMA
    },
    {
      id: 'fg-07', t: 'figma',
      q: 'Co określają Constraints elementu w Figmie?',
      a: [
        'Jak element zachowuje się przy zmianie rozmiaru ramki, np. trzyma się prawej krawędzi albo się rozciąga',
        'Kolor obramowania',
        'Kolejność warstw',
        'Uprawnienia do edycji pliku'
      ],
      c: 0,
      why: 'To trochę jak right: 0 lub left i right naraz w CSS. Pomaga zaplanować responsywność.',
      src: FIGMA
    },
    {
      id: 'fg-08', t: 'figma',
      q: 'Który z narzędzi podlinkowanych w Lab 2 generuje projekt interfejsu z opisu przy pomocy AI?',
      a: ['Stitch', 'Docker Desktop', 'pgAdmin', 'Mailpit'],
      c: 0,
      why: 'Lab 2 podaje dwa linki do prototypowania: Stitch (generowanie UI przez AI od Google) i Figma.',
      src: 'Lab 2: linki'
    }
  );
})();
