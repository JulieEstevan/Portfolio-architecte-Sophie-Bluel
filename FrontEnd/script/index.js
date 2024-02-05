const response = await fetch("http://localhost:5678/api/works")
const works = await response.json()
const worksGallery = document.querySelector(".gallery")
let i

for (i = 0; i < works.length; i++) {
    const workContainer = document.createElement("figure")
    const workImage = document.createElement("img")
    workImage.src = works[i].imageUrl
    const workTitle = document.createElement("figcaption")
    workTitle.innerHTML = works[i].title

    worksGallery.appendChild(workContainer)
    workContainer.appendChild(workImage)
    workContainer.appendChild(workTitle)
}