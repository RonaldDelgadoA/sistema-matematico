import katex from "katex";

export const convertLatexInlineToHtml = (text:string)=>{
  let textCurrent = ''
  let textExpression = ''
  let startExpression = false

  for (const char of text) {
    if(char == '$'){
      if(startExpression){
        textCurrent += katex.renderToString(textExpression,{
          output:'html',
          throwOnError:false
        });
        textExpression = ''
      }
      startExpression = !startExpression
    }
    else if(startExpression){
      textExpression += char
    }
    else if(char === '\n'){
      textCurrent += '<br>'
    }
    else{
      textCurrent += char
    }
  }
  return textCurrent+textExpression
}

export const convertLatexToHtml = (text:string)=>{
  return katex.renderToString(text,{
    output:'html',
    throwOnError:false
  });
}