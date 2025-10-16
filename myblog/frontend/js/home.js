const dummyPosts = [
  {
    title: "Healthy Breakfast Ideas",
    content: "Start your day with energy-packed oats, eggs, and fruits.",
    image: "https://source.unsplash.com/400x300/?breakfast,food"
  },
  {
    title: "The Science of Sleep",
    content: "Good sleep improves brain health, memory, and focus.",
    image: "https://source.unsplash.com/400x300/?sleep,science"
  },
  {
    title: "Top 5 Fitness Habits",
    content: "Workout, hydrate, rest, eat well, and stay consistent.",
    image: "https://source.unsplash.com/400x300/?fitness,health"
  },
  {
    title: "Technology in Medicine",
    content: "AI and robotics are transforming modern healthcare.",
    image: "https://source.unsplash.com/400x300/?health,ai"
  }
];

const blogList = document.getElementById("blogList");
dummyPosts.forEach(post => {
  const div = document.createElement("div");
  div.className = "bg-white shadow-md rounded-lg overflow-hidden";
  div.innerHTML = `
    <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover">
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-2">${post.title}</h3>
      <p>${post.content}</p>
    </div>
  `;
  blogList.appendChild(div);
});
