// Pytania z PHP (Lab 6): podstawy, obiektowość, formularze i HTTP.
(function () {
  const BASIC = 'Lab 6: PHP - podstawy (PDF)';
  const OOP = 'Lab 6: PHP - podejście obiektowe (PDF)';
  const GOOD = 'Lab 6: PHP - dobre praktyki (PDF)';
  const VIEW = 'Lab 3: Wyświetlanie danych (PDF)';
  const LAB6 = 'Lab 6: formularze, HTTP, walidacja (temat zajęć)';
  const XDEBUG = 'Lab 6: XDEBUG (link z zajęć)';

  window.WDPAI_QUESTIONS.push(
    // ---------- PHP podstawy ----------
    {
      id: 'ph-01', t: 'php',
      q: 'Gdzie wykonywany jest kod PHP i co dostaje przeglądarka?',
      a: [
        'W przeglądarce, która dostaje kod źródłowy PHP',
        'Na serwerze, a przeglądarka dostaje tylko wygenerowany wynik (np. HTML)',
        'W bazie danych, a przeglądarka dostaje zapytania SQL',
        'Częściowo na serwerze i częściowo w przeglądarce'
      ],
      c: 1,
      why: 'Materiały: PHP to kod wykonywany po stronie serwera, niewidoczny dla klienta.',
      src: BASIC
    },
    {
      id: 'ph-02', t: 'php',
      q: 'Co wypisze ten kod?',
      code: `<?php
$kolor = "red";
echo "Kolor: " . $KOLOR;`,
      a: [
        'Kolor: red',
        'Kolor: (pusto) oraz ostrzeżenie o niezdefiniowanej zmiennej $KOLOR',
        'Błąd składni, bo echo jest małymi literami',
        'Kolor: RED'
      ],
      c: 1,
      why: 'Wielkość liter w nazwach zmiennych ma znaczenie: $kolor i $KOLOR to różne zmienne. Za to słowa kluczowe i nazwy funkcji (ECHO, EcHo) nie rozróżniają wielkości liter.',
      src: BASIC
    },
    {
      id: 'ph-03', t: 'php',
      q: 'Który operator łączy (konkatenuje) napisy w PHP?',
      a: ['+', '.', '&', '++'],
      c: 1,
      why: 'W PHP napisy łączy kropka, np. "Kolor: " . $kolor. Plus jest operatorem arytmetycznym.',
      src: BASIC
    },
    {
      id: 'ph-04', t: 'php',
      q: 'Co wypiszą te dwie linie, jeśli `$imie = "Ala";`?',
      code: `echo "Cześć $imie";
echo 'Cześć $imie';`,
      a: [
        'Cześć Ala oraz Cześć Ala',
        'Cześć Ala oraz Cześć $imie',
        'Cześć $imie oraz Cześć Ala',
        'Obie linie spowodują błąd'
      ],
      c: 1,
      why: 'W cudzysłowie podwójnym zmienne są podstawiane (interpolacja). W apostrofach tekst jest brany dosłownie.',
      src: BASIC
    },
    {
      id: 'ph-05', t: 'php',
      q: 'Co wypisze `var_dump(047);`?',
      a: ['int(47)', 'int(39)', 'string(3) "047"', 'float(47)'],
      c: 1,
      why: 'Liczba z zerem na początku jest zapisem ósemkowym: 4 × 8 + 7 = 39. var_dump pokazuje typ i wartość.',
      src: BASIC
    },
    {
      id: 'ph-06', t: 'php',
      q: 'Jaką wartość ma `$x = 0x8C;`?',
      a: ['140', '88', '812', '8C jako tekst'],
      c: 0,
      why: '0x oznacza zapis szesnastkowy: 8 × 16 + 12 = 140.',
      src: BASIC
    },
    {
      id: 'ph-07', t: 'php',
      q: 'Do czego służy funkcja `var_dump($zmienna)`?',
      a: [
        'Usuwa zmienną z pamięci',
        'Wyświetla informacje o zmiennej: typ i wartość',
        'Zapisuje zmienną do pliku',
        'Zamienia zmienną na JSON'
      ],
      c: 1,
      why: 'var_dump to podstawowe narzędzie diagnostyczne. Typów zmiennych w PHP nie deklarujemy, więc var_dump pokazuje, jaki typ wynika z przypisanej wartości.',
      src: BASIC
    },
    {
      id: 'ph-08', t: 'php',
      q: 'Co robi `htmlspecialchars()` i dlaczego używamy jej w widokach?',
      a: [
        'Zamienia znaki takie jak < > & " na encje HTML, co chroni przed wstrzyknięciem kodu (XSS)',
        'Usuwa polskie znaki z tekstu',
        'Szyfruje tekst algorytmem MD5',
        'Zamienia tekst na wielkie litery'
      ],
      c: 0,
      why: 'Dane wyświetlane w HTML zabezpieczamy przez htmlspecialchars(), żeby tekst od użytkownika nie został zinterpretowany jako znaczniki lub skrypt.',
      src: 'Lab 2: MVC, widoki HTML'
    },
    {
      id: 'ph-09', t: 'php',
      q: 'Co zwraca `explode(" ", "Ala ma kota")`?',
      a: [
        'Napis "Alamakota"',
        'Tablicę ["Ala", "ma", "kota"]',
        'Liczbę 3',
        'Napis "Ala ma kota" z encjami HTML'
      ],
      c: 1,
      why: 'explode dzieli napis według separatora na tablicę. implode działa odwrotnie i skleja tablicę w napis.',
      src: BASIC
    },
    {
      id: 'ph-10', t: 'php',
      q: 'Któremu zapisowi odpowiada `<?= $item->getName() ?>` w widoku?',
      a: [
        '<?php echo $item->getName(); ?>',
        '<?php return $item->getName(); ?>',
        '<?php if ($item->getName()): ?>',
        '<!-- $item->getName() -->'
      ],
      c: 0,
      why: 'Krótki znacznik <?= wypisuje wartość wyrażenia, pomijając jawne echo.',
      src: VIEW
    },
    {
      id: 'ph-11', t: 'php',
      q: 'Który zapis NIE jest komentarzem w PHP?',
      a: ['// komentarz', '# komentarz', '/* komentarz */', '<!-- komentarz -->'],
      c: 3,
      why: '<!-- --> to komentarz HTML. W PHP komentarze to //, # i /* */.',
      src: BASIC
    },
    {
      id: 'ph-12', t: 'php',
      q: 'Jak wygląda współczesny zapis tablicy asocjacyjnej w PHP?',
      a: [
        '$a = ["foo" => "bar", "bar" => "foo"];',
        '$a = {"foo": "bar", "bar": "foo"};',
        '$a = ("foo" = "bar");',
        '$a = new Array("foo", "bar");'
      ],
      c: 0,
      why: 'Materiały: deklaracja przez array(...) nadal działa, ale obecnie stosuje się krótszą formę z nawiasami [ ].',
      src: BASIC
    },
    {
      id: 'ph-13', t: 'php',
      q: 'Która składnia alternatywna pozwala czytelnie wyświetlać listę w widoku PHP?',
      code: `<?php foreach ($projects as $project): ?>
  <li><?= htmlspecialchars($project->getTitle()) ?></li>
<?php ______; ?>`,
      a: ['end', 'endforeach', '}', 'done'],
      c: 1,
      why: 'W szablonach używa się składni z dwukropkiem i słowami zamykającymi: endforeach, endif, endwhile. Ułatwia to czytanie mieszanki PHP i HTML.',
      src: VIEW
    },
    {
      id: 'ph-14', t: 'php',
      q: 'Co zmienia `declare(strict_types=1);` na początku pliku?',
      a: [
        'Wymusza ścisłe typy skalarne: przekazanie "5" do parametru int rzuci TypeError zamiast konwersji',
        'Zabrania używania zmiennych globalnych',
        'Włącza wyświetlanie wszystkich błędów',
        'Wymusza deklarowanie typu każdej zmiennej'
      ],
      c: 0,
      why: 'Bez strict_types PHP próbuje konwertować wartości do zadeklarowanych typów. Z nim wywołania z pliku muszą przekazywać dokładnie zgodne typy.',
      src: 'Lab 2: MVC, routing'
    },
    {
      id: 'ph-15', t: 'php',
      q: 'Którą funkcją należy haszować hasła użytkowników?',
      a: ['md5()', 'sha1()', 'password_hash()', 'crc32()'],
      c: 2,
      why: 'md5, sha1 i crc32 z materiałów służą do sum kontrolnych. Do haseł służy password_hash() (z solą i wolnym algorytmem), a do sprawdzania password_verify().',
      src: BASIC + ' + dobre praktyki'
    },
    {
      id: 'ph-16', t: 'php',
      q: 'Co wypisze `echo print "A";`?',
      a: ['A', 'A1', '1A', 'Błąd składni'],
      c: 1,
      why: 'print wypisuje „A” i zwraca 1, które następnie wypisuje echo. Przykład pochodzi z materiałów o zmiennych.',
      src: BASIC
    },

    // ---------- PHP obiektowo ----------
    {
      id: 'oo-01', t: 'oop',
      q: 'Ile klas bazowych może rozszerzać (extends) klasa w PHP?',
      a: ['Dowolnie wiele', 'Dokładnie jedną', 'Maksymalnie dwie', 'Żadnej, PHP nie ma dziedziczenia'],
      c: 1,
      why: 'Materiały: rozszerzona klasa zawsze zależy od pojedynczej klasy bazowej, dziedziczenie wielokrotne nie jest obsługiwane. Wiele typów można dodać przez interfejsy.',
      src: OOP
    },
    {
      id: 'oo-02', t: 'oop',
      q: 'Co wypisze ten kod?',
      code: `class A {
    public function foo() { return 'A'; }
}
class B extends A {
    public function foo() { return 'B+' . parent::foo(); }
}
echo (new B)->foo();`,
      a: ['A', 'B', 'B+A', 'B+B'],
      c: 2,
      why: 'parent:: odwołuje się do implementacji z klasy bazowej, nawet jeśli klasa potomna ją nadpisała.',
      src: OOP
    },
    {
      id: 'oo-03', t: 'oop',
      q: 'Co wypisze `$b->foo()`?',
      code: `class A {
    public function foo() { return self::boo(); }
    public function boo() { return 'A::boo()'; }
}
class B extends A {
    public function boo() { return 'B::boo()'; }
}
$b = new B;`,
      a: ['A::boo()', 'B::boo()', 'Błąd, bo boo nie jest statyczna', 'Nic'],
      c: 0,
      why: 'self wskazuje klasę, w której kod został napisany (A), nawet gdy metodę nadpisano w potomnej. Gdyby było static::boo(), wynik zależałby od klasy obiektu (B).',
      src: OOP
    },
    {
      id: 'oo-04', t: 'oop',
      q: 'Co wypisze `echo get_class(B::create());`?',
      code: `class A {
    public static function create() { return new static; }
}
class B extends A {}`,
      a: ['A', 'B', 'static', 'Błąd'],
      c: 1,
      why: 'new static używa późnego wiązania statycznego: tworzy obiekt klasy, na której wywołano metodę. new self zawsze utworzyłoby A.',
      src: OOP
    },
    {
      id: 'oo-05', t: 'oop',
      q: 'Na co wskazuje `$this` wewnątrz metody?',
      a: [
        'Na klasę jako całość',
        'Na obiekt, na którym metoda została wywołana',
        'Na klasę bazową',
        'Na plik, w którym jest klasa'
      ],
      c: 1,
      why: '$this to referencja do bieżącego obiektu. Do jego pól i metod dostajemy się operatorem ->, pomijając znak dolara przy nazwie pola.',
      src: OOP
    },
    {
      id: 'oo-06', t: 'oop',
      q: 'Co wypisze ten kod?',
      code: `$a = new Klasa("pierwszy");
$b = $a;
$b->nazwa = "druga";
echo $a->nazwa;`,
      a: ['pierwszy', 'druga', 'Błąd, bo $b jest kopią', 'Pusty napis'],
      c: 1,
      why: 'Przypisanie obiektu nie tworzy kopii. Obie zmienne przechowują uchwyt do tego samego obiektu, więc zmiana przez $b jest widoczna w $a.',
      src: OOP
    },
    {
      id: 'oo-07', t: 'oop',
      q: 'Jak zrobić niezależną kopię obiektu?',
      a: ['$kopia = $obiekt;', '$kopia = clone $obiekt;', '$kopia = new $obiekt;', '$kopia = &$obiekt;'],
      c: 1,
      why: 'clone tworzy nowy obiekt z tymi samymi wartościami pól. Przypisanie lub referencja wskazują ten sam obiekt.',
      src: OOP
    },
    {
      id: 'oo-08', t: 'oop',
      q: 'Obiekt Osoba ma pole z obiektem Wyksztalcenie. Po `clone` zmiana wykształcenia w oryginale zmienia je też w kopii. Co trzeba dodać?',
      a: [
        'Metodę __clone(), która klonuje zawarty obiekt: $this->wyksztalcenie = clone $this->wyksztalcenie;',
        'Metodę __construct() bez parametrów',
        'Słowo final przed klasą',
        'Nic, tak działa clone i nie da się tego zmienić'
      ],
      c: 0,
      why: 'clone robi płytką kopię: pola z obiektami nadal wskazują te same obiekty. __clone() wykonuje się na kopii i może sklonować obiekty zagnieżdżone.',
      src: OOP
    },
    {
      id: 'oo-09', t: 'oop',
      q: 'Co sprawdza operator `===` dla dwóch zmiennych z obiektami?',
      a: [
        'Czy obiekty mają te same wartości pól',
        'Czy obie zmienne wskazują dokładnie ten sam obiekt (tę samą instancję)',
        'Czy obiekty są tej samej klasy',
        'Czy obiekty mają tyle samo metod'
      ],
      c: 1,
      why: 'Przykład z materiałów: po $z2 = $z1 wynik to „ten sam obiekt”, a po $z2 = clone $z1 „rozne obiekty”. == porównałoby wartości pól.',
      src: OOP
    },
    {
      id: 'oo-10', t: 'oop',
      q: 'Pole ma być niewidoczne z zewnątrz klasy, ale dostępne w klasach dziedziczących. Jaki modyfikator wybierzesz?',
      a: ['public', 'private', 'protected', 'static'],
      c: 2,
      why: 'protected: niewidoczne na zewnątrz, dziedziczone. private: niewidoczne na zewnątrz i niedostępne w potomnych. public: widoczne wszędzie.',
      src: GOOD
    },
    {
      id: 'oo-11', t: 'oop',
      q: 'Klasa Student rozszerza Osoba i ma własny konstruktor. Czy konstruktor Osoba wykona się automatycznie?',
      a: [
        'Tak, zawsze przed konstruktorem Student',
        'Nie, trzeba go wywołać jawnie: parent::__construct(...)',
        'Tak, ale tylko gdy nie ma parametrów',
        'Nie, a wywołanie go jest zabronione'
      ],
      c: 1,
      why: 'Materiały: w PHP wywołanie konstruktora klasy bazowej w konstruktorze klasy potomnej nigdy nie jest automatyczne.',
      src: GOOD
    },
    {
      id: 'oo-12', t: 'oop',
      q: 'Które zdanie o klasie abstrakcyjnej jest prawdziwe?',
      a: [
        'Można utworzyć jej obiekt przez new',
        'Nie można utworzyć jej obiektu, ale może zawierać zwykłe metody z ciałem, które odziedziczą potomkowie',
        'Może zawierać tylko metody abstrakcyjne',
        'Klasa może rozszerzać wiele klas abstrakcyjnych'
      ],
      c: 1,
      why: 'Klasa abstrakcyjna jest wzorcem. W projekcie z Lab 2 AppController jest abstrakcyjny i daje potomkom gotową metodę render().',
      src: GOOD
    },
    {
      id: 'oo-13', t: 'oop',
      q: 'Klasa implementuje interfejs, ale nie ma jednej z jego metod. Co się stanie?',
      a: [
        'PHP doda pustą metodę automatycznie',
        'PHP zgłosi błąd krytyczny',
        'Metoda zostanie odziedziczona z interfejsu',
        'Nic, interfejs to tylko komentarz'
      ],
      c: 1,
      why: 'Interfejs definiuje nagłówki metod. Klasa musi zaimplementować wszystkie, inaczej PHP generuje błąd krytyczny. Jedna klasa może implementować wiele interfejsów.',
      src: GOOD
    },
    {
      id: 'oo-14', t: 'oop',
      q: 'Co oznacza `final class Student extends Osoba {}`?',
      a: [
        'Klasa Student nie może mieć metod',
        'Żadna klasa nie może dziedziczyć po Student',
        'Student nie może dziedziczyć po Osoba',
        'Obiekt Student nie może być zmieniany po utworzeniu'
      ],
      c: 1,
      why: 'final przed klasą blokuje dziedziczenie, a przed metodą jej nadpisywanie. W Lab 2 kontrolery są oznaczone jako final.',
      src: GOOD
    },
    {
      id: 'oo-15', t: 'oop',
      q: 'Którą metodę magiczną trzeba zdefiniować, żeby `echo $student;` wypisało imię zamiast błędu?',
      a: ['__get()', '__invoke()', '__toString()', '__print()'],
      c: 2,
      why: '__toString() jest wywoływana, gdy obiekt jest używany jako napis. Bez niej PHP zgłasza „Object of class Student could not be converted to string”.',
      src: GOOD
    },
    {
      id: 'oo-16', t: 'oop',
      q: 'Kiedy wywoływana jest metoda magiczna `__get()`?',
      a: [
        'Przy każdym odczycie publicznego pola',
        'Przy odczycie nieistniejącej lub niedostępnej właściwości',
        'Przy tworzeniu obiektu',
        'Przy wywołaniu nieistniejącej metody'
      ],
      c: 1,
      why: '__get() obsługuje odczyt nieistniejącej (lub niedostępnej) właściwości. Nieistniejącą metodę obsługuje __call().',
      src: GOOD
    },
    {
      id: 'oo-17', t: 'oop',
      q: 'Jak odczytać stałą klasy zdefiniowaną jako `const ROLE_ADMIN = \'admin\';` w klasie Osoba?',
      a: ['Osoba::ROLE_ADMIN', '$osoba->$ROLE_ADMIN', 'Osoba->ROLE_ADMIN', 'Osoba::$ROLE_ADMIN'],
      c: 0,
      why: 'Stałych nie poprzedza się znakiem $ ani przy deklaracji, ani przy odczycie. Dostęp jest przez nazwę klasy i operator ::.',
      src: GOOD
    },
    {
      id: 'oo-18', t: 'oop',
      q: 'Kiedy PHP wywołuje `__destruct()`?',
      a: [
        'Gdy obiekt przestaje istnieć, np. po unset() ostatniej zmiennej, która go wskazuje',
        'Przy każdym wywołaniu metody',
        'Tylko przy ręcznym wywołaniu $obj->__destruct()',
        'Przed konstruktorem'
      ],
      c: 0,
      why: 'Destruktor to bezparametrowa metoda wywoływana automatycznie, gdy obiekt jest niszczony. W przykładzie z materiałów unset($osoba) wypisuje „obiekt zniszczony!”.',
      src: GOOD
    },
    {
      id: 'oo-19', t: 'oop',
      q: 'Co wypisze ten kod?',
      code: `<?php
namespace Lab08;

class Osoba {}

echo Osoba::class;`,
      a: ['Osoba', 'Lab08\\Osoba', 'class Osoba', 'Błąd, bo obiekt nie został utworzony'],
      c: 1,
      why: '::class zwraca pełną nazwę klasy z przestrzenią nazw, bez tworzenia obiektu. Ten sam mechanizm służy w routingu do podania ProjectController::class.',
      src: OOP
    },
    {
      id: 'oo-20', t: 'oop',
      q: 'Gdzie w pliku musi stać deklaracja `namespace`?',
      a: [
        'Jako pierwsza instrukcja w pliku (dopuszczalne jest przed nią tylko declare)',
        'Na końcu pliku',
        'Wewnątrz klasy',
        'W dowolnym miejscu przed użyciem klasy'
      ],
      c: 0,
      why: 'Materiały: przestrzeń nazw musi zostać zdefiniowana jako pierwsza instrukcja w pliku. W projekcie z Lab 2 stoi zaraz po declare(strict_types=1).',
      src: OOP
    },
    {
      id: 'oo-21', t: 'oop',
      q: 'Co robi `use App\\Controller\\ProjectController as PC;`?',
      a: [
        'Wczytuje plik z klasą',
        'Tworzy obiekt klasy ProjectController',
        'Tworzy alias PC dla pełnej nazwy klasy w bieżącym pliku',
        'Kopiuje klasę do nowej przestrzeni nazw'
      ],
      c: 2,
      why: 'use importuje nazwę, a as nadaje jej alias. use niczego nie wczytuje, plik ładuje autoloader.',
      src: OOP
    },
    {
      id: 'oo-22', t: 'oop',
      q: 'Co zapisuje `serialize($obiekt)`?',
      a: [
        'Wartości wszystkich pól obiektu i nazwę klasy, ale nie kod metod',
        'Cały kod klasy razem z metodami',
        'Tylko pola publiczne',
        'Obrazek z widokiem obiektu'
      ],
      c: 0,
      why: 'Do unserialize() klasa musi być zdefiniowana w skrypcie, który odtwarza obiekt, bo metody nie są zapisywane.',
      src: GOOD
    },
    {
      id: 'oo-23', t: 'oop',
      q: 'Po co nad funkcją pisze się komentarz `/** @param Osoba $osoba */`?',
      a: [
        'Żeby edytor wiedział, jakiego typu jest parametr, i podpowiadał jego metody',
        'Żeby PHP sprawdzał typ w czasie działania',
        'Żeby funkcja była szybsza',
        'Żeby ukryć funkcję przed innymi plikami'
      ],
      c: 0,
      why: 'Adnotacja PHPDoc nie zmienia działania kodu, ale daje IDE informację o typie i włącza autouzupełnianie. Typ w sygnaturze (Osoba $osoba) dodatkowo wymusza go w czasie działania.',
      src: OOP
    },
    {
      id: 'oo-24', t: 'oop',
      q: 'Co oznacza zapis `$nowy = $obiekt ?: new Object();`?',
      a: [
        'Jeśli $obiekt jest prawdziwy (np. nie null), przypisz go, w przeciwnym razie utwórz nowy obiekt',
        'Zawsze utwórz nowy obiekt',
        'Porównaj $obiekt z nowym obiektem',
        'Błąd składni'
      ],
      c: 0,
      why: 'Operator Elvis ?: to skrót od $obiekt ? $obiekt : new Object(). Chroni przed wywołaniem metody na null.',
      src: GOOD
    },
    {
      id: 'oo-25', t: 'oop',
      q: 'Jak nazywa się ukrywanie pól klasy (private) i udostępnianie ich przez metody get/set?',
      a: ['Polimorfizm', 'Hermetyzacja (enkapsulacja)', 'Serializacja', 'Dziedziczenie'],
      c: 1,
      why: 'Metoda ustawiająca wartość to mutator (setter), odczytująca to akcesor (getter). Materiały podkreślają, że publiczne pola nie są dobrą praktyką.',
      src: OOP
    },
    {
      id: 'oo-26', t: 'oop',
      q: 'Co robi `$controller = new $controllerClass();` w routerze z Lab 2?',
      a: [
        'Tworzy obiekt klasy, której nazwa jest zapisana w zmiennej',
        'Tworzy kopię zmiennej $controllerClass',
        'Rzuca błąd, bo po new musi stać nazwa klasy',
        'Wczytuje plik o nazwie $controllerClass'
      ],
      c: 0,
      why: 'PHP pozwala tworzyć obiekty z nazwy klasy przechowywanej w napisie. Jeśli klasa jest w przestrzeni nazw, napis musi zawierać pełną nazwę.',
      src: OOP + ' + Lab 2'
    },

    // ---------- Formularze, HTTP, błędy ----------
    {
      id: 'ht-01', t: 'http',
      q: 'Czym różni się wysłanie formularza metodą GET od POST?',
      a: [
        'GET przesyła dane w adresie URL (query string), POST w treści żądania',
        'GET jest szyfrowany, POST nie',
        'POST działa tylko z JavaScriptem',
        'Nie ma różnicy poza nazwą'
      ],
      c: 0,
      why: 'Dane GET widać w adresie i trafiają do historii przeglądarki. Formularze, które zmieniają dane (rejestracja, dodanie projektu), wysyła się metodą POST.',
      src: LAB6
    },
    {
      id: 'ht-02', t: 'http',
      q: 'Pole formularza wygląda tak: `<input type="email" name="email" id="user-mail">`. Jak odczytasz wartość w PHP po wysłaniu POST?',
      a: ['$_POST[\'email\']', '$_POST[\'user-mail\']', '$_GET[\'email\']', '$_REQUEST->email'],
      c: 0,
      why: 'Klucz w $_POST pochodzi z atrybutu name. Atrybut id służy do powiązania z <label for> i CSS/JS.',
      src: LAB6
    },
    {
      id: 'ht-03', t: 'http',
      q: 'Jak w kontrolerze sprawdzić, czy żądanie przyszło metodą POST?',
      a: [
        '$_SERVER[\'REQUEST_METHOD\'] === \'POST\'',
        'isset($_POST)',
        '$_GET[\'method\'] == \'post\'',
        'http_method() === POST'
      ],
      c: 0,
      why: 'Metodę żądania przechowuje $_SERVER[\'REQUEST_METHOD\']. Router z Lab 2 przekazuje ją do dispatch() i porównuje z metodą zapisaną przy trasie.',
      src: 'Lab 2: Routing + Lab 6'
    },
    {
      id: 'ht-04', t: 'http',
      q: 'Na czym polega wzorzec Post/Redirect/Get (PRG)?',
      a: [
        'Po poprawnym przetworzeniu POST serwer odsyła przekierowanie na stronę GET, więc odświeżenie nie wyśle formularza ponownie',
        'Formularz wysyła jednocześnie GET i POST',
        'Przekierowanie wykonuje się przed wysłaniem formularza',
        'Serwer odpowiada na POST zawsze kodem 404'
      ],
      c: 0,
      why: 'Bez PRG odświeżenie strony po wysłaniu formularza ponawia POST, np. dodając drugi raz ten sam rekord.',
      src: LAB6
    },
    {
      id: 'ht-05', t: 'http',
      q: 'Dlaczego po `header(\'Location: /projects\');` pisze się `exit;`?',
      a: [
        'Bo header() samo nie kończy skryptu i dalszy kod nadal by się wykonał',
        'Bo bez exit przekierowanie nie działa w Chrome',
        'Bo exit wysyła nagłówek',
        'Bo exit czyści sesję'
      ],
      c: 0,
      why: 'header() tylko ustawia nagłówek odpowiedzi. Bez exit skrypt dalej wykonuje logikę i wypisuje treść, co bywa źródłem błędów i luk.',
      src: LAB6
    },
    {
      id: 'ht-06', t: 'http',
      q: 'Pojawia się ostrzeżenie „Cannot modify header information - headers already sent”. Co jest przyczyną?',
      a: [
        'Przed wywołaniem header() skrypt wysłał już jakąś treść (np. echo, HTML albo spację przed <?php)',
        'Brakuje połączenia z bazą danych',
        'Nginx nie obsługuje przekierowań',
        'Za dużo zmiennych w $_POST'
      ],
      c: 0,
      why: 'Nagłówki HTTP muszą być wysłane przed treścią. Pierwszy wypisany znak wysyła nagłówki, a późniejsze header() nie może ich już zmienić.',
      src: LAB6
    },
    {
      id: 'ht-07', t: 'http',
      q: 'Który kod statusu HTTP zwraca index.php z Lab 2, gdy żadna trasa nie pasuje?',
      a: ['200', '301', '404', '500'],
      c: 2,
      why: 'Gdy dispatch() zwróci false, index.php wywołuje http_response_code(404) i renderuje widok not-found.',
      src: 'Lab 2: MVC, routing'
    },
    {
      id: 'ht-08', t: 'http',
      q: 'Dopasuj kod: żądanie na istniejący adres, ale niedozwoloną metodą (np. DELETE tam, gdzie jest tylko GET).',
      a: ['400 Bad Request', '403 Forbidden', '405 Method Not Allowed', '418 I\'m a teapot'],
      c: 2,
      why: '405 oznacza, że zasób istnieje, ale nie obsługuje tej metody.',
      src: LAB6
    },
    {
      id: 'ht-09', t: 'http',
      q: 'Czym różni się 401 od 403?',
      a: [
        '401: użytkownik nie jest uwierzytelniony (nie zalogował się), 403: jest znany, ale nie ma uprawnień',
        '401: brak strony, 403: błąd serwera',
        'To ten sam kod w różnych przeglądarkach',
        '401: przekierowanie, 403: sukces'
      ],
      c: 0,
      why: '401 Unauthorized dotyczy braku uwierzytelnienia, 403 Forbidden braku autoryzacji do zasobu.',
      src: LAB6
    },
    {
      id: 'ht-10', t: 'http',
      q: 'Która grupa kodów HTTP oznacza błąd po stronie serwera?',
      a: ['2xx', '3xx', '4xx', '5xx'],
      c: 3,
      why: '2xx sukces, 3xx przekierowania, 4xx błąd klienta (np. 404, 422), 5xx błąd serwera (np. 500).',
      src: LAB6
    },
    {
      id: 'ht-11', t: 'http',
      q: 'Jak sprawdzić w PHP, czy podany adres e-mail ma poprawny format?',
      a: [
        'filter_var($email, FILTER_VALIDATE_EMAIL)',
        'is_email($email)',
        'strlen($email) > 5',
        'htmlspecialchars($email)'
      ],
      c: 0,
      why: 'filter_var z filtrem FILTER_VALIDATE_EMAIL zwraca adres, gdy jest poprawny, albo false. htmlspecialchars służy do wyświetlania, nie do walidacji.',
      src: LAB6
    },
    {
      id: 'ht-12', t: 'http',
      q: 'Formularz ma atrybuty `required` i `type="email"`. Czy walidacja w PHP jest nadal potrzebna?',
      a: [
        'Nie, przeglądarka nie wyśle błędnych danych',
        'Tak, bo walidację w przeglądarce można obejść (DevTools, curl), serwer musi sprawdzić dane sam',
        'Tylko w trybie ciemnym',
        'Tylko gdy formularz ma więcej niż 10 pól'
      ],
      c: 1,
      why: 'Walidacja po stronie klienta poprawia wygodę, ale nie jest zabezpieczeniem. Żądanie można wysłać z pominięciem formularza.',
      src: LAB6
    },
    {
      id: 'ht-13', t: 'http',
      q: 'Po błędzie walidacji formularz pokazuje wpisaną wcześniej wartość: `value="<?= $email ?>"`. Co jest nie tak?',
      a: [
        'Nic, to poprawny zapis',
        'Brakuje htmlspecialchars(), więc wartość z cudzysłowem może wstrzyknąć kod (XSS)',
        'Trzeba użyć print zamiast <?=',
        'value nie działa dla pól e-mail'
      ],
      c: 1,
      why: 'Każdą wartość pochodzącą od użytkownika, wypisywaną do HTML, trzeba zabezpieczyć: value="<?= htmlspecialchars($email) ?>".',
      src: LAB6 + ' + Lab 2'
    },
    {
      id: 'ht-14', t: 'http',
      q: 'Jak bezpiecznie odczytać pole, które mogło nie zostać wysłane, bez ostrzeżenia „Undefined array key”?',
      a: [
        '$name = trim($_POST[\'name\'] ?? \'\');',
        '$name = $_POST[\'name\'];',
        '$name = @$_POST->name;',
        '$name = $_POST(\'name\');'
      ],
      c: 0,
      why: 'Operator ?? zwraca wartość domyślną, gdy klucz nie istnieje lub jest null. trim usuwa białe znaki, więc pole z samymi spacjami da się wykryć jako puste.',
      src: LAB6
    },
    {
      id: 'ht-15', t: 'http',
      q: 'Do czego służy ukryte pole z losowym tokenem CSRF w formularzu?',
      a: [
        'Potwierdza, że żądanie POST pochodzi z formularza wygenerowanego przez naszą aplikację, a nie z obcej strony',
        'Szyfruje hasło przed wysłaniem',
        'Przyspiesza wysyłanie formularza',
        'Zastępuje walidację pól'
      ],
      c: 0,
      why: 'Token jest zapisany w sesji i wstawiany do formularza. Serwer porównuje go po wysłaniu. Obca strona nie zna tokenu, więc nie podrobi żądania.',
      src: LAB6
    },
    {
      id: 'ht-16', t: 'http',
      q: 'Jaki atrybut formularza jest wymagany do przesyłania plików?',
      a: [
        'enctype="multipart/form-data" (z method="post")',
        'type="file" na elemencie form',
        'upload="true"',
        'method="file"'
      ],
      c: 0,
      why: 'Bez multipart/form-data plik nie zostanie przesłany. Dane trafiają do $_FILES, a limity ustalają upload_max_filesize i post_max_size (Lab 1, zadanie 3).',
      src: LAB6 + ' + Lab 1'
    },
    {
      id: 'ht-17', t: 'http',
      q: 'Co wypisze ten kod, gdy repozytorium nie znajdzie projektu (`$project === null`)?',
      code: `try {
    $project = $repo->find($id);
    if ($project === null) {
        throw new RuntimeException('Brak projektu');
    }
    echo 'A';
} catch (RuntimeException $e) {
    echo 'B';
} finally {
    echo 'C';
}`,
      a: [
        'Wypisze BC',
        'Wypisze ABC',
        'Wypisze AC',
        'Wypisze tylko B'
      ],
      c: 0,
      why: 'throw przerywa blok try, więc echo \'A\' się nie wykona. Sterowanie trafia do catch (B), a finally (C) wykonuje się zawsze.',
      src: LAB6
    },
    {
      id: 'ht-18', t: 'http',
      q: 'Jak powinno wyglądać raportowanie błędów PHP w środowisku produkcyjnym?',
      a: [
        'display_errors wyłączone, błędy zapisywane do logu',
        'display_errors włączone, żeby użytkownik widział szczegóły',
        'Całkowite wyłączenie logowania',
        'Wyświetlanie błędów tylko w konsoli przeglądarki'
      ],
      c: 0,
      why: 'Szczegóły błędów (ścieżki, zapytania) pomagają atakującemu. W developmencie ustawia się error_reporting=E_ALL, na produkcji loguje się błędy i pokazuje ogólny komunikat.',
      src: LAB6
    },
    {
      id: 'ht-19', t: 'http',
      q: 'Co daje Xdebug w porównaniu z debugowaniem przez var_dump()?',
      a: [
        'Debugowanie krokowe: breakpointy, wykonywanie linia po linii i podgląd zmiennych w IDE',
        'Automatyczne poprawianie błędów w kodzie',
        'Szybsze działanie aplikacji na produkcji',
        'Generowanie testów jednostkowych'
      ],
      c: 0,
      why: 'Artykuł podlinkowany na zajęciach pokazuje konfigurację step debuggingu w Dockerze: zatrzymanie na breakpoincie i analiza stanu zamiast wypisywania zmiennych.',
      src: XDEBUG
    },
    {
      id: 'ht-20', t: 'http',
      q: 'Która konfiguracja Xdebug 3 w kontenerze PHP pozwala IDE na komputerze odebrać sesję debugowania?',
      code: `xdebug.mode=develop,debug
xdebug.client_host=______
xdebug.start_with_request=yes`,
      a: ['localhost', 'host.docker.internal', 'php:9000', '0.0.0.0'],
      c: 1,
      why: 'client_host to adres maszyny z IDE. Z wnętrza kontenera komputer gospodarza jest dostępny jako host.docker.internal, a localhost oznaczałby sam kontener.',
      src: XDEBUG
    },
    {
      id: 'ht-21', t: 'http',
      q: 'Na którym porcie IDE domyślnie nasłuchuje połączeń od Xdebug 3?',
      a: ['9000', '9003', '8080', '5432'],
      c: 1,
      why: 'Xdebug 3 domyślnie łączy się na port 9003. Port 9000 zajmuje PHP-FPM, dlatego w Xdebug 3 zmieniono domyślną wartość.',
      src: XDEBUG
    },
    {
      id: 'ht-22', t: 'http',
      q: 'Jak instaluje się Xdebug w obrazie opartym na oficjalnym obrazie PHP?',
      a: [
        'pecl install xdebug && docker-php-ext-enable xdebug',
        'composer require xdebug',
        'apt install chrome-xdebug',
        'Xdebug jest wbudowany i zawsze włączony'
      ],
      c: 0,
      why: 'Xdebug nie jest dołączony do oficjalnych obrazów PHP. Instaluje się go przez PECL i włącza poleceniem docker-php-ext-enable, a potem przebudowuje kontener.',
      src: XDEBUG
    }
  );
})();
