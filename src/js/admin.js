(function () {
    if (!window.localStorage) { return console.error('Browser doesn\'t support localStorage'); }

    // Sign in/out
    var signedInStatus = document.getElementById('signed-in-status');
    var signInButton = document.getElementById('admin-signin');
    var signOutButton = document.getElementById('admin-signout');

    function updateSignedInStatus () {
        let signedin = localStorage.getItem('signedin');
        let message = signedin ? 'User is signed in' : 'User is signed out';
        if (signedInStatus) {
            signedInStatus.innerHTML = message;
            signedInStatus.classList.remove('hidden');
        }
        if (signedin && signInButton) {
            signInButton.disabled = true;
            signOutButton.disabled = false;
        } else if (!signedin && signOutButton) {
            signInButton.disabled = false;
            signOutButton.disabled = true;
        }
    }

    window.signIn = function (reload) {
        localStorage.setItem('signedin', true);
        updateSignedInStatus();
        if (reload === true) { document.location.reload(); }
    };

    window.signOut = function (reload) {
        localStorage.removeItem('signedin');
        updateSignedInStatus();
        if (reload === true) { document.location.reload(); }
    };

    if (signInButton && signOutButton) {
        signInButton.addEventListener('click', () => window.signIn(false));
        signOutButton.addEventListener('click', () => window.signOut(false));
    }

    updateSignedInStatus();

    // Booking profile
    var bookingProfileStatus = document.getElementById('booking-profile-status');
    var bookingProfiles = {
        eli: document.getElementById('admin-profile-eli'),
        ichi: document.getElementById('admin-profile-ichi'),
        femme: document.getElementById('admin-profile-femme')
    };

    function updateBookingProfileStatus () {
        let profile = localStorage.getItem('profile') || 'Eli';
        let message = `Using booking profile '${profile}'`;
        if (bookingProfileStatus) {
            bookingProfileStatus.innerHTML = message;
            bookingProfileStatus.classList.remove('hidden');
        }
        if (bookingProfiles.eli && bookingProfiles.ichi && bookingProfiles.femme) {
            if (profile === 'Eli') {
                bookingProfiles.eli.disabled = true;
                bookingProfiles.ichi.disabled = false;
                bookingProfiles.femme.disabled = false;
            } else if (profile === 'Ichi') {
                bookingProfiles.eli.disabled = false;
                bookingProfiles.ichi.disabled = true;
                bookingProfiles.femme.disabled = false;
            } else if (profile === 'Femme') {
                bookingProfiles.eli.disabled = false;
                bookingProfiles.ichi.disabled = false;
                bookingProfiles.femme.disabled = true;
            }
        }
    }

    function switchBookingProfile (profile) {
        localStorage.setItem('profile', profile || 'Eli');
        updateBookingProfileStatus();
    }

    if (bookingProfiles.eli && bookingProfiles.ichi && bookingProfiles.femme) {
        bookingProfiles.eli.addEventListener('click', () => switchBookingProfile('Eli'));
        bookingProfiles.ichi.addEventListener('click', () => switchBookingProfile('Ichi'));
        bookingProfiles.femme.addEventListener('click', () => switchBookingProfile('Femme'));
    }

    updateBookingProfileStatus();
})();
