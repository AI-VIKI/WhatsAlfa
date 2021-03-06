/* Copyright (C) 2021 TOXIC ALIEN.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAlfa
*/

const Asena = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');

const Language = require('../language');
const Lang = Language.getString('conventer');

Asena.addCommand({pattern: 'mp4audio', fromMe: false, desc: Lang.MP4TOAUDİO_DESC}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage(Lang.MP4TOAUDİO_NEEDREPLY);
    var downloading = await message.client.sendMessage(message.jid,Lang.MP4TOAUDİO,MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .withNoVideo()
        .save('output.mp3')
        .on('end', async () => {
            await message.sendMessage(fs.readFileSync('output.mp3'), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: false});
        });
    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
}));

Asena.addCommand({pattern: 'imagesticker', fromMe: false, desc: Lang.STİCKER_DESC}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage(Lang.STİCKER_NEEDREPLY);
    var downloading = await message.client.sendMessage(message.jid,Lang.STİCKER,MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .fromFormat('webp_pipe')
        .save('output.jpg')
        .on('end', async () => {
            await message.sendMessage(fs.readFileSync('output.jpg'), MessageType.image, {mimetype: Mimetype.jpg});
        });
    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
}));
