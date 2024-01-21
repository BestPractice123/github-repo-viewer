document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('repositoryForm');
    const repositoryList = document.getElementById('repositoryList');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const repositoryName = document.getElementById('repositoryName').value;
        const repositoryLink = document.getElementById('repositoryLink').value;

        // Create a new repository item manually
        const repositoryItem = document.createElement('li');
        repositoryItem.innerHTML = `<strong>${repositoryName}</strong> by ${username} - <a href="${repositoryLink}" target="_blank">Visit Repository</a>`;
        repositoryList.appendChild(repositoryItem);

        form.reset();

        // Fetch repositories using GitHub API
       // const apiUrl = ``;
        //const accessToken = ''; // Replace with your actual access token

        try {
            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }

            const data = await response.json();

            // Handle the data (list of repositories) here
            data.forEach(repo => {
                // Check if the repository already exists in the list
                const repoExists = Array.from(repositoryList.children).some(item => {
                    return item.textContent.includes(repo.name);
                });

                if (!repoExists) {
                    const repoItem = document.createElement('li');
                    repoItem.textContent = repo.name;
                    repositoryList.appendChild(repoItem);
                }
            });
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    });
});


function submitRepository() {
    // Get form values
    const username = document.getElementById('username').value;
    const repositoryName = document.getElementById('repositoryName').value;
    const repositoryLink = document.getElementById('repositoryLink').value;

    // Create repository item
    const repositoryItem = document.createElement('li');
    repositoryItem.innerHTML = `<strong>${username}</strong> - ${repositoryName} (<a href="${repositoryLink}" target="_blank">View</a>)`;

    // Append to repository list
    const repositoryList = document.getElementById('repositoryList');
    repositoryList.appendChild(repositoryItem);

    // Clear form
    document.getElementById('username').value = '';
    document.getElementById('repositoryName').value = '';
    document.getElementById('repositoryLink').value = '';
}
