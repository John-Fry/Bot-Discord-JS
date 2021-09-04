const jimp = require('jimp')

async function main(){
let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK) 
let mask = await jimp.read('mascara.png')
let avatar = await jimp.read('avatar.jpg')
let fundo = await jimp.read('fundo.png')


    avatar.resize(130, 130)
    mask.resize(130, 130)
    avatar.mask(mask)
    fundo.print(fonte, 175, 175, 'jefinhogames14')
    fundo.composite(avatar,40, 90).write('beta.png')
}
main()