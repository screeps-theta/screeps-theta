const roleSpecs = {
    worker: [WORK, CARRY, MOVE],
    upgrader: [WORK, CARRY, MOVE],
    claimer: [WORK, CARRY, MOVE, CLAIM]
}

const autoSpawner = function autoSpawner () {
    const desiredRoles = {
        worker: 12,
        upgrader: 6,
        claimer: (Game.gcl.level - 1)
    }

    let spawn = false;
    for(let role in desiredRoles) {
        roleCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);

        if (roleCreeps.length < desiredRoles[role]) {
            nextRole = role;
            spawn = true;
            break;
        }
    }

    if (spawn) {
        for(let name in Game.spawns) {
            const newName = nextRole + Game.time;
            const result = Game.spawns[name].spawnCreep(roleSpecs[nextRole], newName, {
                memory: {role: nextRole}
            })
            if (result >= 0) {
                console.log('Succesfully Spawning Creep:' + newName)
            }
        }
    }
}

module.exports = autoSpawner;