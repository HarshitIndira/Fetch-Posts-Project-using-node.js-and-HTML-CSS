
// Fetch data from the API endpoint
axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        // Handle successful response
        const data = response.data;
        // Get the table body element
        const tableBody = document.querySelector('.myTable tbody');

        // Loop through the fetched data and create table rows
        data.forEach(post => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.body}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
    });
