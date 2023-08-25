<header>
    <!--Nav-->
    <nav aria-label="menu nav" class="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">

        <div class="flex flex-wrap items-center">
            <div class="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white"></div>

            <div class="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2"></div>


            <?php
            $navItems = [
                '/' => 'Home',
                'https://linkedin.com/in/brendon-earl' => 'Contact Me',
                '/fit' => 'Fit Blog'
            ];
            ?>
            <div class="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
                <ul class="list-reset flex justify-between flex-1 md:flex-none items-center">
                    <?php foreach ($navItems as $url => $label): ?>
                        <li class="flex-1 md:flex-none md:mr-3">
                            <a class="inline-block py-2 px-4 text-white no-underline hover:text-white <?= urlIs($url) ? 'text-white' : 'text-gray-400' ?>"
                               href="<?= $url ?>"><?= $label ?></a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
    </nav>
</header>