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

const categoriesFilters = () => {
    const worksGallery = document.querySelector(".gallery")
    const filtersContainer = document.querySelector(".filters")
    const buttonsFilterDefault = document.createElement("button")
    buttonsFilterDefault.innerHTML = "Tous"
    filtersContainer.appendChild(buttonsFilterDefault)

    buttonsFilterDefault.addEventListener("click", () => {
        worksGallery.innerHTML = ""
        displayWorks()
    })

    categories.forEach(categories => {
        const buttonsFilter = document.createElement("button")
        buttonsFilter.innerHTML = categories.name
        filtersContainer.appendChild(buttonsFilter)

        buttonsFilter.addEventListener("click", () => {           
            const filterWorks = works.filter((works) => {
                return works.categoryId === categories.id
            })
//resoudre probleme, les travaux ne s'affiches pas au click, le displaywork ne fonctionne pas???
            console.log("nouvelle liste", filterWorks)
            worksGallery.innerHTML = ""
            displayWorks(filterWorks) 
        })
    })
}


displayWorks()
categoriesFilters()