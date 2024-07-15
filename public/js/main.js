const output = document.querySelector('#output');
const button = document.querySelector("#get-posts-btn");
const formButton = document.querySelector("#add-post-form");

async function showPosts(){
    try {
        const res = await fetch("http://localhost:8000/api/posts");
        if (!res.ok) {
            throw new Error("Failed to fetch Posts");
        }

        const posts = await res.json();
        output.innerHTML = '';

        posts.forEach(post => {
            const postE1 = document.createElement("div");
            postE1.textContent = post.title;
            output.appendChild(postE1);
        });
    } catch (error) {
        console.log('Error while fetching posts is ', error);
    }
}

// submit new post
async function addPost(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const title = formData.get("title");

    try {
        const res = await fetch("http://localhost:8000/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title})
        })

        if (!res.ok) {
            throw new Error("Failed to add Post");
        }

        const newPost = await res.json();

        const postE1 = document.createElement('div');
        postE1.textContent = newPost.title;
        output.appendChild(postE1);
        showPosts();

    } catch (error) {
        console.error("Error adding post")
    }
}

// Event Listeners
button.addEventListener('click', showPosts);
formButton.addEventListener("submit", addPost);