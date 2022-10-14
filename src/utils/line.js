
export function removedGivenLineByIdArray(lines, id) {
    if (lines.hasOwnProperty(id)) {
        lines[id].remove();
        delete lines[id];
    }

    return lines
}

export function removedLinesArray(lines) {
    /* eslint-disable no-unused-vars */
    for (const [key, value] of Object.entries(lines)) {
        lines = removedGivenLineByIdArray(lines, key)
    }
    /* eslint-enable no-unused-vars */

    return lines
}

export function removedLinesByCardIdArray(lines, cards, cardId) {
    for (let i = 0; i < cards.length; i++) {
        for (let j = 0; j < cards[i].ops.length; j++) {
            if (cards[i].id === cardId) {
                lines = removedGivenLineByIdArray(lines, cards[i].ops[j].id)
            }

            if (cards[i].ops[j].next === cardId) {
                lines = removedGivenLineByIdArray(lines, cards[i].ops[j].id)
            }
        }
    }

    return lines
}

export function removedLineByOptionIdArray(lines, optionId) {
    return removedGivenLineByIdArray(lines, optionId)
}

export function updatePosition(lines, id) {
    if (lines.hasOwnProperty(id)) {
        lines[id].position();
    }

    return lines
}

export function updatePositions(lines, cards, cardId) {
    for (let i = 0; i < cards.length; i++) {
        for (let j = 0; j < cards[i].ops.length; j++) {
            if (cards[i].id === cardId) {
                lines = updatePosition(lines, cards[i].ops[j].id);
            }

            if (cards[i].ops[j].next === cardId) {
                lines = updatePosition(lines, cards[i].ops[j].id);
            }
        }
    }

    return lines
}