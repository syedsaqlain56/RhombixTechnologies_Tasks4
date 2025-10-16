document.getElementById("addBtn").addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const image = document.getElementById("image").files[0];

  if (!title || !content || !image) return alert("Please fill all fields");

  const reader = new FileReader();
  reader.onload = function (e) {
    const newPost = {
      title,
      content,
      image: e.target.result
    };
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    alert("Post added successfully!");
    window.location.href = "index.html";
  };
  reader.readAsDataURL(image);
});
