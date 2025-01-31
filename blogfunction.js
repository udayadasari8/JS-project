function openForm() {
    document.getElementById('form').style.display = 'block';
}

function closeForm() {
    //event.preventDefault();
    document.getElementById('form').style.display = 'none';
}

function submitForm(event) {
    event.preventDefault();
    const auth = document.getElementById('textauthor').value.trim();
    const text = document.getElementById('textblog').value.trim();

    if (!auth || !text) {
        alert("Please fill in both fields.");
        return;
    }

    displayBlog(auth, text);
    saveBlog(auth, text);
    closeForm();
    resetForm();
}


function resetForm() {
    document.getElementById('textauthor').value = "";
    document.getElementById('textblog').value = "";
}

function displayBlog(auth, text, views = 0) {
    const blogsContainer = document.getElementById('blogsContainer');
    const newBlogDiv = document.createElement('div');
    newBlogDiv.className = 'p-4 bg-blue-100 border border-blue-300 rounded-lg mb-4';
    
    newBlogDiv.innerHTML = `
        <div class="auth"><strong>Author:</strong> ${auth}</div>
        <button onclick="showBlog(this)" class="rounded-lg bg-blue-500 text-white mt-2">View Blog</button>
        <div class="blog-content mt-2 p-2 bg-white rounded-lg border border-gray-300" style="display: none;">
            <strong>Blog:</strong> <p>${text}</p>
        </div>
        <strong>Views:</strong> <span class="view-count">${views}</span><br>
        <button onclick="editBlog(this)" class="rounded-lg bg-yellow-500 text-white mt-2">Edit</button>
        <button onclick="deleteBlog(this)" class="rounded-lg bg-red-500 text-white mt-2">Delete</button>
    `;
    blogsContainer.appendChild(newBlogDiv);
}

function showBlog(button) {
    const blogContent = button.nextElementSibling;
    if (blogContent.style.display === 'none') {
        blogContent.style.display = 'block';
        incrementViews(button.parentElement);
    } else {
        blogContent.style.display = 'none';
    }
}

function saveBlog(auth, text) {
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.push({ auth, text, views: 0 });
    localStorage.setItem('blogs', JSON.stringify(blogs));
}

function loadBlogs() {
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.forEach(blog => displayBlog(blog.auth, blog.text, blog.views));
}

function editBlog(button) {
    const blogDiv = button.parentElement;
    const auth = blogDiv.querySelector('.auth').innerText.replace('Author: ', '');
    const text = blogDiv.querySelector('.blog-content p').innerText;

    document.getElementById('textauthor').value = auth;
    document.getElementById('textblog').value = text;

    deleteBlog(button);
    openForm();
}

function deleteBlog(button) {
    const blogDiv = button.parentElement;
    blogDiv.remove();
    updateLocalStorage();
}

function updateLocalStorage() {
    const blogsContainer = document.getElementById('blogsContainer');
    const blogDivs = blogsContainer.children;
    let blogs = [];

    for (let blogDiv of blogDivs) {
        const auth = blogDiv.querySelector('.auth').innerText.replace('Author: ', '');
        const text = blogDiv.querySelector('.blog-content p').innerText;
        const views = parseInt(blogDiv.querySelector('.view-count').innerText);
        blogs.push({ auth, text, views });
    }

    localStorage.setItem('blogs', JSON.stringify(blogs));
}

function incrementViews(blogDiv) {
    const viewCountSpan = blogDiv.querySelector('.view-count');
    let views = parseInt(viewCountSpan.innerText) + 1;
    viewCountSpan.innerText = views;

    updateLocalStorage();
}

function clearAllBlogs() {
    if (confirm("Are you sure you want to delete all blogs?")) {
        localStorage.removeItem('blogs');
        document.getElementById('blogsContainer').innerHTML = "";
    }
}

document.addEventListener('DOMContentLoaded', loadBlogs);
