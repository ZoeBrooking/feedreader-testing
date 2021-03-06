/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed in the allFeeds object, 
         * ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined and not empty', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        /* Loops through each feed in the allFeeds object, 
         * ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined and not empty', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    describe('The Menu', function () {
        // Checks through 'body' to ensure menu-hidden class is present.
        it('menu hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* Simulates click events to ensure that menu displays on the first click
         * then hides when clicked a second time.
         */
        it('menu changes visibility when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

        /* Gets each entry within the feed. Checks that the number
         * of entries is not 0.
         */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('at least one entry within feed', function() {
            expect($('.feed .entry').length < 0).toBeFalsy();
        });
    });

    describe('New Feed Selection', function() {
        let initialFeed;
        let comparisonFeed;

        //Load initial feed, capture html text, then load comparison feed.
        beforeEach(function(done) {
            loadFeed(0, function() {
                initialFeed = $('.feed').html();
                loadFeed(3, function() {
                done();
                });
            });
        });
        //Captures new feed's html text and compares to initial feed.
        it('content changes when new feed is loaded', function(done) {
            comparisonFeed = $('.feed').html();
            expect(initialFeed === comparisonFeed).toBeFalsy();
            done();
        });
    });
}());
