// Pytania z Lab 1 (Docker, Git), Lab 2 (MVC, Composer) i Lab 4 (vibe coding).
(function () {
  const MVC = 'Lab 2: MVC - routing, kontroler i widoki HTML';
  const COMPOSER = 'Lab 2: MVC - namespace i autoloader Composera';
  const DOCKER = 'Lab 1: Konfiguracja Dockera';
  const GIT = 'Lab 1: Git';
  const AI = 'Lab 4: Vibe Coding';

  window.WDPAI_QUESTIONS.push(
    // ---------- MVC ----------
    {
      id: 'mv-01', t: 'mvc',
      q: 'Jaką rolę pełni plik `public/index.php` w projekcie z Lab 2?',
      a: [
        'Front Controller: jedyny punkt wejścia, który uruchamia routing i przekazuje żądanie do kontrolera',
        'Widok strony głównej',
        'Plik konfiguracyjny Nginx',
        'Model danych użytkownika'
      ],
      c: 0,
      why: 'Każde żądanie HTTP trafia najpierw do index.php, który rejestruje trasy i woła dispatch().',
      src: MVC
    },
    {
      id: 'mv-02', t: 'mvc',
      q: 'Dlaczego katalog `src/` z kontrolerami leży poza katalogiem `public/`?',
      a: [
        'Żeby klasy nie były dostępne bezpośrednio przez adres URL, serwer udostępnia tylko public/',
        'Bo PHP nie potrafi czytać plików z public/',
        'Bo Composer wymaga takiej nazwy',
        'Żeby pliki ładowały się szybciej'
      ],
      c: 0,
      why: 'Dyrektywa root w Nginx wskazuje /app/public. Wszystko poza nim jest niedostępne z przeglądarki.',
      src: MVC
    },
    {
      id: 'mv-03', t: 'mvc',
      q: 'Jak w MVC z Lab 2 podzielone są odpowiedzialności?',
      a: [
        'Router rozpoznaje żądanie, kontroler decyduje, co wykonać, widok opisuje dokument HTML',
        'Widok łączy się z bazą, kontroler generuje CSS, router wyświetla HTML',
        'Kontroler zawiera cały HTML, a router dane',
        'Wszystko jest w jednym pliku index.php'
      ],
      c: 0,
      why: 'Lab 2: każdy element ma jedną odpowiedzialność. To najważniejsza część ćwiczenia.',
      src: MVC
    },
    {
      id: 'mv-04', t: 'mvc',
      q: 'Trasa `/projects/{id}` jest zamieniana na wyrażenie `~^/projects/(?P<id>\\d+)$~`. Który adres zostanie dopasowany?',
      a: ['/projects/abc', '/projects/12', '/projects/12/edit', '/projects/'],
      c: 1,
      why: '\\d+ oznacza co najmniej jedną cyfrę, a ^ i $ wymagają dopasowania całej ścieżki. /projects/abc kończy się odpowiedzią 404.',
      src: MVC
    },
    {
      id: 'mv-05', t: 'mvc',
      q: 'Co oznacza fragment `(?P<id>...)` w wyrażeniu regularnym routera?',
      a: [
        'Grupę nazwaną id: dopasowana wartość trafi do tablicy $matches pod kluczem id',
        'Parametr opcjonalny',
        'Komentarz w wyrażeniu',
        'Nazwę pliku widoku'
      ],
      c: 0,
      why: 'Grupa nazwana pozwala potem odfiltrować z $matches klucze tekstowe i przekazać je do metody kontrolera jako argumenty.',
      src: MVC
    },
    {
      id: 'mv-06', t: 'mvc',
      q: 'Co robi `extract($variables, EXTR_SKIP)` w metodzie render()?',
      a: [
        'Zamienia klucze tablicy na zmienne dostępne w widoku, nie nadpisując już istniejących',
        'Rozpakowuje archiwum ZIP z widokami',
        'Usuwa zmienne z pamięci',
        'Zamienia tablicę na JSON'
      ],
      c: 0,
      why: 'Po render(\'project\', [\'pageTitle\' => \'Start\']) w szablonie dostępna jest zmienna $pageTitle. EXTR_SKIP chroni istniejące zmienne.',
      src: MVC
    },
    {
      id: 'mv-07', t: 'mvc',
      q: 'Dlaczego nazwę szablonu w render() wybiera kontroler, a nie użytkownik w adresie URL?',
      a: [
        'Żeby przeglądarka nie mogła wskazać dowolnego pliku na serwerze do wczytania',
        'Bo adres URL nie może zawierać kropek',
        'Bo tak jest szybciej',
        'Bo widoki nie mają nazw'
      ],
      c: 0,
      why: 'Lista tras jest białą listą. Użytkownik nie podaje nazwy klasy, metody ani pliku, co zapobiega dołączaniu dowolnych plików.',
      src: MVC
    },
    {
      id: 'mv-08', t: 'mvc',
      q: 'Po co w konfiguracji Nginx jest `try_files $uri $uri/ /index.php?$query_string;`?',
      a: [
        'Przekazuje do index.php każdy adres, który nie jest istniejącym plikiem ani katalogiem, dzięki czemu działa routing',
        'Blokuje dostęp do plików PHP',
        'Włącza kompresję gzip',
        'Ustawia port 8080'
      ],
      c: 0,
      why: 'Bez tego wpisu adres /projects/12 dałby 404 z Nginx, zanim żądanie dotarłoby do Front Controllera.',
      src: MVC
    },
    {
      id: 'mv-09', t: 'mvc',
      q: 'Dlaczego AppController w Lab 2 jest abstrakcyjny i ma metodę `protected render()`?',
      a: [
        'Wspólna logika renderowania jest w jednym miejscu, kontrolery ją dziedziczą, a samej klasy bazowej nie da się utworzyć',
        'Bo PHP wymaga, żeby każda klasa była abstrakcyjna',
        'Żeby render() było dostępne z adresu URL',
        'Bo protected przyspiesza wywołania'
      ],
      c: 0,
      why: 'Nie kopiujemy render() do każdego kontrolera. protected sprawia, że metoda jest dostępna w potomkach, ale nie z zewnątrz.',
      src: MVC
    },
    {
      id: 'mv-10', t: 'mvc',
      q: 'Reguła PSR-4 w composer.json: `"App\\\\Controller\\\\": "src/controllers/"`. Gdzie autoloader będzie szukał klasy `App\\Controller\\ProjectController`?',
      a: [
        'src/controllers/ProjectController.php',
        'src/App/Controller/ProjectController.php',
        'vendor/App/ProjectController.php',
        'public/controllers/ProjectController.php'
      ],
      c: 0,
      why: 'Początek przestrzeni nazw App\\Controller\\ jest mapowany na katalog src/controllers/, a reszta nazwy klasy staje się nazwą pliku.',
      src: COMPOSER
    },
    {
      id: 'mv-11', t: 'mvc',
      q: 'Co robi instrukcja `use App\\Routing;` na początku index.php?',
      a: [
        'Pozwala używać krótkiej nazwy Routing w tym pliku, nie wczytuje żadnego pliku',
        'Wczytuje plik src/Routing.php',
        'Tworzy obiekt Routing',
        'Rejestruje trasę /routing'
      ],
      c: 0,
      why: 'Lab 2: use nie wczytuje pliku. To tylko alias nazwy. Za odnalezienie pliku odpowiada autoloader Composera.',
      src: COMPOSER
    },
    {
      id: 'mv-12', t: 'mvc',
      q: 'Zmieniłeś sekcję autoload w composer.json. Jakie polecenie przebuduje mapę klas?',
      a: [
        'docker compose exec php composer dump-autoload',
        'docker compose down',
        'git commit -m "autoload"',
        'php -l composer.json'
      ],
      c: 0,
      why: 'dump-autoload generuje vendor/autoload.php. Katalogu vendor/ nie edytuje się ręcznie i zwykle dodaje się go do .gitignore.',
      src: COMPOSER
    },
    {
      id: 'mv-13', t: 'mvc',
      q: 'Dlaczego w composer.json piszemy `App\\\\Controller\\\\` z podwójnymi ukośnikami?',
      a: [
        'W JSON ukośnik wsteczny trzeba zabezpieczyć drugim, więc zapis oznacza tekst App\\Controller\\',
        'Bo Composer wymaga dwóch poziomów katalogów',
        'Bo to separator Windows',
        'Bo pojedynczy ukośnik oznacza komentarz'
      ],
      c: 0,
      why: 'Lab 2: pierwszy ukośnik zabezpiecza drugi.',
      src: COMPOSER
    },
    {
      id: 'mv-14', t: 'mvc',
      q: 'Klasa działa lokalnie na Windowsie, ale w kontenerze pojawia się „Class not found”. Co sprawdzić najpierw?',
      a: [
        'Wielkość liter w nazwie katalogu i pliku, bo system plików w kontenerze (Linux) ją rozróżnia',
        'Kolor motywu w IDE',
        'Wersję przeglądarki',
        'Liczbę commitów'
      ],
      c: 0,
      why: 'Windows zwykle ignoruje wielkość liter w ścieżkach, Linux nie. ProjectController.php i projectcontroller.php to dla niego różne pliki.',
      src: COMPOSER
    },
    {
      id: 'mv-15', t: 'mvc',
      q: 'Ile instrukcji require_once powinno zostać w kodzie aplikacji po wprowadzeniu autoloadera Composera?',
      a: [
        'Jedna: wczytanie vendor/autoload.php w punkcie wejścia',
        'Po jednej na każdy kontroler',
        'Żadna, Composer działa bez wczytywania',
        'Po jednej w każdym widoku'
      ],
      c: 0,
      why: 'Cel części drugiej Lab 2: w kodzie ma pozostać tylko jedno require_once, a resztą zajmuje się autoloader.',
      src: COMPOSER
    },
    {
      id: 'mv-16', t: 'mvc',
      q: 'Czym jest refactoring wykonany w drugiej części Lab 2?',
      a: [
        'Zmianą organizacji kodu (namespace, autoloader) bez zmiany działania aplikacji i jej adresów',
        'Dodaniem nowych funkcji aplikacji',
        'Przepisaniem aplikacji na inny język',
        'Usunięciem wszystkich testów'
      ],
      c: 0,
      why: 'Adresy i widoki pozostały bez zmian. Zmieniła się tylko struktura kodu.',
      src: COMPOSER
    },

    // ---------- Docker ----------
    {
      id: 'dk-01', t: 'env',
      q: 'Co oznacza wpis `ports: - "8080:80"` w usłudze server?',
      a: [
        'Port 8080 komputera jest połączony z portem 80 kontenera Nginx',
        'Port 80 komputera jest połączony z portem 8080 kontenera',
        'Kontener ma 8080 MB pamięci',
        'Nginx obsłuży maksymalnie 80 połączeń'
      ],
      c: 0,
      why: 'Format to HOST:KONTENER. Dlatego aplikację otwiera się pod http://localhost:8080.',
      src: DOCKER
    },
    {
      id: 'dk-02', t: 'env',
      q: 'Co daje wpis `volumes: - .:/app`?',
      a: [
        'Bieżący katalog projektu jest widoczny w kontenerze jako /app, zmiany w plikach widać od razu',
        'Kopiuje projekt do obrazu tylko raz przy budowaniu',
        'Tworzy kopię zapasową projektu',
        'Ustawia głośność logów'
      ],
      c: 0,
      why: 'Wolumen montuje katalog z komputera. Dzięki temu Nginx i PHP-FPM widzą ten sam kod.',
      src: DOCKER
    },
    {
      id: 'dk-03', t: 'env',
      q: 'Jak Nginx przekazuje wykonanie pliku .php do kontenera PHP?',
      a: [
        'Przez FastCGI na adres php:9000, gdzie php to nazwa usługi w sieci Dockera',
        'Kopiuje plik do przeglądarki',
        'Przez połączenie SSH',
        'Wykonuje PHP samodzielnie'
      ],
      c: 0,
      why: 'fastcgi_pass php:9000. Kontenery w jednej sieci odnajdują się po nazwach usług.',
      src: DOCKER
    },
    {
      id: 'dk-04', t: 'env',
      q: 'Czy PHP-FPM jest dostępny bezpośrednio z przeglądarki?',
      a: [
        'Nie, nasłuchuje wewnątrz sieci Dockera, wykonuje skrypt i odsyła wynik do Nginx',
        'Tak, pod adresem localhost:9000',
        'Tak, ale tylko w Chrome',
        'Tak, jeśli dodamy plik index.html'
      ],
      c: 0,
      why: 'Przeglądarka rozmawia z Nginx. PHP-FPM jest usługą wewnętrzną, w compose nie ma dla niego mapowania portów.',
      src: DOCKER
    },
    {
      id: 'dk-05', t: 'env',
      q: 'Co robi `docker compose up --build -d`?',
      a: [
        'Buduje obrazy i uruchamia kontenery w tle',
        'Usuwa kontenery i sieć',
        'Pokazuje logi na żywo',
        'Sprawdza tylko składnię pliku compose'
      ],
      c: 0,
      why: '--build przebudowuje obrazy, -d (detached) uruchamia w tle. Składnię sprawdza docker compose config.',
      src: DOCKER
    },
    {
      id: 'dk-06', t: 'env',
      q: 'Które polecenie zatrzymuje i usuwa kontenery oraz sieć projektu?',
      a: ['docker compose down', 'docker compose ps', 'docker compose restart', 'docker compose logs -f'],
      c: 0,
      why: 'ps pokazuje stan usług, restart ponownie uruchamia działające usługi, logs -f wyświetla logi na żywo.',
      src: DOCKER
    },
    {
      id: 'dk-07', t: 'env',
      q: 'Uporządkuj drogę żądania. Co dzieje się zaraz po tym, jak Nginx rozpozna żądanie do index.php?',
      a: [
        'Przekazuje ścieżkę skryptu do usługi php:9000, a PHP-FPM wykonuje plik i zwraca HTML',
        'Przeglądarka pobiera plik index.php i go wykonuje',
        'Docker restartuje kontener',
        'Composer generuje autoloader'
      ],
      c: 0,
      why: 'Przeglądarka → localhost:8080 → port 80 kontenera server → Nginx → php:9000 → PHP-FPM → HTML → Nginx → przeglądarka.',
      src: DOCKER
    },
    {
      id: 'dk-08', t: 'env',
      q: 'Do czego w Lab 1 (zadanie 3) służy rozszerzenie PHP `pdo_pgsql`?',
      a: [
        'Do łączenia się z PostgreSQL przez PDO',
        'Do generowania miniatur zdjęć',
        'Do obsługi archiwów ZIP',
        'Do precyzyjnych obliczeń na kwotach'
      ],
      c: 0,
      why: 'Miniatury to gd, ZIP to zip, obliczenia na dużych liczbach to bcmath. PDO to uniwersalny interfejs, a pdo_pgsql to jego sterownik dla PostgreSQL.',
      src: 'Lab 1: Zadania'
    },

    // ---------- Git ----------
    {
      id: 'gt-01', t: 'env',
      q: 'Przypadkiem zacommitowałeś plik .env z hasłem, a w następnym commicie go usunąłeś. Czy problem zniknął?',
      a: [
        'Tak, usunięcie pliku wystarczy',
        'Nie, sekret nadal jest w historii, trzeba go natychmiast unieważnić',
        'Tak, jeśli repozytorium jest prywatne',
        'Tak, po wykonaniu git status'
      ],
      c: 1,
      why: 'Lab 1: usunięcie sekretu w kolejnym commicie nie usuwa go z historii. Dlatego .gitignore przygotowuje się przed pierwszym git add.',
      src: GIT
    },
    {
      id: 'gt-02', t: 'env',
      q: 'Czym różni się rebase od merge?',
      a: [
        'rebase odtwarza commity na nowej podstawie i zmienia ich identyfikatory, merge łączy historie bez zmiany commitów',
        'merge usuwa commity, rebase je zachowuje',
        'Nie ma różnicy',
        'rebase działa tylko na GitHubie'
      ],
      c: 0,
      why: 'Rebase daje liniową historię, ale stosuje się go głównie na własnym, lokalnym branchu. Merge jest bezpieczny dla branchy współdzielonych.',
      src: GIT
    },
    {
      id: 'gt-03', t: 'env',
      q: 'Którą opcję łączenia Pull Requesta zaleca prowadzący w projekcie zaliczeniowym?',
      a: ['Squash and merge', 'Create a merge commit', 'Rebase and merge z force push', 'Usunięcie brancha bez łączenia'],
      c: 1,
      why: 'Historia pracy podlega ocenie. Squash połączyłby całą pracę w jeden commit i ukrył przebieg projektu.',
      src: GIT
    },
    {
      id: 'gt-04', t: 'env',
      q: 'Co robi `git push -u origin main`?',
      a: [
        'Wysyła main na origin i łączy lokalny main ze zdalnym origin/main, więc później wystarczy git push',
        'Usuwa zdalny branch main',
        'Pobiera zmiany z origin',
        'Tworzy nowe repozytorium na GitHubie'
      ],
      c: 0,
      why: '-u (--set-upstream) ustawia śledzony branch zdalny.',
      src: GIT
    },
    {
      id: 'gt-05', t: 'env',
      q: 'Który prefiks commita z Lab 1 pasuje do zmiany „skonfigurowanie nginx”?',
      a: ['feat', 'fix', 'chore', 'docs'],
      c: 2,
      why: 'chore oznacza konfigurację (przykład z materiałów: chore: configure nginx). feat to nowa funkcja, fix naprawa błędu, docs dokumentacja.',
      src: GIT
    },
    {
      id: 'gt-06', t: 'env',
      q: 'Co pokazuje `git diff --cached`?',
      a: [
        'Zmiany dodane do poczekalni (staged), które trafią do następnego commita',
        'Zmiany, których jeszcze nie dodano przez git add',
        'Różnice między branchami zdalnymi',
        'Listę ostatnich commitów'
      ],
      c: 0,
      why: 'Lab 1: przed commitem przeczytaj git diff --cached i nie używaj bezrefleksyjnie git add .',
      src: GIT
    },
    {
      id: 'gt-07', t: 'env',
      q: 'Czym jest branch w Git?',
      a: [
        'Ruchomym wskaźnikiem na serię commitów',
        'Kopią całego katalogu projektu na dysku',
        'Osobnym repozytorium',
        'Plikiem z listą zmian'
      ],
      c: 0,
      why: 'Branch pozwala rozwijać funkcję poza stabilnym main. Nazwy po angielsku, np. feature/login-form.',
      src: GIT
    },
    {
      id: 'gt-08', t: 'env',
      q: 'Co robi `git pull --ff-only`?',
      a: [
        'Pobiera zmiany tylko wtedy, gdy da się przesunąć branch do przodu bez tworzenia commita scalającego',
        'Wymusza nadpisanie zdalnego brancha',
        'Usuwa lokalne zmiany',
        'Łączy zmiany przez rebase'
      ],
      c: 0,
      why: 'Jeśli lokalny main rozjechał się ze zdalnym, polecenie odmówi zamiast tworzyć przypadkowy merge.',
      src: GIT
    },
    {
      id: 'gt-09', t: 'env',
      q: 'Czego nie należy robić na tym etapie kursu według Lab 1?',
      a: [
        'git push --force na main',
        'Tworzyć branchy feature/',
        'Pisać README',
        'Opisywać Pull Requestów'
      ],
      c: 0,
      why: 'Lab 1: unikaj force push i nigdy nie używaj git push --force na main. Nie wykonuj też rebase na branchu współdzielonym.',
      src: GIT
    },

    // ---------- AI ----------
    {
      id: 'ai-01', t: 'ai',
      q: 'Jaka jest najważniejsza zasada Lab 4 dotycząca pracy z AI?',
      a: [
        'AI jest współpracownikiem, a nie właścicielem decyzji: człowiek odpowiada za wymagania, bezpieczeństwo, testy i kod',
        'AI pisze cały kod, człowiek tylko go wkleja',
        'Należy zawsze włączać tryb pełnej autonomii',
        'Kod od AI nie wymaga testów'
      ],
      c: 0,
      why: 'Model może zaproponować rozwiązanie, ale to człowiek odpowiada za ostateczny kod.',
      src: AI
    },
    {
      id: 'ai-02', t: 'ai',
      q: 'Dlaczego przed większym zadaniem dla agenta AI warto zrobić commit?',
      a: [
        'Commit jest punktem powrotu, a diff po zadaniu pokazuje dokładnie, co agent zmienił',
        'Bo agent nie działa bez commitów',
        'Żeby agent mógł wysłać kod na produkcję',
        'Żeby zwiększyć liczbę commitów'
      ],
      c: 0,
      why: 'Lab 4: używaj Git. Commit przed zadaniem jest punktem powrotu, a commit po zadaniu dokumentuje rezultat.',
      src: AI
    },
    {
      id: 'ai-03', t: 'ai',
      q: 'Czym jest plik AGENTS.md?',
      a: [
        'Plikiem z trwałymi wskazówkami dla agentów: struktura projektu, polecenia testów, konwencje i ograniczenia',
        'Listą autorów projektu dla prowadzącego',
        'Plikiem z kluczami API do modeli',
        'Zamiennikiem README dla ludzi'
      ],
      c: 0,
      why: 'AGENTS.md nie zastępuje README. README jest dla ludzi, AGENTS.md zawiera zwięzłe reguły operacyjne dla agenta. Sekretów nie umieszcza się w żadnym z nich.',
      src: AI
    },
    {
      id: 'ai-04', t: 'ai',
      q: 'Co według Lab 4 powinien opisywać dobry prompt do agenta?',
      a: [
        'Cel, kontekst, ograniczenia i sposób weryfikacji',
        'Tylko krótkie polecenie „zrób stronę”',
        'Hasło do bazy danych, żeby agent miał dostęp',
        'Wyłącznie oczekiwany kolor interfejsu'
      ],
      c: 0,
      why: '„Zrób stronę” zostawia modelowi zbyt wiele decyzji. Prompt nie musi być długi, ale powinien być sprawdzalny.',
      src: AI
    },
    {
      id: 'ai-05', t: 'ai',
      q: 'Jaka jest korzyść, a jakie ograniczenie modelu uruchomionego lokalnie przez Ollamę?',
      a: [
        'Dane nie opuszczają komputera i nie płacisz za zapytania, ale jakość i szybkość zależą od modelu i sprzętu',
        'Zawsze jest lepszy od modeli w chmurze',
        'Nie wymaga żadnej pamięci RAM',
        'Działa tylko z językiem PHP'
      ],
      c: 0,
      why: 'Ollama pozwala pobierać i uruchamiać modele lokalnie oraz udostępnia lokalne API. Większy kontekst zużywa więcej pamięci.',
      src: AI
    },
    {
      id: 'ai-06', t: 'ai',
      q: 'Agent poprawił kod i pewnie opisał, że wszystko działa. Co robisz?',
      a: [
        'Czytam diff i uruchamiam testy lub sprawdzam działanie, bo płynne wyjaśnienie nie dowodzi poprawności',
        'Od razu wysyłam zmiany na main',
        'Proszę agenta, żeby jeszcze raz napisał, że działa',
        'Wyłączam zabezpieczenia, żeby szybciej skończył'
      ],
      c: 0,
      why: 'Lab 4: czytaj diff, uruchamiaj testy, weryfikuj biblioteki. Model może wymyślić nieistniejącą funkcję lub pakiet.',
      src: AI
    }
  );
})();
