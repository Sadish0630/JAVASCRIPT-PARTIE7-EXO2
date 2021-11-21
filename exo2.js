/**
 * fonction qui récupère la liste des prézis depuis le localStorage
 * @returns {Array}
 */
 const getPreziList = () => {
    //On récupère la liste des prézis dans le localStorage. Si il n'y a pas de prézis, on en crée un tableau vide
    localStorage.getItem("preziList") ? preziList = JSON.parse(localStorage.getItem("preziList")) : preziList = []
    return preziList;
}
/**
 * Fonction a executer lorsque le DOM est chargé
 * @returns {void}
 */
const onLoad = () => {
    //On récupère la liste des prézis
    preziList = getPreziList();
    //On affiche la liste des prézis
    displayPreziList();
}
/**
 * Fonction qui affiche la liste des prézis
 * @param {Array} preziList 
 * @returns {void}
 */
const displayPreziList = () => {
    //On vide la liste des prézis
    preziListUl.innerHTML = ""
    //On parcours la liste des prézis
    preziList.map((prezi, index) => {
        //On crée un nouvel élément li
        const li = document.createElement("li")
        //On crée un nouvel élément a
        const a = document.createElement("a")
        a.href = prezi.url
        a.target = "_blank"
        a.innerHTML = prezi.title
        a.classList = "m-2"
        //On ajoute l'élément a à l'élément li
        li.appendChild(a)
        //On crée le bouton supprimer
        const button = document.createElement("button")
        button.innerHTML = "Supprimer"
        button.classList = "btn btn-danger btn-sm"
        button.onclick = () => deletePrezi(index)
        //On ajoute le bouton supprimer à l'élément li
        li.appendChild(button)
        //On ajoute l'élément li à la liste des prézis
        document.getElementById("preziListUl").appendChild(li)
    })
}
/**
 * Fonction qui supprime la prézis à l'index passé en paramètre
 * @param {integer} index
 * @returns {void}
 */
const deletePrezi = (index) => {
    //On supprime le prézis de la liste
    preziList.splice(index, 1)
    //On met à jour la liste dans le localStorage
    localStorage.setItem("preziList", JSON.stringify(preziList))
    //On affiche la liste des prézis
    displayPreziList()
}
/**
 * Fonction qui ajoute un prézi à la liste
 * @returns {void}
 */
const addPrezi = () => {
    //On récupère le titre et l'url de la nouvelle prézis
    const title = preziTitle.value
    const url = preziUrl.value
    //On crée un nouvel objet prézis
    const prezi = {
        title: title,
        url: url
    }
    //On ajoute la prézis à la liste des prézis
    preziList.push(prezi)
    //On met à jour la liste des prézis dans le localStorage
    localStorage.setItem("preziList", JSON.stringify(preziList))
    //On affiche la liste des prézis
    displayPreziList()
}
//On ajoute le click sur le bouton d'ajout de prézis
addPreziButton.addEventListener("click", addPrezi)
//On charge le contenu du localStorage au démarrage de l'application
onLoad()