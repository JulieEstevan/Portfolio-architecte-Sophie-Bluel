//--------------------------------------------------------------------
//---------- Variables and Functions import --------------------------

import {works, categories, fetchWorks} from "./index.js"
const modal = document.querySelector("dialog")
const modalCloseButton = document.createElement("button")
modalCloseButton.classList.add("close-button")
const modalChangeButton = document.createElement("button")
const arrowBack = document.createElement("button")


//--------------------------------------------------------------------
//---------- Modal of the Delete project feature ---------------------

export const modalEditDelet = () => {

    //----------------------------------------------------------------
    //---------- Structure of the Delete Modal -----------------------
    modal.innerHTML = ""
    const modalBoxDelet = document.createElement("div")
    modalBoxDelet.classList.add("modal-box")
    modal.appendChild(modalBoxDelet)
    const modalTitle = document.createElement("h3")
    modalTitle.classList.add("modal-title")
    modalTitle.innerHTML = "Gallerie Photo"
    const modalGallery = document.createElement("div")
    modalGallery.classList.add("modal-gallery")
    modalChangeButton.classList.add("modal-change-button")
    modalChangeButton.innerHTML = "Ajouter une Photo"
    modalBoxDelet.append(modalCloseButton, modalTitle, modalGallery, modalChangeButton)

    //----------------------------------------------------------------
    //---------- Gallery of the Delete Modal -------------------------
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
}


//--------------------------------------------------------------------
//---------- Modal of the Adding project feature ---------------------
export const modalEditAdd = () => {

    //----------------------------------------------------------------
    //---------- Structure of the Adding Modal -----------------------
    modal.innerHTML = ""
    const modalBoxAdd = document.createElement("div")
    modalBoxAdd.classList.add("modal-box")
    modal.appendChild(modalBoxAdd)
    arrowBack.classList.add("arrow-back")
    arrowBack.innerHTML = '<i class="fa-solid fa-arrow-left fa-xl"></i>'
    const modalTitle = document.createElement("h3")
    modalTitle.classList.add("modal-title")
    modalTitle.innerHTML = "Ajout photo"
    const modalValidateButton = document.createElement("button")
    modalValidateButton.classList.add("modal-validate-button")
    modalValidateButton.innerHTML = "Valider"
    modalValidateButton.type = "submit"
    modalValidateButton.disabled = true

    //----------------------------------------------------------------
    //---------- Form for Adding the new project ---------------------
    const modalFormAdd = document.createElement("form")
    modalFormAdd.classList.add("modal-form-add")
    modalFormAdd.name = "modalFormAdd"

    //---------- Image input -----------------------------------------
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

    //---------- Title input -----------------------------------------
    const modalNameAddLabel = document.createElement("label")
    modalNameAddLabel.setAttribute("for", "title")
    modalNameAddLabel.innerHTML = "Titre"
    const modalNameAdd = document.createElement("input")
    modalNameAdd.type = "text"
    modalNameAdd.name = "title"
    modalNameAdd.id = "title"

    //---------- Category Selector input ------------------------------
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
        categorySelectorOption.value = category.id
        modalCategorySelector.appendChild(categorySelectorOption)
    })

    modalBoxAdd.append(arrowBack, modalCloseButton, modalTitle, modalFormAdd, modalValidateButton)
    modalFormAdd.append(modalImgAddContainer, modalNameAddLabel, modalNameAdd, modalCategorySelectorLabel, modalCategorySelectorContainer)

    //------------------------------------------------------------------
    //---------- Preview image and file size limit ---------------------
    modalImgAdd.addEventListener("change", (event) => {
        if (modalImgAdd.files[0].size <= 4000000) {
            const modalImgAddFile = document.querySelector("input[type=file]").files[0]
            const modalImgReader = new FileReader()
            modalImgAddButton.classList.remove("img-add-button-error")
            modalImgReader.addEventListener("load", () => {
            modalImgPreview.src = modalImgReader.result
            })
            const fileName = modalImgAddFile.name;
            const fileExtension = fileName.split(".").pop().toLowerCase();
            if (fileExtension !== "jpg" && fileExtension !== "") {
                alert(
                    "Format de fichier non valide. Veuillez sélectionner un fichier au format JPG ou PNG."
                );
                return;
            }
            if (modalImgAddFile) {
                modalImgReader.readAsDataURL(modalImgAddFile)
                modalImgRequirements.remove()
                modalImgAddButton.style = "display:none"
                modalImgAddContainer.classList.remove("modal-img-logo")
                modalImgAddContainer.classList.replace("modal-img-add-container", "modal-img-add-container-preview")
            }
        } else {
            console.log("Error : Fichier trop volumineux")
            modalImgAddButton.classList.add("img-add-button-error")
        }
    })


    //------------------------------------------------------------------
    //---------- Dynamic for the Validation button ---------------------
    modalFormAdd.addEventListener("input", (event) => {
        if (modalCategorySelector.value !== "" && modalNameAdd.value !== "" && modalImgAdd.value !== "") {
            modalValidateButton.disabled = false
            modalValidateButton.classList.replace("modal-validate-button", "modal-validate-button-validate")
        } else {
            modalValidateButton.disabled = true
            modalValidateButton.classList.replace("modal-validate-button-validate", "modal-validate-button")
        }
    })

    //------------------------------------------------------------------
    //---------- Submit event for Adding project -----------------------
    modalValidateButton.addEventListener("click", (event) => {
    event.preventDefault()
    let work = {
    image: modalImgAdd.files[0],
    title: modalNameAdd.value,
    category: modalCategorySelector.value,
    }
    postNewWork(work)
    })
}

//--------------------------------------------------------------------
//---------- Function for Adding project -----------------------------
const postNewWork = async (work) => {
    const token = localStorage.getItem(`token`)
    const formData = new FormData()
    formData.append("image", work.image)
    formData.append("title", work.title)
    formData.append("category", work.category)
    console.log(work.image)
    await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    })
    .then((response) => {
        if (response.ok) {
            alert(`Votre projet ` + work.title + ` est en ligne`)
            return fetchWorks()
        } else {
            alert("Veuillez remplir les formulaires ")
            console.log("Erreur lors de la mise à jour de l'image ")
        }
    })
    .then((updateWorks) => {
        if (updateWorks) {
            works = updateWorks
            displayWorks(works)
        }
    })
}

//--------------------------------------------------------------------
//---------- Display of the Modals -----------------------------------
export const displayModal = () => {
    const editButton = document.querySelector(".edit")
    editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>'

    editButton.addEventListener("click", () => {
        modalEditDelet()
        modal.showModal()
    })

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close()
        }  else if (event.target === modalCloseButton) {
            modal.close()
        }
    })

    modalChangeButton.addEventListener("click", () => {
        modalEditAdd()
    })

    arrowBack.addEventListener("click", () => {
        modalEditDelet()
    })
}