<div class="flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">

    <div class="bg-gray-800 pt-3">
        <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
            <h1 class="font-bold pl-2">Work History</h1>
        </div>
    </div>

    <?php
        $jobs = [
            ['job' => 'Full-Stack Software Engineer' ,'company' => 'Tire Guru','color' => 'blue'],
            ['job' => 'Software Tester' ,'company' => 'iFit','color' => 'pink'],
//            ['job' => 'Night Janitor' ,'company' => 'Utah State University','color' => 'gray'],
            ['job' => 'Driver / Mover' ,'company' => 'Wasatch Moving Co.','color' => 'indigo'],
            ['job' => 'Crew Member' ,'company' => 'Outback Firefighting','color' => 'red'],
//            ['job' => 'Landcaper' ,'company' => 'Verdant Gardens','color' => 'yellow'],
            ['job' => 'Mowing and Irrigation' ,'company' => 'The Yard Shop','color' => 'green'],
            ['job' => 'Lube Tech' ,'company' => 'Valvoline','color' => 'blue'],
            ['job' => 'Dish Washer' ,'company' => 'Costa Vida','color' => 'purple']
        ];
    ?>
    <div class="flex flex-col md:grid grid-cols-12 text-gray-50">
        <?php foreach ($jobs as $jobData):
            $job = $jobData['job'];
            $company = $jobData['company'];
            $color = $jobData['color'];
        ?>
        <div class="flex md:contents">
            <div class="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                <div class="h-full w-6 flex items-center justify-center">
                    <div class="h-full w-1 bg-<?= $color ?>-500 pointer-events-none"></div>
                </div>
                <div class="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-<?= $color ?>-500 shadow text-center">
                    <i class="fas fa-check-circle text-white"></i>
                </div>
            </div>
            <div class="bg-<?= $color ?>-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
                <h3 class="font-semibold text-lg mb-1"><?= $job ?></h3>
                <p class="leading-tight text-justify w-full">
                    <?= $company ?>
                </p>
            </div>
        </div>
        <?php endforeach; ?>

    </div>
</div>



