import request from 'request';
/**
 * Una función que llama a la API open trivia database para que le retorne las posibles opciones de categorías
 * Primero realiza una llamada a la API, y en caso de posibles errores, retornará promesas rotas
 * @returns o las promesas rotas mediante rejects o la promesa cumplida mediante resolve
 */
export function getCategories(){
    const url = `https://opentdb.com/api_category.php`;


  return new Promise<request.Response>((resolve, rejects) =>{
    request({ url: url, json: true }, (error: Error, response: request.Response) => {
      if (error) {
        rejects(`API no disponible: ${error.message}`);
      } else if (response.body.length === 0) {
        rejects(`Ha habido un error con las categorías`);
      } else {
        resolve(response) 
      }
    }); 
  })


}