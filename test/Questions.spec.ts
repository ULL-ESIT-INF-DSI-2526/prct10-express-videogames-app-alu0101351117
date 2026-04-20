import { describe, test, expect } from "vitest";
import { getCategories } from "../src/Categories.js";
import { findQuestions } from "../src/Questions.js";
import { waitForDebugger } from "inspector/promises";


describe("Función asíncrona que retorna preguntas de un trivia", ()=>{
  const datos = getCategories();

  test("Debería devolver 10 preguntas de cualquier categoría, dificultad y tipo", ()=>{
    return findQuestions().then((trivia) =>{
      console.log(trivia.body)
      expect(trivia.body.response_code).toStrictEqual(0)
    })
  })


  test("Debería devolver 10 preguntas de dificultad media", ()=>{

    return findQuestions(undefined, "medium", undefined).then((trivia) =>{
      console.log(trivia.body)
      let misma_dificultad = true;
      trivia.body.results.forEach(pregunta => {
        if(pregunta.difficulty != "medium") {
          misma_dificultad = false;
        }
      });
      expect(misma_dificultad).toBeTruthy()
    })
  })
});