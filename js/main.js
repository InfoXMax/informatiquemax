$(document).ready(() => {
  $(() => {
    $('[data-toggle="tooltip"]').tooltip();
  });

  particlesJS.load('particles-js', 'particlesjs.json');
});
//github pages
    document.addEventListener('DOMContentLoaded', function() {
      const pagesList = document.getElementById('pages-list');
      if (!pagesList) {
        console.error('Could not find element with id "pages-list"');
        return; 
      }

      const username = 'InfoXMax';
      const apiUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
      const pagesBaseUrl = `https://${username.toLowerCase()}.github.io`;

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
          }
          return response.json();
        })
        .then(repos => {
          // Filter for repos that have GitHub Pages enabled
          const pagesRepos = repos.filter(repo => repo.has_pages);

          // Clear the "Loading..." placeholder
          pagesList.innerHTML = ''; 

          if (pagesRepos.length === 0) {
            pagesList.innerHTML = '<li><a class="dropdown-item disabled" href="#">No projects found</a></li>';
            return;
          }

          // Sort repos alphabetically by name
          pagesRepos.sort((a, b) => a.name.localeCompare(b.name));

          // Populate the list
          pagesRepos.forEach(repo => {
            // Check for the special <username>.github.io repo which links to the root
            let pageUrl = (repo.name.toLowerCase() === `${username.toLowerCase()}.github.io`)
              ? `${pagesBaseUrl}/`
              : `${pagesBaseUrl}/${repo.name}/`;

            const li = document.createElement('li');
            const a = document.createElement('a');
            a.className = 'dropdown-item';
            a.href = pageUrl;
            a.textContent = repo.name;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';

            li.appendChild(a);
            pagesList.appendChild(li);
          });
        })
        .catch(error => {
          console.error('Error fetching GitHub repos:', error);
          if (pagesList) {
            pagesList.innerHTML = '<li><a class="dropdown-item disabled" href="#">Error loading projects</a></li>';
          }
        });
    });
