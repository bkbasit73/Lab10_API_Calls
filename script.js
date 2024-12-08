// Utility function to display data
function displayData(data, isError = false) {
  const displaySection = document.getElementById("dataDisplay");
  const errorSection = document.getElementById("errorSection");

  if (isError) {
    errorSection.innerHTML = `
            <div class="error-message">
                <h3>Error Details</h3>
                <p>Status: ${data.status}</p>
                <p>Message: ${data.message}</p>
            </div>
        `;
    displaySection.innerHTML = "";
  } else {
    displaySection.innerHTML = `
            <h3>Post Details</h3>
            <p><strong>Title:</strong> ${data.title}</p>
            <p><strong>Body:</strong> ${data.body}</p>
            <p><strong>ID:</strong> ${data.id}</p>
        `;
    errorSection.innerHTML = "";
  }
}

// Task 1: Fetch with fetch()
document.getElementById("fetchFetchBtn").addEventListener("click", () => {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => {
      if (!response.ok) {
        throw {
          status: response.status,
          message: response.statusText || "Network response was not ok",
        };
      }
      return response.json();
    })
    .then((data) => displayData(data))
    .catch((error) => displayData(error, true));
});

// Task 2: Fetch with XMLHttpRequest
document.getElementById("fetchXhrBtn").addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/2", true);

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      const data = JSON.parse(xhr.responseText);
      displayData(data);
    } else {
      displayData(
        {
          status: xhr.status,
          message: xhr.statusText || "Request failed",
        },
        true
      );
    }
  };

  xhr.onerror = function () {
    displayData(
      {
        status: xhr.status,
        message: "Network Error",
      },
      true
    );
  };

  xhr.send();
});

// Task 3: POST Request
document.getElementById("postForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("postTitle").value;
  const body = document.getElementById("postBody").value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      body: body,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw {
          status: response.status,
          message: response.statusText || "Network response was not ok",
        };
      }
      return response.json();
    })
    .then((data) => {
      displayData(data);
      // Clear form after successful submission
      document.getElementById("postTitle").value = "";
      document.getElementById("postBody").value = "";
    })
    .catch((error) => displayData(error, true));
});

// Task 4: PUT Request with XMLHttpRequest
document.getElementById("putForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("putId").value;
  const title = document.getElementById("putTitle").value;
  const body = document.getElementById("putBody").value;

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `https://jsonplaceholder.typicode.com/posts/${id}`, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      const data = JSON.parse(xhr.responseText);
      displayData(data);
      // Clear form after successful update
      document.getElementById("putId").value = "";
      document.getElementById("putTitle").value = "";
      document.getElementById("putBody").value = "";
    } else {
      displayData(
        {
          status: xhr.status,
          message: xhr.statusText || "Request failed",
        },
        true
      );
    }
  };

  xhr.onerror = function () {
    displayData(
      {
        status: xhr.status,
        message: "Network Error",
      },
      true
    );
  };

  xhr.send(
    JSON.stringify({
      id: id,
      title: title,
      body: body,
      userId: 1,
    })
  );
});
