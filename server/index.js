const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// --- Blog Data Model ---
// {
//   id: number,
//   title: string,
//   blogHtml: string,
//   author: string,
//   date: Date
// }

let blogs = [
  {
    id: 1,
    title: "Getting Started with Angular",
    blogHtml: `<p>Angular is a platform for building mobile and desktop web applications. It provides a way to structure your code and make it maintainable, scalable, and testable. To get started, install the Angular CLI using <code>npm install -g @angular/cli</code>. Then, create a new project with <code>ng new my-app</code> and serve it locally with <code>ng serve</code>. The CLI will scaffold your project structure, including modules, components, and services. Angular uses TypeScript, a superset of JavaScript, which brings strong typing and object-oriented features to your codebase. The framework encourages modular development and supports features like dependency injection, routing, and forms out of the box. As you build your first Angular app, you'll learn about components, templates, and data binding, which are the core building blocks of any Angular application.</p>
<ul>
  <li>Install Node.js and npm</li>
  <li>Install Angular CLI</li>
  <li>Create a new project</li>
  <li>Serve your app locally</li>
</ul>
<p>With these steps, you are ready to start exploring Angular's powerful features and build robust web applications.</p>`,
    author: "Alice Johnson",
    date: new Date("2025-05-01")
  },
  {
    id: 2,
    title: "Understanding Angular Components",
    blogHtml: `<p>Components are the fundamental building blocks of Angular applications. Each component consists of a TypeScript class, an HTML template, and optional CSS styles. The class contains the logic and data, while the template defines the view. Components are declared using the <code>@Component</code> decorator, which specifies the selector, template, and styles. You can create a new component using the Angular CLI with <code>ng generate component my-component</code>. Components can communicate with each other using input and output properties, allowing for modular and reusable code. Angular's change detection mechanism ensures that the view is always in sync with the underlying data. By organizing your application into components, you can manage complexity and improve maintainability.</p>
<ul>
  <li>Component class (logic and data)</li>
  <li>Template (view)</li>
  <li>Styles (CSS)</li>
  <li>Input and Output properties</li>
</ul>
<p>Mastering components is essential for any Angular developer.</p>`,
    author: "Bob Smith",
    date: new Date("2025-05-02")
  },
  {
    id: 3,
    title: "Angular Directives Explained",
    blogHtml: `<p>Directives in Angular are classes that add additional behavior to elements in your Angular applications. There are three types of directives: components, attribute directives, and structural directives. Attribute directives change the appearance or behavior of an element, component, or another directive. Structural directives change the DOM layout by adding and removing DOM elements. Common built-in directives include <code>*ngIf</code> for conditional rendering and <code>*ngFor</code> for iterating over lists. You can also create your own custom directives to encapsulate reusable logic. Directives are a powerful way to extend HTML and create dynamic, interactive applications.</p>
<ul>
  <li>Attribute directives (e.g., ngClass, ngStyle)</li>
  <li>Structural directives (e.g., *ngIf, *ngFor)</li>
  <li>Custom directives</li>
</ul>
<p>Understanding directives is key to building flexible Angular applications.</p>`,
    author: "Carol Lee",
    date: new Date("2025-05-03")
  },
  {
    id: 4,
    title: "Angular Services and Dependency Injection",
    blogHtml: `<p>Services in Angular are used to organize and share code across your app. They are typically used for data access, business logic, or shared state. Angular's dependency injection system makes it easy to provide and inject services where needed. To create a service, use the CLI command <code>ng generate service my-service</code>. You can then inject the service into components or other services using the constructor. Services are provided in the root injector by default, making them singletons throughout your app. This pattern promotes code reuse and separation of concerns.</p>
<ul>
  <li>Create services for shared logic</li>
  <li>Inject services using constructors</li>
  <li>Use providedIn: 'root' for singleton services</li>
</ul>
<p>Dependency injection is a core concept in Angular that enables modular and testable code.</p>`,
    author: "David Kim",
    date: new Date("2025-05-04")
  },
  {
    id: 5,
    title: "Routing in Angular Applications",
    blogHtml: `<p>Routing allows you to navigate between different views or components in your Angular application. The Angular Router maps URL paths to components, enabling deep linking and navigation. To set up routing, import <code>RouterModule</code> and define your routes in the <code>app-routing.module.ts</code>. Use the <code>&lt;router-outlet&gt;</code> directive in your template to display routed components. Navigation can be triggered programmatically or using the <code>routerLink</code> directive in templates. Angular's router supports features like route guards, lazy loading, and parameterized routes, making it a powerful tool for building single-page applications.</p>
<ul>
  <li>Define routes in RouterModule</li>
  <li>Use &lt;router-outlet&gt; for routed views</li>
  <li>Navigate with routerLink</li>
</ul>
<p>Routing is essential for building scalable Angular apps.</p>`,
    author: "Eva Brown",
    date: new Date("2025-05-05")
  },
  {
    id: 6,
    title: "Angular Forms: Template vs Reactive",
    blogHtml: `<p>Angular provides two approaches for handling forms: template-driven and reactive forms. Template-driven forms are easy to use and suitable for simple scenarios, while reactive forms offer more control and scalability for complex forms. Template-driven forms use directives in the template, while reactive forms are defined in the component class using <code>FormGroup</code> and <code>FormControl</code>. Both approaches support validation, but reactive forms make it easier to implement custom validators and dynamic form controls. Choose the approach that best fits your application's needs.</p>
<ul>
  <li>Template-driven forms (ngModel)</li>
  <li>Reactive forms (FormGroup, FormControl)</li>
  <li>Validation and custom validators</li>
</ul>
<p>Understanding both approaches helps you build robust forms in Angular.</p>`,
    author: "Frank Green",
    date: new Date("2025-05-06")
  },
  {
    id: 7,
    title: "State Management in Angular",
    blogHtml: `<p>Managing state is crucial for complex Angular applications. Angular provides several options for state management, including services, RxJS, and third-party libraries like NgRx. Services can be used to share state between components, while RxJS observables enable reactive programming. NgRx is a popular library that implements the Redux pattern, providing a single source of truth for your application's state. Choosing the right state management solution depends on your app's complexity and requirements.</p>
<ul>
  <li>Use services for shared state</li>
  <li>Leverage RxJS for reactive state</li>
  <li>Consider NgRx for large-scale apps</li>
</ul>
<p>Effective state management leads to maintainable and scalable Angular apps.</p>`,
    author: "Grace Miller",
    date: new Date("2025-05-07")
  },
  {
    id: 8,
    title: "Consuming REST APIs in Angular",
    blogHtml: `<p>Angular's <code>HttpClient</code> module makes it easy to communicate with RESTful APIs. Import <code>HttpClientModule</code> in your app module and inject <code>HttpClient</code> into your services. Use methods like <code>get</code>, <code>post</code>, <code>put</code>, and <code>delete</code> to interact with your backend. Handle responses using RxJS observables and operators like <code>map</code> and <code>catchError</code>. Always handle errors gracefully and provide feedback to users. Organize your API calls in services to keep your components clean and focused.</p>
<ul>
  <li>Import HttpClientModule</li>
  <li>Inject HttpClient in services</li>
  <li>Use RxJS for response handling</li>
</ul>
<p>Consuming APIs is a core skill for Angular developers.</p>`,
    author: "Henry Wilson",
    date: new Date("2025-05-08")
  },
  {
    id: 9,
    title: "Angular Pipes: Transforming Data",
    blogHtml: `<p>Pipes in Angular are used to transform data in templates. Built-in pipes include <code>DatePipe</code>, <code>UpperCasePipe</code>, <code>LowerCasePipe</code>, and <code>CurrencyPipe</code>. You can also create custom pipes to implement your own data transformations. Pipes are easy to use: simply add the pipe symbol (<code>|</code>) followed by the pipe name in your template. For example, <code>{{ birthday | date:'longDate' }}</code> formats a date. Pipes help keep your templates clean and readable.</p>
<ul>
  <li>Built-in pipes (date, uppercase, lowercase, currency)</li>
  <li>Custom pipes</li>
  <li>Use pipes in templates</li>
</ul>
<p>Pipes are a powerful feature for formatting and transforming data in Angular.</p>`,
    author: "Ivy Martinez",
    date: new Date("2025-05-09")
  },
  {
    id: 10,
    title: "Optimizing Angular Performance",
    blogHtml: `<p>Performance is critical for modern web applications. Angular provides several tools and techniques to optimize performance, including Ahead-of-Time (AOT) compilation, lazy loading, and change detection strategies. Use AOT to compile your app at build time, reducing load times. Implement lazy loading to load modules only when needed. Use <code>OnPush</code> change detection to minimize unnecessary checks. Profile your app with browser developer tools and Angular DevTools to identify bottlenecks. Optimize your code and assets to ensure a smooth user experience.</p>
<ul>
  <li>Use AOT compilation</li>
  <li>Implement lazy loading</li>
  <li>Optimize change detection</li>
</ul>
<p>Optimizing performance leads to faster and more responsive Angular apps.</p>`,
    author: "Jack Lee",
    date: new Date("2025-05-10")
  },
  {
    id: 11,
    title: "Unit Testing in Angular",
    blogHtml: `<p>Testing is an essential part of software development. Angular supports unit testing with Jasmine and Karma. Write tests for your components, services, and pipes to ensure they work as expected. Use the Angular CLI to run tests with <code>ng test</code>. Mock dependencies and use spies to isolate units of code. Aim for high test coverage to catch bugs early and improve code quality. Testing also makes refactoring safer and more efficient.</p>
<ul>
  <li>Write tests for components and services</li>
  <li>Use Jasmine and Karma</li>
  <li>Run tests with Angular CLI</li>
</ul>
<p>Unit testing is key to building reliable Angular applications.</p>`,
    author: "Karen Young",
    date: new Date("2025-05-11")
  },
  {
    id: 12,
    title: "Angular Animations",
    blogHtml: `<p>Animations can greatly enhance the user experience in your Angular applications. Angular provides a powerful animation API based on CSS and JavaScript. Define animations in your component metadata using the <code>animations</code> property. Use triggers, states, and transitions to control animations. Angular animations are built on top of the Web Animations API, providing smooth and performant effects. Use animations to provide feedback, guide users, and make your app more engaging.</p>
<ul>
  <li>Define animations in component metadata</li>
  <li>Use triggers, states, and transitions</li>
  <li>Enhance user experience</li>
</ul>
<p>Animations make your Angular apps more dynamic and interactive.</p>`,
    author: "Leo Turner",
    date: new Date("2025-05-12")
  },
  {
    id: 13,
    title: "Lazy Loading Modules in Angular",
    blogHtml: `<p>Lazy loading is a technique that loads modules only when they are needed, reducing the initial load time of your Angular application. Configure lazy loading in your routing module using the <code>loadChildren</code> property. Organize your app into feature modules and load them on demand. Lazy loading improves performance, especially for large applications with many routes. Monitor your app's bundle size and optimize your code to take full advantage of lazy loading.</p>
<ul>
  <li>Configure lazy loading in routing</li>
  <li>Organize app into feature modules</li>
  <li>Improve performance for large apps</li>
</ul>
<p>Lazy loading is essential for scalable Angular applications.</p>`,
    author: "Mona Scott",
    date: new Date("2025-05-13")
  },
  {
    id: 14,
    title: "Angular CLI Tips and Tricks",
    blogHtml: `<p>The Angular CLI is a powerful tool that streamlines development. Use commands like <code>ng generate</code> to scaffold components, services, and modules. Use <code>ng build --prod</code> to build your app for production. The CLI also supports testing, linting, and deployment. Customize your project with the <code>angular.json</code> configuration file. Explore CLI options to boost your productivity and maintain a clean codebase.</p>
<ul>
  <li>Use ng generate for scaffolding</li>
  <li>Build for production with ng build --prod</li>
  <li>Customize with angular.json</li>
</ul>
<p>The CLI is an indispensable tool for Angular developers.</p>`,
    author: "Nina Adams",
    date: new Date("2025-05-14")
  },
  {
    id: 15,
    title: "Deploying Angular Apps",
    blogHtml: `<p>Deployment is the final step in the development process. Build your Angular app for production using <code>ng build --prod</code>. This command creates an optimized bundle in the <code>dist/</code> folder. You can deploy your app to various platforms, including Firebase Hosting, Netlify, Vercel, or your own server. Configure environment variables for different deployment targets. Monitor your app after deployment to ensure it runs smoothly and fix any issues that arise. Proper deployment practices ensure your users have a seamless experience.</p>
<ul>
  <li>Build for production</li>
  <li>Deploy to popular platforms</li>
  <li>Monitor and maintain your app</li>
</ul>
<p>Successful deployment is crucial for delivering value to your users.</p>`,
    author: "Oscar Perez",
    date: new Date("2025-05-15")
  }
];

