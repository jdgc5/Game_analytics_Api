import { IWorld } from '../models/PlayerProgress';
import PlayerProgress, { IPlayerProgress } from '../models/PlayerProgress';
import { HydratedDocument } from 'mongoose';

export const createEmptyPlayerProgress = async (playerId: string): Promise<HydratedDocument<IPlayerProgress>> => {

    const newPlayer = new PlayerProgress({ _id: playerId, totalStars: 0, unlocks: {}, worldsList: [], });
    return newPlayer.save()
}

export const resetExistingPlayerProgress = async (player: HydratedDocument<IPlayerProgress>): Promise<HydratedDocument<IPlayerProgress>> => {
    player.totalStars = 0;
    player.unlocks = {};
    player.worldsList = [];
    return player.save();
}

/* export const mergeWorlds = ( existingWorlds: IWorld[], incomingWorlds: IWorld[]): void => {
    incomingWorlds.forEach((incomingWorld) => {
        const index = existingWorlds.findIndex( (w) => w.worldName === incomingWorld.worldName);

        if (index !== -1) {
            existingWorlds[index] = incomingWorld;
        } else {
            existingWorlds.push(incomingWorld);
        }
    });
}; */
