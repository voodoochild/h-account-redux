(function () {
    // ALL THE ELEMENTS
    var navToggle = document.getElementById('nav-toggle');
    var siteNav = document.getElementById('account-nav');
    var phoneToggle = document.getElementById('phone-toggle');
    var phoneOverlay = document.getElementById('phone-overlay');
    var accountSettings = document.querySelector('.account-settings');
    var activeBookings = document.getElementById('bookings-active');
    var pastBookings = document.getElementById('bookings-past');
    var pastBookingsHeader = document.getElementById('past-bookings-heading');
    var paymentCardForm = document.getElementById('payment-card-form');
    var confNumberForm = document.getElementById('conf-number-form');
    var findBookingForm = document.getElementById('find-booking-form');
    var feedback = document.getElementById('feedback');
    var feedbackThanks = document.getElementById('feedback-thanks');
    var feedbackForm = document.getElementById('feedback-form');
    var sendEmail = document.getElementById('send-email');

    var openEditForm, closeEditForm, validateEditForm, updateSummary, renderBooking;

    // Set page signed in/out status
    if (localStorage.getItem('signedin')) {
        let profile = localStorage.getItem('profile');
        if (profile) {
            $('.profile-username').text(profile);
            $('.profile-username-input').val(profile);
            $('.avatar').attr('src', `images/${profile}.png`);
        }
        document.body.classList.add('signed-in');
        document.body.classList.remove('signed-out');
        document.body.classList.remove('limbo');
    } else {
        document.body.classList.remove('signed-in');
        document.body.classList.add('signed-out');
        document.body.classList.remove('limbo');
    }

    // Handle sign in page querystring
    let parts = window.location.pathname.split('/');
    if (parts[parts.length - 1] === 'signin.html') {
        let matches = window.location.search.match(/go=([a-z\-]+\.html)/i);
        window.next = matches ? matches[1] : 'index.html';
    }

    // Dropdown nav
    if (navToggle) {
        navToggle.addEventListener('click', e => {
            e.preventDefault();
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
        let paymentcard = window.location.search.indexOf('paymentcard=true') !== -1;

        renderBooking = function (booking, active) {
            let {name, contact, checkin, checkout, confirmation, cancelled, thumbnail, cardonly} = booking;
            let li = document.createElement('li');
            let href = active ? 'view-reservation' : 'view-past-reservation';
            li.classList.add('booking');
            if (cancelled) {
                li.classList.add('cancelled');
                name += ' (cancelled)';
            }
            if (cardonly === true) {
                href += '-paymentcard';
                li.classList.add('paymentcard');
                if (!paymentcard) { li.classList.add('hidden'); }
            }
            li.innerHTML = `
                <div class="booking-thumbnail"><a href="${href}.html"></a></div>
                <a class="booking-header booking-row" href="${href}.html">
                    <h3>${name}</h3>
                    <span class="booking-contact">${contact}</span>
                </a>
                <div class="booking-row">
                    <div class="booking-date-wrap"><span class="booking-date">Check in</span> ${checkin}</div>
                    <div class="booking-date-wrap"><span class="booking-date">Check out</span> ${checkout}</div>
                </div>
                <div class="booking-row booking-confirmation">
                    Confirmation number: ${confirmation}
                </div>`;
            if (thumbnail) {
                li.querySelector('.booking-thumbnail a').style['background-image'] = `url(${thumbnail})`;
            }
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
                        activeCount[i].innerHTML = `(${notCancelled})`;
                    }
                    let upcomingCount = document.querySelector('.bookings-upcoming-count');
                    if (upcomingCount) { upcomingCount.innerHTML = `(${notCancelled} upcoming)`; }
                }
                if (active.length === 1 && !past.length) {
                    $('.bookings-link').attr('href', 'view-reservation.html');
                    $('.bookings-form-action').attr('action', 'view-reservation.html');
                }
            }

            // Render bookings if we're on the bookings page
            if (activeBookings || pastBookings) {
                if (active.length === 1 && !past.length) {
                    window.location.href = 'view-reservation.html';
                } else {
                    active.map(b => renderBooking(b, true));
                    if (past.length) {
                        pastBookingsHeader.classList.remove('hidden');
                        past.map(b => renderBooking(b, false));

                        if (past.length > 2) {
                            let searchBookingForm = document.getElementById('search-bookings');
                            let bookingFiller = document.querySelector('.bookings-filler');
                            let pagination = document.getElementById('bookings-pagination');
                            if (searchBookingForm) { searchBookingForm.classList.remove('hidden'); }
                            if (bookingFiller) { bookingFiller.style.top = '82px'; }
                            if (pagination) { pagination.classList.remove('hidden'); }
                        }
                    }
                }
            }
        });
    }

    // Find booking form
    if (paymentCardForm && findBookingForm && confNumberForm) {
        let noConfToggle = $('.no-conf-toggle');
        noConfToggle.on('click', e => {
            e.preventDefault();
            if (confNumberForm.style.display === 'none') {
                $('#paymentcard').remove();
                findBookingForm.action = 'view-reservation.html';
                $.Velocity.animate(paymentCardForm, 'slideUp', { duration: 200 });
                $.Velocity.animate(confNumberForm, 'slideDown', { delay: 200, duration: 200 });
            } else {
                let paymentcard = document.createElement('input');
                paymentcard.type = 'hidden';
                paymentcard.id = 'paymentcard';
                paymentcard.name = 'paymentcard';
                paymentcard.value = true;
                findBookingForm.appendChild(paymentcard);
                findBookingForm.action = 'bookings.html';
                $.Velocity.animate(confNumberForm, 'slideUp', { duration: 200 });
                $.Velocity.animate(paymentCardForm, 'slideDown', { delay: 200, duration: 200 });
            }
        });
    }

    // Footer feedback form
    if (feedback && feedbackThanks && feedbackForm) {
        feedback.addEventListener('click', e => {
            let target = e.target;
            if (target.nodeName === 'BUTTON') {
                if (target.classList.contains('feedback-yes')) {
                    feedbackForm.classList.add('hidden');
                    feedbackThanks.classList.remove('hidden');
                } else if (target.classList.contains('feedback-no')) {
                    feedbackForm.classList.remove('hidden');
                    feedbackThanks.classList.add('hidden');
                }
                $('.feedback-hideme').remove();
            }
        });
    }

    // Send email page
    if (sendEmail) {
        let toggle = $('.send-email-toggle');
        let emailSent = document.getElementById('email-sent');
        if (toggle && emailSent) {
            toggle.on('click', e => {
                e.preventDefault();
                if (sendEmail.style.display === 'none') {
                    $.Velocity.animate(emailSent, 'fadeOut', { duration: 300 });
                    $.Velocity.animate(sendEmail, 'fadeIn', { delay: 250, duration: 300 });
                } else {
                    $.Velocity.animate(sendEmail, 'fadeOut', { duration: 300 });
                    $.Velocity.animate(emailSent, 'fadeIn', { delay: 250, duration: 300 });
                }
            });
        }
    }
})();
