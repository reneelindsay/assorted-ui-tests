/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *   KEYSTROKES, SEARCH BAR, SEARCH RESULTS -- A SIMPLE UI TEST
 * 
 *   Write a test script that 
 *   1. opens the chrome browser
 *   2. navigates to copart.com  
 *   3. assserts that the navigation was executed correctly
 *   4. locates the copart.com search bar
 *   5. simulates keystrokes "exotic" in search bar
 *   6. simulates "enter" key
 *   7. navigates to copart.com page with search results for "exotic"
 *   8. closes the browser
 * 
 *   Create test using the following:
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
 *   UPDATED 2019.05.10 to reflect current search results
 * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * */


// import chromedriver
// declare variables needed for UI simulation
require("chromedriver");
var webdriver = require("selenium-webdriver");
var assert    = require("chai").assert;  
var until     = webdriver.until;
var By        = webdriver.By;
var Key       = webdriver.Key;


describe("Challenge 2 Suite", function(){

    // insert a timer into the describe method
    // after 40 seconds, the after method will run
    // (my 2012 macbook pro is slow and needs extra time) 
    this.timeout(40000);
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
        // write "return" to get into the habit of using returns
        // "return" is the end of a promise
        return driver.quit();
    });

    // within "it" we lay out the test objectives
    // tests run sequentially
    it("This should open Copart.com website", function() {
        return driver.get("https://copart.com");
    });

    it("The title should be 'Auto Auction - Copart USA - Salvage Cars For Sale'", function() {

        // manually handle the promise to get title from the page
        // site title found in <title> section of html meta
        return driver.getTitle().then(function(title) {
            assert.equal(title, "Auto Auction - Copart USA - Salvage Cars For Sale");
        });
    });
    
    // same test as above, with asynchronous function
    it("The title should be 'Auto Auction - Copart USA - Salvage Cars For Sale'", async function() {
      var title = await driver.getTitle();

      // "assert.include" allows partial titles 
      // test will pass even though full title is not returned
      return assert.include(title, "Auto Auction - Copart USA");
    });

    it("Should locate search bar, type 'exotic,' and hit RETURN", async function() {
        
        // create a variable "element" that represents the search bar
        var element = await driver.findElement(By.id("input-search"));

        // send keystrokes "exotic" and RETURN into element
        return element.sendKeys("exotic" + Key.RETURN)
    });

    // manually run to identify current number of search results
    // BEFORE running this test, input CURRENT NUMBER, in this case 400
    it("Should display 400 search results for 'exotic'", async function() {
        
        // wait 30 seconds for page to load with "exotic" in the title
        await driver.wait(until.titleContains("exotic"), 30000);
        console.log(await driver.getTitle());

        // create variable "html" to represent body tag in HTML 
        // contains the number search results
        var html = await driver.findElement(By.tagName("body")).getAttribute("innerHTML");
        
        // confirm that the body of the page includes the string "400"
        return assert.include(html, "400");
    });
        
});


