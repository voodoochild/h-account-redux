(function () {
    var navToggle = document.getElementById('nav-toggle');
    var siteNav = document.getElementById('account-nav');
    var phoneToggle = document.getElementById('phone-toggle');
    var phoneOverlay = document.getElementById('phone-overlay');
    var accountSettings = document.querySelector('.account-settings');
    var activeBookings = document.getElementById('bookings-active');
    var pastBookings = document.getElementById('bookings-past');
    var pastBookingsHeader = document.getElementById('past-bookings-heading');
    var openEditForm, closeEditForm, validateEditForm, updateSummary, renderBooking;

    // Sign in/out
    if (localStorage.getItem('signedin')) {
        document.body.classList.add('signed-in');
        document.body.classList.remove('signed-out');
    } else {
        document.body.classList.remove('signed-in');
        document.body.classList.add('signed-out');
    }

    // Dropdown nav
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            siteNav.classList.toggle('expanded');
            navToggle.innerHTML = siteNav.classList.contains('expanded') ? '&#xe07c;' : '&#xe035;';
        });
    }

    // Phone overlay
    if (phoneToggle && phoneOverlay) {
        phoneToggle.addEventListener('mouseover', () => phoneOverlay.classList.remove('hidden'));
        phoneToggle.addEventListener('mouseout', () => phoneOverlay.classList.add('hidden'));
        phoneOverlay.addEventListener('mouseout', () => phoneOverlay.classList.add('hidden'));
    }

    // Manage your account editing
    if (accountSettings) {
        openEditForm = function (args) {
            let [cta, li, summary, form] = args;
            li.classList.add('editing');
            summary && summary.classList.add('hidden');
            form.classList.remove('hidden');
            cta.innerHTML = 'Cancel';
            form.addEventListener('submit', validateEditForm);
        };

        closeEditForm = function (args) {
            let [cta, li, summary, form] = args;
            li.classList.remove('editing');
            summary && summary.classList.remove('hidden');
            form.classList.add('hidden');
            cta.innerHTML = 'Edit';
        };

        validateEditForm = function (e) {
            if (!e.target.action) { e.preventDefault(); }
            let form = e.target;
            let keys = [];
            let error = false;

            for (let i = 0; i < form.length; i++) {
                if (form[i].nodeName !== 'BUTTON') {
                    let f = form[i];
                    let v = f.value;
                    let password = f.id === 'password' && (v.length < 6 || v.length > 20 || !v.match(/\d/g));
                    let email = f.id === 'email' && (!v.length || !v.match(/\@/g));
                    if (password || email) {
                        f.classList.add('invalid');
                        f.parentNode.querySelector('.error-message').classList.remove('hidden');
                        error = true;
                    }
                    keys.push(f.id);
                }
            }

            if (!error) { updateSummary(form, keys); }
        };

        updateSummary = function (form, keys) {
            let li = form.parentNode;
            let cta = li.querySelector('.edit-cta');
            let summary = li.querySelector('.summary');

            // Munge address fields down into a single string
            let addressFields = [
                'address-line-1', 'address-line-2','address-city', 'address-state',
                'address-zip', 'address-country'
            ];
            let address = addressFields
                .map(f => form[f] && form[f].value)
                .filter(v => v && v.length)
                .join(', ');

            if (address) { keys.push('address'); }

            for (let i = 0; i < keys.length; i++) {
                let el = summary.querySelector('[data-key=' + keys[i] + ']');
                if (el && keys[i] !== 'password') {
                    el.innerHTML = (keys[i] === 'address') ? address : form[keys[i]].value;
                }
            }

            cta.click();
        };

        accountSettings.addEventListener('click', e => {
            if (e.target && e.target.nodeName === 'A' && e.target.classList.contains('edit-cta')) {
                e.preventDefault();
                let cta = e.target;
                let li = e.target.parentNode;
                let summary = li.querySelector('.summary');
                let form = li.querySelector('.edit-form');
                let args = [cta, li, summary, form];
                li.classList.contains('editing') ? closeEditForm(args) : openEditForm(args);
            }
        });
    }

    // Bookings
    if (window.getBookings) {
        renderBooking = function (booking, active) {
            let {name, contact, checkin, checkout, confirmation, cancelled} = booking;
            let li = document.createElement('li');
            li.classList.add('booking');
            if (cancelled) { name += ' (cancelled)'; }
            li.innerHTML = `
                <a href="view-reservation.html">
                    <h3>${name}</h3>
                    <div class="contact">${contact}</div>
                    <div class="check-in">Check in: ${checkin}</div>
                    <div class="check-out">	Check out: ${checkout}</div>
                    <div class="confirmation">Confirmation number: ${confirmation}</div>
                </a>`;
            if (active) {
                activeBookings.appendChild(li);
            } else {
                pastBookings.appendChild(li);
            }
        };

        window.getBookings().then(bookings => {
            let active = bookings.active || [];
            let past = bookings.past || [];

            // Update bookings count in nav
            if (active.length) {
                let activeCount = document.querySelectorAll('.bookings-active-count');
                let notCancelled = active.filter(b => !b.cancelled).length;
                if (activeCount && notCancelled > 0) {
                    for (let i = 0; i < activeCount.length; i++) {
                        activeCount[i].innerHTML = '(' + notCancelled + ')';
                    }
                }
            }

            // Render bookings if we're on the bookings page
            if (activeBookings || pastBookings) {
                if (active.filter(b => !b.cancelled).length && !past.length) {
                    window.location.href = 'view-reservation.html';
                } else {
                    active.map(b => renderBooking(b, true));
                    if (past.length) {
                        pastBookingsHeader.classList.remove('hidden');
                        let searchBookingForm = document.getElementById('search-bookings');
                        if (searchBookingForm) { searchBookingForm.classList.remove('hidden'); }
                        let bookingFiller = document.querySelector('.bookings-filler');
                        if (bookingFiller) { bookingFiller.style.top = '82px'; }
                    }
                    past.map(b => renderBooking(b, false));
                }
            }
        });
    }
})();
