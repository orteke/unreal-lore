import { nanoid } from 'nanoid'
import * as cardUtils from '../utils/card.mjs'

export function optionIndexFromId(id) {
    return parseInt(id.split('o')[1]) - 1
}

export function addedEmptyOptionArray(options, cardId) {
    options.push({
        id: cardId + 'o' + (options.length + 1).toString(),
        token: nanoid(),
        text: 'input text',
        next: '0'
    })

    return options
}

export function settedNextOptionArray(options, optionId, nextCardId) {
    options[optionIndexFromId(optionId)].next = nextCardId

    return options
}

export function removedOptionByIdArray(options, optionId) {
    options.splice(optionIndexFromId(optionId), 1);

    return reorderedOptionsArray(options, cardUtils.cardIdFromOptionId(optionId))
}

export function reorderedOptionsArray(options, cardId) {
    for (let i = 0; i < options.length; i++) {
        options[i].id = cardId + 'o' + (i + 1).toString()
    }

    return options
}

