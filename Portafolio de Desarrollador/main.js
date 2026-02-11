const username = '20241062-ui';
	

const URL_PROFILE = `https://api.github.com/users/${username}`;
const URL_REPOS = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=owner&direction=desc`;
const URL_FOLLOWERS = `https://api.github.com/users/${username}/followers?per_page=5`;

async function loadProfile() {
    try {
        const response = await fetch(URL_PROFILE);
        const data = await response.json();

        document.getElementById('avatar').src = data.avatar_url;
        document.getElementById('name').textContent = data.name || data.login;
        document.getElementById('bio').textContent = data.bio || 'Sin biografía';
        document.getElementById('location').textContent = `📍 ${data.location || 'Planeta Tierra'}`;
    } catch (error) {
        console.error("Error cargando perfil:", error);
    }
}

async function loadRepos() {
    try {
        const response = await fetch(URL_REPOS);
        const repos = await response.json();
        const container = document.getElementById('repo-list');

        repos.forEach(repo => {
            const card = document.createElement('div');
            card.classList.add('repo-card');

            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'Sin descripción disponible.'}</p>
                <div style="margin-top: 10px;">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                </div>
                <br>
                <a href="${repo.html_url}" target="_blank">Ver Proyecto →</a>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error cargando repos:", error);
    }
}

async function loadFollowers() {
    try {
        const response = await fetch(URL_FOLLOWERS);
        const followers = await response.json();
        const container = document.getElementById('followers-list');

        followers.forEach(follower => {
            const img = document.createElement('img');
            img.src = follower.avatar_url;
            img.alt = follower.login;
            img.classList.add('follower-img');
            img.title = follower.login;
            
            const link = document.createElement('a');
            link.href = follower.html_url;
            link.target = "_blank";
            link.appendChild(img);

            container.appendChild(link);
        });
    } catch (error) {
        console.error("Error cargando seguidores:", error);
    }
}

loadProfile();
loadRepos();
loadFollowers();