(function () {
    var profiles = {
        Jo: {
            active: [
                {
                    name: 'Blue Home Villa',
                    contact: 'Orlando, Cambodia',
                    checkin: 'Saturday, 16th April 2016',
                    checkout: 'Sunday, 17th April 2016',
                    confirmation: 124172251234,
                    thumbnail: 'http://exp.cdn-hotels.com/hotels/12000000/11890000/11888500/11888414/11888414_10_y.jpg'
                }
            ],
            past: [
                {
                    name: 'The Grand Hotel Brighton',
                    contact: 'Brighton, GB',
                    checkin: 'Saturday, 11th April 2015',
                    checkout: 'Sunday, 13th April 2015',
                    confirmation: 1234091889913,
                    thumbnail: 'http://exp.cdn-hotels.com/hotels/1000000/430000/425800/425706/425706_26_z.jpg'
                }
            ]
        },

        Robin: {
            active: [
                {
                    name: 'Residence Nemea La Soulane',
                    contact: 'Loudenvielle, France',
                    checkin: 'Monday, 30th September 2015',
                    checkout: 'Sunday, 6th October 2015',
                    confirmation: 124172251234,
                    thumbnail: 'http://exp.cdn-hotels.com/hotels/2000000/1300000/1296600/1296584/1296584_50_z.jpg'
                },
                {
                    name: 'Blue Home Villa',
                    contact: 'Orlando, Cambodia',
                    checkin: 'Saturday, 16th April 2016',
                    checkout: 'Sunday, 17th April 2016',
                    confirmation: 124172251234,
                    thumbnail: 'http://exp.cdn-hotels.com/hotels/12000000/11890000/11888500/11888414/11888414_10_y.jpg',
                    cardonly: true
                },
                {
                    name: 'Backpacker Hostel',
                    contact: 'Phnom Penh, Cambodia',
                    checkin: 'Thursday, 12th October 2015',
                    checkout: 'Sunday, 16th October 2015',
                    confirmation: 9876543211,
                    cancelled: true
                }
            ],
            past: [
                {
                    name: 'The Grand Hotel Brighton',
                    contact: 'Brighton, GB',
                    checkin: 'Saturday, 11th April 2015',
                    checkout: 'Sunday, 13th April 2015',
                    confirmation: 1234091889913,
                    thumbnail: 'http://exp.cdn-hotels.com/hotels/1000000/430000/425800/425706/425706_26_z.jpg'
                },
                {
                    name: 'Hotel des Arts',
                    contact: 'Amsterdam, Netherlands',
                    checkin: 'Saturday, 1st August 2014',
                    checkout: 'Sunday, 8th August 2014',
                    confirmation: 7876543211,
                    thumbnail: 'http://exp.cdn-hotels.com/hotels/2000000/1530000/1521600/1521568/1521568_37_b.jpg'
                },
            ]
        },

        Sam: {
            active: [
                {
                    name: 'Residence Nemea La Soulane',
                    contact: 'Loudenvielle, France',
                    checkin: 'Monday, 30th September 2015',
                    checkout: 'Sunday, 6th October 2015',
                    confirmation: 124172251234,
                    thumbnail: 'http://exp.cdn-hotels.com/hotels/2000000/1300000/1296600/1296584/1296584_50_z.jpg'
                },
                {
                    name: 'Blue Home Villa',
                    contact: 'Orlando, Cambodia',
                    checkin: 'Saturday, 16th April 2016',
                    checkout: 'Sunday, 17th April 2016',
                    confirmation: 124172251234,
                    thumbnail: 'http://exp.cdn-hotels.com/hotels/12000000/11890000/11888500/11888414/11888414_10_y.jpg',
                    cardonly: true
                },
                {
                    name: 'Patio Hotel and Urban Resort',
                    contact: 'Phnom Penh, Cambodia',
                    checkin: 'Thursday, 12th October 2015',
                    checkout: 'Sunday, 16th October 2015',
                    confirmation: 9876543210,
                    thumbnail: 'http://exp.cdn-hotels.com/hotels/7000000/6440000/6432100/6432067/6432067_91_z.jpg'
                },
                {
                    name: 'Backpacker Hostel',
                    contact: 'Phnom Penh, Cambodia',
                    checkin: 'Thursday, 12th October 2015',
                    checkout: 'Sunday, 16th October 2015',
                    confirmation: 9876543211,
                    cancelled: true
                }
            ],
            past: [
                {
                    name: 'The Grand Hotel Brighton',
                    contact: 'Brighton, GB',
                    checkin: 'Saturday, 11th April 2015',
                    checkout: 'Sunday, 13th April 2015',
                    confirmation: 1234091889913,
                    thumbnail: 'http://exp.cdn-hotels.com/hotels/1000000/430000/425800/425706/425706_26_z.jpg'
                },
                {
                    name: 'Hotel des Arts',
                    contact: 'Amsterdam, Netherlands',
                    checkin: 'Saturday, 1st August 2014',
                    checkout: 'Sunday, 8th August 2014',
                    confirmation: 7876543211,
                    thumbnail: 'http://exp.cdn-hotels.com/hotels/2000000/1530000/1521600/1521568/1521568_37_b.jpg'
                },
                {
                    name: 'Mermaid Inn',
                    contact: 'Rye, GB',
                    checkin: 'Saturday, 12th April 2014',
                    checkout: 'Sunday, 13th April 2014',
                    confirmation: 8876543211
                },
                {
                    name: 'W Hotel',
                    contact: 'Los Angeles, USA',
                    checkin: 'Saturday, 1st January 2014',
                    checkout: 'Sunday, 2nd January 2014',
                    confirmation: 7876543211
                },
                {
                    name: 'The Grand Hotel Brighton',
                    contact: 'Brighton, GB',
                    checkin: 'Saturday, 12th April 2013',
                    checkout: 'Sunday, 13th April 2013',
                    confirmation: 8876543211,
                    thumbnail: 'http://exp.cdn-hotels.com/hotels/1000000/430000/425800/425706/425706_26_z.jpg'
                },
                {
                    name: 'Intercontinental Berlin',
                    contact: 'Berlin, Germany',
                    checkin: 'Saturday, 19th February 2013',
                    checkout: 'Sunday, 20th February 2013',
                    confirmation: 7876543211,
                    thumbnail: 'http://exp.cdn-hotels.com/hotels/1000000/10000/5700/5619/5619_680_z.jpg'
                },
                {
                    name: 'Hotel Du Vin, York',
                    contact: 'York, GB',
                    checkin: 'Friday, 10th July 2012',
                    checkout: 'Sun, 13th July 2012',
                    confirmation: 8876543211,
                    thumbnail: 'http://exp.cdn-hotels.com/hotels/8000000/7740000/7730500/7730418/7730418_45_z.jpg'
                },
                {
                    name: 'Queens Hotel',
                    contact: 'Leeds, GB',
                    checkin: 'Monday, 1st August 2012',
                    checkout: 'Monday, 8th August 2012',
                    confirmation: 7876543211,
                    thumbnail: 'http://exp.cdn-hotels.com/hotels/1000000/10000/4700/4663/4663_27_y.jpg'
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
