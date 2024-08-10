document.getElementById('search-input').addEventListener('keyup', function() {
    const query = this.value.toLowerCase();
    const games = document.querySelectorAll('.action-jocuri a');

    games.forEach(function(game) {
        const title = game.getAttribute('data-title').toLowerCase();
        if (title.includes(query)) {
            game.style.display = '';
        } else {
            game.style.display = 'none';
        }
    });
});
