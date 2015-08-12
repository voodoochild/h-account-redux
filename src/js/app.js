(function () {
    let navToggle = document.getElementById('nav-toggle');
    let siteNav = document.getElementById('account-nav');
    let userToggle = document.getElementById('user-toggle');
    let footer = document.getElementById('footer');

    function signout () {
        document.body.classList.remove('signed-in');
        document.body.classList.add('signed-out');
    }

    function signin () {
        document.body.classList.add('signed-in');
        document.body.classList.remove('signed-out');
    }

    userToggle.addEventListener('click', () => {
        if (document.body.classList.contains('signed-out')) { signin(); } else  { signout(); }
    });

    navToggle.addEventListener('click', () => siteNav.classList.toggle('expanded'));
})();
