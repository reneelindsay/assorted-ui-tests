/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 
 *   OPEN, NAVIGATE, CLOSE -- A SIMPLE BROWSER TEST
 * 
 *   1. open the chrome browser
 *   2. navigate to google.com
 *   3. close the browser
 * 
 *   Create the test using the following:
 *   Javascript
 *   Node.js 
 *   Mocha 
 *   Chai 
 *   Chrome Driver 
 *   and Selenium Webdriver
 * 
 *   Challenge author: Matt Chiang
 *   Presented to: Autobots, QA at the Point 
 *   Date: 2019.03.22
 *   
 *   Renee Lindsay
 *   2019.03.31
 * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * */


// import chromedriver into the test script
// declare a variable "webdriver" that will perform actions in Chrome
// declare a variable "assert" to ensure accurate test result values

require("chromedriver");
var webdriver = require("selenium-webdriver");
var assert    = require("chai").assert;  

// give your test(s) a title
describe("Open Close Browser Test Suite", function(){

    // insert a timer into the describe method
    // after 30 seconds, after method will run
    // (my 2012 macbook pro is slow and needs extra time)
    this.timeout(30000);
    var driver;

    before(function () {

        // create object "driver" 
        // "driver" initializes chrome through webdriver
        driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
    });

    after(function() {

        // use "driver" object to quit chrome through webdriver
        // "return" is the end of a promise
        return driver.quit();
    });

    // within "it" we lay out the test objectives
    // tests run sequentially
    it("This should open the Google website", function() {
        return driver.get("http://google.com");
    });

    it("The title should be 'Google'", function() {

        // manually handle the promise to get title from the page
        return driver.getTitle().then(function(title) {
            assert.equal(title, "Google");
        });
    });
    
    // asynchronous functions allow a program to run line by line
    // they avoid nested functions with repeated ".then"
    it("The title should be 'Google'", async function() {
      var title = await driver.getTitle();
      return assert.equal(title, "Google");
    });
    
});