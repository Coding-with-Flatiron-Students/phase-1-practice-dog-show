document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
})

/**
 * First steps:
 * 1. Grab all the dogs from the back end
 *    Create fetchDogs Functions that will fetch dogs from db.json
 * 
 * 2. After fetch, iterate through dog in the array and create tr that resemble the code given to us and append on the page
 *    Create renderDog function
 *          i. Create TR element to hold all TD elements
 *          ii. Create button element for one of the TD elements
 *          iii. Give text to all TDs => Dog Object's data and button => "Edit"
 *          iv. append Button to last TD
 *          v. append TDs to TR
 *          vi append TR to tableBody => Oops need tableBody Node
 *          vii. Button needs event listener "click", () => fillFormData
 * 
 * 3. fillFormData
 */

const tableBody = document.getElementById("table-body")
const dogForm = document.getElementById("dog-form")

function fetchDogs(){
    fetch("http://localhost:3000/dogs")
    .then(r => r.json())
    .then(dogArray => dogArray.forEach(dogObj => renderDog(dogObj)))
}

function renderDog(dogObj){
    const { name, breed, sex} = dogObj

    const dogTR = document.createElement("tr")
    const dogNameTD = document.createElement("td")
    const dogBreedTD = document.createElement("td")
    const dogSexTD = document.createElement("td")
    const dogButtonTD = document.createElement("td")
    const dogButton = document.createElement("button")

    dogNameTD.innerText = name
    dogBreedTD.innerText = breed
    dogSexTD.innerText = sex
    dogButton.innerText = "Edit"

    dogButtonTD.append(dogButton)
    dogTR.append(dogNameTD, dogBreedTD, dogSexTD, dogButtonTD)

    dogButton.addEventListener("click", () => fillFormData(dogObj, dogTR))
    tableBody.append(dogTR)
}

function fillFormData(dogObj, dogTR){
    const {id, name, breed, sex} = dogObj
    const inputDogName = dogForm.children[0]
    const inputDogBreed = dogForm.children[1]
    const inputDogSex = dogForm.children[2]

    inputDogBreed.value = breed
    inputDogName.value = name
    inputDogSex.value = sex

    dogForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const newDogObj = {
            id: id,
            name: inputDogName.value,
            breed: inputDogBreed.value,
            sex: inputDogSex.value
        }

        patchDog(newDogObj, dogTR)
    })
    

}

function patchDog(editedDogObj, dogTR){
    fetch(`http://localhost:3000/dogs/${editedDogObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(editedDogObj)
    })
    .then(r => r.json())
    .then(updatedDog => {
        dogTR.children[0].innerText = updatedDog.name
        dogTR.children[1].innerText = updatedDog.breed
        dogTR.children[2].innerText = updatedDog.sex
    })
}

/**
 * 1. What do I have?
 *   dogObj
 *   dogForm => inputs
 * 
 * 2. What do I need?
 *    Fill out the Form with the pre existing info from the dogObj
 *    Specifically Inputs
 *  
 *    
 */