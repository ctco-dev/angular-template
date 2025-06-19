# List of Training Materials and Practical Tasks

## Angular Training Profile
Angular Training Profile (sharepoint.com)

## Template
GitHub - ctco-dev/angular-template

## Useful Links
- Angular documentation (note, most of the projects use versions <=17)
   - https://angular.dev/
- Functional library which is extensively used some projects
   - https://www.learnrxjs.io/
- Widely used Angular state manager
   - https://www.learnrxjs.io/ 
- JavaScript guide
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction
- HTML guide
    - https://developer.mozilla.org/en-US/docs/Learn/HTML
- CSS guide
    - https://developer.mozilla.org/en-US/docs/Learn/CSS

## PluralSight Videos
(see [Angular Training Profile sharepoint.com](https://ctcolv.sharepoint.com/sites/TKMpublic/SitePages/Angular.-Training-Profile.aspx?xsdata=MDV8MDJ8fGM4YzZkMDYxZmJkMzQ4NGE5ZWQzMDhkY2UxZmVmMGUyfDc3YzE3ODUxMjYzYjRhMWViNDgwNjJhNTYzODcxNjA0fDB8MHw2Mzg2MzM3MzIyNTkwOTQyMjd8VW5rbm93bnxWR1ZoYlhOVFpXTjFjbWwwZVZObGNuWnBZMlY4ZXlKV0lqb2lNQzR3TGpBd01EQWlMQ0pRSWpvaVYybHVNeklpTENKQlRpSTZJazkwYUdWeUlpd2lWMVFpT2pFeGZRPT18MXxMMk5vWVhSekx6RTVPalZoT0RCa1ltTXpMV1ZtTm1FdE5ESTNNeTA0TW1ZMkxXSTVaR0prTnpCaE1EWm1ZVjg1TTJFeFpUQXdNaTFtTUdRNUxUUmlaRFl0WWprMk5TMHlNbUU1TkdVeE4yWXdOelJBZFc1eExtZGliQzV6Y0dGalpYTXZiV1Z6YzJGblpYTXZNVGN5TnpjM05qUXlORE16TkE9PXw5YjQ4NzAzOGNjNGE0Y2ZiOWVkMzA4ZGNlMWZlZjBlMnw0MzIxMzljNjE5NjA0NDZkYmRjMGY0MmNkZTI2OGM0Nw%3d%3d&sdata=Tm8vMCtLT3FqWlhNNVNyRDRGWG1hS3k5b2gwUmVpbDU3cFo1ZlhORkhxRT0%3d&ovuser=77c17851-263b-4a1e-b480-62a563871604%2coleg.gabrusenok%40ctco.lv&OR=Teams-HL&CT=1727857814782&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiIxNDE1LzI0MDgxNzAwNDIxIiwiSGFzRmVkZXJhdGVkVXNlciI6ZmFsc2V9&SafelinksUrl=https%3a%2f%2fctcolv.sharepoint.com%2fsites%2fTKMpublic%2fSitePages%2fAngular.-Training-Profile.aspx))

### [Angular Fundamentals](https://app.pluralsight.com/library/courses/fundamentals-angular/table-of-contents)
**Video. Duration 4h 53m**

Angular is the most broadly accepted framework for building front-end applications. This course will teach you the fundamentals of Angular needed to create professional Angular applications, including components, services, routing, APIs, and testing.

### [Unit Testing in Angular](https://app.pluralsight.com/library/courses/angular--unit-testing/table-of-contents)
**Video. Duration 3h 25m**

This course will teach you to write effective unit tests in your Angular applications.

### [Angular Coding Style](https://angular.io/guide/styleguide)
**Text. Duration 45 min**

This style guide presents preferred conventions and, as importantly, explains why.

This course will teach you the fundamentals needed to get started with development and constructing great-looking, responsive websites with Angular Material leveraging Material Design.

### [Angular NgRx: Getting Started](https://app.pluralsight.com/library/courses/angular-ngrx-getting-started/table-of-contents)
**Video. Duration 4h 15m**

This course gets you started with NgRx including a store, actions, reducers, effects, and selectors.

### Optional [Angular Material](https://app.pluralsight.com/library/courses/angular-material/table-of-contents)
**Video. Duration 3h 8m**

This course gets you started with NgRx including a store, actions, reducers, effects, and selectors.

## FAQ
### General questions
**Q: Should we test templates in TestBed?**  
A: It depends on agreements between your project teammates. From my perspective, if your templates have a lot of logic inside (branching, diff templates based on conditions), it's worth to invest in testing with TestBed. But I would argue it should be used only occasionally as it can drawback your tests performance.
 
**Q: For some reasons one participants project was generated as ngModules project not standalone components one?**  
A: In case your project was generated with an old setup (NgModules, no Control Flow, no signals, etc), you can use the Angular migration schematics to migrate to new approaches. [Migrations • Overview • Angular](https://angular.dev/reference/migrations)
 
**Q: Will we have something related to authentication?**  
A: Angular doesn't provide out-of-the-box solutions for auth strategies. Usually 3rd party libs are used for it. Also, PluralSight has some courses related to the auth in Angular, so maybe it's worth to check them out.
 
**Q: How to set env. variables in Docker?**  
A: There is no "correct" answer for that. One of the approaches, which we are using in the project, is to pass your env variables to the docker container during command `docker run` and then inject them in your `window` object directly, by adding something like `window.env=Object.freeze({...})` to the top of the bundle file.

### Practical task

**Q: Inject vs Dependency**  
A: It's just 2 approaches to accomplish the same thing. `inject()` is slightly better due to type interference, IMO. Please check out this article: https://alyshovtapdig.medium.com/inject-vs-constructor-in-angular-which-one-should-you-use-en-dbdf1070739c![image](https://github.com/user-attachments/assets/5758fdfe-bf26-4921-91fe-bcf89161b5fd)

**Q: Use case of NGRX? Why to use it if it just too much code?**  
A: NGRX, as any other state management, has steeping learning curve and setup, but after its very easy to scale, manage and evolve. For medium-large projects, it is a nice investment IMO. Of course, necessity of any state management should be carefully assessed by team members before investing time in it. Note: in the practical task it is for learning

**Q: Can I fork CTCo project?**  
A: Yes, you can. Just, please, keep in mind, that you shouldn't use any client devices for training!

**Q: Where to find data for Guest Book?**  
A: Guest Book is a free entry form, where users can write their impressions about your app – there is no preset data for it.

**Q: So data will be stored in browser, per user?**  
A: Yes, you can use any browser storage (local, session, indexdb)

**Q: Should they use Bootstrap or regular CSS?**  
A: In order to get familiar with CSS stuff, we encourage you to use regular CSS. Although, you can use some helper utilities from Angular Material\CDK (e.g. dialog windows).

**Q: Folder structure, how to do it?**  
A: Angular team has their suggestions on that matter, but it is always up to you project.

**Q: How to preserve scroll when going back to the list of posts?**  
A: One of the ways, is to save your scroll position somewhere (e.g. service, browser storage, etc), and then restore it when needed.

## Books
- https://exploringjs.com/js/book/index.html
- https://www.amazon.com/dp/0596517742/wrrrldwideweb

## Online materials
- [NG conference 2024](https://www.youtube.com/playlist?list=PLOETEcp3DkCpMsEWr8uQHD0Hbhf545u-p) (Online Conference). Ng-conf is the world’s largest conference devoted specifically to Angular.
- [Joshua Morony](https://www.youtube.com/%40JoshuaMorony/playlists) - YouTube quick tutorials related to Angular and other web technologies

## The Angular Show (Podcasts)
- https://podcasts.apple.com/ca/podcast/the-angular-show/id1501989276
- https://open.spotify.com/show/1PrLErQHBqBhZsRV1KHhGM

## Additional tutorials
[Udemy training](https://www.udemy.com/course/the-complete-guide-to-angular-2/?srsltid=AfmBOooOYqV8ER6d6hq4m8pJO3WoC9yZmgjggmYTAon-Ujyjer0TrFgh&couponCode=ST22MT240325G1)

