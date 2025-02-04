/*
    1. sortera fram det man skriver
    2. ska kunna skriva små bokstäver och ändå få sökt på stora bokstäver
    3. ska kunna klicka på en kategori i tabellen och sortera i stigande eller fallnde ordning
    4. VALFRITT: om man först sorterar i bokstavsordning ska man sen kunna klicka igen och sortera från andra hållet
*/

"use strict" //ANVÄND COURSES.SORT NÄR MAN KLICKAR PÅ <TH>???

//global array to store courses
let courses = [];

//KANSKE KAN SKRIVA UT DEN HÄR FÖR ATT GÖRA DEN ANNORLUNDA????
window.onload = () => {
    loadCourses();

    //för filtrering
    //document.querySelector("#search-field").addEventListener("input", goThroughData);
}

async function loadCourses() {
    try {
        //ajax-anrop
        const responseFetch = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");
        
        //avvaktar svar och konverterar till json
        //lagrar fetched data i den globala arrayen
        courses = await responseFetch.json();

        //anropar funktion som skriver ut kurserna
        //ligger här för när kurserna laddas in ska man
        //kunna se dem (de ska skrivas ut) också
        writeOutCourses(courses);

    } catch(error) {
        //så vi (utvecklare) kan se felmeddelandet
        console.error(error);

        //felmeddelande till användaren
        document.querySelector("#error").innerHTML = "<p>Något gick fel med anslutningen. Kom tillbaka och försök igen senare!</p>";
    }   
}

function writeOutCourses(data) {
    //const codeEl = document.querySelector("#code");
    //const nameEl = document.querySelector("#name");
    const progressionAEl = document.querySelector("#progressionA");
    const progressionBEl = document.querySelector("#progressionB");

    //rensa bort DOM
    //codeEl.innerHTML = "";
    //nameEl.innerHTML = "";
    progressionAEl.innerHTML = "";
    progressionBEl.innerHTML = "";

    //Sortera utifrån kurskod
    //data.sort((a, b) => a.code > b.code ? 1 : -1);
    //data.sort((a, b) => a.coursename > b.coursename ? 1 : -1);
    data.sort((a, b) => a.progression > b.progression ? 1 : -1);

    //skilj på de olika kategorierna
    //const courseCodes = data.filter(courses => courses.type === "code"); 
    //const courseNames = data.filter(courses => courses.type === "name"); 
    const courseProgressionA = data.filter(courses => courses.progression === "A");
    const courseProgressionB = data.filter(courses => courses.progression === "B");

    console.table(courseProgressionA);

    //skriv ut till DOM
    //varje gång loopen händer måste ett <tr> skapas
    //som ska innehålla dessa <td>
    //en ny <tr>-instans måste skapas
    
    courseProgressionA.forEach(progA => {
        /* didn't work
        let tableEl = document.createElement("tr");
        let tableRowEl = document.querySelector("td");
        tableEl.appendChild(tableRowEl); */

        /*
            fuuunkade - dock bara för en enda rad, och ingen B
            const tr = document.createElement("tr");
            tr.appendChild( //lade till denna och det verkar funka??
            //men det står att det är fel med anslutningen?
                progressionAEl.innerHTML += `<td>${progA.code}</td>`,
                progressionAEl.innerHTML += `<td>${progA.coursename}</td>`,
                progressionAEl.innerHTML += `<td>${progA.progression}</td>`,
            )
        */

        //create seperate function to create element????
        //http://www.w3schools.com/jsref/jsref_map.asp

        //eller med entries: http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_entries
        progressionAEl.innerHTML += `<td>${progA.code}</td>`;
        progressionAEl.innerHTML += `<td>${progA.coursename}</td>`;
        progressionAEl.innerHTML += `<td>${progA.progression}</td>`;
        
    })

    courseProgressionB.forEach(progB => {
        const tr = document.createElement("tr");

        // blev fel progressionBEl.innerHTML += `<td>${progB.code}, ${progB.coursename}, ${progB.progression}</td>`;
            progressionBEl.innerHTML += `<td>${progB.code}</td>`;
            progressionBEl.innerHTML += `<td>${progB.coursename}</td>`;
            progressionBEl.innerHTML += `<td>${progB.progression}</td>`;
        
    })

    //ANVÄNDA COURSES.MAP PÅ NÅGOT SÄTT?

   
}