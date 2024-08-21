import {createBot, createProvider, createFlow, addKeyword, MemoryDB} from '@bot-whatsapp/bot'
import {BaileysProvider, handleCtx} from '@bot-whatsapp/provider-baileys'


const flowBienvenida=addKeyword('hola').addAnswer('Buenas!! Bienvenido')
const main=async () => {
    const adapterDB = new MemoryDB()
    const provider=createProvider(BaileysProvider)
    
    provider.initHttpServer(3002)

    provider.http?.server.post('/send-message', handleCtx(async (bot, req, res)=>{
        const body =req.body
        const message = body.message
        const mediaUrl=body.mediaUrl
        
        await bot.sendMessage('5493541653254', message,{
            media:mediaUrl
        } )
        res.end('etos es un msj de polka')
    })
    )
    await createBot({
        flow:createFlow([flowBienvenida]),
        database:adapterDB,
        provider
    })


}

main()