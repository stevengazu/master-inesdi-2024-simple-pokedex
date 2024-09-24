import c from "classnames";
import { useTheme } from "contexts/use-theme";
import { usePokemon, usePokemonList, useTextTransition,usePokemonDamages} from "hooks";
import { SetStateAction, useState } from "react";
import { randomMode } from "utils/random";
import { Button } from "./button";
import { LedDisplay } from "./led-display";
import Swal from 'sweetalert2';

import "./pokedex.css";
import { PokemonUri } from "models";

export function Pokedex() {
  const { theme } = useTheme();
  const { ready, resetTransition } = useTextTransition();
  const { pokemonList } = usePokemonList();
  const [i, setI] = useState(0);
  const [selectedOption, setSelectedOption] = useState(false);
  const [myList, setMyList] = useState<PokemonUri[]>([]);
  const { pokemon: selectedPokemon } = usePokemon((selectedOption ? myList[i] : pokemonList[i]));
  const [SelectedList, setSelectedList] = useState(false);
  
   // Función para agregar el nuevo objeto al array
   const addPokemon = (newPokemon: PokemonUri) => {
    setMyList((prevList) => [...prevList, newPokemon]);
  };
  //------------- cuando da click en el boton de seleccionar o quitar pokemon --------
/**
 * handleClick - Maneja la lógica para seleccionar o quitar un Pokémon de la lista.
 * 
 * Si el Pokémon ya está en la lista seleccionada, lo elimina. Si no está en la lista y hay menos de 6 Pokémones seleccionados, lo agrega.
 * Muestra una alerta si se intenta agregar más de 6 Pokémones.
 */
const handleClick = () => {
  if (SelectedList) {
    const index = myList.findIndex(pokemon => pokemon.name === (selectedOption ? myList[i].name : pokemonList[i].name));
    if (index !== -1) {
      myList.splice(index, 1);
      setSelectedList(selectedOption);
    }
  } else {
    if (myList.length <= 5) {
      addPokemon(pokemonList[i]);
      setSelectedList(true);
    } else {
      Swal.fire({
        title: "Warning!",
        text: "You can only select 6 pokemons!",
        icon: "warning"
      });
    }
  }
};

//-----------------------------------------------------
/**
 * typeUrls - Obtiene las URLs de los tipos del Pokémon seleccionado.
 * 
 * @type {string[]}
 */
const typeUrls: string[] = selectedPokemon?.types?.map(typeInfo => typeInfo.type.url) || [];

/**
 * selectedPokemonDamage - Obtiene los daños del Pokémon seleccionado usando las URLs de sus tipos.
 */
const { pokemonDamages: selectedPokemonDamage } = usePokemonDamages(typeUrls);

/**
 * nextPokemon - Obtiene el siguiente Pokémon en la lista, dependiendo de si se ha seleccionado una opción.
 */
const { pokemon: nextPokemon } = usePokemon(selectedOption ? (i === myList.length - 1 ? myList[0] : myList[i + 1]) : pokemonList[i + 1]);

/**
 * prev - Función para retroceder al Pokémon anterior en la lista.
 * 
 * Resetea la transición y ajusta el índice `i` para apuntar al Pokémon anterior en la lista.
 * Si `i` es 0, se ajusta al último Pokémon de la lista correspondiente.
 * También actualiza el estado de `SelectedList` dependiendo de si el Pokémon anterior está en `myList`.
 */
const prev = () => {
  resetTransition();
  if (i === 0) {
    setI(selectedOption ? myList.length - 1 : pokemonList.length - 1);
  } else {
    setI((i) => i - 1);
  }
  const index = myList.findIndex(pokemon => pokemon.name === (selectedOption ? myList[i - 1].name : pokemonList[i - 1].name));
  setSelectedList(index !== -1);
};

/**
 * handleFilterChange - Maneja el cambio de filtro en la selección de Pokémon.
 * 
 * Dependiendo del valor del filtro seleccionado ('all' o 'Selected'), ajusta el estado de la aplicación.
 * Si el valor es 'all', muestra todos los Pokémones y reinicia el índice.
 * Si el valor es 'Selected', muestra solo los Pokémones seleccionados, si hay alguno.
 * Muestra una alerta si no hay Pokémones seleccionados cuando se elige 'Selected'.
 * 
 * @param {Object} event - El evento de cambio del filtro.
 * @param {Object} event.target - El objetivo del evento.
 * @param {string} event.target.value - El valor del filtro seleccionado.
 */
  const handleFilterChange  = (event: { target: { value: SetStateAction<string>; }; }) => {
    const value = event.target.value;
    if(value === 'all'){
      setSelectedOption(false);
      setI(0);
      const index = myList.findIndex(pokemon => pokemon.name === (selectedOption ? (i === myList.length - 1 ? myList[0].name : myList[i].name) : pokemonList[i].name));
                                                                  
        if (index !== -1) {                                     
          setSelectedList(true);
        }else{
         setSelectedList(false);
        }
    }else if(value === 'Selected'){
      if(myList.length > 0){
      setSelectedOption(true);
      setI(0);
      setSelectedList(true);
      }else{
        Swal.fire({
          title: "Warning!",
          text: "You have not selected any pokemons!",
          icon: "warning"
        });
        event.target.value = 'all';
      }
    }
  };

  /**
   * Avanza al siguiente Pokémon en la lista.
   * 
   * Esta función reinicia la transición, incrementa el índice `i` para apuntar al siguiente Pokémon en la lista,
   * y actualiza el estado de la lista seleccionada basado en si el siguiente Pokémon se encuentra en `myList`.
   * 
   * - Si el índice actual `i` está al final de `pokemonList`, se reinicia al principio.
   * - Luego encuentra el índice del siguiente Pokémon en `myList` basado en `selectedOption`.
   * - Si el Pokémon se encuentra en `myList`, establece `selectedList` a `true`, de lo contrario lo establece a `false`.
   * 
   * @remarks
   * Esta función asume que `resetTransition`, `setI`, `myList`, `pokemonList`, `selectedOption`, y `setSelectedList` 
   * están definidos en el ámbito circundante.
   */
  const next = () => {
    resetTransition();
    if (i === pokemonList.length - 1) {
      setI(0);
    } else {
      setI((i) => i + 1);
    }
    const index = myList.findIndex(pokemon => pokemon.name === (selectedOption ? (i === myList.length - 1 ? myList[0].name : myList[i + 1].name) : pokemonList[i+1].name));
                                                                  
        if (index !== -1) {                                     
          setSelectedList(true);
        }else{
         setSelectedList(false);
        }
  }
  return (
    <div className={c("pokedex", `pokedex-${theme}`)}>
      <div className="panel right-panel">
        <div className="Types-Container">
          <h4 >Types</h4>
            <div className='Pokemontypes-container'>
            {selectedPokemon?.types?.map((types,index)=>(
              <div key={index} className={`Pokemontypes ${types.type.name}`}>{types.type.name}</div>
            ))}
        </div>
        </div>
        <div className="Types-Container">
          <h4 >Weakness</h4>
            <div className='Pokemontypes-container'>
            {selectedPokemonDamage?.map((debilidades,index)=>(
              <div key={index} className={`Pokemontypes ${debilidades.name}`}>{debilidades.name}</div>
            ))}
        </div>
        </div>
      </div>
      <div className="panel left-panel">
      <div className="total">total: {myList.length}</div> 
        <div className="screen main-screen">
          {selectedPokemon && (
            <img
              className={c(
                "sprite",
                "obfuscated",
                ready && "ready",
                ready && `ready--${randomMode()}`
              )}
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />
          )}
          
        </div>
        
        <div className="screen name-display">
          <div
            className={c(
              "name",
              "obfuscated",
              ready && "ready",
              ready && `ready--${randomMode()}`
            )}
          >
            {selectedPokemon?.name}
          </div>
        </div>
        <div className="containerSelected"> 
        <button onClick={handleClick} className={`button ${SelectedList ? 'added' : 'not-added'}`}> {SelectedList ? 'Added' : 'Not Added'}  </button>
        
    <select onChange={handleFilterChange} className="dropdownShow" >
        <option value="all"> Show All</option>
        <option value="Selected">Show Selected</option>
      </select>
      
      </div>
        </div>
        
      <div className="panel right-panel">
        <div className="controls leds">
          <LedDisplay color="blue" />
          <LedDisplay color="red" />
          <LedDisplay color="yellow" />
        </div>
        
        <div className="screen second-screen">
          {nextPokemon && (
            <img
              className={c(
                "sprite",
                "obfuscated",
                ready && "ready",
                ready && `ready--${randomMode()}`
              )}
              src={nextPokemon.sprites.front_default}
              alt={nextPokemon.name}
            />
          )}
        </div>
        <div className="controls">
          <Button label="prev" onClick={prev} />
          <Button label="next" onClick={next} />
        </div>
      </div>
      
    </div>
  );
}
