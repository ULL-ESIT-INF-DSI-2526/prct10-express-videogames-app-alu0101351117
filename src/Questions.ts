import { join } from "node:path";
import request from "request";

/**
 * Se han creado los tipos dificultad y tipo para evitar llamadas innecesarias a la API
 * @typeParam dificultad - tiene como posibles valores easy, medium y hard
 * @typeParam tipo - tiene como posibles valores multiple y boolean
 */
type dificultad = "easy" | "medium" | "hard";
type tipo = "multiple" | boolean;
/**
 * 
 * @param category - Parámetro opcional que le indicará a la API de qué categorías debe seleccionar las preguntas
 * @param difficulty - Parámetro opcional que le indicará a la API de qué dificultad elegir las preguntas
 * @param type - Parámetro opcional que le indicará a la API qué tipo de preguntas debe elegir
 * @returns o las promesas rotas por fallos en la API o valores erróneos introducidos, o una promesa cumplida mediante response
 */
export function findQuestions(category ? : number, difficulty ? : dificultad, type ? : tipo){

  let url = `https://opentdb.com/api.php?amount=10`;

  if (typeof category != "undefined"){
    url = join(url + `&category=${category}`)
  }
  if (typeof difficulty != "undefined"){
    url = join(url + `&difficulty=${difficulty}`)
  }
  if (typeof type != "undefined"){
    url = join(url + `&type=${type}`)
  }

  return new Promise<request.Response>((resolve, rejects) =>{
      request({ url: url, json: true }, (error: Error, response: request.Response) => {
        if (error) {
          rejects(`API no disponible: ${error.message}`);
        } else if (response.body.length === 0) {
          rejects(`Preguntas no disponibles`);
        } else if(response.body.response_code == 1){
          rejects(`No hay resultados en la consulta`);
        } else if(response.body.response_code == 2){
          rejects(`Parámetro inválido`);
        } else if(response.body.response_code == 5){
          rejects(`Demasiados pedidos simultáneos`);
        } else {
          resolve(response) 
        }
      }); 
    })


}