// --- Comments Data Model ---
// {
//   id: number,
//   name: string,
//   message: string,
//   email: string,
//   date: Date
// }
let comments = [
  {
    id: 1,
    blogId: 1,
    name: "John Doe",
    message: "Great article on Angular!",
    email: "john@example.com",
    date: new Date()
  },
  {
    id: 2,
    blogId: 1,
    name: "Jane Smith",
    message: "Very helpful, thanks!",
    email: "jane@example.com",
    date: new Date()
  },
  {
    id: 3,
    blogId: 2,
    name: "Alex Brown",
    message: "I love Angular topics.",
    email: "alex@example.com",
    date: new Date()
  }
];

let guestComments = [
  {
    id: 1,
    name: "Emily Carter",
    message: "This blog is fantastic! I learned a lot from the articles.",
    email: "emily.carter@example.com",
    date: new Date("2025-05-20")
  },
  {
    id: 2,
    name: "Michael Lee",
    message: "Great resource for Angular beginners. Thanks for sharing!",
    email: "michael.lee@example.com",
    date: new Date("2025-05-21")
  },
  {
    id: 3,
    name: "Sophia Turner",
    message: "I appreciate the detailed explanations and examples.",
    email: "sophia.turner@example.com",
    date: new Date("2025-05-22")
  }
];

