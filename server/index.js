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

// Generate random HTML content for blogs
function randomHtml(length) {
  const base = `<h2>Angular Article</h2><p>${'Angular is awesome. '.repeat(50)}</p><ul><li>Component</li><li>Service</li><li>Directive</li></ul><p>${'Learn more about Angular. '.repeat(50)}</p>`;
  let html = '';
  while (html.length < length) {
    html += base;
  }
  return html.slice(0, length);
}

// Initialize 15 blogs
let blogs = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `Angular Topic #${i + 1}`,
  blogHtml: randomHtml(500 + Math.floor(Math.random() * 4500)),
  author: `Author ${i + 1}`,
  date: new Date(2025, 4, i + 1)
}));

// --- Comments Data Model ---
// {
//   id: number,
//   name: string,
//   message: string,
//   email: string,
//   date: Date
// }

// Initialize comments for blogs
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

// 1. Get all blogs
app.get('/blogs', (req, res) => {
  res.json(blogs);
});

// 2. Get blog by id
app.get('/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const blog = blogs.find(b => b.id === id);
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  res.json(blog);
});

// 3. Add a new blog
app.post('/blogs', (req, res) => {
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
app.get('/blogs/:blogId/comments', (req, res) => {
  const blogId = parseInt(req.params.blogId, 10);
  const blogComments = comments.filter(c => c.blogId === blogId);
  res.json(blogComments);
});

// 5. Add comment by blogId
app.post('/blogs/:blogId/comments', (req, res) => {
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
app.delete('/blogs/:blogId/comments/:commentId', (req, res) => {
  const blogId = parseInt(req.params.blogId, 10);
  const commentId = parseInt(req.params.commentId, 10);
  const index = comments.findIndex(c => c.blogId === blogId && c.id === commentId);
  if (index === -1) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  comments.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});