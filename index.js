//Global declartions
const partyForm = document.getElementById('party-form');
const partyList = document.getElementById('party-list');
const tableBody = document.getElementById('party-table');
const tbody = document.getElementById('tbody');

//Create class and constructors
class Party {
    constructor(id, name, date, time, location, description) {
        this.id = id;
        this.name = name;
        this.date = new Date(date);
        this.time = time;
        this.location = location;
        this.description = description;
    }
    formatDate() {
        return `${this.date.toLocaleDateString()}, ${this.date.toLocaleTimeString()}`;
    }
    generateHTML() {
        return `
        <td>${this.name}</td>
        <td>${this.formatDate()}</td>
        <td>${this.location}</td>
        <td>${this.description}</td>
        <td><button class="deleteButton" data-id="${this.id}>X</button></td>
    `;
    }
}

//Loading the DOM
document.addEventListener("DOMContentLoaded", async () => {
    
    //Fetch and display event APIS
    async function fetchEvents() {
        try {
            const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events');
            const responseData = await response.json();

            const dataArray = responseData.data;
        
            tableBody.innerHTML = '';
            console.log(responseData)
            dataArray.forEach(partyData => {
                const party = new Party(partyData.id, partyData.name, partyData.date, partyData.time, partyData.location, partyData.description);
                const partyRow = document.createElement('tr');
                partyRow.innerHTML = party.generateHTML();
                tableBody.appendChild(partyRow);
                console.log(partyRow);
                });
        } catch (error) {
            console.error('Error fetching events:', error);
        }  
    }
            
    //Party Form input and event listener 
    partyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const location = document.getElementById('location').value;
        const description = document.getElementById('description').value;
    
        try {
            await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, date, time, location, description })
            });
            await fetchEvents();
            partyForm.reset();
        } catch (error) {
            console.error('Error adding party:', error);
        }
    });
    await fetchEvents();

});





// const submitButton = document.getElementById('submitButton');

//user see a list of names, dates, times, locations, and descriptions of all parties 


//each party has a delete button, click event removes from the list


//form allows user unput for new party, submit event add the party to the list