// 1. Get all blogs
app.get('/api/blogs', (req, res) => {
  res.json(blogs);
});

// 2. Get blog by id
app.get('/api/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const blog = blogs.find(b => b.id === id);
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  res.json(blog);
});

// 3. Add a new blog
app.post('/api/blogs', (req, res) => {
  const { title, blogHtml, author, date } = req.body;
  if (!title || !blogHtml || !author || !date) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const newBlog = {
    id: blogs.length ? blogs[blogs.length - 1].id + 1 : 1,
    title,
    blogHtml,
    author,
    date: new Date(date)
  };
  blogs.push(newBlog);
  res.status(201).json(newBlog);
});

// 4. Get comments by blogId
app.get('/api/blogs/:blogId/comments', (req, res) => {
  const blogId = parseInt(req.params.blogId, 10);
  const blogComments = comments.filter(c => c.blogId === blogId);
  res.json(blogComments);
});

// 5. Add comment by blogId
app.post('/api/blogs/:blogId/comments', (req, res) => {
  const blogId = parseInt(req.params.blogId, 10);
  const { name, message, email, date } = req.body;
  if (!name || !message || !email || !date) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const newComment = {
    id: comments.length ? comments[comments.length - 1].id + 1 : 1,
    blogId,
    name,
    message,
    email,
    date: new Date(date)
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

// 6. Delete comment by blogId and comment id
app.delete('/api/blogs/:blogId/comments/:commentId', (req, res) => {
  const blogId = parseInt(req.params.blogId, 10);
  const commentId = parseInt(req.params.commentId, 10);
  const index = comments.findIndex(c => c.blogId === blogId && c.id === commentId);
  if (index === -1) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  comments.splice(index, 1);
  res.status(204).send();
});

// Get all guest comments
app.get('/api/guest-comments', (req, res) => {
  res.json(guestComments);
});

// Add a new guest comment
app.post('/api/guest-comments', (req, res) => {
  const { name, message, email, date } = req.body;
  if (!name || !message || !email || !date) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const newGuestComment = {
    id: guestComments.length ? guestComments[guestComments.length - 1].id + 1 : 1,
    name,
    message,
    email,
    date: new Date(date)
  };
  guestComments.push(newGuestComment);
  res.status(201).json(newGuestComment);
});

// Delete a guest comment by id
app.delete('/api/guest-comments/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = guestComments.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Guest comment not found' });
  }
  guestComments.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});