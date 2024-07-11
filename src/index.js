let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection=document.getElementById('toy-collection')
  const toyForm = document.querySelector(".add-toy-form");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

  const apiUrl = 'http://localhost:3000/toys'; 


fetch(apiUrl)
.then(response => response.json())
.then(toys => {
  const toyCollection = document.getElementById('toy-collection');
  toys.forEach(toy => {
    const card = document.createElement('div');
    card.className = 'card';
    const h2 = document.createElement('h2');
    h2.textContent = toy.name;
    const img = document.createElement('img');
    img.src = toy.image;
    img.className = 'toy-avatar';
    const p = document.createElement('p');
    p.textContent = `${toy.likes} Likes`;
    const button = document.createElement('button');
    button.className = 'like-btn'
    button.id = toy.id;
    button.textContent = 'Like ❤️';

  card.appendChild(h2);
  card.appendChild(img);
  card.appendChild(p);
  card.appendChild(button);

        toyCollection.appendChild(card);
      });
    })
    .catch(error => console.error('Error fetching toys:', error));

function addNewToy(name, image) {
  fetch(apiUrl, {
    method: 'POST',
    headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
},
  body: JSON.stringify({
    name: name,
    image: image,
    likes: 0
})
})
.then(response => response.json())
.then(newToy => {
  const toyCollection = document.getElementById('toy-collection');
  const card = createToyCard(newToy);
  toyCollection.appendChild(card);
})
.catch(error => console.error('Error adding new toy:', error));
}
    
function increaseToyLikes(toyId) {
  const toyUrl = `${apiUrl}/${toyId}`;
  fetch(toyUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ likes: 1 }) // Assuming you want to increment likes by 1
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(updatedToy => {
      // Update the DOM with the new likes count
      const toyCard = document.getElementById(updatedToy.id).parentElement;
      const likesP = toyCard.querySelector('p');
      likesP.textContent = `${updatedToy.likes} Likes`;
    })
    .catch(error => console.error('Error increasing likes:', error));
}