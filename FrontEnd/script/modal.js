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
const modal = document.querySelector("dialog")

export const displayModal = () => {
    const editButton = document.querySelector(".edit")
    editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>'

    editButton.addEventListener("click", () => {
        modalEditDelet()
        modal.showModal()
    })
}

export const modalEditDelet = () => {
    modal.innerHTML = ""

    const modalBoxDelet = document.createElement("div")
    modalBoxDelet.classList.add("modal-box")
    modal.appendChild(modalBoxDelet)

    const modalCloseButton = document.createElement("button")
    modalCloseButton.classList.add("close-button")

    const modalTitle = document.createElement("h3")
    modalTitle.classList.add("modal-title")
    modalTitle.innerHTML = "Gallerie Photo"

    const modalGallery = document.createElement("div")
    modalGallery.classList.add("modal-gallery")
    works.forEach(work => {
        const modalImgContainer = document.createElement("div")
        const buttonDelet = document.createElement("button")
        buttonDelet.innerHTML = '<i class="fa-solid fa-trash-can fa-xs"></i>'
        buttonDelet.classList.add("button-delet")
        const modalImg = document.createElement("img")
        modalImg.src = work.imageUrl
        modalImg.classList.add("modal-img")
        modalImgContainer.append(buttonDelet, modalImg)
        modalGallery.appendChild(modalImgContainer)
    })

    const modalChangeButton = document.createElement("button")
    modalChangeButton.classList.add("modal-change-button")
    modalChangeButton.innerHTML = "Ajouter une Photo"

    modalBoxDelet.append(modalCloseButton, modalTitle, modalGallery, modalChangeButton)

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close()
        }  else if (event.target === modalCloseButton) {
            modal.close()
        }
    })

    modalChangeButton.addEventListener("click", () => {
        modalEditAdd()
        modalBoxDelet.remove()
    })
}

export const modalEditAdd = () => {
    modal.innerHTML = ""

    const modalBoxAdd = document.createElement("div")
    modalBoxAdd.classList.add("modal-box")
    modal.appendChild(modalBoxAdd)

    const arrowBack = document.createElement("button")
    arrowBack.classList.add("arrow-back")
    arrowBack.innerHTML = '<i class="fa-solid fa-arrow-left fa-xl"></i>'
    
    const modalCloseButton = document.createElement("button")
    modalCloseButton.classList.add("close-button")

    const modalTitle = document.createElement("h3")
    modalTitle.classList.add("modal-title")
    modalTitle.innerHTML = "Ajout photo"

    const modalFormAdd = document.createElement("form")
    modalFormAdd.classList.add("modal-form-add")
    modalFormAdd.name = "modalFormAdd"

    const modalImgAddContainer = document.createElement("div")
    modalImgAddContainer.classList.add("modal-img-add-container", "modal-img-logo")
    const modalImgAddButton = document.createElement("label")
    modalImgAddButton.classList.add("img-add-button")
    modalImgAddButton.setAttribute("for", "image")
    modalImgAddButton.innerHTML = "+ Ajouter photo"
    const modalImgAdd = document.createElement("input")
    modalImgAdd.type = "file"
    modalImgAdd.name = "image"
    modalImgAdd.id = "image"
    modalImgAdd.accept = ".jpg,.png"
    modalImgAdd.style = "display:none"
    const modalImgRequirements = document.createElement("p")
    modalImgRequirements.innerHTML = "jpg, png : 4mo max"
    const modalImgPreview = document.createElement("img")
    modalImgPreview.classList.add("modal-img-preview")
    modalImgAddContainer.append(modalImgPreview, modalImgAddButton, modalImgAdd, modalImgRequirements)

    addEventListener("input", () => {
        const modalImgAddFile = document.querySelector("input[type=file]").files[0]
        const modalImgReader = new FileReader()

        modalImgReader.addEventListener("load", () => {
        modalImgPreview.src = modalImgReader.result
        })
        if (modalImgAddFile) {
            modalImgReader.readAsDataURL(modalImgAddFile)
            modalImgRequirements.remove()
            modalImgAddButton.style = "display:none"
            modalImgAddContainer.classList.remove("modal-img-logo")
            modalImgAddContainer.classList.replace("modal-img-add-container", "modal-img-add-container-preview")
        }
    })
    

    const modalNameAddLabel = document.createElement("label")
    modalNameAddLabel.setAttribute("for", "title")
    modalNameAddLabel.innerHTML = "Titre"
    const modalNameAdd = document.createElement("input")
    modalNameAdd.type = "text"
    modalNameAdd.name = "title"
    modalNameAdd.id = "title"

    const modalCategorySelectorLabel = document.createElement("label")
    modalCategorySelectorLabel.innerHTML = "Catégorie"
    const modalCategorySelectorContainer = document.createElement("label")
    modalCategorySelectorContainer.setAttribute("for", "category")
    modalCategorySelectorContainer.classList.add("modal-selector")
    
    const modalCategorySelector = document.createElement("select")
    modalCategorySelector.name = "category"
    modalCategorySelector.id = "category"
    modalCategorySelectorContainer.appendChild(modalCategorySelector)
    const categorySelectorOptionDefault = document.createElement("option")
    categorySelectorOptionDefault.innerHTML = ""
    modalCategorySelector.append(categorySelectorOptionDefault)
    categories.forEach(category => {
        const categorySelectorOption = document.createElement("option")
        categorySelectorOption.innerHTML = category.name
        modalCategorySelector.appendChild(categorySelectorOption)
    })

    const modalValidateButton = document.createElement("button")
    modalValidateButton.classList.add("modal-validate-button")
    modalValidateButton.innerHTML = "Valider"
    //modalValidateButton.disabled = true

    modalBoxAdd.append(arrowBack, modalCloseButton, modalTitle, modalFormAdd, modalValidateButton)
    modalFormAdd.append(modalImgAddContainer, modalNameAddLabel, modalNameAdd, modalCategorySelectorLabel, modalCategorySelectorContainer)

    arrowBack.addEventListener("click", () => {
        modalEditDelet()
        modalBoxAdd.remove()
    })

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close()
        }  else if (event.target === modalCloseButton) {
            modal.close()
        }
    })

    modalValidateButton.addEventListener("click", () => {
    const modalForm = document.querySelector(".modal-form-add")
    const modalAddFormData = new FormData()
    console.log(modalAddFormData.entries(modalFormAdd))
    })
}