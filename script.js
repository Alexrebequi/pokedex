const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");

const form = document.querySelector(".formulario");
const input = document.querySelector(".input_search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemoon = async (pokemon) => {

    const APIresponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    )

    if(APIresponse.status === 200){
        const data = await APIresponse.json()
        return data
    }

};
const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";

    const data = await fetchPokemoon(pokemon)

    if(data){
        pokemonImage.style.Display = "block"
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = 
        data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
        input.value = "";
        searchPokemon = data.id
    }else{
        pokemonImage.style.Display = "none";
        pokemonName.innerHTML = "não encontrado"
        pokemonNumber.innerHTML = "";

    }
};


form.addEventListener("submit", (evento)=>{
    evento.preventDefault()
    renderPokemon(input.value.toLowerCase());



})  


buttonPrev.addEventListener("click", ()=>{
 if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon)
 }
})

buttonNext.addEventListener("click", ()=>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});


renderPokemon(searchPokemon);
