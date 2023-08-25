<?php require('partials/common-head.php') ?>
    <main>
        <div class="flex flex-col md:flex-row">
            <?php require('controllers/sections.php') ?>
            <?php require( __DIR__ . '/partials/navs/sidenav.php') ?>



            <div id="home" class="flex flex-col fd:col w-full">
                <div class="bg-gray-800 pt-3">
                    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                        <h1 class="font-bold pl-2">OOPS 404</h1>
                        <div class="pl-3 font-bold text-2xl p-6  bg-black text-green-600">
                            <p>
                                <a href="https://linkedin.com/in/brendon-earl" class="hover:text-white">Add me on linkedin</a>
                            </p>
                            <p>
                                <a href="/" class="hover:text-white">Go Home</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    </main>

<?php require('partials/common-foot.php') ?>