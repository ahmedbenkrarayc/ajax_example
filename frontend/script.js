function getPeople() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/api/people", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const result = document.getElementById('result');
            result.innerHTML = '<h4>People List:</h4>' + data.map(person => `
                <div>
                    <strong>ID:</strong> ${person.id} <br>
                    <strong>Name:</strong> ${person.name} <br>
                    <strong>Age:</strong> ${person.age} <br>
                </div>`).join('');
        } else {
            console.error('Error fetching people:', xhr.status);
        }
    };
    xhr.send();
}

function postPerson(event) {
    event.preventDefault();

    const person = {
        name: document.getElementById('name').value,
        age: parseInt(document.getElementById('age').value),
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/api/people", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onload = function() {
        if (xhr.status === 201) {
            alert(`Person added: ${person.name}`);
            document.getElementById('postForm').reset();
            getPeople();
        } else {
            console.error('Error adding person:', xhr.status);
        }
    };

    xhr.send(JSON.stringify(person));
}

function putPerson(event) {
    event.preventDefault();

    const personId = parseInt(document.getElementById('updateId').value);
    const updatedData = {
        name: document.getElementById('updateName').value,
        age: parseInt(document.getElementById('updateAge').value),
    };

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `http://localhost:3000/api/people/${personId}`, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onload = function() {
        if (xhr.status === 200) {
            alert(`Person updated: ${updatedData.name}`);
            document.getElementById('putForm').reset();
            getPeople();
        } else {
            console.error('Error updating person:', xhr.status);
        }
    };

    xhr.send(JSON.stringify(updatedData));
}

function deletePerson(event) {
    event.preventDefault();

    const personId = parseInt(document.getElementById('deleteId').value);

    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `http://localhost:3000/api/people/${personId}`, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            alert("Person deleted successfully");
            document.getElementById('deleteForm').reset();
            getPeople();
        } else {
            console.error('Error deleting person:', xhr.status);
        }
    };

    xhr.send();
}
