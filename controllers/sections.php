<?php
if (urlIs('/')){
    $sections = [
        'about' => [
            'title' => 'About',
            'file' => 'about-section.php',
            'icon' => 'fa-address-card'
        ],
        'skills' => [
            'title' => 'Skills',
            'file' => 'skills-section.php',
            'icon' => 'fa-keyboard'
        ],
        'work-history' => [
            'title' => 'Work History',
            'file' => 'work-history-section.php',
            'icon' => 'fa-tasks'
        ],
        'cv' => [
            'title' => 'CV',
            'file' => 'cv-section.php',
            'icon' => 'fa-file'
        ],
    ];
}elseif (urlIs('/fit')){
    $sections = [

    ];

    for ($i = 0; $i < 10; $i++) {
        $sections = array_merge($sections,['test'.$i => [
            'title' => 'TEST',
            'file' => 'test-section.php',
            'icon' => 'fa-address-card'
        ]]);
    }
}else{
    $sections = [];
}
