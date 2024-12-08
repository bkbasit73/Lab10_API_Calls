document.getElementById("fetchWithFetch").addEventListener("click", () => {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      document.getElementById("displayData").innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.body}</p>`;
    })
    .catch((error) => {
      document.getElementById(
        "displayData"
      ).innerHTML = `<p>Error: ${error.message}</p>`;
    });
});
document.getElementById("fetchWithXHR").addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/2", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      document.getElementById("displayData").innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.body}</p>`;
    } else {
      document.getElementById(
        "displayData"
      ).innerHTML = `<p>Error: ${xhr.statusText}</p>`;
    }
  };
  xhr.onerror = function () {
    document.getElementById(
      "displayData"
    ).innerHTML = `<p>Error: Network Error</p>`;
  };
  xhr.send();
});
document.getElementById("postForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("postTitle").value;
  const body = document.getElementById("postBody").value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("displayData").innerHTML = `
                <p>Post Created Successfully:</p>
                <h3>${data.title}</h3>
                <p>${data.body}</p>`;
    })
    .catch((error) => {
      document.getElementById(
        "displayData"
      ).innerHTML = `<p>Error: ${error.message}</p>`;
    });
});
document.getElementById("putForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("postId").value;
  const title = document.getElementById("putTitle").value;
  const body = document.getElementById("putBody").value;

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `https://jsonplaceholder.typicode.com/posts/${id}`, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      document.getElementById("displayData").innerHTML = `
                <p>Post Updated Successfully:</p>
                <h3>${data.title}</h3>
                <p>${data.body}</p>`;
    } else {
      document.getElementById(
        "displayData"
      ).innerHTML = `<p>Error: ${xhr.statusText}</p>`;
    }
  };
  xhr.onerror = function () {
    document.getElementById(
      "displayData"
    ).innerHTML = `<p>Error: Network Error</p>`;
  };
  xhr.send(JSON.stringify({ title, body }));
});
