import { createBot, createProvider, createFlow, addKeyword, MemoryDB } from '@bot-whatsapp/bot';
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys';

const flowBienvenida = addKeyword('hola').addAnswer('¡Buenas! ¡Bienvenido!');

const main = async () => {
    const adapterDB = new MemoryDB();
    const provider = createProvider(BaileysProvider);

    

    provider.initHttpServer(3002);

    if (provider.http?.server) {
        provider.http.server.post('/send-message', handleCtx(async (bot, req, res) => {
            const { message, mediaUrl, phone } = req.body;
            await bot.sendMessage(phone, message, {
                media: mediaUrl,
            });
            res.end('Este es un mensaje de polka');
        }));
    }

    await createBot({
        flow: createFlow([flowBienvenida]),
        database: adapterDB,
        provider,
    });
};

main();
