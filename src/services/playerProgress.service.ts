import { IWorld } from '../models/PlayerProgress';
import PlayerProgress, {IPlayerProgress} from '../models/PlayerProgress';
import { HydratedDocument } from 'mongoose';

export const createEmptyPlayerProgress = async(playerId:string): Promise<HydratedDocument<IPlayerProgress>> => {

    const newPlayer = new PlayerProgress({ playerId, totalStars: 0, unlocks: {}, worldsList: [],});
    return newPlayer.save()
}

export const resetExistingPlayerProgress = async(player: HydratedDocument<IPlayerProgress>): Promise<HydratedDocument<IPlayerProgress>> => {
    player.totalStars = 0;
    player.unlocks = {};
    player.worldsList = [];
    return player.save();
}

export function mergeWorlds(existingWorlds: IWorld[], incomingWorlds: IWorld[]) {
    incomingWorlds.forEach((incomingWorld) => {
        const existingWorld = existingWorlds.find(w => w.worldName === incomingWorld.worldName);

        if (existingWorld) {
            incomingWorld.levels.levelList.forEach((incomingLevel) => {
                const existingLevel = existingWorld.levels.levelList.find(
                    l => l.levelName === incomingLevel.levelName
                );

                if (existingLevel) {
                    existingLevel.level.stars = incomingLevel.level.stars;
                    existingLevel.level.performance = incomingLevel.level.performance;
                } else {
                    existingWorld.levels.levelList.push(incomingLevel);
                }
            });

            existingWorld.levels.unlockedStars = incomingWorld.levels.unlockedStars;
        } else {
            existingWorlds.push(incomingWorld);
        }
    });
}
