<div class="flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">

    <div class="bg-gray-800 pt-3">
        <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
            <h1 class="font-bold pl-2">Languages & Skills</h1>
        </div>
    </div>

    <?php
    $skills = [
        'Professional' => [
            'PHP' => [
                'type' => 'server-side',
                'time' => '2 years'
            ],
            'Laravel' => [
                'type' => 'server-side',
                'time' => '2 years'
            ],
            'AWS EC2 & S3' => [
                'type' => 'cloud',
                'time' => '2 years'
            ],
            'MySQL' => [
                'type' => 'database',
                'time' => '2 years'
            ],
            'APIs' => [
                'type' => 'networking',
                'time' => '2 years'
            ],
            'JavaScript' => [
                'type' => 'frontend',
                'time' => '5 years'
            ],
            'Git' => [
                'type' => 'skill',
                'time' => '5 years'
            ],
            'Linux' => [
                'type' => 'skill',
                'time' => '3 years'
            ],
            'VIM' => [
                'type' => 'skill',
                'time' => '3 years'
            ],
            'HTML + CSS' => [
                'type' => 'frontend',
                'time' => '5 years'
            ],
        ],
        'Advanced(5+YOE)' => [
            'Python' => [
                'type' => 'server-side',
                'time' => '5 years'
            ],
            'Java' => [
                'type' => 'server-side',
                'time' => '5 years'
            ],
            'JavaScript' => [
                'type' => 'frontend',
                'time' => '5 years'
            ],
            'HTML + CSS' => [
                'type' => 'frontend',
                'time' => '5 years'
            ],
            'Git' => [
                'type' => 'skill',
                'time' => '5 years'
            ],
        ],

    ];

    function getIcon($type)
    {
        switch ($type) {
            case 'server-side':
                return 'fas fa-server';
            case 'skill':
                return 'fa fa-keyboard';
            case 'frontend':
                return 'fa fa-code';
            case 'networking':
            case 'cloud':
                return 'fa fa-cloud';
            default:
                return 'fa fa-database';
        }

    }

    function getColor($type)
    {
        switch ($type) {
            case 'server-side':
                return 'green';
            case 'skill':
                return 'blue';
            case 'frontend':
                return 'yellow';
            case 'networking':
            case 'cloud':
                return 'red';
            default:
                return 'pink';
        }

    }

    ?>


    <?php foreach ($skills as $class_name => $class):?>

        <H1 class="text-center w-full text-5xl border-b-4 border-black-600 p-6 m-5"><?=$class_name?></H1>

        <div class="flex flex-wrap p-5">

            <?php foreach ($class as $skill_name => $sk):?>

                <div class="w-full md:w-1/2 xl:w-1/3 p-6">
                    <!--Metric Card-->
                    <div class="bg-gradient-to-b from-<?=getColor($sk['type'])?>-200 to-<?=getColor($sk['type'])?>-100 border-b-4 border-<?=getColor($sk['type'])?>-600 rounded-lg shadow-xl p-5">
                        <div class="flex flex-row items-center">
                            <div class="flex-shrink pr-4">
                                <div class="rounded-full p-5 bg-<?=getColor($sk['type'])?>-600"><i
                                            class="<?=getIcon($sk['type'])?> fa-2x fa-inverse"></i></div>
                            </div>
                            <div class="flex-1 text-right md:text-center">
                                <h2 class="font-bold uppercase text-gray-600"><?=$sk['time']?></h2>
                                <p class="font-bold text-3xl"><?=$skill_name?> <span class="text-<?=getColor($sk['type'])?>-500"> <!--icon here --></p>
                            </div>
                        </div>
                    </div>
                    <!--/Metric Card-->
                </div>

            <?php endforeach; ?>

        </div>

    <?php endforeach; ?>



</div>
