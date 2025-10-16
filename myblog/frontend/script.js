const API = "/api/posts";
const postsGrid = document.getElementById("postsGrid");
const noPosts = document.getElementById("noPosts");
const searchInput = document.getElementById("search");
const catSel = document.getElementById("category");

async function load() {
  const res = await fetch(API);
  const posts = await res.json();
  render(posts);
}
function render(posts) {
  if(!posts || posts.length===0){ noPosts.classList.remove("hidden"); postsGrid.innerHTML=""; return; }
  noPosts.classList.add("hidden");
  postsGrid.innerHTML = posts.map(p => `
    <article class="bg-white rounded shadow overflow-hidden">
      <img src="${p.imageUrl || 'https://placehold.co/600x400'}" class="thumb" />
      <div class="p-4">
        <div class="text-xs text-gray-500">${new Date(p.createdAt).toLocaleDateString()} • ${p.category}</div>
        <h3 class="font-semibold text-lg mt-2">${p.title}</h3>
        <p class="text-gray-600 mt-2">${(p.excerpt || p.content || "").slice(0,120)}...</p>
        <a href="post.html?id=${p._id}" class="text-indigo-600 mt-3 inline-block">Read more →</a>
      </div>
    </article>
  `).join("");
}

searchInput?.addEventListener("input", async () => {
  const q = searchInput.value.trim().toLowerCase();
  const res = await fetch(API);
  const posts = await res.json();
  const filtered = posts.filter(p => (p.title + p.content + (p.tags||[]).join(" ")).toLowerCase().includes(q));
  render(filtered);
});
catSel?.addEventListener("change", async () => {
  const v = catSel.value;
  const res = await fetch(API);
  const posts = await res.json();
  const filtered = v ? posts.filter(p => (p.category||"").toLowerCase()===v.toLowerCase()) : posts;
  render(filtered);
});

load();
const backendURL = "http://localhost:5000/api/auth";

// ✅ Signup
if (document.getElementById("signupForm")) {
  document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${backendURL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) window.location.href = "login.html";
  });
}

// ✅ Login
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${backendURL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    }
  });
}
const backendPostURL = "http://localhost:5000/api/posts";

// ✅ Fetch all posts
async function loadPosts() {
  const res = await fetch(backendPostURL);
  const posts = await res.json();

  const container = document.getElementById("posts");
  if (container) {
    container.innerHTML = posts.map(
      (p) => `
        <div class="bg-white rounded-lg shadow p-4">
          <img src="${p.image || 'https://via.placeholder.com/400x200'}" class="rounded mb-3 w-full h-48 object-cover" />
          <h3 class="text-xl font-bold">${p.title}</h3>
          <p class="text-gray-600 mt-2">${p.content.substring(0, 100)}...</p>
        </div>
      `
    ).join("");
  }
}

// ✅ Add new post
if (document.getElementById("addPostForm")) {
  document.getElementById("addPostForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const image = document.getElementById("image").value;

    const res = await fetch(backendPostURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, image }),
    });

    const data = await res.json();
    alert(data.message);
    if (res.ok) window.location.href = "index.html";
  });
}

// Auto load posts if on homepage
if (document.getElementById("posts")) loadPosts();
