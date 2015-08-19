(function () {
    var profiles = {
        Jo: {
            active: [
                {
                    name: 'Blue Home Villa',
                    contact: 'Orlando, Cambodia',
                    checkin: 'Saturday, 16th April 2016',
                    checkout: 'Sunday, 17th April 2016',
                    confirmation: 9876543210
                }
            ],
            past: [
                {
                    name: 'The Grand Hotel Brighton',
                    contact: 'Brighton, GB',
                    checkin: 'Sat, 12th Apr 2015',
                    checkout: 'Sun, 13th Apr 2015',
                    confirmation: 8876543211
                }
            ]
        },

        Robin: {
            active: [
                {
                    name: 'Patio Hotel & Resort',
                    contact: 'Phnom Penh, Cambodia',
                    checkin: 'Thu, 12th Oct 2015',
                    checkout: 'Sun, 16th Oct 2015',
                    confirmation: 9876543210
                },
                {
                    name: 'Backpacker Hostel',
                    contact: 'Phnom Penh, Cambodia',
                    checkin: 'Thu, 12th Oct 2015',
                    checkout: 'Sun, 16th Oct 2015',
                    confirmation: 9876543211,
                    cancelled: true
                }
            ],
            past: [
                {
                    name: 'The Grand Hotel Brighton',
                    contact: 'Brighton, GB',
                    checkin: 'Sat, 12th Apr 2015',
                    checkout: 'Sun, 13th Apr 2015',
                    confirmation: 8876543211
                },
                {
                    name: 'Hotel des Arts',
                    contact: 'Amsterdam, Netherlands',
                    checkin: 'Sat, 1st Aug 2014',
                    checkout: 'Sun, 8th Aug 2014',
                    confirmation: 7876543211
                },
            ]
        },

        Sam: {
            active: [
                {
                    name: 'Patio Hotel & Resort',
                    contact: 'Phnom Penh, Cambodia',
                    checkin: 'Thu, 12th Oct 2015',
                    checkout: 'Sun, 16th Oct 2015',
                    confirmation: 9876543210
                },
                {
                    name: 'Patio Hotel & Resort',
                    contact: 'Phnom Penh, Cambodia',
                    checkin: 'Thu, 12th Oct 2015',
                    checkout: 'Sun, 16th Oct 2015',
                    confirmation: 9876543210
                },
                {
                    name: 'Backpacker Hostel',
                    contact: 'Phnom Penh, Cambodia',
                    checkin: 'Thu, 12th Oct 2015',
                    checkout: 'Sun, 16th Oct 2015',
                    confirmation: 9876543211,
                    cancelled: true
                }
            ],
            past: [
                {
                    name: 'The Grand Hotel Brighton',
                    contact: 'Brighton, GB',
                    checkin: 'Sat, 12th Apr 2015',
                    checkout: 'Sun, 13th Apr 2015',
                    confirmation: 8876543211
                },
                {
                    name: 'Hotel des Arts',
                    contact: 'Amsterdam, Netherlands',
                    checkin: 'Sat, 1st Aug 2014',
                    checkout: 'Sun, 8th Aug 2014',
                    confirmation: 7876543211
                },
                {
                    name: 'The Grand Hotel Brighton',
                    contact: 'Brighton, GB',
                    checkin: 'Sat, 12th Apr 2015',
                    checkout: 'Sun, 13th Apr 2015',
                    confirmation: 8876543211
                },
                {
                    name: 'Hotel des Arts',
                    contact: 'Amsterdam, Netherlands',
                    checkin: 'Sat, 1st Aug 2014',
                    checkout: 'Sun, 8th Aug 2014',
                    confirmation: 7876543211
                },
                {
                    name: 'The Grand Hotel Brighton',
                    contact: 'Brighton, GB',
                    checkin: 'Sat, 12th Apr 2015',
                    checkout: 'Sun, 13th Apr 2015',
                    confirmation: 8876543211
                },
                {
                    name: 'Hotel des Arts',
                    contact: 'Amsterdam, Netherlands',
                    checkin: 'Sat, 1st Aug 2014',
                    checkout: 'Sun, 8th Aug 2014',
                    confirmation: 7876543211
                },
                {
                    name: 'The Grand Hotel Brighton',
                    contact: 'Brighton, GB',
                    checkin: 'Sat, 12th Apr 2015',
                    checkout: 'Sun, 13th Apr 2015',
                    confirmation: 8876543211
                },
                {
                    name: 'Hotel des Arts',
                    contact: 'Amsterdam, Netherlands',
                    checkin: 'Sat, 1st Aug 2014',
                    checkout: 'Sun, 8th Aug 2014',
                    confirmation: 7876543211
                }
            ]
        }
    };

    window.getBookings = function () {
        return new Promise((resolve, reject) => {
            let profile = localStorage.getItem('profile') || 'Jo';
            profile = profiles[profile] || {};
            if (profile) { resolve(profile); } else { reject(); }
        });
    };
})();
