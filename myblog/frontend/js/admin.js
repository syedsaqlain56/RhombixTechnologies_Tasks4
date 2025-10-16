const adminPosts = document.getElementById("adminPosts");
const posts = JSON.parse(localStorage.getItem("posts")) || [];

function renderPosts() {
  adminPosts.innerHTML = "";
  posts.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "bg-white shadow-md rounded-lg overflow-hidden";
    div.innerHTML = `
      <img src="${p.image}" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">${p.title}</h3>
        <p>${p.content}</p>
        <button onclick="editPost(${i})" class="bg-green-600 text-white px-2 py-1 rounded mr-2">Edit</button>
        <button onclick="deletePost(${i})" class="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
      </div>
    `;
    adminPosts.appendChild(div);
  });
}

function deletePost(index) {
  posts.splice(index, 1);
  localStorage.setItem("posts", JSON.stringify(posts));
  renderPosts();
}

function editPost(index) {
  const newTitle = prompt("Edit Title:", posts[index].title);
  const newContent = prompt("Edit Content:", posts[index].content);
  if (newTitle && newContent) {
    posts[index].title = newTitle;
    posts[index].content = newContent;
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
  }
}

renderPosts();
