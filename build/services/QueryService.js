var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as ytsrch from 'youtube-search-without-api-key';
export class QueryService {
    search(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!('options' in interaction))
                throw new Error(`Options undefined in interaction object of QueryService.search()`);
            const query = interaction.options.data[0].value;
            const songList = yield ytsrch.search(query);
            const song = songList.at(0);
            if (!song)
                throw new Error(`Song is undefined, probably query found nothing.`);
            return song;
        });
    }
}
