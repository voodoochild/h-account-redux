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
        if (reload === true) {
            if (window.next) {
                window.location.href = window.next;
            } else {
                document.location.reload();
            }
        }
    };

    window.signOut = function (reload) {
        localStorage.removeItem('signedin');
        updateSignedInStatus();
        if (reload === true) {
            let parts = window.location.pathname.split('/');
            switch (parts[parts.length - 1]) {
                case 'account.html':
                case 'manage.html':
                case 'cards.html':
                case 'comms.html':
                case 'send-email.html':
                case 'email-sent.html':
                    window.location.href = 'index.html';
                    break;
                default:
                    document.location.reload();
            }
        }
    };

    window.goToSignInPage = function () {
        let parts = window.location.pathname.split('/');
        window.location.href = 'signin.html?go=' + parts[parts.length - 1];
    };

    window.goToBookingsPage = function () {
        window.getBookings().then(bookings => {
            let active = bookings.active || [];
            let past = bookings.past || [];
            if (active.length === 1 && !past.length) {
                window.next = 'view-reservation.html';
            } else {
                window.next = 'bookings.html';
            }
            window.signIn(true);
        });
    };

    if (signInButton && signOutButton) {
        signInButton.addEventListener('click', () => window.signIn(false));
        signOutButton.addEventListener('click', () => window.signOut(false));
    }

    updateSignedInStatus();

    // Booking profile
    var bookingProfileStatus = document.getElementById('booking-profile-status');
    var bookingProfiles = {
        jo: document.getElementById('admin-profile-jo'),
        robin: document.getElementById('admin-profile-robin'),
        sam: document.getElementById('admin-profile-sam')
    };

    function updateBookingProfileStatus () {
        let profile = localStorage.getItem('profile') || 'Jo';
        let message = `Using booking profile '${profile}'`;
        if (bookingProfileStatus) {
            bookingProfileStatus.innerHTML = message;
            bookingProfileStatus.classList.remove('hidden');
        }
        if (bookingProfiles.jo && bookingProfiles.robin && bookingProfiles.sam) {
            if (profile === 'Jo') {
                bookingProfiles.jo.disabled = true;
                bookingProfiles.robin.disabled = false;
                bookingProfiles.sam.disabled = false;
            } else if (profile === 'Robin') {
                bookingProfiles.jo.disabled = false;
                bookingProfiles.robin.disabled = true;
                bookingProfiles.sam.disabled = false;
            } else if (profile === 'Sam') {
                bookingProfiles.jo.disabled = false;
                bookingProfiles.robin.disabled = false;
                bookingProfiles.sam.disabled = true;
            }
        }
    }

    function switchBookingProfile (profile) {
        localStorage.setItem('profile', profile || 'Jo');
        updateBookingProfileStatus();
    }

    if (bookingProfiles.jo && bookingProfiles.robin && bookingProfiles.sam) {
        bookingProfiles.jo.addEventListener('click', () => switchBookingProfile('Jo'));
        bookingProfiles.robin.addEventListener('click', () => switchBookingProfile('Robin'));
        bookingProfiles.sam.addEventListener('click', () => switchBookingProfile('Sam'));
    }

    updateBookingProfileStatus();
})();
