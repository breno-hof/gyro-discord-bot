import { Interaction } from "discord.js";
import * as ytsrch from 'youtube-search-without-api-key'
import { QueryServiceDTO } from "../dto/QueryServiceDTO";

export class QueryService {
    
    async search(interaction: Interaction): Promise<QueryServiceDTO> {
        if (!('options' in interaction)) throw new Error(`Options undefined in interaction object of QueryService.search()`);

        const query = interaction.options.data[0].value as string;
        const songList = await ytsrch.search(query);
        const song = songList.at(0) as QueryServiceDTO;

        if (!song) throw new Error(`Song is undefined, probably query found nothing.`);

        return song;
    }
}