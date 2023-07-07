window.onload = function() {
    var input = document.getElementById('input');
    var output = document.getElementById('output');

    input.addEventListener('keyup', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            var name = input.value.trim();
            if (name.toLowerCase() === "mare" || name.toLowerCase() === "maren" || name.toLowerCase() === "maren stucki" || name.toLowerCase() === "maren eliza stucki") {
                output.textContent = 'I love you a lot :) See you tomorrow bright and early!';
            } else {
                output.textContent = 'Hello ' + name + '!';
            }
            input.value = '';
        }
    });
};
