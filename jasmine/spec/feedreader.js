/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has a defined, not empty url', function () {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a defined, not empty name', function () {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        });
    });

    describe('The menu', function () {
        beforeEach
        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('starts with menu hidden', function () {
            //Check to see that the starting class is a hidden menu
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('change when clicked', function () {
            let menu = $('.menu-icon-link');
            //click on the menu
            menu.click();
            //ensure the menu is not hidden
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            //click on it again
            menu.click();
            //ensure the menu is hidden
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function () {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, done)
        });

        it('ensures that there is at least an entry', function (done) {
            //get the feed for the RSS entries
            let feed = document.getElementsByClassName("feed")[0];
            //within the feed search for the first entry links
            let entrylink = feed.getElementsByClassName("entry-link")[0];
            //within the entry link search for the actual entry
            let entry = entrylink.getElementsByClassName("entry");
            expect(entry.length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function(){
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let currentContent = {};

        beforeEach( function (done) {
            loadFeed(0,function () {
                currentContent = document.getElementsByClassName('feed')[0].innerHTML;
                loadFeed(2, done);
            });

        });

        it('ensures new feed changes content', function (done) {
            let nextContent = document.getElementsByClassName('feed')[0].innerHTML;
            //compare the feed content
            expect(nextContent).not.toBe(currentContent);
            done();
        });
    });


});
