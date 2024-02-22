const token = localStorage.getItem("token")
const worksGallery = document.querySelector(".gallery")
const filtersContainer = document.querySelector(".filters")

const fetchWorks = async () => {
    const responseWorks = await fetch("http://localhost:5678/api/works")
    const works = responseWorks.json()
    return works
}
const works = await fetchWorks()

const fetchCategories = async () => {
    const responseCategories = await fetch("http://localhost:5678/api/categories")
    const categories = responseCategories.json()
    return categories
}
const categories = await fetchCategories()

const displayWorks = (worksToDisplay) => {
    worksToDisplay.forEach(work => {
        const workContainer = document.createElement("figure")
        const workImage = document.createElement("img")
        workImage.src = work.imageUrl
        const workTitle = document.createElement("figcaption")
        workTitle.innerHTML = work.title
        worksGallery.appendChild(workContainer)
        workContainer.append(workImage, workTitle)
    });
}
displayWorks(works)

const categoriesFilters = () => {
    const buttonFilterDefault = document.createElement("button")
    buttonFilterDefault.classList.add("button", "button-active")
    buttonFilterDefault.innerHTML = "Tous"
    filtersContainer.appendChild(buttonFilterDefault)

    categories.forEach(category => {
        const buttonFilter = document.createElement("button")
        buttonFilter.classList.add("button")
        buttonFilter.innerHTML = category.name
        buttonFilter.value = category.id
        filtersContainer.appendChild(buttonFilter)
        const filterWorks = works.filter((work) => {
                return work.categoryId === category.id
            })
        
        buttonFilter.addEventListener("click", () => {
            worksGallery.innerHTML = ""
            buttonFilterDefault.classList.remove("button-active")
            displayWorks(filterWorks)
        })

        buttonFilterDefault.addEventListener("click", () => {
        worksGallery.innerHTML = ""
        buttonFilterDefault.classList.add("button-active")
        buttonFilter.classList.remove("button-active")
        displayWorks(works)
        })
    })
    
    
}
categoriesFilters()

if (token) {
    
}