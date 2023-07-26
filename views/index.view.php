<?php require('partials/common-head.php') ?>
<main>
    <div class="flex flex-col md:flex-row">
        <?php require('sections.php') ?>
        <?php require( __DIR__ . '/partials/navs/sidenav.php') ?>



        <div id="home" class="flex flex-col fd:col w-full">
            <?php
            foreach ($sections as $id => $section) {
                ?>
                <section id="<?= $id ?>" class="full-screen-height">
                    <?php
                    $file = __DIR__ . '/partials/sections/' . $section['file'];
                    if (file_exists($file)) {
                        require($file);
                    } else {
                        echo "File $file does not exist.";
                    }
                    ?>
                </section>
            <?php
            }
            ?>
        </div>
</main>

<?php require('partials/common-foot.php') ?>
