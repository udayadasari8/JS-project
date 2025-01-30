function openForm() {
    document.getElementById('form').style.display = 'block';   
}

function closeForm() {
    document.getElementById('form').style.display = 'none';
}

/*function success() {
    alert("Successfully submitted");
}*/

function submitForm(event) {
    event.preventDefault();
    const auth = document.getElementById('textauthor').value;
    const text = document.getElementById('textblog').value;
    displayBlog(auth, text);
    saveBlog(auth, text);
    closeForm();
    resetform();
    //success();
}

function resetform() {
    document.getElementById('textauthor').value = "";
    document.getElementById('textblog').value = "";
}

function displayBlog(auth, text, views = 0) {
    const blogsContainer = document.getElementById('blogsContainer');
    const newBlogDiv = document.createElement('div');
    newBlogDiv.className = 'p-4 bg-blue-100 border border-blue-300 rounded-lg mb-4';
    newBlogDiv.innerHTML = `
       <div class="auth"> <strong>Author Name:</strong> ${auth}<br> </div>
        <button onclick="showBlog(this)" class="rounded-lg bg-blue-500 text-white mt-2">Click Here</button>
        <div class="blog-content" style="display: none;">
            <strong>Blog:</strong> ${text}<br>
        </div>
        <strong>Views:</strong> <span class="view-count">${views}</span><br>
        <button onclick="editBlog(this)" class="rounded-lg bg-yellow-500 text-white mt-2">Edit</button>
        <button onclick="deleteBlog(this)" class="rounded-lg bg-red-500 text-white mt-2">Delete</button>
    `;
    blogsContainer.appendChild(newBlogDiv);
}

function showBlog(button) {
    const blogContent = button.nextElementSibling;
    blogContent.style.display = 'block';
    incrementViews(button.parentElement);
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
    const auth = blogDiv.querySelector('strong').innerText.split(': ')[1];
    const text = blogDiv.querySelector('.blog-content strong').innerText.split(': ')[1];
    document.getElementById('textauthor').value = auth;
    document.getElementById('textblog').value = text;
    deleteBlog(button);
    openForm();
   // document.getElementById('textauthor').value ="Enter The Author Name";
    //document.getElementById('textblog').value = "Enter The Blog";
}


function deleteBlog(button) {
    const blogDiv = button.parentElement;
    const blogsContainer = document.getElementById('blogsContainer');
    blogsContainer.removeChild(blogDiv);
    updateLocalStorage();
}

function updateLocalStorage() {
    const blogsContainer = document.getElementById('blogsContainer');
    const blogDivs = blogsContainer.children;
    let blogs = [];
    for (let blogDiv of blogDivs) {
        const auth = blogDiv.querySelector('.strong').innerText.split(': ')[1];
        const text = blogDiv.querySelector('.blog-content').innerText.split(': ')[1];
        const views = (blogDiv.querySelector('.view-count').innerText);
        blogs.push({ auth, text, views });
    }
    localStorage.setItem('blogs', JSON.stringify(blogs));
}

function incrementViews(blogDiv) {
    const viewCountSpan = blogDiv.querySelector('.view-count');
    let views = parseInt(viewCountSpan.innerText);
    views++;
    viewCountSpan.innerText = views;
    updateLocalStorage();
}

document.addEventListener('DOMContentLoaded', loadBlogs);