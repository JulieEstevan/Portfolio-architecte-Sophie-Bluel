const fetchWorks = async () => {
    const responseWorks = await fetch("http://localhost:5678/api/works")
    const works = responseWorks.json()
    return works
}
const works = await fetchWorks()
console.log("works", works)

const fetchCategories = async () => {
    const responseCategories = await fetch("http://localhost:5678/api/categories")
    const categories = responseCategories.json()
    return categories
}
const categories = await fetchCategories()
console.log("categories", categories)

const displayWorks = () => {
    works.forEach(works => {
        const worksGallery = document.querySelector(".gallery")
        const workContainer = document.createElement("figure")
        const workImage = document.createElement("img")
        workImage.src = works.imageUrl
        const workTitle = document.createElement("figcaption")
        workTitle.innerHTML = works.title

        worksGallery.appendChild(workContainer)
        workContainer.appendChild(workImage)
        workContainer.appendChild(workTitle)
    });
}

displayWorks()
