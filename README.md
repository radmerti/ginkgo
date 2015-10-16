# GINKGO

Ginkgo is an application for presenting professional or scientific work along with professional, CV-timeline-like, profile pages with an overall focus on simplicity, scalability and speed.

### State of the Project

* Nothing works, really.
* The root page is served. :)
* Current Version: 00.00.00

### Milestones ###
* 00.00.01 endpoints for articles working.
* 00.00.02 endpoints for grid working.
* 00.00.03 endpoints for topics working.
* 00.00.04 endpoints for images working.
* 00.00.05 endpoints for users working
* 00.00.06 authentication working.
* 00.01.01 web-ui for logging in.
* 00.01.02 web-ui for posting article.
* 00.01.03 web-ui for editing and showing user profiles.
* 00.01.04 web-ui for managing posted articles.
* 00.01.05 web-ui for grid update (show topics and authors)
* 00.01.06 web-ui for article update (show topics and authors)
* 00.02.01 database structure following people & topics.
* 00.02.02 endpoints for following people & topics.
* 00.03.01 backend infrastructure for sending emails (generally).
* 00.03.02 backend for sending verification mails (account activation, deletion)
* 01.00.00 web-ui for managing one's account.
* 01.00.01 grid-sort-by-relevance includes followed people & topics

### How to run the project?

First install the dependencies.

* `npm install`

After making changes to the front-end javascript code the concatenated and minified files in the `public/javascript/` directory need to be updated.

* `grunt client`

Finally, start the server.

* `npm start`

When you update the libraries in `source/javascript/lib` you need to recompile the compressed javascript file.

* `grunt library`

To check your backend work run

* `grunt server`

Alternatively you can run every Grunt job with `grunt`.

### Contribution guidelines

* we currently don't have testing guidelines in palce
* we currently don't have code review in place

### Who do I talk to?

* Repository Guardian: Tillmann Radmer (<tillmann.radmer@gmail.com>)
* Chief Technology Wizard: Hannes Radme (<hannesradmer@gmail.com>)