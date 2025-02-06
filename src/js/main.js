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
    document.getElementById("search-field").addEventListener("input", filterOutData);
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
   // https://www.youtube.com/watch?v=XmdOZ5NSqb8&list=PL-51WBLyFTg1l3K0aTH0uX6PzgaLfzJBK
   //hämtar tabellen
    const tableEl = document.querySelector("table");

    tableEl.innerHTML = "";

    //loop som går igenom tabellen och lägger till i tabellen
    for(let i = 0; i < data.length; i++) {
        const tableRow = `<tr>
                    <td>${data[i].code}</td>
                    <td>${data[i].coursename}</td>
                    <td>${data[i].progression}</td>
                    </tr>`

        tableEl.innerHTML += tableRow;
    }
}

function filterOutData() {
    //hämtar sökfältet
    const searchPhrase = document.getElementById("search-field").value;

    //skapar en temporär variabel så inget händer med arrayen
    //sök/filtrera efter kurskod, kursnamn eller progression
    const filteredData = courses.filter(courses =>
        courses.code.toLowerCase().includes(searchPhrase.toLowerCase())
    ||
        courses.coursename.toLowerCase().includes(searchPhrase.toLowerCase())
    ||
    courses.progression.toLowerCase().includes(searchPhrase.toLowerCase())
    )

    writeOutCourses(filteredData);
}

